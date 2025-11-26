import { getCurrentUser } from "@/features/auth/lib/getCurrentUser";
import { getParticipants } from "@/features/participants/actions/getParticipants";
import ParticipantsClient from "@/features/participants/components/participantsClient";
import { Participants } from "@/features/participants/types/participants";
import { redirect } from "next/navigation";

export default async function ParticipantsPage() {
  const user = await getCurrentUser();

  if (!user?.isAdmin) {
    redirect("/");
  }

  const participants: Participants[] = await getParticipants();

  return (
    <ParticipantsClient participants={participants} />
  )
}
