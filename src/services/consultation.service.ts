import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ConsultationService {
  async getAllConsultations() {
    return prisma.consultation.findMany();
  }

  async getConsultationById(id: string) {
    const consultation = await prisma.consultation.findUnique({
      where: { id_consultation: id },
    });

    if (!consultation) {
      throw {
        status: 404,
        message: "Consultation not found",
      };
    }

    return consultation;
  }

  async createConsultation(data: {
    id_animal: string;
    id_veterinarian: string;
    date_visite: Date | string;
    reason: string;
    diagnosis: string;
  }) {
    if (
      !data.id_animal ||
      !data.id_veterinarian ||
      !data.date_visite ||
      !data.reason ||
      !data.diagnosis
    ) {
      throw {
        status: 400,
        message: "All fields are required",
        details: {
          required: [
            "id_animal",
            "id_veterinarian",
            "date_visite",
            "reason",
            "diagnosis",
          ],
        },
      };
    }

    try {
      return await prisma.consultation.create({
        data: {
          id_animal: data.id_animal,
          id_veterinarian: data.id_veterinarian,
          date_visite: data.date_visite,
          reason: data.reason,
          diagnosis: data.diagnosis,
        } as any,
      });
    } catch (error: any) {
      throw error;
    }
  }

  async updateConsultation(id: string, data: any) {
    if (!id) {
      throw {
        status: 400,
        message: "Consultation id is required",
      };
    }

    if (!data || Object.keys(data).length === 0) {
      throw {
        status: 400,
        message: "No data provided to update",
      };
    }

    const existingConsultation = await prisma.consultation.findUnique({
      where: { id_consultation: id },
    });

    if (!existingConsultation) {
      throw {
        status: 404,
        message: "Consultation not found",
      };
    }

    return prisma.consultation.update({
      where: { id_consultation: id },
      data,
    });
  }

  async deleteConsultation(id: string) {
    if (!id) {
      throw {
        status: 400,
        message: "Consultation id is required",
      };
    }

    const existingConsultation = await prisma.consultation.findUnique({
      where: { id_consultation: id },
    });

    if (!existingConsultation) {
      throw {
        status: 404,
        message: "Consultation not found",
      };
    }

    try {
      return await prisma.consultation.delete({
        where: { id_consultation: id },
      });
    } catch (error: any) {
      if (error?.code === "P2003") {
        throw {
          status: 409,
          message:
            "Impossible de supprimer cette consultation : elle est encore liée à une ou plusieurs entités.",
        };
      }

      throw error;
    }
  }
}
