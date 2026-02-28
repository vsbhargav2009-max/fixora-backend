import crypto from "node:crypto";
import { Response } from "express";
import { AuthRequest } from "../../core/middleware/auth.js";

export async function createBid(req: AuthRequest, res: Response) {
  const { bidAmount, message } = req.body as { bidAmount: number; message: string };
  return res.status(201).json({
    id: crypto.randomUUID(),
    projectId: req.params.projectId,
    freelancerId: req.user?.id,
    bidAmount,
    message,
    status: "submitted",
  });
}

export async function acceptBid(req: AuthRequest, res: Response) {
  return res.json({ bidId: req.params.bidId, status: "accepted", acceptedBy: req.user?.id });
}
