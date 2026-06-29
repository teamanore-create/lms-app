'use client';

import { useState, useEffect } from 'react';
import { useResetPassword, getErrorMessage } from '@/hooks/use-auth-mutations';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetMutation = useResetPassword();
  
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    password: '',
    confirmPassword: '',
  });
  const [localError, setLocalError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setFormData((prev) => ({ ...prev, email: emailParam }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setSuccessMsg(null);

    if (!formData.email || !formData.otp || !formData.password) {
      setLocalError('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    resetMutation.mutate(
      { 
        email: formData.email, 
        otp: formData.otp, 
        password: formData.password 
      },
      {
        onSuccess: (data) => {
          setSuccessMsg(data.message || 'Password reset successful');
          setTimeout(() => {
            router.push('/sign-in');
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
            Reset Password
          </h1>
          <p className="text-center text-neutral-600 mb-8">
            Enter your reset code and new password
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
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-neutral-50"
                readOnly={!!searchParams.get('email')}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Reset Code (OTP)
              </label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                placeholder="Enter 6-digit code"
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest text-lg"
                maxLength={6}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={resetMutation.isPending}
              className="w-full btn-primary mt-2 disabled:opacity-50"
            >
              {resetMutation.isPending ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>

          <div className="mt-6 text-center">
             <span className="text-neutral-600">Didn't receive the code? </span>
             <Link href="/forgot-password" className="text-blue-600 font-semibold hover:text-blue-700">
                Resend
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
