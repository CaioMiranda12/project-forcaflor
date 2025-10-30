import { Home, User, Users, Calendar, Newspaper, FileText } from "lucide-react";

export const publicLinks = [
  { path: "/", label: "Início", icon: Home },
  { path: "/noticias", label: "Notícias", icon: Newspaper },
  { path: "/posts", label: "Posts", icon: FileText },
];

export const privateLinks = [
  { path: '/', label: 'Início', icon: Home },
  { path: '/perfil', label: 'Perfil', icon: User },
  { path: '/noticias', label: 'Notícias', icon: Newspaper },
  { path: '/cronograma', label: 'Cronograma', icon: Calendar },
  { path: '/usuarios', label: 'Usuários', icon: Users },
  { path: '/posts', label: 'Posts', icon: FileText },
];
