import { Router } from "express";
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

router.get("/", 
  authMiddleware,
  roleMiddleware(["admin", "veterinarian", "owner"]),
  getAllVeterinarians);

router.get("/:id", 
  authMiddleware,
  roleMiddleware(["admin", "veterinarian", "owner"]),
  getVeterinarianById);

router.post("/", 
  authMiddleware,
  roleMiddleware(["admin"]),
  createVeterinarian);

router.put("/:id", 
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  updateVeterinarian);

router.delete("/:id", 
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteVeterinarian);

export default router;
