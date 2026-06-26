'use client'

import Link from 'next/link';
import { Building2, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import {
  FaYoutube,
  FaInstagram,
  FaLinkedin,
  FaTwitter
} from 'react-icons/fa';
const footerLinks = {
  courses: [
    { label: 'Autodesk Revit', href: '/courses/autodesk-revit-architecture' },
    { label: 'AutoCAD', href: '/courses/autocad-2d-3d-mastery' },
    { label: 'Navisworks', href: '/courses/navisworks-bim-coordination' },
    { label: 'Civil 3D', href: '/courses/civil-3d-infrastructure-design' },
    { label: 'BIM Management', href: '/courses/bim-management-strategy' },
    { label: 'Dynamo', href: '/courses/dynamo-visual-programming' },
    { label: 'Autodesk ACC', href: '/courses/autodesk-construction-cloud' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Consultancy', href: '/consultancy' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact Us', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Refund Policy', href: '/refund-policy' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      {/* Top CTA Band */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-600">
        <div className="container-custom py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">Ready to advance your BIM career?</h3>
              <p className="text-primary-200 text-sm">Join 25,000+ professionals who have transformed their skills with BIM Academy.</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-200 hover:-translate-y-0.5"
              >
                Browse Courses
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-800/50 text-white font-semibold rounded-xl border border-primary-500 hover:bg-primary-800 transition-all duration-200 hover:-translate-y-0.5"
              >
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-white leading-none block">
                  BIM<span className="text-primary-400">Academy</span>
                </span>
                <span className="text-[10px] text-neutral-400 font-medium tracking-wider uppercase leading-none">Autodesk Training</span>
              </div>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6 max-w-xs">
              The leading platform for BIM and Autodesk technology training. We help engineers, architects, and construction professionals master the tools that shape the future of building design.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-neutral-400">
                <Mail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span>training@bimacademy.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-400">
                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span>+1 (555) 234-5678</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-400">
                <MapPin className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span>Dubai, UAE & London, UK</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {[
                { icon: FaLinkedin, href: '#' },
                { icon: FaTwitter, href: '#' },
                { icon: FaYoutube, href: '#' },
                { icon: FaInstagram, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-xl bg-neutral-800 hover:bg-primary-600 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Courses</h4>
            <ul className="space-y-3">
              {footerLinks.courses.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-150 flex items-center gap-1.5 group">
                    <span className="w-0 group-hover:w-2 overflow-hidden transition-all duration-200 text-primary-400">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-150 flex items-center gap-1.5 group">
                    <span className="w-0 group-hover:w-2 overflow-hidden transition-all duration-200 text-primary-400">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Newsletter</h4>
            <p className="text-sm text-neutral-400 mb-4 leading-relaxed">Get BIM insights, course updates, and Autodesk tips delivered weekly.</p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-primary-500 transition-colors"
              />
              <button className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors duration-200">
                Subscribe
              </button>
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Legal</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-150">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} BIM Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sm text-neutral-500">
            <span>Autodesk Authorized Training Center</span>
            <span className="mx-2">·</span>
            <span>ISO 19650 Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
