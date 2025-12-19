import { Router } from "express";
import {
  getAllConsultations,
  getConsultationById,
  createConsultation,
  updateConsultation,
  deleteConsultation,
} from "../controllers/consultation.controller";

const router = Router();

router.get("/", getAllConsultations);
router.get("/:id", getConsultationById);
router.post("/", createConsultation);
router.put("/:id", updateConsultation);
router.delete("/:id", deleteConsultation);

export default router;
