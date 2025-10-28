
import React from 'react'
import { Calendar, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface NewsCardProps {
  title: string
  summary: string
  date: string
  image: string
  category: string
}

export default function NewsCard({ title, summary, date, image, category }: NewsCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-primary-500"
      role="article"
    >
      <div className="aspect-video overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={800}
          height={600}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
            {category}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-1" aria-hidden="true" />
            <time dateTime={date}>{date}</time>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {title}
        </h3>

        <p className="text-gray-600 text-base leading-relaxed mb-4 line-clamp-3">
          {summary}
        </p>

        <button
          className="inline-flex items-center text-primary-600 hover:text-primary-700 active:text-primary-800 font-medium text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg px-2 py-1 cursor-pointer group"
          aria-label={`Ler mais sobre: ${title}`}
        >
          Ler mais
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
        </button>
      </div>
    </motion.article>
  )
}
