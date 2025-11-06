import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const categorySchema = z.object({
  label: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(30, "Nome deve ter no máximo 30 caracteres"),

  color: z.string().nonempty("Selecione uma cor")
});

export type CategoryFormData = z.infer<typeof categorySchema>;

export function CategoryForm() {
  return useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      label: "",
      color: ""
    },
  })
}