import  Link  from 'next/link';
import { Star, Clock, Users, BookOpen, ShoppingCart, Heart } from 'lucide-react';
import type { Course } from '@/data/cources';

interface CourseCardProps {
  course: Course;
  variant?: 'default' | 'featured' | 'compact';
}

const badgeColors: Record<string, string> = {
  Bestseller: 'bg-accent-500 text-white',
  'Most Popular': 'bg-primary-600 text-white',
  New: 'bg-success-500 text-white',
};

export default function CourseCard({ course, variant = 'default' }: CourseCardProps) {
  const discount = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group block bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {course.badge && (
            <span className={`badge text-xs ${badgeColors[course.badge] || 'bg-neutral-700 text-white'}`}>
              {course.badge}
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-neutral-400 hover:text-red-500 hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100"
        >
          <Heart className="w-4 h-4" />
        </button>

        {/* Instructor Avatar */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <img
            src={course.instructorImage}
            alt={course.instructor}
            className="w-7 h-7 rounded-full border-2 border-white object-cover"
          />
          <span className="text-white text-xs font-medium drop-shadow-sm">{course.instructor}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-lg">
            {course.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-neutral-900 text-sm leading-snug mb-3 line-clamp-2 group-hover:text-primary-700 transition-colors">
          {course.title}
        </h3>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-neutral-500 mb-3">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-neutral-400" />
            {course.level}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-neutral-400" />
            {course.students.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            {course.rating}
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-neutral-900">${course.price}</span>
            {course.originalPrice && (
              <>
                <span className="text-xs text-neutral-400 line-through">${course.originalPrice}</span>
                <span className="text-xs font-semibold text-accent-600 bg-accent-50 px-1.5 py-0.5 rounded">
                  -{discount}%
                </span>
              </>
            )}
          </div>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary-600 bg-primary-50 hover:bg-primary-600 hover:text-white rounded-lg transition-all duration-200"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Enroll
          </button>
        </div>
      </div>
    </Link>
  );
}
