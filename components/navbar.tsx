'use client'

import { useState, useEffect } from 'react';

import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Building2, BookOpen, Users, Briefcase, Phone, FileText, User, LogOut, Loader } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth-store';
import { useLogout } from '@/hooks/use-auth-mutations';
import { useRouter } from 'next/navigation';

const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'Courses',
    href: '/courses',
    dropdown: [
      { label: 'All Courses', href: '/courses', icon: BookOpen },
      { label: 'Revit Architecture', href: '/courses/autodesk-revit-architecture', icon: Building2 },
      { label: 'AutoCAD', href: '/courses/autocad-2d-3d-mastery', icon: FileText },
      { label: 'Navisworks', href: '/courses/navisworks-bim-coordination', icon: Users },
      { label: 'Civil 3D', href: '/courses/civil-3d-infrastructure-design', icon: Briefcase },
      { label: 'BIM Management', href: '/courses/bim-management-strategy', icon: Building2 },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Consultancy', href: '/consultancy' },
  {
    label: 'Pages',
    href: '#',
    dropdown: [
      { label: 'Blog', href: '/blog', icon: FileText },
      { label: 'Careers', href: '/careers', icon: Briefcase },
      { label: 'Contact', href: '/contact', icon: Phone },
      { label: 'Privacy Policy', href: '/privacy-policy', icon: FileText },
      { label: 'Terms & Conditions', href: '/terms', icon: FileText },
      { label: 'Refund Policy', href: '/refund-policy', icon: FileText },
    ],
  },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Auth state from Zustand
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const logoutMutation = useLogout();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        router.push('/sign-in');
      },
    });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.08)]' : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center shadow-blue group-hover:shadow-lg transition-shadow duration-200">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-neutral-900 leading-none block">
                BIM<span className="text-primary-600">Academy</span>
              </span>
              <span className="text-[10px] text-neutral-400 font-medium tracking-wider uppercase leading-none">Autodesk Training</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      pathname.startsWith(link.href) && link.href !== '#'
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-neutral-600 hover:text-primary-600 hover:bg-neutral-50'
                    }`}
                  >
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                  </button>
                  {activeDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-neutral-100 py-2 animate-fade-in">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-600 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-150 mx-1 rounded-xl"
                        >
                          <item.icon className="w-4 h-4 text-primary-400 flex-shrink-0" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    pathname === link.href
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-neutral-600 hover:text-primary-600 hover:bg-neutral-50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA Buttons / Auth Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {isHydrated && isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors duration-200"
                >
                  <User className="w-4 h-4" />
                  {user?.name?.split(' ')[0] || 'Dashboard'}
                </Link>
                <button
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200 disabled:opacity-50"
                >
                  {logoutMutation.isPending ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <LogOut className="w-4 h-4" />
                  )}
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="px-5 py-2.5 text-sm font-semibold text-neutral-700 hover:text-primary-600 transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-all duration-200 shadow-blue hover:shadow-lg hover:-translate-y-0.5"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl text-neutral-600 hover:bg-neutral-100 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-100 shadow-lg">
          <div className="container-custom py-4 space-y-1">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label}>
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
                  >
                    {link.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                  </button>
                  {activeDropdown === link.label && (
                    <div className="pl-4 space-y-1 mt-1">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
                        >
                          <item.icon className="w-4 h-4 text-primary-400" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`block px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                    pathname === link.href ? 'text-primary-600 bg-primary-50' : 'text-neutral-700 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-2 border-t border-neutral-100 flex flex-col gap-2">
              {isHydrated && isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
                  >
                    <User className="w-4 h-4" />
                    {user?.name || 'Dashboard'}
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50"
                  >
                    {logoutMutation.isPending ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <LogOut className="w-4 h-4" />
                    )}
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="block px-4 py-2.5 text-sm font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link href="/sign-up" className="btn-primary justify-center">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
