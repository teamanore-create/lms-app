"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { jobs, perks } from "@/data/careers";

export default function CareersPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-700 to-primary-900 py-16">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm text-primary-300 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white font-medium">Careers</span>
          </nav>
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
              Join the BIM Academy Team
            </h1>
            <p className="text-primary-200 text-lg leading-relaxed">
              We're looking for passionate BIM professionals and educators who
              want to make a global impact on how the AEC industry learns and
              works.
            </p>
          </div>
        </div>
      </div>

      {/* Mission */}
      <section className="py-16 bg-white border-b border-neutral-100">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Build the Future of BIM Education
              </h2>
              <p className="text-neutral-500 leading-relaxed mb-4">
                At BIM Academy, we believe that access to world-class BIM
                training can transform careers, improve project outcomes, and
                advance the entire construction industry.
              </p>
              <p className="text-neutral-500 leading-relaxed">
                If you're passionate about BIM, Autodesk technologies, or
                education, we want to hear from you. We're a fast-growing,
                globally distributed team with a clear mission and a strong
                culture of learning.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                "30+ team members",
                "12 nationalities",
                "100% Remote-friendly",
                "Founded 2018",
              ].map((stat) => (
                <div
                  key={stat}
                  className="bg-primary-50 rounded-2xl p-5 text-center"
                >
                  <p className="font-bold text-primary-700">{stat}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-neutral-900 text-center mb-10">
            Why Work With Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {perks.map((perk) => (
              <div
                key={perk.title}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors duration-200">
                  <perk.icon className="w-5 h-5 text-primary-600 group-hover:text-white transition-colors duration-200" />
                </div>
                <h3 className="font-bold text-neutral-900 mb-2">
                  {perk.title}
                </h3>
                <p className="text-sm text-neutral-500">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">
            Open Positions
          </h2>
          <div className="space-y-3">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="border border-neutral-200 rounded-2xl p-5 hover:border-primary-300 hover:shadow-card transition-all duration-200 group cursor-pointer"
                onClick={() => setSelected(selected === job.id ? null : job.id)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span className="flex items-center gap-1 text-xs text-neutral-500">
                        <MapPin className="w-3 h-3" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-neutral-500">
                        <Clock className="w-3 h-3" /> {job.type}
                      </span>
                      <span className="badge bg-primary-50 text-primary-700 text-xs">
                        {job.department}
                      </span>
                      <span className="badge bg-neutral-100 text-neutral-600 text-xs">
                        {job.level}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected(job.id);
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors flex-shrink-0"
                  >
                    Apply Now <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {selected === job.id && (
                  <div className="mt-5 pt-5 border-t border-neutral-100">
                    <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                      We're looking for an experienced professional to join our
                      growing team. You'll work with a globally distributed
                      group of BIM experts, contributing to industry-leading
                      training content and consultancy projects.
                    </p>
                    <p className="text-sm font-semibold text-neutral-900 mb-2">
                      Key Responsibilities:
                    </p>
                    <ul className="space-y-1 mb-4">
                      {[
                        "Deliver expert-level training to professionals worldwide",
                        "Develop curriculum aligned with industry standards",
                        "Provide mentorship and support to students",
                        "Contribute to course content development and updates",
                      ].map((r) => (
                        <li
                          key={r}
                          className="flex items-center gap-2 text-sm text-neutral-600"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors"
                    >
                      Send Application <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 bg-neutral-50 rounded-2xl text-center">
            <p className="font-semibold text-neutral-900 mb-2">
              Don't see the right role?
            </p>
            <p className="text-sm text-neutral-500 mb-4">
              We're always looking for talented BIM professionals. Send us your
              CV and tell us how you'd like to contribute.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors text-sm"
            >
              Send Open Application <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
