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
      const err: any = new Error("Veterinarian not found");
      err.status = 404;
      throw err;
    }

    return veterinarian;
  }

  async createVeterinarian(data: {
    last_name: string;
    first_name: string;
    phone: string;
    email: string;
    adress: string;
  }) {
    return prisma.veterinarian.create({ data });
  }

  async updateVeterinarian(id: string, data: any) {
    await this.getByIdVeterinarian(id);
    return prisma.veterinarian.update({
      where: { id_veterinarian: id },
      data,
    });
  }

  async deleteVeterinarian(id: string) {
    await this.getByIdVeterinarian(id);
    return prisma.veterinarian.delete({
      where: { id_veterinarian: id },
    });
  }
}
