"use client";
import { useEffect } from "react";
import Link from "next/link";
import { sections } from "@/data/terms";

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="bg-neutral-900 py-12">
        <div className="container-custom max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-5">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Terms & Conditions</span>
          </nav>
          <h1 className="text-4xl font-bold text-white mb-3">
            Terms & Conditions
          </h1>
          <p className="text-neutral-400">Last updated: June 1, 2025</p>
        </div>
      </div>

      <div className="container-custom max-w-4xl py-12">
        <p className="text-neutral-600 leading-relaxed mb-8 text-lg">
          Please read these Terms and Conditions carefully before using BIM
          Academy's training platform. These terms govern your access to and use
          of our services.
        </p>

        <div className="space-y-8">
          {sections.map((section) => (
            <div
              key={section.title}
              className="border-b border-neutral-100 pb-8 last:border-0"
            >
              <h2 className="text-xl font-bold text-neutral-900 mb-4">
                {section.title}
              </h2>
              <div className="text-neutral-600 leading-relaxed whitespace-pre-line text-sm">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 bg-primary-50 rounded-2xl">
          <p className="text-sm text-neutral-600">
            If you have questions about these Terms, please contact us at{" "}
            <a
              href="mailto:legal@bimacademy.com"
              className="text-primary-600 font-medium hover:text-primary-700 transition-colors"
            >
              legal@bimacademy.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
