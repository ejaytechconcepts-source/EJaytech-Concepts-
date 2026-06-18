/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { Search, Calendar, User, Clock, ArrowLeft, ArrowRight, CornerDownRight } from 'lucide-react';

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const res = await fetch('/api/blogs');
        const data = await res.json();
        if (data.blogs) {
          setBlogs(data.blogs);
        }
      } catch (err) {
        console.error('Error fetching blogs, using standards.', err);
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, [activeArticle]);

  // Categories extraction
  const categories = ['All', 'Technology', 'Design & Branding', 'Freelancing'];

  // Filter conditions
  const filtered = blogs.filter((b) => {
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) || 
                          b.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12 py-6 pb-20 max-w-7xl mx-auto px-6">
      {/* Search Header or back action */}
      {activeArticle ? (
        <div className="space-y-8">
          <button 
            id="back-to-blogs-feed"
            onClick={() => setActiveArticle(null)}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-brand-secondary transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blogs Feed
          </button>

          <article className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 bg-brand-accent text-brand-secondary text-xs uppercase font-bold rounded">
                {activeArticle.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-brand-primary tracking-tight leading-tight">
                {activeArticle.title}
              </h1>

              {/* Meta information */}
              <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-slate-500 pt-2 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  <span>By <strong>{activeArticle.author}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{activeArticle.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{activeArticle.readTime}</span>
                </div>
              </div>
            </div>

            {/* Core Blog Image */}
            <div className="h-96 w-full rounded-3xl overflow-hidden bg-slate-100 shadow-md">
              <img 
                src={activeArticle.imageUrl} 
                alt={activeArticle.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Paragraph block */}
            <div className="text-slate-700 leading-relaxed text-sm md:text-base space-y-6">
              <p className="font-semibold text-brand-primary text-base md:text-lg italic bg-brand-accent p-6 rounded-2xl border-l-4 border-brand-secondary leading-relaxed">
                "{activeArticle.excerpt}"
              </p>
              <div className="whitespace-pre-line text-sm md:text-base">{activeArticle.content}</div>
            </div>
          </article>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Default List View Title */}
          <section className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-secondary bg-brand-accent px-3.5 py-1.5 rounded-full">
              Digital Insights
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary tracking-tight">
              Our Professional <span className="text-brand-secondary">Core Blog</span>
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed text-sm md:text-base">
              Stay in the loop with tech transformations, logo brandings, design files, and modern freelancing tips.
            </p>
          </section>

          {/* Search bar and Filters */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-brand-accent p-4 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 px-3 py-2.5 w-full md:max-w-sm focus-within:border-brand-secondary transition">
              <Search className="w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="bg-transparent text-sm text-slate-900 focus:outline-none w-full"
              />
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-4 py-2 text-xs md:text-sm font-bold rounded-xl transition ${
                    selectedCategory === c 
                      ? 'bg-brand-primary text-white shadow-md' 
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Cards Grid */}
          {loading ? (
            <div className="text-center py-12 text-slate-400 font-mono text-sm uppercase">
              Extracting articles database...
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 bg-brand-accent rounded-3xl border border-slate-100 border-dashed text-slate-500">
              <p className="font-bold mb-1">No matching articles found.</p>
              <p className="text-xs">Adjust your lookup keys or try selecting another category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post) => (
                <div 
                  key={post.id} 
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:shadow-xl transition flex flex-col justify-between"
                >
                  <div>
                    <div className="h-48 w-full bg-slate-100 relative">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-4 left-4 bg-brand-primary text-white text-xs font-bold px-2.5 py-1 rounded-md uppercase">
                        {post.category}
                      </span>
                    </div>

                    <div className="p-6 space-y-4">
                      {/* Meta */}
                      <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold font-mono">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      {/* Header */}
                      <h3 className="text-lg font-bold text-brand-primary line-clamp-2">{post.title}</h3>
                      <p className="text-gray-500 text-xs md:text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button 
                      onClick={() => setActiveArticle(post)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-secondary hover:text-brand-primary transition cursor-pointer"
                    >
                      Read Complete Article <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
