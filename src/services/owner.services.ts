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
  id_user?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  adress?: string;
}) {
  // 1. Validation basique
  if (
    !data.id_user ||
    !data.first_name ||
    !data.last_name ||
    !data.phone ||
    !data.email ||
    !data.adress
  ) {
    throw {
      status: 400,
      message: "All fields are required",
    };
  }

  const id_user = data.id_user.trim();
  const first_name = data.first_name.trim();
  const last_name = data.last_name.trim();
  const phone = data.phone.trim();
  const email = data.email.trim();
  const adress = data.adress.trim();

  // 2. Vérifier que le user existe
  const user = await prisma.user.findUnique({
    where: { id_user },
  });

  if (!user) {
    throw {
      status: 404,
      message: "User not found",
    };
  }

  // 3. Vérifier le rôle
  if (user.user_role !== "owner") {
    throw {
      status: 400,
      message: "User is not an owner",
    };
  }

  // 4. Vérifier qu’il n’a pas déjà un owner
  const existingOwner = await prisma.owner.findUnique({
    where: { id_user },
  });

  if (existingOwner) {
    throw {
      status: 409,
      message: "User already linked to an owner",
    };
  }

  // 5. Création
  return prisma.owner.create({
    data: {
      id_user,
      first_name,
      last_name,
      phone,
      email,
      adress,
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
