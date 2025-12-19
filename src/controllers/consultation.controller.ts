import { NextFunction, Request, Response } from "express";
import { ConsultationService } from "../services/consultation.service";

const service = new ConsultationService();

export const getAllConsultations = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const consultations = await service.getAllConsultations();
    return res.status(200).json({
      success: true,
      message: "Consultations fetched successfully",
      data: consultations,
    });
  } catch (error) {
    next(error);
  }
};

export const getConsultationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const consultation = await service.getConsultationById(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Consultation fetched successfully",
      data: consultation,
    });
  } catch (error) {
    next(error);
  }
};

export const createConsultation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body ?? {};
    const { id_animal, id_veterinarian, date_visite, reason, diagnosis } = body;

    if (!id_animal || !id_veterinarian || !date_visite) {
      return res.status(400).json({
        success: false,
        message: "id_animal, id_veterinarian, and date_visite are required",
        hint: "Ton body est vide ou pas en JSON (Content-Type manquant).",
        receivedBody: req.body,
      });
    }

    const consultation = await service.createConsultation({
      id_animal,
      id_veterinarian,
      date_visite,
      reason,
      diagnosis,
    });

    return res.status(201).json({
      success: true,
      message: "Consultation successfully created",
      data: consultation,
    });
  } catch (error) {
    next(error);
  }
};

export const updateConsultation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const consultation = await service.updateConsultation(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Consultation successfully updated",
      data: consultation,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteConsultation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await service.deleteConsultation(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Consultation successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};
