import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const activitySchema = z.object({
  title: z.string().min(1, "Titulo é obrigatório"),
  description: z.string().optional(),
  startHour: z.string().min(1, "Hora de início é obrigatória"),
  endHour: z.string().min(1, "Hora de término é obrigatória"),
  location: z.string().optional(),
  instructor: z.string().optional(),
  dayOfWeek: z.string().min(1, "Dia da semana é obrigatório")
})

export type ActivityFormData = z.infer<typeof activitySchema>

export function useActivityForm() {
  return useForm<ActivityFormData>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      title: "",
      description: "",
      startHour: "",
      endHour: "",
      location: "",
      instructor: "",
      dayOfWeek: ""
    }
  })
}