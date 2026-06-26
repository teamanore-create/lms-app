'use client';

import { ProtectedRoute } from '@/components/protected-route';
import { SessionManager } from '@/components/session-manager';
import { useAuthStore } from '@/store/auth-store';
import { useLogout } from '@/hooks/use-auth-mutations';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, LogOut, Loader } from 'lucide-react';

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        router.push('/sign-in');
      },
    });
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-neutral-50">
        {/* Header */}
        <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Welcome, {user?.name}!</h1>
                <p className="text-blue-100">Manage your account and active sessions</p>
              </div>
              <button
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition disabled:opacity-50"
              >
                {logoutMutation.isPending ? (
                  <Loader size={20} className="animate-spin" />
                ) : (
                  <LogOut size={20} />
                )}
                Logout
              </button>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Profile Card */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                      <User size={32} className="text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-neutral-900">{user?.name}</h2>
                    <p className="text-neutral-600 text-sm mt-2">{user?.email}</p>
                    <Link
                      href="/profile"
                      className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sessions Manager */}
              <div className="lg:col-span-2">
                <SessionManager />
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <Link
                href="/courses"
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
              >
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Browse Courses</h3>
                <p className="text-neutral-600">Explore our BIM training courses</p>
              </Link>

              <Link
                href="/profile"
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
              >
                <h3 className="text-xl font-bold text-neutral-900 mb-2">My Profile</h3>
                <p className="text-neutral-600">Update your profile information</p>
              </Link>

              <Link
                href="/contact"
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
              >
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Get Support</h3>
                <p className="text-neutral-600">Contact our support team</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </ProtectedRoute>
  );
}
