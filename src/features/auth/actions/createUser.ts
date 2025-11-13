"use server";

import User from "@/app/models/User";
import { getCurrentUser } from "../lib/getCurrentUser";
import bcrypt from "bcryptjs";
import { connectDatabase } from "@/lib/db";
import { CadastroFormData } from "../forms/cadastro-form";

export async function createUser(formData: CadastroFormData) {
  await connectDatabase();

  const currentUser = await getCurrentUser();

  if (!currentUser || !currentUser.isAdmin) {
    return { success: false, message: "Acesso negado." };
  }

  const exists = await User.findOne({ email: formData.email });
  if (exists) {
    return { success: false, message: "Este e-mail já está registrado." };
  }

  const hashedPassword = await bcrypt.hash(formData.password, 10);

  await User.create({
    name: formData.name,
    email: formData.email,
    password: hashedPassword,
    isAdmin: formData.isAdmin ?? false,
  });

  return { success: true, message: "Usuário registrado com sucesso." };
}
