import { Request, Response, NextFunction } from "express";
import { TreatmentService } from "../services/treatment.service";

const service = new TreatmentService();

export const getAllTreatment = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const treatments = await service.getAll();
    return res.status(200).json({
      success: true,
      message: "Treatments fetched successfully",
      data: treatments,
    });
  } catch (error) {
    next(error);
  }
};

export const getTreatmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id ?? req.params.id_treatment;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Missing treatment id in route params",
        receivedParams: req.params,
      });
    }

    const treatment = await service.getByIdTreatment(id);

    return res.status(200).json({
      success: true,
      message: "Treatment fetched successfully",
      data: treatment,
    });
  } catch (error) {
    next(error);
  }
};

export const createTreatment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body ?? {};
    const { id_animal, name_treatment, dosage, start_date, end_date, comment } =
      body;

    if (!name_treatment) {
      return res.status(400).json({
        success: false,
        message: "name_treatment is required",
        hint: "Ton body est vide ou pas en JSON (Content-Type manquant).",
        receivedBody: req.body,
      });
    }

    if (!id_animal) {
      return res.status(400).json({
        success: false,
        message: "id_animal is required",
        receivedBody: req.body,
      });
    }

    const treatment = await service.createTreatment({
      name_treatment,
      dosage,
      start_date,
      end_date,
      comment,
      animal: {
        connect: {
          id_animal: id_animal,
        },
      },
    });

    return res.status(201).json({
      success: true,
      message: "Treatment successfully created",
      data: treatment,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTreatment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const treatment = await service.updateTreatment(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Treatment successfully updated",
      data: treatment,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTreatment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await service.deleteTreatment(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Treatment successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};
