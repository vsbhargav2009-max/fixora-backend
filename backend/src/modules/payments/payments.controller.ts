import { Request, Response } from "express";
import Stripe from "stripe";
import { env } from "../../config/env.js";
import { calculatePaymentBreakdown } from "../../core/utils/paymentCalculator.js";

const stripe = env.stripeSecretKey ? new Stripe(env.stripeSecretKey) : null;

export async function previewPaymentBreakdown(req: Request, res: Response) {
  const budget = Number(req.query.budget ?? req.body.budget);
  return res.json(calculatePaymentBreakdown(budget));
}

export async function createEscrowPaymentIntent(req: Request, res: Response) {
  const { projectId, projectValue } = req.body as { projectId: string; projectValue: number };
  const breakdown = calculatePaymentBreakdown(projectValue);

  if (!stripe) {
    return res.status(503).json({ message: "Stripe not configured", breakdown });
  }

  const intent = await stripe.paymentIntents.create({
    amount: Math.round(breakdown.clientTotal * 100),
    currency: "inr",
    metadata: { projectId, escrow: "true" },
    capture_method: "manual",
  });

  return res.status(201).json({ clientSecret: intent.client_secret, breakdown });
}

export async function releaseEscrowToFreelancer(req: Request, res: Response) {
  // Step4-6: Triggered only after client approval
  const { projectValue } = req.body as { projectValue: number };
  const breakdown = calculatePaymentBreakdown(projectValue);
  return res.json({
    status: "released",
    commission: breakdown.commission,
    gst: breakdown.gstOnCommission,
    payout: breakdown.freelancerPayout,
  });
}

export async function stripeWebhook(req: Request, res: Response) {
  if (!stripe || !env.stripeWebhookSecret) return res.status(503).send("stripe_not_configured");

  const signature = req.headers["stripe-signature"] as string;
  try {
    const event = stripe.webhooks.constructEvent(req.body, signature, env.stripeWebhookSecret);
    // TODO: Persist transaction lifecycle events to Payments + Audit tables
    return res.json({ received: true, type: event.type });
  } catch (error) {
    return res.status(400).json({ message: "Invalid webhook", error: String(error) });
  }
}

export async function razorpayWebhook(req: Request, res: Response) {
  // TODO: Verify HMAC using env.razorpayWebhookSecret
  return res.json({ received: true, gateway: "razorpay", payload: req.body });
}
