import { NextFunction, Request, Response } from "express";
import { AnimalService } from "../services/animal.service";
const service = new AnimalService();

export const getAllAnimal = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const animals = await service.getAllAnimal();
    return res.status(200).json({
      success: true,
      message: "Animals fetched successfully",
      data: animals,
    });
  } catch (error) {
    next(error);
  }
};

export const getAnimalById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const animal = await service.getByIdAnimal(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Animal fetched successfully",
      data: animal,
    });
  } catch (error) {
    next(error);
  }
};

export const createAnimal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body ?? {};
    const {
      id_owner,
      name,
      breed,
      chip_number,
      birth_date,
      weight,
      size,
      photo,
    } = body;

    if (!id_owner) {
      return res.status(400).json({
        success: false,
        message: "id_owner is required",
        hint: "Ton body est vide ou pas en JSON (Content-Type manquant).",
        receivedBody: req.body,
      });
    }

    const animal = await service.createAnimal({
      id_owner,
      name,
      breed,
      chip_number,
      birth_date,
      weight,
      size,
      photo,
    });

    return res.status(201).json({
      success: true,
      message: "Animal successfully created",
      data: animal,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAnimal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const animal = await service.updateAnimal(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Animal successfully updated",
      data: animal,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAnimal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await service.deleteAnimal(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Animal successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};
