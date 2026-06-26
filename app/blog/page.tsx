'use client'
import { useEffect, useState } from 'react';
import  Link from 'next/link';
import { Search, Clock, ArrowRight, Tag } from 'lucide-react';
import { blogPosts } from '@/data/cources';

const allCategories = ['All', ...Array.from(new Set(blogPosts.map((p) => p.category)))];

export default function BlogPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = blogPosts.filter((p) => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = !query || p.title.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = blogPosts[0];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-700 to-primary-900 py-16">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm text-primary-300 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Blog</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-5xl font-bold text-white mb-3">BIM Insights & Resources</h1>
              <p className="text-primary-200 text-lg max-w-lg">Expert articles on BIM workflows, Autodesk software, industry trends, and career development.</p>
            </div>
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-primary-300 focus:outline-none focus:border-white focus:bg-white/20 transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <section className="py-12 bg-neutral-50 border-b border-neutral-200">
        <div className="container-custom">
          <Link href={`/blog/${featured.slug}`} className="group grid md:grid-cols-2 gap-8 items-center">
            <div className="overflow-hidden rounded-2xl aspect-[16/10]">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div>
              <span className="badge bg-primary-100 text-primary-700 mb-4">{featured.category}</span>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4 group-hover:text-primary-700 transition-colors leading-snug">
                {featured.title}
              </h2>
              <p className="text-neutral-500 leading-relaxed mb-5">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-neutral-500 mb-5">
                <div className="flex items-center gap-2">
                  <img src={featured.authorImage} alt={featured.author} className="w-7 h-7 rounded-full object-cover" />
                  <span>{featured.author}</span>
                </div>
                <span>{featured.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{featured.readTime}</span>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 group-hover:text-primary-700 transition-colors">
                Read Article <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-10">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-primary-600 text-white shadow-blue'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="badge bg-primary-50 text-primary-600 text-xs">{post.category}</span>
                      <span className="text-xs text-neutral-400 flex items-center gap-1 ml-auto">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-bold text-neutral-900 mb-2 leading-snug group-hover:text-primary-700 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-3 pt-3 border-t border-neutral-100">
                      <img src={post.authorImage} alt={post.author} className="w-7 h-7 rounded-full object-cover" />
                      <div>
                        <p className="text-xs font-medium text-neutral-700">{post.author}</p>
                        <p className="text-xs text-neutral-400">{post.date}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-neutral-400">No articles found. Try a different search or category.</p>
              <button onClick={() => { setQuery(''); setActiveCategory('All'); }} className="mt-4 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
