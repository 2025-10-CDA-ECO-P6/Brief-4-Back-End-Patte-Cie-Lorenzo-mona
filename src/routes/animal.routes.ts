import { Router, Request, Response, NextFunction } from "express";
import {
  getAllAnimal,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal,
} from "../controllers/animal.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  (req: Request, res: Response, next: NextFunction) => {
    return getAllAnimal(req, res, next);
  },
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "veterinarian", "owner"]),
  (req: Request, res: Response, next: NextFunction) => {
    return getAnimalById(req, res, next);
  },
);

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  (req: Request, res: Response, next: NextFunction) => {
    return createAnimal(req, res, next);
  },
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  (req: Request, res: Response, next: NextFunction) => {
    return updateAnimal(req, res, next);
  },
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  (req: Request, res: Response, next: NextFunction) => {
    return deleteAnimal(req, res, next);
  },
);

export default router;
