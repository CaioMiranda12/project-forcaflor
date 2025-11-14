import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const editUserSchema = z.object({
  name: z.string().min(1, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().min(1, 'É necessário informar o email'),
  isAdmin: z.boolean(),

});

export type EditUserFormData = z.infer<typeof editUserSchema>;

export function useEditUserForm(defaultValues?: Partial<EditUserFormData>) {
  return useForm<EditUserFormData>({
    resolver: zodResolver(editUserSchema),
    defaultValues,
  });
}
