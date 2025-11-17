"use server";

import { connectDatabase } from "@/lib/db";
import { Activity } from "../models/Activity"; 

export async function getUpcomingActivities() {
  try {
    await connectDatabase();

    const activities = await Activity.find().lean();

    // Data/hora no Brasil
    const now = new Date();
    const nowBrazil = new Date(
      now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
    );

    const weekdayMap: Record<string, number> = {
      "Domingo": 0,
      "Segunda": 1,
      "Terça": 2,
      "Quarta": 3,
      "Quinta": 4,
      "Sexta": 5,
      "Sábado": 6,
    };

    // Converte cada atividade para uma data completa real
    const sorted = activities
      .map((a: any) => {
        const nextDate = new Date(nowBrazil);

        // Ajusta para o próximo dia da semana correspondente
        const targetDay = weekdayMap[a.dayOfWeek];
        const diff = (targetDay - nextDate.getDay() + 7) % 7;

        nextDate.setDate(nextDate.getDate() + diff);

        // Coloca o horário
        const [hour, minute] = a.startHour.split(":");
        nextDate.setHours(Number(hour), Number(minute), 0, 0);

        return {
          ...a,
          nextOccurrence: nextDate,
        };
      })
      .filter(a => a.nextOccurrence >= nowBrazil)   // só atividades futuras
      .sort((a, b) => a.nextOccurrence.getTime() - b.nextOccurrence.getTime());

    return sorted.slice(0, 3); // pega só as 3 mais próximas

  } catch (err) {
    console.error("Erro ao buscar próximas atividades:", err);
    return [];
  }
}
