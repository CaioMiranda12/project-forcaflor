import { ActivityType } from "@/features/cronograma/types/activityType"
import { Clock, MapPin } from "lucide-react";
import Link from "next/link";

interface UpcomingActivitiesProps {
  upcomingActivities: ActivityType[];
}

export function UpcomingActivities({ upcomingActivities }: UpcomingActivitiesProps) {

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          Próximas Atividades
        </h2>
      </div>
      <div className="divide-y divide-gray-200">
        {upcomingActivities.map((activity) => (
          <div key={activity.id} className="p-6">
            <div className="flex items-start space-x-3">
              <div className="shrink-0">
                <div className="w-3 h-3 bg-[#61CE70] rounded-full mt-2"></div>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium text-gray-900 mb-2">
                  {activity.title}
                </h3>
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" aria-hidden="true" />
                    {activity.startHour} - {activity.endHour}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" aria-hidden="true" />
                    {activity.location}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-6 border-t border-gray-200">
        <Link href={'/cronograma'}>
          <button className="w-full px-6 py-3 bg-[#61CE70] text-white rounded-lg hover:bg-[#4fb85f] active:bg-[#3da34d] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#61CE70] focus:ring-offset-2">
            Ver cronograma completo
          </button>
        </Link>
      </div>
    </div>
  )
}