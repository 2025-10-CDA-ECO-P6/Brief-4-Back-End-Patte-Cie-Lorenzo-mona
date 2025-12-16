import { getOwners , getOwnerById, createOwner, updateOwner, deleteOwner} from "../services/owner.services";
import { Request, Response } from "express";

export async function getOwnersController(req: Request, res: Response) {
  try {
    const page = req.query.page ? Number(req.query.page) : undefined;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;

    const owners = await getOwners(page, limit);
    res.status(200).json(owners);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getOwnerByIdController(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const owner = await getOwnerById(id);
        if (owner) {
            res.status(200).json(owner);
        }
        else {
            res.status(404).json({ error: "Owner not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }   
}

export async function createOwnerController(req: Request, res: Response) {
    try {
        const data = req.body;
        const newOwner = await createOwner(data);
        res.status(201).json(newOwner);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }   
}

export async function updateOwnerController(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedOwner = await updateOwner(id, data);
        res.status(200).json(updatedOwner);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }           

}

export async function deleteOwnerController(req: Request, res: Response) {
    try {
        const id = req.params.id;
        await deleteOwner(id);
        res.status(200).json({ message: "Owner deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }           
}

