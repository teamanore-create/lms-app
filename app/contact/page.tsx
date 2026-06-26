'use client'
import { useEffect, useState } from 'react';
import Link  from 'next/link';
import { Mail, Phone, Send, CheckCircle, Building2, MessageSquare } from 'lucide-react';
import {contactInfo,subjects} from "@/data/contact";


export default function ContactPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', subject: subjects[0], message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-700 to-primary-900 py-16">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm text-primary-300 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Contact</span>
          </nav>
          <h1 className="text-5xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-primary-200 text-lg max-w-xl leading-relaxed">Whether you have a question about courses, consultancy services, or anything else — our team is ready to help.</p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <section className="py-12 bg-neutral-50 border-b border-neutral-200">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactInfo.map((item) => (
              <div key={item.label} className="bg-white rounded-2xl p-5 shadow-card flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs text-neutral-400 mb-0.5">{item.label}</p>
                  <p className="text-sm font-semibold text-neutral-900">{item.value}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Form + Map */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-2">Send Us a Message</h2>
              <p className="text-neutral-500 mb-8">Fill in the form below and a member of our team will be in touch within one business day.</p>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">Message Sent!</h3>
                  <p className="text-neutral-600">Thank you for reaching out. We'll be in touch within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Smith"
                        className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Company / Organization</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Your company name"
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Subject *</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 bg-white transition-all"
                    >
                      {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your training needs or question..."
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all resize-none"
                    />
                  </div>
                  <button type="submit" className="w-full btn-primary justify-center py-3.5 text-base">
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Info Panel */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Talk to a BIM Expert</h3>
                <p className="text-primary-200 text-sm leading-relaxed mb-6">
                  Book a free 30-minute consultation with one of our BIM specialists. We'll discuss your specific needs and recommend the right training or consultancy solution.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-primary-100">+1 (555) 234-5678</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-primary-100">training@bimacademy.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-primary-100">Live Chat – 9am to 6pm weekdays</span>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-6">
                <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary-600" />
                  Our Offices
                </h3>
                <div className="space-y-5">
                  {[
                    { city: 'Dubai, UAE', address: 'Business Bay, Tower 2, Level 14, Dubai, UAE 12345', phone: '+971 4 123 4567' },
                    { city: 'London, UK', address: 'Canary Wharf, One Canada Square, Level 18, London E14 5AB', phone: '+44 20 1234 5678' },
                  ].map((office) => (
                    <div key={office.city} className="pb-5 last:pb-0 border-b last:border-0 border-neutral-200">
                      <p className="font-semibold text-neutral-900 mb-1">{office.city}</p>
                      <p className="text-sm text-neutral-500 mb-1">{office.address}</p>
                      <p className="text-sm text-primary-600">{office.phone}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-6">
                <h3 className="font-bold text-neutral-900 mb-4">Corporate Training</h3>
                <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                  Looking to train your entire team? We offer customized corporate training packages with flexible scheduling, on-site delivery, and tailored curriculum.
                </p>
                <Link href="/consultancy" className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors flex items-center gap-1">
                  Learn About Corporate Programs →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
