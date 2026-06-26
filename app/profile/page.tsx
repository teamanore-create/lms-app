'use client'

import { redirect } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { ArrowLeft, LogOut, Mail, User, Calendar } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      const session = await authClient.getSession()
      if (!session?.user) {
        router.push('/sign-in')
        return
      }
      setUser(session.user)
      setLoading(false)
    }
    getSession()
  }, [router])

  const handleLogout = async () => {
    await authClient.signOut()
    router.push('/')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <>
      <Navbar user={user} />

      <main className="min-h-screen pt-20 pb-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>

            <h1 className="text-4xl font-bold text-foreground mb-2">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your account information</p>
          </div>

          {/* Profile Card */}
          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <span className="text-4xl font-bold text-primary-foreground">
                  {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">{user.name || 'User'}</h2>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>

            {/* Profile Info */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </label>
                <p className="text-muted-foreground">{user.email}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name
                </label>
                <p className="text-muted-foreground">{user.name || 'Not provided'}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Member Since
                </label>
                <p className="text-muted-foreground">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : 'Recently'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Status
                </label>
                <p className="text-muted-foreground">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Active
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-border">
              <button
                onClick={handleLogout}
                className="px-6 py-2 border border-destructive text-destructive rounded-lg font-semibold hover:bg-destructive/5 transition inline-flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Security</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Password</h4>
                  <p className="text-sm text-muted-foreground">
                    Last changed 3 months ago
                  </p>
                </div>
                <button className="px-4 py-2 border border-border rounded-lg font-semibold hover:bg-secondary transition">
                  Change
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground">
                    Not enabled
                  </p>
                </div>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition">
                  Enable
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
