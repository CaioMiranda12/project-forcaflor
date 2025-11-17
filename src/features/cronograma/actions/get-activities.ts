"use server";

import { connectDatabase } from "@/lib/db";
import { Activity } from "../models/Activity";

export async function getActivities() {
  try {
    await connectDatabase();

    const activities = await Activity
      .find()
      .sort({ date: 1, startHour: 1 });

    return activities.map(activity => ({
      id: activity._id.toString(),
      title: activity.title,
      description: activity.description,
      dayOfWeek: activity.dayOfWeek,
      startHour: activity.startHour,
      endHour: activity.endHour,
      location: activity.location,
      instructor: activity.instructor,
    }))


  } catch (error) {
    console.error("Erro ao listar atividades:", error);

    return []
  }
}
