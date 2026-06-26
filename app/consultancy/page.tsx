'use client'
import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Phone, Mail } from 'lucide-react';
import {services,clients,process} from "@/data/consultency"


export default function ConsultancyPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-950 to-primary-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-400 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10 py-20">
          <nav className="flex items-center gap-2 text-sm text-primary-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Consultancy</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-700/50 border border-primary-600/50 rounded-full text-primary-300 text-sm font-medium mb-6">
              Professional BIM Services
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Expert BIM Consultancy for Complex Projects
            </h1>
            <p className="text-primary-200 text-xl leading-relaxed mb-8">
              Our consultancy team brings 15+ years of hands-on BIM project experience to help you implement, optimize, and scale your BIM capabilities.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-4 bg-white text-primary-800 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-200 hover:-translate-y-0.5 shadow-xl">
                Get a Free Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:+15552345678" className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5">
                <Phone className="w-4 h-4" /> +1 (555) 234-5678
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-label justify-center mb-3">
              <span className="w-8 h-0.5 bg-primary-600 rounded" />
              Our Services
              <span className="w-8 h-0.5 bg-primary-600 rounded" />
            </span>
            <h2 className="section-title mb-4">End-to-End BIM Solutions</h2>
            <p className="section-subtitle mx-auto">From strategy to execution, we provide comprehensive BIM services tailored to your organization's needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.title} className="bg-white rounded-2xl border border-neutral-200 p-6 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group">
                <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-3">{service.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed mb-5">{service.desc}</p>
                <ul className="space-y-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-neutral-600">
                      <CheckCircle className={`w-3.5 h-3.5 ${service.text} flex-shrink-0`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-label justify-center mb-3">
              <span className="w-8 h-0.5 bg-primary-600 rounded" />
              Our Process
              <span className="w-8 h-0.5 bg-primary-600 rounded" />
            </span>
            <h2 className="section-title">How We Work With You</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {process.map((p, i) => (
              <div key={p.step} className="text-center group">
                <div className="relative inline-flex">
                  <div className="w-14 h-14 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                    <span className="text-white font-bold">{p.step}</span>
                  </div>
                  {i < process.length - 1 && (
                    <div className="hidden md:block absolute left-full top-1/2 -translate-y-1/2 w-full h-0.5 bg-primary-200" />
                  )}
                </div>
                <h3 className="font-bold text-neutral-900 mb-2">{p.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Portfolio */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-label justify-center mb-3">
              <span className="w-8 h-0.5 bg-primary-600 rounded" />
              Project Portfolio
              <span className="w-8 h-0.5 bg-primary-600 rounded" />
            </span>
            <h2 className="section-title">Sectors We Serve</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {clients.map((c) => (
              <div key={c.sector} className="bg-neutral-50 rounded-2xl p-6 text-center hover:bg-primary-50 transition-colors duration-200">
                <p className="text-4xl font-bold text-primary-600 mb-2">{c.count}</p>
                <p className="font-bold text-neutral-900 mb-2">{c.sector}</p>
                <p className="text-sm text-neutral-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Start Your BIM Transformation</h2>
            <p className="text-primary-200 text-lg mb-8 max-w-xl mx-auto">Book a free 30-minute consultation with our expert team to discuss your BIM challenges and how we can help.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-200 hover:-translate-y-0.5 shadow-xl">
                Book Free Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="mailto:consulting@bimacademy.com" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5">
                <Mail className="w-4 h-4" /> consulting@bimacademy.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
