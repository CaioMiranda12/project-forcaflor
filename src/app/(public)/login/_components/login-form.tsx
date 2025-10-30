import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LoginSchema = z.object({
  nomeCompleto: z.string().min(3, 'Informe o nome completo'),
  dataNascimento: z.string().min(8, 'Informe a data de nascimento'),
})

export type LoginFormData = z.infer<typeof LoginSchema>

export function useLoginForm() {
  return useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      nomeCompleto: '',
      dataNascimento: ''
    }
  })
}