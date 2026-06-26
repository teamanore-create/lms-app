'use server'

import prisma from '@/lib/db'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

// Get current user session
export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return session?.user || null
}

// Get all courses with optional filtering
export async function getCourses(filters?: {
  category?: string
  level?: string
  search?: string
}) {
  const where: any = {}

  if (filters?.category && filters.category !== 'all') {
    where.category = filters.category
  }

  if (filters?.level && filters.level !== 'all') {
    where.level = filters.level
  }

  if (filters?.search) {
    where.OR = [
      {
        title: {
          contains: filters.search,
          mode: 'insensitive',
        },
      },
      {
        description: {
          contains: filters.search,
          mode: 'insensitive',
        },
      },
    ]
  }

  return prisma.course.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })
}

// Get single course details
export async function getCourse(id: string) {
  return prisma.course.findUnique({
    where: { id },
    include: {
      enrollments: {
        where: {
          user: {
            id: (await getCurrentUser())?.id,
          },
        },
      },
    },
  })
}

// Enroll user in a course
export async function enrollCourse(courseId: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error('Unauthorized')

  const existing = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId,
      },
    },
  })

  if (existing) {
    return existing
  }

  const enrollment = await prisma.enrollment.create({
    data: {
      userId: user.id,
      courseId,
    },
  })

  revalidatePath('/dashboard')
  return enrollment
}

// Get user enrollments
export async function getUserEnrollments() {
  const user = await getCurrentUser()
  if (!user) throw new Error('Unauthorized')

  return prisma.enrollment.findMany({
    where: { userId: user.id },
    include: { course: true },
    orderBy: { createdAt: 'desc' },
  })
}

// Get testimonials
export async function getTestimonials() {
  return prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

// Update enrollment progress
export async function updateEnrollmentProgress(enrollmentId: string, progress: number) {
  const user = await getCurrentUser()
  if (!user) throw new Error('Unauthorized')

  const enrollment = await prisma.enrollment.findUnique({
    where: { id: enrollmentId },
  })

  if (enrollment?.userId !== user.id) throw new Error('Unauthorized')

  return prisma.enrollment.update({
    where: { id: enrollmentId },
    data: { progress: Math.min(100, Math.max(0, progress)) },
  })
}
