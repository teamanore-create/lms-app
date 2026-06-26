"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  CheckCircle,
  Star,
  ChevronDown,
  ChevronUp,
  Award,
  TrendingUp,
  MessageSquare,
  Phone,
  Mail,
} from "lucide-react";
import CourseCard from "../components/ui/CourseCard";
import { courses, testimonials } from "@/data/cources";
import {statsData,technologies,services,whyChooseUs,roadmapSteps,faqs,companyLogos} from '@/data/Home'
// Scroll animation hook
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// Counter animation
function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

export default function HomePage() {
  useScrollReveal();
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.3 },
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const featuredCourses = courses.filter((c) => c.featured).slice(0, 6);

  return (
    <div className="overflow-hidden">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center bg-white pt-20">
        {/* Background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-primary-50 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] bg-accent-50 rounded-full blur-3xl opacity-40" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-50 rounded-full blur-3xl opacity-20" />
        </div>

        <div className="container-custom relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full border border-primary-100">
                <div className="flex -space-x-1">
                  {[1, 2, 3].map((i) => (
                    <img
                      key={i}
                      src={`https://images.pexels.com/photos/${[2379004, 774909, 1222271][i - 1]}/pexels-photo-${[2379004, 774909, 1222271][i - 1]}.jpeg?auto=compress&cs=tinysrgb&w=50`}
                      className="w-6 h-6 rounded-full border-2 border-white object-cover"
                      alt=""
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-primary-700">
                  Trusted by 25,000+ BIM professionals
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-neutral-900 leading-[1.1]">
                Master <span className="text-gradient">BIM</span> &{" "}
                <span className="text-gradient">Autodesk</span>{" "}
                <span className="block mt-1">Technologies</span>
              </h1>

              <p className="text-lg text-neutral-500 leading-relaxed max-w-lg">
                Advance your career in architecture, engineering & construction
                with expert-led training in Revit, AutoCAD, Civil 3D,
                Navisworks, ACC, and more.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/courses"
                  className="btn-primary text-base px-8 py-4"
                >
                  Explore Courses
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-neutral-200 text-neutral-700 font-semibold rounded-xl hover:border-primary-300 hover:text-primary-600 transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 text-primary-600 ml-0.5" />
                  </div>
                  Watch Demo
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-neutral-700">
                    4.9/5 rating
                  </span>
                </div>
                <div className="w-px h-4 bg-neutral-200" />
                <span className="text-sm text-neutral-500">
                  Autodesk Authorized Training Center
                </span>
                <div className="w-px h-4 bg-neutral-200" />
                <span className="text-sm text-neutral-500">
                  ISO 19650 Compliant
                </span>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_40px_120px_rgba(37,99,235,0.2)] animate-float">
                <img
                  src="https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=900"
                  alt="BIM Professional at work"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-transparent" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-200">
                    <Play className="w-6 h-6 text-primary-600 ml-1" />
                  </button>
                </div>
              </div>

              {/* Floating Cards */}
              <div
                className="absolute -left-8 top-12 bg-white rounded-2xl shadow-card p-4 w-48 animate-fade-in"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-primary-100 rounded-xl flex items-center justify-center">
                    <Award className="w-4 h-4 text-primary-600" />
                  </div>
                  <span className="text-xs font-semibold text-neutral-700">
                    Certified Courses
                  </span>
                </div>
                <p className="text-2xl font-bold text-neutral-900">48+</p>
                <p className="text-xs text-neutral-400">
                  Professional programs
                </p>
              </div>

              <div
                className="absolute -right-6 bottom-16 bg-white rounded-2xl shadow-card p-4 w-52 animate-fade-in"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-neutral-900">
                    4.9
                  </span>
                </div>
                <p className="text-xs text-neutral-500">
                  "Best BIM training I've taken"
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <img
                    src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50"
                    className="w-6 h-6 rounded-full object-cover"
                    alt=""
                  />
                  <span className="text-xs font-medium text-neutral-700">
                    Ahmed A. — BIM Manager
                  </span>
                </div>
              </div>

              <div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-card px-5 py-3 flex items-center gap-3 animate-fade-in"
                style={{ animationDelay: "0.7s" }}
              >
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500">
                    Avg. Salary Increase
                  </p>
                  <p className="text-sm font-bold text-neutral-900">
                    +42% after certification
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUSTED COMPANIES ── */}
      <section className="py-14 border-y border-neutral-100 bg-neutral-50">
        <div className="container-custom">
          <p className="text-center text-sm font-semibold text-neutral-400 uppercase tracking-widest mb-8">
            Graduates working at world-class firms
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            {companyLogos.map((logo) => (
              <span
                key={logo}
                className="text-xl font-bold text-neutral-300 hover:text-neutral-500 transition-colors duration-200 tracking-tight cursor-default"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED COURSES ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div
              className="reveal"
              style={{ "--delay": "0s" } as React.CSSProperties}
            >
              <span className="section-label mb-3">
                <span className="w-8 h-0.5 bg-primary-600 rounded" />
                Featured Courses
              </span>
              <h2 className="section-title">Advance Your BIM Career</h2>
            </div>
            <Link
              href="/courses"
              className="reveal flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors flex-shrink-0"
              style={{ "--delay": "0.2s" } as React.CSSProperties}
            >
              View All Courses <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course, i) => (
              <div
                key={course.id}
                className="reveal"
                style={{ "--delay": `${i * 0.1}s` } as React.CSSProperties}
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BIM LEARNING ROADMAP ── */}
      <section className="py-24 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal">
            <span className="section-label justify-center mb-3">
              <span className="w-8 h-0.5 bg-primary-600 rounded" />
              Learning Path
              <span className="w-8 h-0.5 bg-primary-600 rounded" />
            </span>
            <h2 className="section-title mb-4">BIM Learning Roadmap</h2>
            <p className="section-subtitle mx-auto">
              Follow our structured learning path from foundational skills to
              advanced BIM leadership and strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmapSteps.map((step, i) => (
              <div
                key={step.step}
                className="reveal"
                style={{ "--delay": `${i * 0.15}s` } as React.CSSProperties}
              >
                <div className="relative bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group">
                  {/* Step number */}
                  <div
                    className={`w-12 h-12 ${step.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
                  >
                    <span className="text-white font-bold text-sm">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="font-bold text-neutral-900 mb-3">
                    {step.title}
                  </h3>
                  <ul className="space-y-2">
                    {step.tools.map((tool) => (
                      <li
                        key={tool}
                        className="flex items-center gap-2 text-sm text-neutral-500"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                        {tool}
                      </li>
                    ))}
                  </ul>
                  {/* Connector arrow (except last) */}
                  {i < roadmapSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <div
                        className={`w-6 h-6 ${step.color} rounded-full flex items-center justify-center`}
                      >
                        <ArrowRight className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 reveal">
            <Link href="/courses" className="btn-primary">
              Start Your Journey <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── AUTODESK TECHNOLOGIES ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal">
            <span className="section-label justify-center mb-3">
              <span className="w-8 h-0.5 bg-primary-600 rounded" />
              Technologies
              <span className="w-8 h-0.5 bg-primary-600 rounded" />
            </span>
            <h2 className="section-title mb-4">
              Autodesk Technologies We Cover
            </h2>
            <p className="section-subtitle mx-auto">
              Comprehensive training across the full Autodesk AEC product suite,
              taught by certified instructors.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {technologies.map((tech, i) => (
              <div
                key={tech.name}
                className="reveal"
                style={{ "--delay": `${i * 0.08}s` } as React.CSSProperties}
              >
                <Link
                  href="/courses"
                  className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-neutral-100 hover:border-primary-200 hover:shadow-card transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`w-14 h-14 ${tech.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
                  >
                    <tech.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 text-sm mb-1">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {tech.desc}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BIM SERVICES ── */}
      <section className="py-24 bg-gradient-to-br from-primary-950 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-400 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal">
            <span className="section-label justify-center mb-3 text-primary-300">
              <span className="w-8 h-0.5 bg-primary-400 rounded" />
              BIM Services
              <span className="w-8 h-0.5 bg-primary-400 rounded" />
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Expert BIM Consultancy Services
            </h2>
            <p className="text-primary-300 leading-relaxed">
              We don't just teach BIM — we practice it. Our expert team delivers
              end-to-end BIM solutions for complex construction projects
              worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div
                key={service.title}
                className="reveal"
                style={{ "--delay": `${i * 0.1}s` } as React.CSSProperties}
              >
                <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
                  <div
                    className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200`}
                  >
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-primary-300 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 reveal">
            <Link
              href="/consultancy"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-200 hover:-translate-y-0.5 shadow-xl"
            >
              Explore Consultancy Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <span className="section-label mb-4">
                <span className="w-8 h-0.5 bg-primary-600 rounded" />
                Why BIM Academy
              </span>
              <h2 className="section-title mb-6">
                The Premier Destination for BIM & Autodesk Training
              </h2>
              <p className="section-subtitle mb-8">
                We combine deep technical expertise with pedagogical excellence
                to create the most effective BIM learning experience available
                online.
              </p>
              <Link href="/about" className="btn-primary">
                Learn About Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyChooseUs.map((item, i) => (
                <div
                  key={item.title}
                  className="reveal group flex gap-4 p-5 rounded-2xl bg-neutral-50 hover:bg-primary-50 hover:border-primary-100 border border-transparent transition-all duration-300"
                  style={{ "--delay": `${i * 0.1}s` } as React.CSSProperties}
                >
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600 transition-colors duration-200">
                    <item.icon className="w-5 h-5 text-primary-600 group-hover:text-white transition-colors duration-200" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 text-sm mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SUCCESS METRICS ── */}
      <section
        className="py-24 bg-primary-600 relative overflow-hidden"
        ref={statsRef}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8" ref={statsRef}>
            {statsData.map((stat, i) => (
              <StatCounter
                key={stat.label}
                stat={stat}
                index={i}
                visible={statsVisible}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal">
            <span className="section-label justify-center mb-3">
              <span className="w-8 h-0.5 bg-primary-600 rounded" />
              Testimonials
              <span className="w-8 h-0.5 bg-primary-600 rounded" />
            </span>
            <h2 className="section-title mb-4">What Our Students Say</h2>
            <p className="section-subtitle mx-auto">
              Real stories from professionals who transformed their careers with
              BIM Academy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t, i) => (
              <div
                key={t.id}
                className="reveal"
                style={{ "--delay": `${i * 0.1}s` } as React.CSSProperties}
              >
                <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(t.rating)].map((_, s) => (
                      <Star
                        key={s}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-neutral-600 text-sm leading-relaxed flex-1 mb-5">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-neutral-900 text-sm">
                        {t.name}
                      </p>
                      <p className="text-xs text-neutral-400">
                        {t.role} — {t.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 reveal">
            <Link href="/courses" className="btn-secondary">
              Read More Stories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="reveal">
              <span className="section-label mb-4">
                <span className="w-8 h-0.5 bg-primary-600 rounded" />
                FAQ
              </span>
              <h2 className="section-title mb-6">Frequently Asked Questions</h2>
              <p className="section-subtitle mb-8">
                Everything you need to know about BIM Academy training programs.
                Can't find your answer?
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="mailto:training@bimacademy.com"
                  className="flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                >
                  <Mail className="w-4 h-4" /> Email Support
                </a>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" /> Live Chat
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="reveal border border-neutral-200 rounded-2xl overflow-hidden"
                  style={{ "--delay": `${i * 0.05}s` } as React.CSSProperties}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left font-semibold text-neutral-900 hover:text-primary-600 transition-colors"
                  >
                    <span className="text-sm pr-4">{faq.q}</span>
                    {openFaq === i ? (
                      <ChevronUp className="w-4 h-4 text-primary-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5">
                      <p className="text-sm text-neutral-500 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="relative bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl overflow-hidden py-16 px-8 md:px-16 text-center reveal">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary-300 rounded-full blur-3xl" />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Start Your BIM Journey Today
              </h2>
              <p className="text-primary-200 text-lg mb-8 leading-relaxed">
                Join thousands of professionals who have transformed their
                careers through expert BIM and Autodesk training. Your next
                breakthrough is one course away.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-200 hover:-translate-y-0.5 shadow-xl"
                >
                  Browse All Courses <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Phone className="w-4 h-4" /> Talk to an Advisor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCounter({
  stat,
  index,
  visible,
}: {
  stat: (typeof statsData)[0];
  index: number;
  visible: boolean;
}) {
  const count = useCounter(stat.value, 2000, visible);
  return (
    <div className="text-center">
      <div className="flex items-center justify-center mb-2">
        <stat.icon className="w-6 h-6 text-primary-200 mr-2" />
      </div>
      <p className="text-4xl md:text-5xl font-bold text-white mb-2">
        {count.toLocaleString()}
        {stat.suffix}
      </p>
      <p className="text-primary-200 text-sm font-medium">{stat.label}</p>
    </div>
  );
}
