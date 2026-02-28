import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { apiRouter } from "./routes/index.js";

export const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
  }),
);

app.use("/api", express.json({ limit: "1mb" }), apiRouter);

app.get("/health", (_req, res) => {
  res.json({ service: "fixora-api", status: "ok" });
});
