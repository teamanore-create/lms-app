'use client';

import { useState } from 'react';
import { useForgotPassword, getErrorMessage } from '@/hooks/use-auth-mutations';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordForm() {
  const router = useRouter();
  const forgotMutation = useForgotPassword();
  const [email, setEmail] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setSuccessMsg(null);

    if (!email) {
      setLocalError('Email is required');
      return;
    }

    forgotMutation.mutate(
      { email },
      {
        onSuccess: (data) => {
          setSuccessMsg(data.message || 'Reset code sent successfully');
          // Optionally redirect to reset-password with email as query param, or prompt them to check email
          setTimeout(() => {
            router.push(`/reset-password?email=${encodeURIComponent(email)}`);
          }, 2000);
        },
        onError: (error) => {
          setLocalError(getErrorMessage(error));
        },
      },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-4 text-neutral-900">
            Forgot Password
          </h1>
          <p className="text-center text-neutral-600 mb-8">
            Enter your email address to receive a password reset code.
          </p>

          {localError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {localError}
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={forgotMutation.isPending}
              className="w-full btn-primary disabled:opacity-50"
            >
              {forgotMutation.isPending ? 'Sending...' : 'Send Reset Code'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-neutral-600">
              Remember your password?{' '}
              <Link href="/sign-in" className="text-blue-600 font-semibold hover:text-blue-700">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
