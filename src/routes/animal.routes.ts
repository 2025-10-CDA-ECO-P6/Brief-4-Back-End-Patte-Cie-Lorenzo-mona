import { Router } from "express";
import {
  getAllAnimal,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal,
} from "../controllers/animal.controller";

const router = Router();

router.get("/", getAllAnimal);
router.get("/:id", getAnimalById);
router.post("/", createAnimal);
router.put("/:id", updateAnimal);
router.delete("/:id", deleteAnimal);

export default router;
