import { NextFunction, Request, Response } from "express";
import { VaccinationService } from "../services/vaccination.service";

const service = new VaccinationService();

export const getAllVaccinations = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vaccinations = await service.getAll();
    return res.status(200).json({
      success: true,
      message: "Vaccinations fetched successfully",
      data: vaccinations,
    });
  } catch (error) {
    next(error);
  }
};

export const getVaccinationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vaccination = await service.getByIdVaccination(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Vaccination fetched successfully",
      data: vaccination,
    });
  } catch (error) {
    next(error);
  }
};

export const createVaccination = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body ?? {};
    const { id_animal, vaccine_name, vaccine_date, reminder_date, comment } =
      body;

    if (!id_animal || !vaccine_name || !vaccine_date) {
      return res.status(400).json({
        success: false,
        message: "id_animal, vaccine_name, and vaccine_date are required",
        hint: "Ton body est vide ou pas en JSON (Content-Type manquant).",
        receivedBody: req.body,
      });
    }

    const vaccination = await service.createVaccination({
      id_animal,
      vaccine_name,
      vaccine_date,
      reminder_date,
      comment,
    });

    return res.status(201).json({
      success: true,
      message: "Vaccination successfully created",
      data: vaccination,
    });
  } catch (error) {
    next(error);
  }
};

export const updateVaccination = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = (req.body ?? {}) as any;

    if (!Object.keys(body).length) {
      return res.status(400).json({
        success: false,
        message: "Update body is required",
        hint: "Ton body est vide ou pas en JSON (Content-Type: application/json manquant).",
        receivedBody: req.body,
      });
    }

    const vaccination = await service.updateVaccination(req.params.id, body);

    return res.status(200).json({
      success: true,
      message: "Vaccination successfully updated",
      data: vaccination,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteVaccination = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await service.deleteVaccination(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Vaccination successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};
