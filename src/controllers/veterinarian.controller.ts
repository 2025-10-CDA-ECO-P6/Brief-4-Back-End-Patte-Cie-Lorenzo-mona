import { NextFunction, Request, Response } from "express";
import { VeterinarianService } from "../services/veterinarian.service";

const service = new VeterinarianService();

export const getAllVeterinarians = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const veterinarians = await service.getAll();
    return res.status(200).json({
      success: true,
      message: "Veterinarians fetched successfully",
      data: veterinarians,
    });
  } catch (error) {
    next(error);
  }
};

export const getVeterinarianById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const veterinarian = await service.getByIdVeterinarian(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Veterinarian fetched successfully",
      data: veterinarian,
    });
  } catch (error) {
    next(error);
  }
};

export const createVeterinarian = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body ?? {};
    const { id_user, last_name, first_name, phone, email, adress } = body;

    if (!last_name) {
      return res.status(400).json({
        success: false,
        message: "last_name is required",
        hint: "Ton body est vide ou pas en JSON (Content-Type manquant).",
        receivedBody: req.body,
      });
    }

    const veterinarian = await service.createVeterinarian({
      id_user,
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
    next(error);
  }
};

export const updateVeterinarian = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    next(error);
  }
};

export const deleteVeterinarian = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await service.deleteVeterinarian(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Veterinarian successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};
