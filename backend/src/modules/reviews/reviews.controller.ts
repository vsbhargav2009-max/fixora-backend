import crypto from "node:crypto";
import { Response } from "express";
import { AuthRequest } from "../../core/middleware/auth.js";

export async function createReview(req: AuthRequest, res: Response) {
  const { rating, reviewText } = req.body as { rating: number; reviewText: string };
  return res.status(201).json({
    id: crypto.randomUUID(),
    projectId: req.params.projectId,
    reviewerId: req.user?.id,
    rating,
    reviewText,
    createdAt: new Date().toISOString(),
  });
}
