import { Router } from "express";
import {
  getAllVeterinarians,
  getVeterinarianById,
  createVeterinarian,
  updateVeterinarian,
  deleteVeterinarian,
} from "../controllers/veterinarian.controller";

const router = Router();

router.get("/", getAllVeterinarians);
router.get("/:id", getVeterinarianById);
router.post("/", createVeterinarian);
router.patch("/:id", updateVeterinarian);
router.delete("/:id", deleteVeterinarian);

export default router;
