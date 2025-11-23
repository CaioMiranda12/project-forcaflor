"use server";

import Participant from "@/app/models/Participant";
import { connectDatabase } from "@/lib/db";

export async function registerParticipant(formData: FormData) {
  await connectDatabase();

  const data = Object.fromEntries(formData.entries());

  try {
    await Participant.create({
      ...data,
      isActive: true
    });
    return { success: true, message: "Usuário cadastrado com sucesso!" };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Erro ao cadastrar o usuário." };
  }
}
