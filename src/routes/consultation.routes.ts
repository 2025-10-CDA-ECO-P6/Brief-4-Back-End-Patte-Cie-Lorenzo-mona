import { Router } from "express";
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

router.get("/", 
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  getAllConsultations);
  
router.get("/:id", 
  authMiddleware,
  roleMiddleware(["admin", "veterinarian", "owner"]),
  getConsultationById);

router.post("/", 
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  createConsultation);

router.put("/:id", 
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  updateConsultation);

router.delete("/:id", 
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  deleteConsultation);

export default router;
