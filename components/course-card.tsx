'use client'

import Link from 'next/link'
import { Star, Clock, Users } from 'lucide-react'
import { motion } from 'framer-motion'

interface CourseCardProps {
  id: string
  title: string
  description: string
  category: string
  level: string
  duration: string
  price: number
  instructor: string
  rating: number
  ratingCount: number
  index?: number
}

export default function CourseCard({
  id,
  title,
  description,
  category,
  level,
  duration,
  price,
  instructor,
  rating,
  ratingCount,
  index = 0,
}: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Link href={`/courses/${id}`}>
        <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all h-full flex flex-col">
          {/* Header with category and level badges */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 flex justify-between items-start">
            <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full">
              {category}
            </span>
            <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-semibold rounded-full">
              {level}
            </span>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">{title}</h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>

            {/* Instructor */}
            <p className="text-sm text-foreground font-medium mb-4">By {instructor}</p>

            {/* Meta information */}
            <div className="flex flex-col space-y-2 text-sm text-muted-foreground mb-4 flex-grow">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-primary" />
                <span>{ratingCount} students</span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-foreground">{rating?.toFixed(1)}</span>
            </div>

            {/* Price and Button */}
            <div className="flex justify-between items-center pt-4 border-t border-border">
              <span className="text-2xl font-bold text-primary">${price}</span>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
                Explore
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
