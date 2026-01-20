import { Router, Request, Response, NextFunction } from "express";
import {
  getAllConsultations,
  getConsultationById,
  createConsultation,
  updateConsultation,
  deleteConsultation,
} from "../controllers/consultation.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  (req: Request, res: Response, next: NextFunction) => {
    return getAllConsultations(req, res, next);
  },
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "veterinarian", "owner"]),
  (req: Request, res: Response, next: NextFunction) => {
    return getConsultationById(req, res, next);
  },
);

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  (req: Request, res: Response, next: NextFunction) => {
    return createConsultation(req, res, next);
  },
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  (req: Request, res: Response, next: NextFunction) => {
    return updateConsultation(req, res, next);
  },
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  (req: Request, res: Response, next: NextFunction) => {
    return deleteConsultation(req, res, next);
  },
);

export default router;
