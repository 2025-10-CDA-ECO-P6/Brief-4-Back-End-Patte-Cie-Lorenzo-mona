import { Router, Request, Response, NextFunction } from "express";
import {
  getAllTreatment,
  getTreatmentById,
  createTreatment,
  updateTreatment,
  deleteTreatment,
} from "../controllers/treatment.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "veterinarian", "owner"]),
  (req: Request, res: Response, next: NextFunction) => {
    return getAllTreatment(req, res, next);
  },
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "veterinarian", "owner"]),
  (req: Request, res: Response, next: NextFunction) => {
    return getTreatmentById(req, res, next);
  },
);

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  (req: Request, res: Response, next: NextFunction) => {
    return createTreatment(req, res, next);
  },
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  (req: Request, res: Response, next: NextFunction) => {
    return updateTreatment(req, res, next);
  },
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  (req: Request, res: Response, next: NextFunction) => {
    return deleteTreatment(req, res, next);
  },
);

export default router;
