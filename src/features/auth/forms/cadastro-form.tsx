import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const cadastroSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().min(1, 'O e-mail é obrigatório'),
  password: z.string().min(1, 'A senha é obrigatória'),
  isAdmin: z.boolean()
})

export type CadastroFormData = z.infer<typeof cadastroSchema>;

export function useCadastroForm() {
  return useForm<CadastroFormData>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      isAdmin: false
    }
  })
}