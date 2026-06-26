'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { enrollCourse } from '@/lib/actions'
import Link from 'next/link'

interface EnrollButtonProps {
  courseId: string
  isEnrolled: boolean
}

export default function EnrollButton({ courseId, isEnrolled }: EnrollButtonProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleEnroll = async () => {
    setLoading(true)
    try {
      await enrollCourse(courseId)
      router.push('/dashboard')
      router.refresh()
    } catch (error: any) {
      if (error.message === 'Unauthorized') {
        // Redirect to sign in if not authenticated
        router.push('/sign-in')
      } else {
        alert('Error enrolling in course')
      }
    } finally {
      setLoading(false)
    }
  }

  if (isEnrolled) {
    return (
      <div>
        <div className="w-full py-3 bg-accent text-accent-foreground rounded-lg font-semibold text-center mb-3">
          ✓ Already Enrolled
        </div>
        <Link
          href="/dashboard"
          className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition text-center block"
        >
          Go to Dashboard
        </Link>
      </div>
    )
  }

  return (
    <button
      onClick={handleEnroll}
      disabled={loading}
      className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 transition"
    >
      {loading ? 'Enrolling...' : 'Enroll Now'}
    </button>
  )
}
