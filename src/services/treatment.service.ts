import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class TreatmentService {
  async getAll() {
    return prisma.treatment.findMany();
  }

  async getByIdTreatment(id: string) {
    const treatment = await prisma.treatment.findUnique({
      where: { id_treatment: id },
    });

    if (!treatment) {
      throw {
        status: 404,
        message: "Treatment not found",
      };
    }

    return treatment;
  }

  async createTreatment(data: {
    id_animal: string;
    dosage: string;
    name_treatment: string;
    start_date: Date;
    end_date?: Date;
    comment?: string;
  }) {
    if (!data) {
      throw {
        status: 400,
        message: "Treatment data is required",
      };
    }

    return prisma.treatment.create({
      data: data as any,
    });
  }

  async updateTreatment(id: string, data: any) {
    if (!id) {
      throw {
        status: 400,
        message: "Treatment id is required",
      };
    }

    if (!data || Object.keys(data).length === 0) {
      throw {
        status: 400,
        message: "No data provided to update",
      };
    }

    const existingTreatment = await prisma.treatment.findUnique({
      where: { id_treatment: id },
    });

    if (!existingTreatment) {
      throw {
        status: 404,
        message: "Treatment not found",
      };
    }

    return prisma.treatment.update({
      where: { id_treatment: id },
      data,
    });
  }

  async deleteTreatment(id: string) {
    if (!id) {
      throw {
        status: 400,
        message: "Treatment id is required",
      };
    }

    const existingTreatment = await prisma.treatment.findUnique({
      where: { id_treatment: id },
    });

    if (!existingTreatment) {
      throw {
        status: 404,
        message: "Treatment not found",
      };
    }

    return prisma.treatment.delete({
      where: { id_treatment: id },
    });
  }
}
