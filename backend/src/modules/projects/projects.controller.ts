import crypto from "node:crypto";
import { Response } from "express";
import { AuthRequest } from "../../core/middleware/auth.js";

export async function createProject(req: AuthRequest, res: Response) {
  const { title, description, budget, deadline } = req.body as {
    title: string;
    description: string;
    budget: number;
    deadline: string;
  };

  const project = {
    id: crypto.randomUUID(),
    clientId: req.user?.id,
    title,
    description,
    budget,
    deadline,
    status: "open",
    createdAt: new Date().toISOString(),
  };

  return res.status(201).json(project);
}

export async function listProjects(_req: AuthRequest, res: Response) {
  return res.json([]);
}

export async function markProjectInProgress(req: AuthRequest, res: Response) {
  return res.json({ projectId: req.params.projectId, status: "in_progress", updatedBy: req.user?.id });
}

export async function approveCompletion(req: AuthRequest, res: Response) {
  return res.json({ projectId: req.params.projectId, status: "completed", approvedBy: req.user?.id });
}
