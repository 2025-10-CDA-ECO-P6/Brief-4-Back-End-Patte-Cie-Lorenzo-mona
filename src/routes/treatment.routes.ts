import { Router } from "express";
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

router.get("/", 
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  getAllTreatment);

router.get("/:id", 
  authMiddleware,
  roleMiddleware(["admin", "veterinarian", "owner"]),
  getTreatmentById);

router.post("/", 
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  createTreatment);

router.put("/:id", 
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  updateTreatment);

router.delete("/:id", 
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  deleteTreatment);

export default router;
