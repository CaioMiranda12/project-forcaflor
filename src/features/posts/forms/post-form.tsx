import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const postSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  excerpt: z.string().min(1, "A descrição é obrigatória"),
  content: z.string().min(1, "O conteúdo é obrigatório"),
  category: z.string().nonempty("A categoria é obrigatória"),
  status: z.enum(["published", "draft", "scheduled"]),
  image: z.string().optional(),
  author: z.string().optional(),
  featured: z.boolean().optional(),
  publishDate: z.string().nullable().optional(),
})

export type PostFormData = z.infer<typeof postSchema>

export function PostForm(post?: PostFormData | null) {
  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      category: "",
      status: "draft",
      image: "",
      author: "",
      featured: false,
      publishDate: null,
    }
  })

  useEffect(() => {
    if (post) {
      form.reset(post)
    }
  }, [post, form])

  return form
}