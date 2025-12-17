import { Request, Response } from "express";
import { VeterinarianService } from "../services/veterinarian.service";

const service = new VeterinarianService();

export const getAllVeterinarians = async (_req: Request, res: Response) => {
  try {
    const veterinarians = await service.getAll();
    return res.status(200).json({
      success: true,
      message: "Veterinarians fetched successfully",
      data: veterinarians,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching veterinarians",
    });
  }
};

export const getVeterinarianById = async (req: Request, res: Response) => {
  try {
    const veterinarian = await service.getByIdVeterinarian(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Veterinarian fetched successfully",
      data: veterinarian,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Veterinarian not found",
    });
  }
};

export const createVeterinarian = async (req: Request, res: Response) => {
  try {
    const body = (req.body ?? {}) as any;
    const { last_name, first_name, phone, email, adress } = body;

    if (!last_name) {
      return res.status(400).json({
        success: false,
        message: "last_name is required",
        hint: "Ton body est vide ou pas en JSON (Content-Type manquant).",
        receivedBody: req.body,
      });
    }

    const veterinarian = await service.createVeterinarian({
      last_name,
      first_name,
      phone,
      email,
      adress,
    });

    return res.status(201).json({
      success: true,
      message: "Veterinarian successfully created",
      data: veterinarian,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error creating veterinarian",
    });
  }
};

export const updateVeterinarian = async (req: Request, res: Response) => {
  try {
    const veterinarian = await service.updateVeterinarian(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Veterinarian successfully updated",
      data: veterinarian,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating veterinarian",
    });
  }
};

export const deleteVeterinarian = async (req: Request, res: Response) => {
  try {
    await service.deleteVeterinarian(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Veterinarian successfully deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting veterinarian",
    });
  }
};
