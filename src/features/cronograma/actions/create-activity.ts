"use server";

import { connectDatabase } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Activity } from "../models/Activity";
import { ActivityFormData } from "../forms/activity-form";

export async function createActivity(data: ActivityFormData) {
  try {
    await connectDatabase();

    // Verificar se já existe uma atividade igual no mesmo dia e horário
    const conflict = await Activity.findOne({
      title: data.title,
      dayOfWeek: data.dayOfWeek,
      startHour: data.startHour,
      endHour: data.endHour
    });

    if (conflict) {
      return {
        success: false,
        message: "Já existe uma atividade com esse nome e horário no mesmo dia."
      };
    }

    const activity = await Activity.create({
      title: data.title,
      dayOfWeek: data.dayOfWeek,
      startHour: data.startHour,
      endHour: data.endHour,
      description: data.description,
      location: data.location,
      instructor: data.instructor
    });

    revalidatePath("/cronograma");

    return {
      success: true,
      message: 'Atividade criada com sucesso!',
      data: JSON.parse(JSON.stringify(activity))
    };

  } catch (err: any) {

    if (err.code === 11000) {
      return {
        success: false,
        message: "Atividade duplicada!",
      };
    }

    console.log(err)

    return {
      success: false,
      message: "Erro inesperado ao criar atividade.",
    };
  }
}
