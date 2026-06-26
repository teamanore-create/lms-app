'use client'
import { useState, useEffect } from 'react';
import  Link  from 'next/link';
import { Search, SlidersHorizontal, ChevronDown, ArrowRight, BookOpen } from 'lucide-react';
import CourseCard from '@/components/ui/CourseCard';
import { courses, categories } from '@/data/cources';
import {levels,sortOptions} from '@/data/cources'

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Most Popular');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = courses
    .filter((c) => {
      const matchCategory = selectedCategory === 'All' || c.category === selectedCategory;
      const matchLevel = selectedLevel === 'All Levels' || c.level.toLowerCase().includes(selectedLevel.toLowerCase());
      const matchSearch = !searchQuery || c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchLevel && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'Highest Rated') return b.rating - a.rating;
      if (sortBy === 'Price: Low to High') return a.price - b.price;
      if (sortBy === 'Price: High to Low') return b.price - a.price;
      return b.students - a.students;
    });

    console.log(filtered,"filtered")
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-primary-700 to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary-300 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10 py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-primary-300 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Courses</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                All Courses
              </h1>
              <p className="text-primary-200 text-lg leading-relaxed mb-6">
                BIM Academy is the world's leading BIM & Autodesk training platform. Master the tools that shape modern construction and engineering.
              </p>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-accent-500 text-white font-semibold rounded-xl hover:bg-accent-600 transition-all duration-200 shadow-orange hover:-translate-y-0.5">
                <BookOpen className="w-4 h-4" /> Discover More
              </button>
            </div>
            <div className="hidden md:flex items-center justify-end">
              <div className="text-right">
                <p className="text-6xl font-bold text-white/20 leading-none select-none">Courses</p>
                <p className="text-5xl font-bold text-white/10 leading-none select-none">Courses</p>
                <p className="text-4xl font-bold text-white/5 leading-none select-none">Courses</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="border-b border-neutral-200 bg-white sticky top-[72px] z-30 shadow-sm">
        <div className="container-custom">
          <div className="flex items-center gap-6 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap text-sm font-medium pb-1 border-b-2 transition-all duration-200 flex-shrink-0 ${
                  selectedCategory === cat
                    ? 'text-primary-600 border-primary-600'
                    : 'text-neutral-500 border-transparent hover:text-neutral-800 hover:border-neutral-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-12">
        {/* Filters Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Level Filter */}
            <div className="relative">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="appearance-none pl-4 pr-8 py-2.5 border border-neutral-200 rounded-xl text-sm text-neutral-700 focus:outline-none focus:border-primary-400 bg-white cursor-pointer"
              >
                {levels.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-8 py-2.5 border border-neutral-200 rounded-xl text-sm text-neutral-700 focus:outline-none focus:border-primary-400 bg-white cursor-pointer"
              >
                {sortOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            </div>

            <button className="p-2.5 border border-neutral-200 rounded-xl text-neutral-500 hover:text-primary-600 hover:border-primary-300 transition-colors">
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm font-semibold text-neutral-500">
              Showing <span className="text-neutral-900">{filtered.length}</span> courses
              {selectedCategory !== 'All' && (
                <span> in <span className="text-primary-600">{selectedCategory}</span></span>
              )}
            </p>
          </div>
        </div>

        {/* Course Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-neutral-300" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-700 mb-2">No courses found</h3>
            <p className="text-neutral-400 text-sm">Try adjusting your filters or search terms.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedLevel('All Levels'); }}
              className="mt-4 px-6 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Featured Banner */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-primary-200 text-sm font-semibold uppercase tracking-wider mb-2">Popular Courses</p>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Featured Courses</h3>
            <p className="text-primary-200 text-sm">Hand-picked selections from our most highly rated instructors</p>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="grid grid-cols-3 gap-3">
              {courses.filter((c) => c.featured).slice(0, 3).map((c) => (
                <Link key={c.id} href={`/courses/${c.slug}`}>
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-20 h-20 object-cover rounded-xl border-2 border-white/20 hover:border-white/60 transition-colors"
                  />
                </Link>
              ))}
            </div>
            <Link
              href="/courses"
              className="flex items-center gap-2 px-5 py-3 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-colors whitespace-nowrap"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
