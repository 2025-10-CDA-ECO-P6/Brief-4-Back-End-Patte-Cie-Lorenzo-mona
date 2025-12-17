import { Request, Response, NextFunction } from "express";

export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("ERROR:", err);

  // Erreur métier
  if (err?.status && err?.message) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
      details: err.details ?? null,
    });
  }

  // Erreur inconnue / technique
  return res.status(500).json({
    status: 500,
    message: "Internal Server Error",
  });
}
