
import { getStudents } from '@/features/auth/actions/getStudents'
import StudentsClient from '@/features/students/components/studentsClient'
import { Participants } from '@/features/students/types/participants';

export default async function StudentsPage() {
  const students: Participants[] = await getStudents();

  return (
    <StudentsClient students={students} />
  )
}
