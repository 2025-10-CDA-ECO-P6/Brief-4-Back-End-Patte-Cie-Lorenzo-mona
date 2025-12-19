import { prisma } from "../repositories/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export async function login(data: {
  email?: string;
  password?: string;
}) {
  if (!data.email || !data.password) {
    throw { status: 400, message: "Email and password are required" };
  }

  const email = data.email.trim().toLowerCase();
  const password = data.password.trim();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw { status: 401, message: "Invalid credentials" };
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw { status: 401, message: "Invalid credentials" };
  }
  // Generate JWT token with role included
  const token = jwt.sign(
    {
      id_user: user.id_user,
      role: user.user_role,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    token,
    user: {
      id_user: user.id_user,
      email: user.email,
      user_role: user.user_role,
    },
  };
}
