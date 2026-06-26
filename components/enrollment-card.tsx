'use client'

import { Course } from '@/types'
import Link from 'next/link'
import { BookOpen, BarChart3 } from 'lucide-react'

interface EnrollmentCardProps {
  enrollment: {
    id: string
    courseId: string
    progress: number
    status: string
    course: Course
  }
}

export default function EnrollmentCard({ enrollment }: EnrollmentCardProps) {
  const { course, progress, status } = enrollment

  return (
    <Link href={`/courses/${course.id}`}>
      <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer group">
        {/* Header with progress bar */}
        <div className="bg-gradient-to-r from-primary to-accent h-2"></div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition">
                {course.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{course.instructor}</p>
            </div>
            <BookOpen className="w-5 h-5 text-primary" />
          </div>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {course.description}
          </p>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">
                {status === 'completed' ? 'Completed' : 'Progress'}
              </span>
              <span className="text-xs font-bold text-primary">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <BarChart3 className="w-4 h-4" />
              {course.level}
            </div>
            <div className="text-xs font-semibold text-primary">{course.duration}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
