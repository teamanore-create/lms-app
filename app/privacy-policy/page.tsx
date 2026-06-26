"use client";
import { useEffect } from "react";
import Link from "next/link";
import { policySections } from "@/data/privacyPolicy";

export default function PrivacyPolicyPage() {
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
            <span className="text-white">Privacy Policy</span>
          </nav>
          <h1 className="text-4xl font-bold text-white mb-3">Privacy Policy</h1>
          <p className="text-neutral-400">Last updated: June 1, 2025</p>
        </div>
      </div>

      <div className="container-custom max-w-4xl py-12">
        <p className="text-neutral-600 leading-relaxed mb-8 text-lg">
          At BIM Academy, we take your privacy seriously. This Privacy Policy
          explains how we collect, use, disclose, and safeguard your information
          when you use our training platform.
        </p>

        <div className="space-y-8">
          {policySections.map((section) => (
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
      </div>
    </div>
  );
}
