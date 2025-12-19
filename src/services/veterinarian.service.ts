import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class VeterinarianService {
  async getAll() {
    return prisma.veterinarian.findMany();
  }

  async getByIdVeterinarian(id: string) {
    const veterinarian = await prisma.veterinarian.findUnique({
      where: { id_veterinarian: id },
    });

    if (!veterinarian) {
      throw {
        status: 404,
        message: "Veterinarian not found",
      };
    }

    return veterinarian;
  }

  async createVeterinarian(data: {
    id_user: string;
    last_name: string;
    first_name: string;
    phone: string;
    email: string;
    adress: string;
  }) {
    if (
      !data.id_user ||
      !data.last_name ||
      !data.first_name ||
      !data.phone ||
      !data.email ||
      !data.adress
    ) {
      throw {
        status: 400,
        message: "All fields are required",
        details: {
          required: [
            "id_user",
            "last_name",
            "first_name",
            "phone",
            "email",
            "adress",
          ],
        },
      };
    }

    try {
      return await prisma.veterinarian.create({
        data: {
          id_user: data.id_user,
          last_name: data.last_name,
          first_name: data.first_name,
          phone: data.phone,
          email: data.email,
          adress: data.adress,
        } as any,
      });
    } catch (error: any) {
      if (error?.code === "P2002") {
        throw {
          status: 409,
          message: "Ce compte utilisateur est déjà associé à un vétérinaire",
          details: {
            field: "id_user",
            value: data.id_user,
          },
        };
      }

      throw error;
    }
  }

  async updateVeterinarian(id: string, data: any) {
    if (!id) {
      throw {
        status: 400,
        message: "Veterinarian id is required",
      };
    }

    if (!data || Object.keys(data).length === 0) {
      throw {
        status: 400,
        message: "No data provided to update",
      };
    }

    const existingVeterinarian = await prisma.veterinarian.findUnique({
      where: { id_veterinarian: id },
    });

    if (!existingVeterinarian) {
      throw {
        status: 404,
        message: "Veterinarian not found",
      };
    }

    return prisma.veterinarian.update({
      where: { id_veterinarian: id },
      data,
    });
  }

  async deleteVeterinarian(id: string) {
    if (!id) {
      throw {
        status: 400,
        message: "Veterinarian id is required",
      };
    }

    const existingVeterinarian = await prisma.veterinarian.findUnique({
      where: { id_veterinarian: id },
    });

    if (!existingVeterinarian) {
      throw {
        status: 404,
        message: "Veterinarian not found",
      };
    }

    try {
      return await prisma.veterinarian.delete({
        where: { id_veterinarian: id },
      });
    } catch (error: any) {
      if (error?.code === "P2003") {
        throw {
          status: 409,
          message:
            "Impossible de supprimer ce vétérinaire : il est encore lié à une ou plusieurs consultations.",
        };
      }

      throw error;
    }
  }
}
