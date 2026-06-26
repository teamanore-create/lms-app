'use client'
import { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, XCircle, Clock, Mail } from 'lucide-react';

export default function RefundPolicyPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="bg-neutral-900 py-12">
        <div className="container-custom max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Refund Policy</span>
          </nav>
          <h1 className="text-4xl font-bold text-white mb-3">Refund Policy</h1>
          <p className="text-neutral-400">Last updated: June 1, 2025</p>
        </div>
      </div>

      <div className="container-custom max-w-4xl py-12">
        {/* Guarantee Banner */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 mb-10 text-white text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">30-Day Money-Back Guarantee</h2>
          <p className="text-primary-200 max-w-lg mx-auto">We stand behind the quality of our courses. If you're not completely satisfied within 30 days of purchase, we'll provide a full refund — no questions asked.</p>
        </div>

        {/* Quick Summary */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
            <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" /> Eligible for Refund
            </h3>
            <ul className="space-y-2">
              {[
                'Request made within 30 days of purchase',
                'Less than 30% of course content consumed',
                'Technical issues preventing course access',
                'Duplicate purchase by mistake',
                'Course significantly misrepresented',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-green-700">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2">
              <XCircle className="w-5 h-5" /> Not Eligible for Refund
            </h3>
            <ul className="space-y-2">
              {[
                'Request made after 30 days of purchase',
                'More than 30% of course content consumed',
                'Completion certificate already downloaded',
                'Course bundles after partial completion',
                'Live session recordings already accessed',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-red-700">
                  <XCircle className="w-3.5 h-3.5 text-red-500 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Process */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">How to Request a Refund</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { step: '1', icon: Mail, title: 'Contact Support', desc: 'Email us at refunds@bimacademy.com with your order details and reason for refund.' },
              { step: '2', icon: Clock, title: 'Review (1-2 days)', desc: 'Our team reviews your request within 1-2 business days and confirms eligibility.' },
              { step: '3', icon: CheckCircle, title: 'Refund Processed', desc: 'Approved refunds are processed within 5-7 business days to your original payment method.' },
            ].map((step) => (
              <div key={step.step} className="text-center p-6 bg-neutral-50 rounded-2xl">
                <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">{step.step}</span>
                </div>
                <h3 className="font-bold text-neutral-900 mb-2">{step.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          {[
            {
              title: 'Individual Course Purchases',
              content: 'Individual courses are eligible for a full refund if requested within 30 days of the original purchase date and you have consumed less than 30% of the course content. Refunds are not available after 30 days.',
            },
            {
              title: 'Course Bundle Purchases',
              content: 'Course bundles are eligible for a refund if you have not consumed more than 30% of any single course within the bundle and your request is made within 30 days of purchase. Partial refunds for individual courses within bundles are not available.',
            },
            {
              title: 'Corporate Training Programs',
              content: 'Corporate training packages have separate refund terms as outlined in your specific agreement. Please refer to your contract or contact your account manager for details.',
            },
            {
              title: 'Payment Processing',
              content: 'Approved refunds are returned to the original payment method. Credit card refunds typically appear within 5-7 business days depending on your bank. Bank transfer refunds may take up to 10 business days.',
            },
          ].map((section) => (
            <div key={section.title} className="border-b border-neutral-100 pb-6 last:border-0">
              <h2 className="text-lg font-bold text-neutral-900 mb-3">{section.title}</h2>
              <p className="text-neutral-600 text-sm leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 bg-primary-50 border border-primary-100 rounded-2xl">
          <h3 className="font-bold text-neutral-900 mb-2">Need Help?</h3>
          <p className="text-sm text-neutral-600 mb-3">Our support team is available to assist with any refund-related questions.</p>
          <a href="mailto:refunds@bimacademy.com" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
            <Mail className="w-4 h-4" /> refunds@bimacademy.com
          </a>
        </div>
      </div>
    </div>
  );
}
