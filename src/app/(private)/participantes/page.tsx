import { getParticipants } from "@/features/participants/actions/getParticipants";
import ParticipantsClient from "@/features/participants/components/participantsClient";
import { Participants } from "@/features/participants/types/participants";

export default async function ParticipantsPage() {
  const participants: Participants[] = await getParticipants();

  return (
    <ParticipantsClient participants={participants} />
  )
}
