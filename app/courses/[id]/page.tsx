'use client';
import { useEffect, useState } from 'react';
import Link from "next/link"

import { useParams } from 'next/navigation';
import {
  Star, Clock, Users, BookOpen, Globe, Award, CheckCircle, ChevronDown, ChevronUp,
  Play, Heart, Share2, ShoppingCart, ArrowRight, Download, Smartphone, Infinity,
  Video, FileText, Shield
} from 'lucide-react';
import { courses } from '@/data/cources';
import CourseCard from '@/components/ui/CourseCard';

export default function CourseDetailPage() {
  const { id:slug } = useParams();
  const [openSection, setOpenSection] = useState<number | null>(0);
  const [wishlist, setWishlist] = useState(false);
  
  
  const course = courses.find((c) => c.slug === slug);
  const related = courses.filter((c) => c.id !== course?.id && c.category === course?.category).slice(0, 3);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Course not found</h2>
        <Link href="/courses" className="btn-primary">Browse All Courses</Link>
      </div>
    );
  }

  const discount = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header Banner */}
      <div className="bg-neutral-900 text-white">
        <div className="container-custom py-10">
          <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
            <span>/</span>
            <span className="text-white">{course.category}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Category badge */}
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-600/30 text-primary-300 text-xs font-semibold mb-4 border border-primary-500/30">
                {course.category}
              </span>

              <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-snug">
                {course.title}
              </h1>

              {/* Rating row */}
              <div className="flex flex-wrap items-center gap-4 mb-5">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-amber-400">{course.rating}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(course.rating) ? 'fill-amber-400 text-amber-400' : 'text-neutral-600'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-neutral-400">({course.reviews.toLocaleString()} reviews)</span>
                </div>
                <span className="text-sm text-neutral-400 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {course.students.toLocaleString()} students
                </span>
              </div>

              {/* Meta row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
                {[
                  { label: 'Last Update', value: 'Jun 2025' },
                  { label: 'Level', value: course.level },
                  { label: 'Students', value: course.students.toLocaleString() },
                  { label: 'Language', value: 'English' },
                ].map((m) => (
                  <div key={m.label}>
                    <p className="text-xs text-neutral-500 mb-0.5">{m.label}</p>
                    <p className="text-sm font-medium text-white">{m.value}</p>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setWishlist(!wishlist)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 ${
                    wishlist ? 'bg-red-50 border-red-200 text-red-600' : 'border-neutral-700 text-neutral-300 hover:border-white hover:text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${wishlist ? 'fill-red-500 text-red-500' : ''}`} />
                  Wishlist
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-700 text-neutral-300 hover:border-white hover:text-white text-sm font-medium transition-all duration-200">
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Preview Video */}
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-card group cursor-pointer">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-200">
                  <Play className="w-6 h-6 text-primary-600 ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                <p className="text-white text-xs font-medium">Preview this course</p>
              </div>
            </div>

            {/* Overview */}
            <div className="bg-neutral-50 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">Overview</h2>
              <p className="text-neutral-600 leading-relaxed">{course.description}</p>
              <p className="text-neutral-600 leading-relaxed mt-3">
                This comprehensive program is designed for professionals who want to master {course.category} workflows used by leading AEC firms globally. Through project-based learning and expert instruction, you'll gain the confidence to apply these skills immediately in your workplace.
              </p>
              <p className="text-neutral-600 leading-relaxed mt-3">
                By the end of this course, you will have completed multiple real-world project exercises and have a portfolio demonstrating your {course.category} expertise to potential employers or clients.
              </p>
            </div>

            {/* What You'll Learn */}
            <div className="border border-neutral-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-5">What You'll Learn</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.outcomes.map((outcome, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-neutral-600">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="border border-neutral-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-5">Requirements</h2>
              <ul className="space-y-3">
                {course.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-neutral-600">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Curriculum */}
            <div className="border border-neutral-200 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-neutral-200">
                <h2 className="text-xl font-bold text-neutral-900 mb-1">Course Curriculum</h2>
                <p className="text-sm text-neutral-500">
                  {course.curriculum.reduce((acc, s) => acc + s.lessons.length, 0)} lessons · {course.duration} total
                </p>
              </div>
              {course.curriculum.map((section, i) => (
                <div key={i} className="border-b border-neutral-100 last:border-0">
                  <button
                    onClick={() => setOpenSection(openSection === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-neutral-50 transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-neutral-900 text-sm">{section.title}</p>
                      <p className="text-xs text-neutral-400 mt-0.5">{section.lessons.length} lessons</p>
                    </div>
                    {openSection === i ? (
                      <ChevronUp className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                    )}
                  </button>
                  {openSection === i && (
                    <div className="pb-2">
                      {section.lessons.map((lesson, j) => (
                        <div key={j} className="flex items-center gap-3 px-5 py-2.5 hover:bg-neutral-50 transition-colors">
                          <Play className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                          <span className="text-sm text-neutral-600">{lesson}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Instructor */}
            <div className="border border-neutral-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-5">About the Instructor</h2>
              <div className="flex items-start gap-4">
                <img
                  src={course.instructorImage}
                  alt={course.instructor}
                  className="w-16 h-16 rounded-2xl object-cover flex-shrink-0"
                />
                <div>
                  <h3 className="font-bold text-neutral-900">{course.instructor}</h3>
                  <p className="text-sm text-neutral-500 mb-3">{course.instructorRole}</p>
                  <div className="flex items-center gap-4 text-sm text-neutral-600">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="ml-1 font-medium">5.0</span>
                    </div>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-neutral-400" />
                      12 Courses
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-neutral-400" />
                      {(course.students + 5000).toLocaleString()} Students
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-neutral-600 mt-4 leading-relaxed">
                A highly experienced BIM professional and Autodesk Certified Instructor with extensive hands-on experience in complex AEC projects. Passionate about sharing practical knowledge that students can immediately apply in their careers.
              </p>
            </div>

            {/* Reviews */}
            <div className="border border-neutral-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-5">Reviews</h2>
              <p className="text-sm text-neutral-500 mb-6">Our students say about this course</p>

              <div className="flex gap-8 mb-6">
                <div className="text-center">
                  <p className="text-5xl font-bold text-neutral-900">{course.rating}</p>
                  <div className="flex justify-center my-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-neutral-500">{course.reviews} Reviews</p>
                </div>
                <div className="flex-1 space-y-2">
                  {[
                    { label: 'Excellent', pct: 85 },
                    { label: 'Very Good', pct: 10 },
                    { label: 'Average', pct: 3 },
                    { label: 'Poor', pct: 1 },
                    { label: 'Terrible', pct: 1 },
                  ].map((r) => (
                    <div key={r.label} className="flex items-center gap-3 text-sm">
                      <span className="w-20 text-neutral-500 text-right flex-shrink-0">{r.label}</span>
                      <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-500 rounded-full" style={{ width: `${r.pct}%` }} />
                      </div>
                      <span className="w-8 text-neutral-400">{r.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Reviews */}
              {[
                { name: 'Ahmed Al-Rashid', date: 'Jun 2, 2025', text: 'Exceptional course! The practical exercises and real-world examples made complex concepts easy to understand. Highly recommended for anyone serious about BIM.' },
                { name: 'Sarah Johnson', date: 'May 28, 2025', text: 'This course completely changed how I approach BIM projects. The instructor is knowledgeable and explains everything clearly. Worth every penny.' },
              ].map((review, i) => (
                <div key={i} className="pt-5 border-t border-neutral-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm flex-shrink-0">
                      {review.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900 text-sm">{review.name}</p>
                      <p className="text-xs text-neutral-400">{review.date}</p>
                    </div>
                    <div className="ml-auto flex">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">{review.text}</p>
                </div>
              ))}

              <button className="mt-5 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                More reviews →
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white border border-neutral-200 rounded-2xl shadow-card overflow-hidden">
                {/* Price */}
                <div className="p-6 border-b border-neutral-100">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-3xl font-bold text-neutral-900">${course.price}</span>
                    {course.originalPrice && (
                      <>
                        <span className="text-lg text-neutral-400 line-through">${course.originalPrice}</span>
                        <span className="badge bg-accent-100 text-accent-700 text-xs">{discount}% OFF</span>
                      </>
                    )}
                  </div>
                  {course.originalPrice && (
                    <p className="text-xs text-neutral-400">Limited time offer</p>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <button className="w-full btn-primary justify-center text-base py-3.5">
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                  <button className="w-full btn-secondary justify-center text-base py-3.5">
                    Buy Now
                  </button>
                  <p className="text-xs text-center text-neutral-400">30-Day Money-Back Guarantee</p>
                </div>

                {/* Course Includes */}
                <div className="px-6 pb-6">
                  <h4 className="text-sm font-semibold text-neutral-900 mb-4">This course includes</h4>
                  <ul className="space-y-3">
                    {[
                      { icon: Video, text: `${course.duration} on-demand video` },
                      { icon: FileText, text: '5 downloadable articles' },
                      { icon: Download, text: '30+ downloadable resources' },
                      { icon: Infinity, text: 'Full lifetime access' },
                      { icon: Smartphone, text: 'Access on mobile & desktop' },
                      { icon: Award, text: 'Certificate of completion' },
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-neutral-600">
                        <item.icon className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructor Mini */}
                <div className="px-6 pb-6 border-t border-neutral-100 pt-5">
                  <h4 className="text-sm font-semibold text-neutral-900 mb-3">About the Instructor</h4>
                  <div className="flex items-center gap-3">
                    <img src={course.instructorImage} alt={course.instructor} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">{course.instructor}</p>
                      <p className="text-xs text-neutral-400">{course.instructorRole.split(',')[0]}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 5.0 Rating
                    </span>
                    <span>12 Courses</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="px-6 pb-6 border-t border-neutral-100 pt-5">
                  <h4 className="text-sm font-semibold text-neutral-900 mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-lg font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Courses */}
        {related.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-neutral-900">Related Courses</h2>
              <Link href="/courses" className="flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
