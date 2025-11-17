"use server";

import { connectDatabase } from "@/lib/db";
import { Activity } from "../models/Activity";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET!;

export interface UpdateActivityPayload {
  title: string;
  description: string;
  dayOfWeek: string;
  startHour: string;
  endHour: string;
  location: string;
  instructor: string;
}

export async function updateActivity(activityId: string, data: UpdateActivityPayload) {
  try {
    await connectDatabase();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { success: false, message: "Usuário não autenticado." };
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, SECRET_KEY);
    } catch {
      return { success: false, message: "Token inválido." };
    }

    // Apenas admin pode editar atividades
    if (!decoded.isAdmin) {
      return {
        success: false,
        message: "Acesso negado."
      };
    }

    if (
      !data.title ||
      !data.dayOfWeek ||
      !data.startHour ||
      !data.endHour
    ) {
      return {
        success: false,
        message: "Campos obrigatórios não informados."
      };
    }

    const activity = await Activity.findById(activityId);

    if (!activity) {
      return { success: false, message: "Atividade não encontrada." };
    }

    // Atualizar campos
    activity.title = data.title;
    activity.description = data.description;
    activity.dayOfWeek = data.dayOfWeek;
    activity.startHour = data.startHour;
    activity.endHour = data.endHour;
    activity.location = data.location ?? null;
    activity.instructor = data.instructor ?? null;

    await activity.save();

    return {
      success: true,
      message: "Atividade atualizada com sucesso.",
      activity: JSON.parse(JSON.stringify(activity)),
    };

  } catch (err) {
    console.error("Erro ao atualizar atividade:", err);
    return { success: false, message: "Erro ao atualizar atividade." };
  }
}
