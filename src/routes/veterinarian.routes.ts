import { Router, Request, Response, NextFunction } from "express";
import {
  getAllVeterinarians,
  getVeterinarianById,
  createVeterinarian,
  updateVeterinarian,
  deleteVeterinarian,
} from "../controllers/veterinarian.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "veterinarian", "owner"]),
  (req: Request, res: Response, next: NextFunction) => {
    return getAllVeterinarians(req, res, next);
  },
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "veterinarian", "owner"]),
  (req: Request, res: Response, next: NextFunction) => {
    return getVeterinarianById(req, res, next);
  },
);

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  (req: Request, res: Response, next: NextFunction) => {
    return createVeterinarian(req, res, next);
  },
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  (req: Request, res: Response, next: NextFunction) => {
    return updateVeterinarian(req, res, next);
  },
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  (req: Request, res: Response, next: NextFunction) => {
    return deleteVeterinarian(req, res, next);
  },
);

export default router;
