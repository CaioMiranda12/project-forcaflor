export type Post = {
  id: string; // 🔹 ID único (pode vir do Mongo como _id)
  title: string; // 🔹 Título do post
  excerpt: string; // 🔹 Resumo ou descrição curta
  content: string; // 🔹 Corpo do post (markdown, HTML, etc.)

  // 🔹 Categoria
  categoryId: string; // guarda o ID
  categoryLabel?: string; // nome legível da categoria (opcional)
  categoryColor?: string; // cor de exibição (opcional)

  // 🔹 Status e publicação
  status: 'published' | 'draft' | 'scheduled';
  statusLabel: string; // ex: "Publicado", "Rascunho", "Agendado"
  publishDate: string | null; // ISO string ou null se for rascunho

  // 🔹 Metadados
  author: string; // quem criou
  lastModified: string; // última data de modificação
  lastModifiedBy: string; // quem modificou por último

  // 🔹 Extras
  image?: string; // capa do post
  featured: boolean; // destaque na home
};


// export type PostFormData = {
//   title: string;
//   excerpt: string;
//   content: string;
//   categoryId: string;
//   status: 'published' | 'draft' | 'scheduled';
//   image?: string;
//   featured?: boolean;
//   author?: string;
//   publishDate?: string | null;
// };

