import ResetPasswordForm from '@/components/reset-password-form';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Reset Password | BIM Training',
  description: 'Enter your reset code and new password',
};

// ResetPasswordForm uses useSearchParams, so we wrap it in a Suspense boundary for Next.js app router
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
