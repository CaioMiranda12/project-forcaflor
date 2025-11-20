"use server";

import { connectDatabase } from "@/lib/db";
import User from "@/app/models/User";

export async function registerStudent(formData: FormData) {
  await connectDatabase();

  const data = Object.fromEntries(formData.entries());

  const nascimento = new Date(data.dataNascimento as string);
  const hoje = new Date();
  const idade =
    hoje.getFullYear() -
    nascimento.getFullYear() -
    (hoje < new Date(hoje.getFullYear(), nascimento.getMonth(), nascimento.getDate()) ? 1 : 0);

  try {
    await User.create({
      ...data,
      idade,
    });
    return { success: true, message: "Usuário cadastrado com sucesso!" };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Erro ao cadastrar o usuário." };
  }
}
