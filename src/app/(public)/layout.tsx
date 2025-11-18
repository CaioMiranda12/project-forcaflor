import { getCurrentUser } from "@/features/auth/lib/getCurrentUser";
import BaseLayoutClient from "@/shared/components/layout/BaseLayoutClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Força Flor – Portal Institucional",
    template: "%s | Força Flor",
  },
  description:
    "A Força Flor é uma OSC dedicada ao apoio social, projetos comunitários e voluntariado.",
  keywords: [
    "Força Flor",
    "OSC",
    "Organização Social",
    "Voluntariado",
    "Projetos sociais",
  ],
  openGraph: {
    title: "Força Flor – Portal Institucional",
    description:
      "Conheça nossos projetos sociais, notícias e faça parte como voluntário.",
    type: "website",
  },
};


export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  return (
    <BaseLayoutClient
      user={user}>
      {children}
    </BaseLayoutClient>
  )
}