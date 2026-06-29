import ForgotPasswordForm from '@/components/forgot-password-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password | BIM Training',
  description: 'Reset your password for your BIM Training account',
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
