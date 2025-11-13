import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().min(1, 'Informe o email completo'),
  password: z.string().min(1, 'Informe a senha'),
})

export type LoginFormData = z.infer<typeof LoginSchema>

export function useLoginForm() {
  return useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
}