import { prisma } from "../repositories/prisma";
import bcrypt from "bcryptjs";

export async function getUsers() {
  return prisma.user.findMany({
    select: {
      id_user: true,
      email: true,
      user_role: true,
    },
    orderBy: {
      email: "asc",
    },
  });
}

export async function createUser(data: {
  email?: string;
  password?: string;
  user_role?: "owner" | "veterinarian" | "admin";
}) {
  //Validation
  if (!data.email || !data.password) {
    throw {
      status: 400,
      message: "Email and password are required",
    };
  }

  const email = data.email.trim().toLowerCase();
  const password = data.password.trim();
  const user_role = data.user_role ?? "owner";

  if (!email || !password) {
    throw {
      status: 400,
      message: "Email and password cannot be empty",
    };
  }

  // Vérif unicité email
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw {
      status: 409,
      message: "Email already in use",
    };
  }

  // HASH MPD
  const hashedPassword = await bcrypt.hash(password, 10);

  // Creation user
  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      user_role,
    },
    select: {
      id_user: true,
      email: true,
      user_role: true,
    },
  });
}


export async function getUserById(id: string) {
  if (!id) {
    throw {
      status: 400,
      message: "User id is required",
    };
  }

  const user = await prisma.user.findUnique({
    where: { id_user: id },
    select: {
      id_user: true,
      email: true,
      user_role: true,
    },
  });

  if (!user) {
    throw {
      status: 404,
      message: "User not found",
    };
  }

  return user;
}

export async function deleteUser(id: string) {
  if (!id) {
    throw {
      status: 400,
      message: "User id is required",
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: { id_user: id },
  });

  if (!existingUser) {
    throw {
      status: 404,
      message: "User not found",
    };
  }

  await prisma.user.delete({
    where: { id_user: id },
  });
}
export async function updateUser(
  id: string,
  data: {
    email?: string;
    password?: string;
    user_role?: "owner" | "veterinarian" | "admin";
  }
) {
  if (!id) {
    throw {
      status: 400,
      message: "User id is required",
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: { id_user: id },
  });

  if (!existingUser) {
    throw {
      status: 404,
      message: "User not found",
    };
  }

  const updateData: any = {};

  if (data.email !== undefined) {
    const email = data.email.trim().toLowerCase();

    if (!email) {
      throw {
        status: 400,
        message: "Email cannot be empty",
      };
    }

    if (email !== existingUser.email) {
      const emailTaken = await prisma.user.findUnique({
        where: { email },
      });

      if (emailTaken) {
        throw {
          status: 409,
          message: "Email already in use",
        };
      }
    }

    updateData.email = email;
  }

  if (data.password !== undefined) {
    const password = data.password.trim();

    if (!password) {
      throw {
        status: 400,
        message: "Password cannot be empty",
      };
    }

    updateData.password = await bcrypt.hash(password, 10);
  }

  if (data.user_role !== undefined) {
    updateData.user_role = data.user_role;
  }

  if (Object.keys(updateData).length === 0) {
    throw {
      status: 400,
      message: "No data provided to update",
    };
  }

  return prisma.user.update({
    where: { id_user: id },
    data: updateData,
    select: {
      id_user: true,
      email: true,
      user_role: true,
    },
  });
}