"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { connectDatabase } from "@/lib/db";
import User from "@/app/models/User";

const SECRET_KEY = process.env.JWT_SECRET!

export async function loginUser(formData: FormData) {
  await connectDatabase();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, message: "Credenciais inválidas." };
  }

  const user = await User.findOne({ email });

  if (!user) {
    return { success: false, message: "Usuário não encontrado." };
  }

  const isCorrect = await bcrypt.compare(password, user.password);

  if (!isCorrect) {
    return { success: false, message: "Senha incorreta." };
  }

  const tokenPayload = {
    userId: user._id,
    nome: user.name,
    isAdmin: user.isAdmin,
  };

  console.log(tokenPayload)

  const token = jwt.sign(tokenPayload, SECRET_KEY, {
    expiresIn: "1d",
  });

  const cookieStore = await cookies()

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return { success: true, message: 'Login realizado com sucesso' }
}
