import { getCurrentUser } from "@/features/auth/lib/getCurrentUser";
import PublicLayoutClient from "@/shared/components/layout/PublicLayoutClient";


export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  return (
    <PublicLayoutClient
      user={user}>
      {children}
    </PublicLayoutClient>
  )
}