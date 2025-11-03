export type Post = {
  id: number
  title: string
  excerpt: string
  content: string
  category: string
  categoryLabel: string
  status: 'published' | 'draft' | 'scheduled'
  statusLabel: string
  author: string
  publishDate: string | null
  lastModified: string
  lastModifiedBy: string
  views: number
  image?: string
  featured: boolean
}

export type PostFormData = Pick<
  Post,
  | 'title'
  | 'excerpt'
  | 'content'
  | 'category'
  | 'categoryLabel'
  | 'status'
  | 'image'
>