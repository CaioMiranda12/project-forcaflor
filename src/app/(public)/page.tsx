
import React from 'react'
import { getFeaturedPosts } from '@/features/posts/actions/getPosts'
import AuthCards from '@/features/dashboard/components/AuthCards'
import FeaturedNews from '@/features/dashboard/components/FeaturedNews'
import { getUpcomingActivities } from '@/features/cronograma/actions/get-upcoming-activities'
import { UpcomingActivities } from '@/features/dashboard/components/UpcomingActivities'

export default async function Dashboard() {
  const featuredPosts = await getFeaturedPosts();
  const upcomingActivities = await getUpcomingActivities();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-linear-to-r from-[#E31969] to-[#61CE70] rounded-lg p-6 text-white">
        <h1 className="text-2xl sm:text-3xl text-white font-bold mb-2">
          Bem-vindo ao Portal Força Flor! 🌸
        </h1>
        <p className="text-lg opacity-90">
          Acompanhe todas as atividades e novidades da nossa comunidade
        </p>
      </div>

      <AuthCards />


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent News */}
        <FeaturedNews posts={featuredPosts} />

        {/* Upcoming Activities */}
        <UpcomingActivities upcomingActivities={upcomingActivities} />
      </div>
    </div>
  )
}
