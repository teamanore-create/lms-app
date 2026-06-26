'use client'
import { useEffect } from 'react';
import  Link from 'next/link';
import { Clock, ArrowRight, Tag, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { FaTwitter , FaLinkedin } from 'react-icons/fa';
import { blogPosts } from '@/data/cources';
import { useParams } from 'next/navigation';

export default function BlogDetailPage() {
  const { id:slug } = useParams();
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  const post = blogPosts.find((p) => p.slug === slug) || blogPosts[0];
  const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <div className="bg-neutral-900 py-14">
        <div className="container-custom max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white">{post.category}</span>
          </nav>
          <span className="badge bg-primary-600/30 text-primary-300 border border-primary-500/30 mb-5 inline-flex">{post.category}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-snug">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-5 text-sm text-neutral-400">
            <div className="flex items-center gap-2">
              <img src={post.authorImage} alt={post.author} className="w-8 h-8 rounded-full object-cover" />
              <span className="text-neutral-300 font-medium">{post.author}</span>
            </div>
            <span>{post.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
            <div className="flex gap-2 ml-auto">
              <button className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-primary-700 flex items-center justify-center text-neutral-400 hover:text-white transition-all">
                <FaTwitter className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-primary-700 flex items-center justify-center text-neutral-400 hover:text-white transition-all">
                <FaLinkedin className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-all">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom max-w-7xl py-12">
        <div className="grid lg:grid-cols-4 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Hero Image */}
            <div className="rounded-2xl overflow-hidden mb-8 aspect-[16/8]">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>

            {/* Article Body */}
            <div className="prose-custom max-w-none">
              <p className="text-lg text-neutral-600 leading-relaxed mb-6 font-medium">
                {post.excerpt}
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Introduction</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                The construction industry is undergoing its most significant transformation in decades. Building Information Modeling has evolved from a niche technical discipline into the backbone of modern project delivery, and the tools and methodologies surrounding it continue to advance rapidly.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-6">
                For BIM professionals and Autodesk practitioners, staying ahead of these developments is not optional — it's essential for career progression and delivering value to clients and employers.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Key Trends Reshaping the Industry</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                Several interconnected developments are converging to reshape how BIM is practiced:
              </p>
              <ul className="space-y-3 mb-6">
                {['Integration of AI tools for automated clash detection and design optimization', 'Cloud-first workflows through Autodesk Construction Cloud and BIM 360', 'Digital twin frameworks linking design models to live building data', 'Generative design capabilities powered by machine learning', 'Real-time collaboration tools reducing traditional handoff delays'].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-neutral-600">
                    <span className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6 my-8">
                <p className="text-primary-900 font-semibold text-lg mb-2">Key Insight</p>
                <p className="text-primary-700 leading-relaxed">
                  BIM professionals who combine deep technical expertise in tools like Revit and Navisworks with strategic understanding of data management and ISO 19650 standards are commanding premium salaries and career advancement opportunities that were unimaginable five years ago.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Practical Implications for BIM Practitioners</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                The implications for individual practitioners are clear: the skills that differentiated senior BIM professionals in 2020 are now baseline requirements. Today, what sets experts apart is the ability to bridge technical BIM skills with broader digital project delivery capabilities.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-4">
                This means building competency across Autodesk's connected platform — particularly Autodesk Construction Cloud — while also developing scripting and automation skills through tools like Dynamo and Python.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Recommended Learning Path</h2>
              <p className="text-neutral-600 leading-relaxed mb-6">
                For professionals looking to stay current, we recommend a structured approach:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {['Master your core Autodesk tools at an advanced level', 'Learn BIM coordination with Navisworks', 'Adopt cloud-based workflows with Autodesk ACC', 'Add automation skills through Dynamo scripting', 'Study ISO 19650 standards and BIM management', 'Build a project portfolio showcasing these capabilities'].map((step, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-neutral-50 rounded-xl">
                    <span className="w-6 h-6 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-sm text-neutral-700">{step}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Conclusion</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                The BIM profession is maturing rapidly, and with it comes tremendous opportunity for those who invest in the right skills and knowledge. The tools are more capable than ever, the industry is more receptive to BIM than at any point in history, and the career rewards for true BIM expertise have never been greater.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                Whether you're just starting your BIM journey or looking to advance to leadership roles, now is the time to invest in professional development that will define the next chapter of your career.
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-neutral-200">
              <Tag className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-lg font-medium hover:bg-primary-100 hover:text-primary-700 transition-colors cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>

            {/* Author Bio */}
            <div className="bg-neutral-50 rounded-2xl p-6 mt-8 flex items-start gap-5">
              <img src={post.authorImage} alt={post.author} className="w-16 h-16 rounded-2xl object-cover flex-shrink-0" />
              <div>
                <p className="text-xs text-neutral-400 mb-0.5">Written by</p>
                <p className="font-bold text-neutral-900 mb-1">{post.author}</p>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  Senior BIM specialist and Autodesk Certified Instructor with extensive experience delivering complex AEC projects. Passionate about advancing the BIM profession through education and knowledge sharing.
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-8 border-t border-neutral-200">
              <Link href="/blog" className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Blog
              </Link>
              <Link href={`/blog/${related[0]?.slug}`} className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors">
                Next Article <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* CTA */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Level Up Your BIM Skills</h3>
              <p className="text-primary-200 text-sm mb-4">Master the tools discussed in this article with our expert-led courses.</p>
              <Link href="/courses" className="block text-center py-3 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-colors text-sm">
                Browse Courses
              </Link>
            </div>

            {/* Related Posts */}
            <div>
              <h3 className="font-bold text-neutral-900 mb-4">Related Articles</h3>
              <div className="space-y-4">
                {related.map((p) => (
                  <Link key={p.id} href={`/blog/${p.slug}`} className="group flex gap-3">
                    <img src={p.image} alt={p.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                    <div>
                      <p className="text-xs text-primary-600 font-medium mb-1">{p.category}</p>
                      <p className="text-sm font-medium text-neutral-800 leading-snug group-hover:text-primary-600 transition-colors line-clamp-2">{p.title}</p>
                      <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1"><Clock className="w-3 h-3" />{p.readTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-neutral-50 rounded-2xl p-5">
              <h3 className="font-bold text-neutral-900 mb-2">Weekly BIM Insights</h3>
              <p className="text-xs text-neutral-500 mb-3">Get our best articles delivered to your inbox every week.</p>
              <input type="email" placeholder="Your email" className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm mb-2 focus:outline-none focus:border-primary-400 transition-colors" />
              <button className="w-full py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition-colors">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
