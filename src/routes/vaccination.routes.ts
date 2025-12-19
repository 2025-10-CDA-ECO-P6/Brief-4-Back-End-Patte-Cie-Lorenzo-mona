import { Router } from "express";
import {
  getAllVaccinations,
  getVaccinationById,
  createVaccination,
  updateVaccination,
  deleteVaccination,
} from "../controllers/vaccination.controller";

const router = Router();

router.get("/", getAllVaccinations);
router.get("/:id", getVaccinationById);
router.post("/", createVaccination);
router.put("/:id", updateVaccination);
router.delete("/:id", deleteVaccination);

export default router;
