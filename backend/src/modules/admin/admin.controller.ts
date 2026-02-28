import { Request, Response } from "express";

export async function getAdminDashboard(_req: Request, res: Response) {
  return res.json({
    totalRevenue: 245000,
    gstLiability: 44100,
    activeUsers: 920,
    openDisputes: 7,
  });
}
