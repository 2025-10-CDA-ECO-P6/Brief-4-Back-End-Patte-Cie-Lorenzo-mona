import { Router } from "express";
import {
  createUserController,
  getUserByIdController,
  deleteUserController,
  getUsersController,
} from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();

// GET all users
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  getUsersController
);

// CREATE user
router.post("/", createUserController);

// GET user by id
router.get("/:id", getUserByIdController);

// DELETE user
router.delete("/:id", deleteUserController);

export default router;
