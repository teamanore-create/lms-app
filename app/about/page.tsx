'use client'
import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Award, Users, Globe, TrendingUp, BookOpen, Building2 } from 'lucide-react';
import {team , values} from "@/data/aboutPage"

export default function AboutPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-700 to-primary-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10 py-20">
          <nav className="flex items-center gap-2 text-sm text-primary-300 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">About Us</span>
          </nav>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-white mb-5 leading-tight">
                We're Shaping the Future of BIM Education
              </h1>
              <p className="text-primary-200 text-lg leading-relaxed mb-8">
                BIM Academy was founded with a single mission: to make world-class BIM and Autodesk training accessible to every architecture, engineering, and construction professional worldwide.
              </p>
              <Link href="/courses" className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-200 hover:-translate-y-0.5 shadow-xl">
                Explore Our Courses <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="BIM Academy team"
                className="rounded-2xl shadow-2xl w-full aspect-[4/3] object-cover"
              />
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-card p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Autodesk Authorized</p>
                  <p className="text-sm font-bold text-neutral-900">Training Center</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white border-b border-neutral-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '25,000+', label: 'Students Trained' },
              { value: '48+', label: 'Expert Courses' },
              { value: '65+', label: 'Countries' },
              { value: '4.9/5', label: 'Average Rating' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-primary-600 mb-2">{stat.value}</p>
                <p className="text-neutral-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label mb-4">
                <span className="w-8 h-0.5 bg-primary-600 rounded" />
                Our Story
              </span>
              <h2 className="section-title mb-6">From Practitioners to Educators</h2>
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <p>BIM Academy was founded in 2018 by a team of BIM practitioners who had spent years working on major construction projects across the globe. We noticed a consistent gap: talented engineers and architects with limited access to high-quality, practical BIM training.</p>
                <p>We built BIM Academy to bridge that gap — creating courses that combine deep technical knowledge with real-world application, taught by practitioners who have lived the challenges students face daily.</p>
                <p>Today, we're proud to be recognized as an Autodesk Authorized Training Center, serving students in over 65 countries and partnering with leading AEC firms for corporate training programs.</p>
              </div>
              <ul className="mt-6 space-y-3">
                {['Autodesk Authorized Training Center', 'ISO 19650 Certified Curriculum', 'Industry-recognized certifications', '30-day satisfaction guarantee'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-neutral-700">
                    <CheckCircle className="w-4 h-4 text-primary-600 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=400" className="rounded-2xl object-cover w-full aspect-[3/4]" alt="" />
              <div className="space-y-4">
                <img src="https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=400" className="rounded-2xl object-cover w-full aspect-square" alt="" />
                <img src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400" className="rounded-2xl object-cover w-full aspect-square" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-label justify-center mb-3">
              <span className="w-8 h-0.5 bg-primary-600 rounded" />
              Our Values
              <span className="w-8 h-0.5 bg-primary-600 rounded" />
            </span>
            <h2 className="section-title">What Drives Everything We Do</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 text-center group">
                <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-600 transition-colors duration-200">
                  <v.icon className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors duration-200" />
                </div>
                <h3 className="font-bold text-neutral-900 mb-2">{v.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-label justify-center mb-3">
              <span className="w-8 h-0.5 bg-primary-600 rounded" />
              Our Team
              <span className="w-8 h-0.5 bg-primary-600 rounded" />
            </span>
            <h2 className="section-title">Meet the BIM Experts Behind BIM Academy</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-neutral-900">{member.name}</h3>
                  <p className="text-sm text-primary-600 font-medium mb-2">{member.role}</p>
                  <p className="text-xs text-neutral-500 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Join Our Community?</h2>
            <p className="text-primary-200 text-lg mb-8 max-w-xl mx-auto">Start your BIM learning journey today and join 25,000+ professionals who have chosen BIM Academy.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/courses" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-200 hover:-translate-y-0.5 shadow-xl">
                Browse Courses <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
