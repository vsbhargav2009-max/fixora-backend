import { Response } from "express";
import { AuthRequest } from "../../core/middleware/auth.js";

export async function updateFreelancerProfile(req: AuthRequest, res: Response) {
  const { bio, skills, portfolioLinks, kycStatus } = req.body as {
    bio: string;
    skills: string[];
    portfolioLinks: string[];
    kycStatus: "pending" | "verified" | "rejected";
  };

  return res.json({
    userId: req.user?.id,
    role: "freelancer",
    bio,
    skills,
    portfolioLinks,
    kycStatus,
  });
}

export async function getFreelancerPublicProfile(req: AuthRequest, res: Response) {
  return res.json({
    userId: req.params.userId,
    rating: 4.8,
    completedProjects: 36,
    reviews: [],
  });
}
