import { Router, Request, Response, NextFunction } from "express";
import { loginController } from "../controllers/auth.controller";

const router = Router();

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  return loginController(req, res, next);
});

export default router;
