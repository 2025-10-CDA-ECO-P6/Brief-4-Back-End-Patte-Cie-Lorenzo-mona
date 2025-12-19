import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class VaccinationService {
  async getAll() {
    return prisma.vaccination.findMany();
  }

  async getByIdVaccination(id: string) {
    const vaccination = await prisma.vaccination.findUnique({
      where: { id_vaccination: id },
    });

    if (!vaccination) {
      throw {
        status: 404,
        message: "Vaccination not found",
      };
    }

    return vaccination;
  }

  async createVaccination(data: {
    id_animal: string;
    vaccine_name: string;
    vaccine_date: Date | string;
    reminder_date?: Date | string;
    comment?: string;
  }) {
    if (!data.id_animal || !data.vaccine_name || !data.vaccine_date) {
      throw {
        status: 400,
        message: "Required fields missing",
        details: { required: ["id_animal", "vaccine_name", "vaccine_date"] },
      };
    }

    const animal = await prisma.animal.findUnique({
      where: { id_animal: data.id_animal },
      select: { id_animal: true },
    });

    if (!animal) {
      throw {
        status: 404,
        message: "Animal not found",
        details: { id_animal: data.id_animal },
      };
    }

    const vaccine_date = new Date(data.vaccine_date);
    const reminder_date = data.reminder_date
      ? new Date(data.reminder_date)
      : undefined;

    if (Number.isNaN(vaccine_date.getTime())) {
      throw { status: 400, message: "Invalid vaccine_date" };
    }
    if (reminder_date && Number.isNaN(reminder_date.getTime())) {
      throw { status: 400, message: "Invalid reminder_date" };
    }

    return prisma.vaccination.create({
      data: {
        id_animal: data.id_animal,
        vaccine_name: data.vaccine_name,
        vaccine_date,
        reminder_date,
        comment: data.comment,
      } as any,
    });
  }

  async updateVaccination(id: string, data: any) {
    if (!id) {
      throw {
        status: 400,
        message: "Vaccination id is required",
      };
    }

    const existingVaccination = await prisma.vaccination.findUnique({
      where: { id_vaccination: id },
    });

    if (!existingVaccination) {
      throw {
        status: 404,
        message: "Vaccination not found",
      };
    }

    return prisma.vaccination.update({
      where: { id_vaccination: id },
      data,
    });
  }

  async deleteVaccination(id: string) {
    if (!id) {
      throw {
        status: 400,
        message: "Vaccination id is required",
      };
    }

    const existingVaccination = await prisma.vaccination.findUnique({
      where: { id_vaccination: id },
    });

    if (!existingVaccination) {
      throw {
        status: 404,
        message: "Vaccination not found",
      };
    }

    return prisma.vaccination.delete({
      where: { id_vaccination: id },
    });
  }
}
