import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const postSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  excerpt: z.string().min(1, "A descrição é obrigatória"),
  content: z.string().min(1, "O conteúdo é obrigatório"),
  categoryId: z.string().nonempty("A categoria é obrigatória"),
  status: z.enum(["published", "draft", "scheduled"]),
  image: z.string().optional(),
  author: z.string().optional(),
  featured: z.boolean().optional(),
  // publishDate: z.string().nullable().optional(),
})

export type PostFormData = z.infer<typeof postSchema>

export type PostWithId = PostFormData & { id?: string };

export function usePostForm(defaultValues?: Partial<PostFormData>) {
  return useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      // status: "draft",
      // featured: false,
      ...defaultValues,
    }
  })
}