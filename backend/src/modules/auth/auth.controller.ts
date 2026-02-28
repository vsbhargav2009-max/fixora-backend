import crypto from "node:crypto";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";

type RegisterPayload = {
  role: "client" | "freelancer";
  name: string;
  email: string;
  password: string;
};

export async function registerWithEmail(req: Request, res: Response) {
  const body = req.body as RegisterPayload;
  const passwordHash = await bcrypt.hash(body.password, 12);

  // TODO: Persist via repository layer
  const user = { id: crypto.randomUUID(), ...body, passwordHash, kycStatus: "pending" };

  const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, env.jwtSecret, { expiresIn: "7d" });

  return res.status(201).json({ token, user });
}

export async function loginWithEmail(req: Request, res: Response) {
  const { email } = req.body as { email: string; password: string };
  // TODO: load user + validate bcrypt.compare
  const fakeUser = { id: "seed-user", role: "client", email };
  const token = jwt.sign(fakeUser, env.jwtSecret, { expiresIn: "7d" });
  return res.json({ token, user: fakeUser });
}

export async function googleOAuthCallback(req: Request, res: Response) {
  const { email, name } = req.body as { email: string; name: string };
  // TODO: verify Google ID token
  const user = { id: crypto.randomUUID(), role: "client", email, name };
  const token = jwt.sign(user, env.jwtSecret, { expiresIn: "7d" });
  return res.json({ token, user });
}
