import { Router } from "express";
import {
  getAllTreatment,
  getTreatmentById,
  createTreatment,
  updateTreatment,
  deleteTreatment,
} from "../controllers/treatment.controller";

const router = Router();

router.get("/", getAllTreatment);
router.get("/:id", getTreatmentById);
router.post("/", createTreatment);
router.put("/:id", updateTreatment);
router.delete("/:id", deleteTreatment);

export default router;
