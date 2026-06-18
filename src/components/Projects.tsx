/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Layout, Globe, Search, ArrowRight, Eye } from 'lucide-react';

export default function Projects() {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Web Development', 'UI/UX Design', 'Branding & Graphics'];

  const projectList = [
    {
      title: 'E-Commerce Unified Hub',
      desc: 'Seamless, production-grade purchase engine with high-speed node server routing and dynamic inventory views.',
      category: 'Web Development',
      img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&auto=format&fit=crop&q=60'
    },
    {
      title: 'Apex School Portal',
      desc: 'An automated student indexing and result sheet compiler built for private secondary academies.',
      category: 'Web Development',
      img: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=500&auto=format&fit=crop&q=60'
    },
    {
      title: 'Zenith Corporate Branding',
      desc: 'Formulated coherent vectors, professional business brochures, and typography layouts for financial agencies.',
      category: 'Branding & Graphics',
      img: 'https://images.unsplash.com/photo-1561070791-26c113006238?w=500&auto=format&fit=crop&q=60'
    },
    {
      title: 'Global Missions Flyer',
      desc: 'Eye-catching design designed to boost event registrations and support physical invitations distribution.',
      category: 'Branding & Graphics',
      img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&auto=format&fit=crop&q=60'
    },
    {
      title: 'EduSphere Learning App',
      desc: 'Wireframing, persona research, and component library creation built for micro-learning ecosystems.',
      category: 'UI/UX Design',
      img: 'https://images.unsplash.com/photo-1581291518655-9523c932ebcf?w=500&auto=format&fit=crop&q=60'
    },
    {
      title: 'Pulse Fitness Dashboard',
      desc: 'A responsive figma mockup tracking user daily cardio logs and healthy habit streaks.',
      category: 'UI/UX Design',
      img: 'https://images.unsplash.com/photo-1510519138101-570d1dca3d66?w=500&auto=format&fit=crop&q=60'
    }
  ];

  const filtered = filter === 'All' ? projectList : projectList.filter(p => p.category === filter);

  return (
    <div className="space-y-16 py-6 pb-20 max-w-7xl mx-auto px-6">
      {/* Page Title */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-secondary bg-brand-accent px-3.5 py-1.5 rounded-full">
          Featured Achievements
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary tracking-tight">
          Explore Our <span className="text-brand-secondary">Case Studies</span>
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed text-sm md:text-base">
          Discover a curated list of live web applications, visual flysheets, and UX products delivered for top-tier partners.
        </p>
      </section>

      {/* Filter Tabs selection */}
      <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto bg-brand-accent p-1.5 rounded-2xl border border-slate-200">
        {categories.map((catName) => (
          <button
            key={catName}
            onClick={() => setFilter(catName)}
            className={`flex-1 px-4 py-2.5 text-xs font-bold rounded-xl transition cursor-pointer ${
              filter === catName 
                ? 'bg-brand-primary text-white shadow-sm' 
                : 'text-slate-600 hover:bg-white/50'
            }`}
          >
            {catName}
          </button>
        ))}
      </div>

      {/* Portfolio Grid Layout */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((proj, i) => (
          <div key={i} className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:shadow-xl transition flex flex-col justify-between group">
            <div>
              <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                <img 
                  src={proj.img} 
                  alt={proj.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 inline-block text-[10px] font-bold uppercase tracking-wider bg-slate-900/90 text-brand-secondary px-2.5 py-1 rounded-md">
                  {proj.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-lg font-bold text-brand-primary font-display">{proj.title}</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{proj.desc}</p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <a 
                href="https://wa.me/2348135402154?text=Hello!%20I%2520am%2520interested%2520in%2520discussing%2520a%2520project%2520similar%2520to%2520"
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-secondary hover:text-brand-primary cursor-pointer"
              >
                Learn More on WhatsApp <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
