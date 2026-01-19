import { Router, Request, Response } from "express";
import {
  getOwnersController,
  getOwnerByIdController,
  createOwnerController,
  updateOwnerController,
  deleteOwnerController,
} from "../controllers/owner.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();

router.get("/", 
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  getOwnersController);

router.get("/:id", 
  authMiddleware,
  roleMiddleware(["admin", "owner", "veterinarian"]),
  getOwnerByIdController);

router.post("/", 
  authMiddleware,
  roleMiddleware(["admin", "veterinarian"]),
  createOwnerController);

router.put("/:id", 
  authMiddleware,
  roleMiddleware(["admin", "owner", "veterinarian"]),
  updateOwnerController);

router.delete("/:id", 
  authMiddleware,
  roleMiddleware(["admin","veterinarian"]),
  deleteOwnerController);

//  Test MIDDLEWARE ERROR
// router.get("/_test/error", (req, res, next) => {
//   return next({ status: 418, message: "Test middleware" });
// });

// router.get("/_test/crash", (req, res) => {
// });

export default router;
