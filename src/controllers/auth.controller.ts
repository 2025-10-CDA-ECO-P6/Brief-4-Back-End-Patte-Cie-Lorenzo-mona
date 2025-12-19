import { Request, Response, NextFunction } from "express";
import { login } from "../services/auth.service";

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await login(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
