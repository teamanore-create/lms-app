'use client';

import { useState, useEffect } from 'react';
import {
  useSignup,
  useVerifyOtp,
  useResendOtp,
  getErrorMessage,
} from '@/hooks/use-auth-mutations';
import { useAuthStore } from '@/store/auth-store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupForm() {
  const router = useRouter();
  const pendingEmail = useAuthStore((s) => s.pendingEmail);
  const signupMutation = useSignup();
  const verifyOtpMutation = useVerifyOtp();
  const resendOtpMutation = useResendOtp();

  const [step, setStep] = useState<'form' | 'otp'>(
    pendingEmail ? 'otp' : 'form',
  );
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [otp, setOtp] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Sync step with pendingEmail from store
  useEffect(() => {
    if (pendingEmail) {
      setStep('otp');
    }
  }, [pendingEmail]);

  // Resend cooldown countdown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setLocalError('All fields are required');
      return;
    }

    if (formData.password.length < 8) {
      setLocalError('Password must be at least 8 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    signupMutation.mutate(
      {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName
      },
      {
        onSuccess: () => {
          setStep('otp');
          setResendCooldown(60);
        },
        onError: (error) => {
          setLocalError(getErrorMessage(error));
        },
      },
    );
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    const email = pendingEmail || formData.email;
    if (!email || !otp) {
      setLocalError('Please enter the OTP sent to your email');
      return;
    }

    verifyOtpMutation.mutate(
      { email, otp },
      {
        onSuccess: () => {
          router.push('/dashboard');
        },
        onError: (error) => {
          setLocalError(getErrorMessage(error));
        },
      },
    );
  };

  const handleResendOtp = () => {
    const email = pendingEmail || formData.email;
    if (!email || resendCooldown > 0) return;

    setLocalError(null);
    resendOtpMutation.mutate(
      { email },
      {
        onSuccess: () => {
          setResendCooldown(60);
        },
        onError: (error) => {
          setLocalError(getErrorMessage(error));
        },
      },
    );
  };

  const isLoading =
    signupMutation.isPending ||
    verifyOtpMutation.isPending ||
    resendOtpMutation.isPending;

  const currentEmail = pendingEmail || formData.email;

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-neutral-900">
            {step === 'form' ? 'Sign Up' : 'Verify Email'}
          </h1>

          {localError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {localError}
            </div>
          )}

          {resendOtpMutation.isSuccess && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
              A new OTP has been sent to your email.
            </div>
          )}

          {/* ── Step 1: Signup Form ── */}
          {step === 'form' && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
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
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Password
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
                  Confirm Password
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
                disabled={signupMutation.isPending}
                className="w-full btn-primary disabled:opacity-50"
              >
                {signupMutation.isPending ? 'Creating account...' : 'Sign Up'}
              </button>
            </form>
          )}

          {/* ── Step 2: OTP Verification ── */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <p className="text-sm text-neutral-600 text-center mb-4">
                We&apos;ve sent a 6-digit verification code to{' '}
                <span className="font-semibold text-neutral-900">
                  {currentEmail}
                </span>
              </p>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => {
                    // Only allow digits, max 6
                    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setOtp(val);
                  }}
                  placeholder="000000"
                  maxLength={6}
                  className="w-full px-4 py-3 text-center text-2xl tracking-[0.5em] font-mono border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={verifyOtpMutation.isPending || otp.length !== 6}
                className="w-full btn-primary disabled:opacity-50"
              >
                {verifyOtpMutation.isPending ? 'Verifying...' : 'Verify & Continue'}
              </button>

              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendCooldown > 0 || resendOtpMutation.isPending}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium disabled:text-neutral-400 disabled:cursor-not-allowed"
                >
                  {resendCooldown > 0
                    ? `Resend code in ${resendCooldown}s`
                    : resendOtpMutation.isPending
                      ? 'Sending...'
                      : 'Resend verification code'}
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setStep('form');
                  setOtp('');
                  setLocalError(null);
                  useAuthStore.getState().setPendingEmail(null);
                }}
                className="w-full text-sm text-neutral-500 hover:text-neutral-700 mt-2"
              >
                ← Back to signup
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-neutral-600">
              Already have an account?{' '}
              <Link
                href="/sign-in"
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
