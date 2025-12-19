import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AnimalService {
  async getAllAnimal() {
    return prisma.animal.findMany();
  }

  async getByIdAnimal(id: string) {
    const animal = await prisma.animal.findUnique({
      where: { id_animal: id },
    });

    if (!animal) {
      throw {
        status: 404,
        message: "Animal not found",
      };
    }

    return animal;
  }

  async createAnimal(data: {
    id_owner: string;
    name: string;
    breed: string;
    chip_number: string;
    birth_date: string;
    weight: string;
    size: string;
    photo: string;
  }) {
    if (
      !data.id_owner ||
      !data.name ||
      !data.breed ||
      !data.chip_number ||
      !data.birth_date ||
      !data.weight ||
      !data.size ||
      !data.photo
    ) {
      throw {
        status: 400,
        message: "All fields are required",
        details: {
          required: [
            "id_owner",
            "name",
            "breed",
            "chip_number",
            "birth_date",
            "weight",
            "size",
            "photo",
          ],
        },
      };
    }

    try {
      return await prisma.animal.create({
        data: {
          id_owner: data.id_owner,
          name: data.name,
          breed: data.breed,
          chip_number: data.chip_number,
          birth_date: data.birth_date,
          weight: data.weight,
          size: data.size,
          photo: data.photo,
        } as any,
      });
    } catch (error: any) {
      if (error?.code === "P2002") {
        throw {
          status: 409,
          message: "Ce compte utilisateur est déjà associé à un animal",
          details: {
            field: "id_owner",
            value: data.id_owner,
          },
        };
      }

      throw error;
    }
  }

  async updateAnimal(id: string, data: any) {
    if (!id) {
      throw {
        status: 400,
        message: "Animal id is required",
      };
    }

    if (!data || Object.keys(data).length === 0) {
      throw {
        status: 400,
        message: "No data provided to update",
      };
    }

    const existingAnimal = await prisma.animal.findUnique({
      where: { id_animal: id },
    });

    if (!existingAnimal) {
      throw {
        status: 404,
        message: "Animal not found",
      };
    }

    return prisma.animal.update({
      where: { id_animal: id },
      data,
    });
  }

  async deleteAnimal(id: string) {
    if (!id) {
      throw {
        status: 400,
        message: "Animal id is required",
      };
    }

    const existingAnimal = await prisma.animal.findUnique({
      where: { id_animal: id },
    });

    if (!existingAnimal) {
      throw {
        status: 404,
        message: "Animal not found",
      };
    }

    try {
      return await prisma.animal.delete({
        where: { id_animal: id },
      });
    } catch (error: any) {
      if (error?.code === "P2003") {
        throw {
          status: 409,
          message:
            "Impossible de supprimer cet animal : il est encore lié à une ou plusieurs consultations.",
        };
      }

      throw error;
    }
  }
}
