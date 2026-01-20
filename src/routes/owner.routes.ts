import { Router, Request, Response, NextFunction } from "express";
import {
  getOwnersController,
  getOwnerByIdController,
  createOwnerController,
  updateOwnerController,
  deleteOwnerController,
} from "../controllers/owner.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  (req: Request, res: Response, next: NextFunction) => {
    return getOwnersController(req, res, next);
  },
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "owner", "veterinarian"]),
  (req: Request, res: Response, next: NextFunction) => {
    return getOwnerByIdController(req, res, next);
  },
);

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  (req: Request, res: Response, next: NextFunction) => {
    return createOwnerController(req, res, next);
  },
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "owner", "veterinarian"]),
  (req: Request, res: Response, next: NextFunction) => {
    return updateOwnerController(req, res, next);
  },
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  (req: Request, res: Response, next: NextFunction) => {
    return deleteOwnerController(req, res, next);
  },
);

export default router;
