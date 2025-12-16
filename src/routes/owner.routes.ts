import { Router, Request, Response } from "express";
import { getOwnersController , getOwnerByIdController, createOwnerController, updateOwnerController, deleteOwnerController } from "../controllers/owner.controller";
const router = Router();

router.get("/", (req: Request, res: Response ) => {
    return getOwnersController(req, res);
  
});

router.get("/:id", (req: Request, res: Response) => {
    return getOwnerByIdController(req, res);
});

router.post("/",  createOwnerController);

router.put("/:id", (req: Request, res: Response) => {
    return updateOwnerController(req, res);
});

router.delete("/:id", (req: Request, res: Response) => {
    return deleteOwnerController(req, res);
});

export default router;