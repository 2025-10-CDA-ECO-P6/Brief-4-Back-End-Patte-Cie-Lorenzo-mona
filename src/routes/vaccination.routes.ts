import { Router } from "express";
import {
  getAllVaccinations,
  getVaccinationById,
  createVaccination,
  updateVaccination,
  deleteVaccination,
} from "../controllers/vaccination.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();

router.get("/", 
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  getAllVaccinations);

router.get("/:id", 
  authMiddleware,
  roleMiddleware(["admin", "veterinarian", "owner"]),
  getVaccinationById);

router.post("/", 
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  createVaccination);
  
router.put("/:id", 
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  updateVaccination);

router.delete("/:id", 
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  deleteVaccination);

export default router;
