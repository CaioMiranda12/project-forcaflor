export type Post = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string; // categoryId seria até mais explícito
  categoryLabel?: string;
  categoryColor?: string;
  status: 'published' | 'draft' | 'scheduled';
  statusLabel: string;
  author: string;
  publishDate: string | null;
  lastModified: string;
  lastModifiedBy: string;
  image?: string;
  featured: boolean;
}

export type PostFormData = Pick<
  Post,
  | 'title'
  | 'excerpt'
  | 'content'
  | 'category'
  | 'status'
  | 'image'
  | 'featured'
  & {
    author?: string;
  }
>