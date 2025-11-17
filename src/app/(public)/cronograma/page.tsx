
import { getActivities } from "@/features/cronograma/actions/get-activities";
import CronogramaClient from "@/features/cronograma/components/CronogramaClient";
import { ActivityType } from "@/features/cronograma/types/activityType";

export default async function CronogramaPage() {
  const activites: ActivityType[] = await getActivities()

  return (
    <>
      <CronogramaClient activitiesList={activites} />
    </>
  )
}