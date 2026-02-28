import { Router } from "express";
import { loginWithEmail, googleOAuthCallback, registerWithEmail } from "../modules/auth/auth.controller.js";
import { authenticate, authorize } from "../core/middleware/auth.js";
import { createProject, listProjects, markProjectInProgress, approveCompletion } from "../modules/projects/projects.controller.js";
import { acceptBid, createBid } from "../modules/bids/bids.controller.js";
import { previewPaymentBreakdown, createEscrowPaymentIntent, releaseEscrowToFreelancer, stripeWebhook, razorpayWebhook } from "../modules/payments/payments.controller.js";
import { updateFreelancerProfile, getFreelancerPublicProfile } from "../modules/users/users.controller.js";
import { createReview } from "../modules/reviews/reviews.controller.js";
import { getAdminDashboard } from "../modules/admin/admin.controller.js";

export const apiRouter = Router();

apiRouter.post("/auth/register", registerWithEmail);
apiRouter.post("/auth/login", loginWithEmail);
apiRouter.post("/auth/google", googleOAuthCallback);

apiRouter.get("/projects", authenticate, listProjects);
apiRouter.post("/projects", authenticate, authorize("client"), createProject);
apiRouter.patch("/projects/:projectId/in-progress", authenticate, authorize("client"), markProjectInProgress);
apiRouter.patch("/projects/:projectId/approve", authenticate, authorize("client"), approveCompletion);

apiRouter.post("/projects/:projectId/bids", authenticate, authorize("freelancer"), createBid);
apiRouter.patch("/bids/:bidId/accept", authenticate, authorize("client"), acceptBid);

apiRouter.get("/payments/preview", authenticate, previewPaymentBreakdown);
apiRouter.post("/payments/escrow", authenticate, authorize("client"), createEscrowPaymentIntent);
apiRouter.post("/payments/release", authenticate, authorize("client"), releaseEscrowToFreelancer);
apiRouter.post("/webhooks/stripe", stripeWebhook);
apiRouter.post("/webhooks/razorpay", razorpayWebhook);

apiRouter.patch("/freelancers/me", authenticate, authorize("freelancer"), updateFreelancerProfile);
apiRouter.get("/freelancers/:userId", authenticate, getFreelancerPublicProfile);

apiRouter.post("/projects/:projectId/reviews", authenticate, authorize("client"), createReview);
apiRouter.get("/admin/dashboard", authenticate, authorize("admin"), getAdminDashboard);
