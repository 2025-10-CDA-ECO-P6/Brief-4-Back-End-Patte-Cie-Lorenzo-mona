import { Router } from "express";
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

router.get("/", 
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  getAllAnimal);

router.get("/:id", 
  authMiddleware,
  roleMiddleware(["admin", "veterinarian", "owner"]),
  getAnimalById);

router.post("/", 
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  createAnimal);

router.put("/:id", 
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  updateAnimal);

router.delete("/:id", 
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  deleteAnimal);

export default router;
