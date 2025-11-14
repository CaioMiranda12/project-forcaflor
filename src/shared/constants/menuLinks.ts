import { Home, User, Users, Calendar, Newspaper, FileText } from "lucide-react";

export const publicLinks = [
  { path: "/", label: "Início", icon: Home },
  { path: "/noticias", label: "Notícias", icon: Newspaper },
  { path: '/cronograma', label: 'Cronograma', icon: Calendar },
];

export const privateLinks = [
  { path: '/', label: 'Início', icon: Home },
  { path: '/noticias', label: 'Notícias', icon: Newspaper },
  { path: '/cronograma', label: 'Cronograma', icon: Calendar },
  { path: '/usuarios', label: 'Usuários', icon: Users },
  { path: '/posts', label: 'Posts', icon: FileText },
];
