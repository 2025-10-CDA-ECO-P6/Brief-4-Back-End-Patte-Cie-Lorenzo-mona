import { prisma } from "../repositories/prisma";

export async function getOwners(page?: number, limit?: number) {
  return prisma.owner.findMany({
    skip: page && limit ? (page - 1) * limit : undefined,
    take: page && limit ? limit : undefined,
    orderBy: {
      last_name: "asc",
    },
  });
}

export async function getOwnerById(id: string) {
  const owner = await prisma.owner.findUnique({
    where: { id_owner: id },
  });

  if (!owner) {
    throw { status: 404, message: "Owner not found" };
  }

  return owner;
}

export async function createOwner(data: {
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  adress?: string;
}) {
  // Verification metier
  if (
    !data.first_name?.trim() ||
    !data.last_name?.trim() ||
    !data.phone?.trim() ||
    !data.email?.trim() ||
    !data.adress?.trim()
  ) {
    throw {
      // Gestion erreur metier
      status: 400,
      message: "All fields are required",
      details: {
        required: ["first_name", "last_name", "phone", "email", "adress"],
      },
    };
  }

  // Creation owner si tout est rempli
  return prisma.owner.create({
    data: {
      first_name: data.first_name.trim(),
      last_name: data.last_name.trim(),
      phone: data.phone.trim(),
      email: data.email.trim(),
      adress: data.adress.trim(),
    },
  });
}

export async function updateOwner(
  id: string,
  data: {
    last_name?: string;
    first_name?: string;
    phone?: string;
    email?: string;
    adress?: string;
  }
) {
  // Vérification ID
  if (!id) {
    throw {
      status: 400,
      message: "Owner id is required",
    };
  }

  // Vérifier qu'il y a quelque chose à modifier
  if (!data || Object.keys(data).length === 0) {
    throw {
      status: 400,
      message: "No data provided to update",
    };
  }

  // Vérifier que l'owner existe
  const existingOwner = await prisma.owner.findUnique({
    where: { id_owner: id },
  });

  if (!existingOwner) {
    throw {
      status: 404,
      message: "Owner not found",
    };
  }

  // Mise à jour
  return prisma.owner.update({
    where: { id_owner: id },
    data,
  });
}

export async function deleteOwner(id: string) {
  if (!id) {
    throw {
      status: 400,
      message: "Owner id is required",
    };
  }

  const existingOwner = await prisma.owner.findUnique({
    where: { id_owner: id },
  });

  if (!existingOwner) {
    throw {
      status: 404,
      message: "Owner not found",
    };
  }

  await prisma.owner.delete({
    where: { id_owner: id },
  });
}
