/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Target, Eye, Shield, Users, Award, Star, ArrowUpRight } from 'lucide-react';

export default function About() {
  const values = [
    { title: 'Excellence', desc: 'We maintain rigid quality bars on every visual and software solution we architect.', icon: Award },
    { title: 'Innovation', desc: 'Continuously refining our syllabus & approaches to keep pace with global patterns.', icon: Star },
    { title: 'Integrity', desc: 'Transparent transactions, absolute security of user data, and zero hidden overheads.', icon: Shield },
    { title: 'Professionalism', desc: 'Expert developers & branding counselors supporting you from start to graduation.', icon: Users }
  ];

  const team = [
    {
      name: "Elijah Yahuza",
      role: "Lead Software Architect & Branding Consultant",
      bio: "10+ years architecting web portals, visual systems, and digital ecosystems for companies, school boards, and ministries.",
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=60"
    },
    {
      name: "Amara Okonkwo",
      role: "Lead Graphic Artist & UI Coordinator",
      bio: "Figma & Adobe suite expert focused on translating intricate business models into responsive and intuitive prototypes.",
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=60"
    }
  ];

  return (
    <div className="space-y-24 py-6 pb-20 max-w-7xl mx-auto px-6">
      {/* Page Title */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-secondary bg-brand-accent px-3.5 py-1.5 rounded-full">
          Get to Know Us
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary tracking-tight">
          Who We Are at <span className="text-brand-secondary">EJaytech Concepts</span>
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          EJaytech Concepts is a premium tech & digital solutions firm committed to helping software startups, businesses, organizations, ministries, and students establish dominant digital footprints.
        </p>
      </section>

      {/* Main Narrative card */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-brand-accent p-8 md:p-12 rounded-3xl border border-slate-100">
        <div className="relative">
          <div className="absolute -top-3 -left-3 w-12 h-12 bg-brand-secondary rounded-xl -z-10 opacity-30"></div>
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60" 
            alt="Collaborative session at EJaytech Concepts" 
            className="rounded-2xl shadow-lg w-full object-cover h-[350px]"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-brand-primary tracking-tight">Our Passion & Legacy</h2>
          <p className="text-slate-700 leading-relaxed text-sm md:text-base">
            We operate at the busy intersection of industrial design, visual design systems, software engineering, and community-driven tech skill integration. Our core purpose is two-fold:
          </p>
          <ul className="space-y-3 pt-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-brand-secondary font-bold text-lg leading-none select-none">•</span>
              <span><strong>Building Robust Solutions:</strong> Custom databases, branding portfolios, flyers, business sheets, and responsive deployment pathways for worldwide businesses.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-secondary font-bold text-lg leading-none select-none">•</span>
              <span><strong>Empowering Students:</strong> Translating complicated technologies into digestible, step-by-step practical modules that pave the way toward rewarding tech careers.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Mission & Vision Bento */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-brand-primary text-white p-8 md:p-12 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary rounded-full -z-5 blur-3xl opacity-10 group-hover:scale-125 transition-transform duration-500"></div>
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-xl bg-white/5 text-brand-secondary flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-white">Our Mission</h3>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              To provide robust, cutting-edge, and highly affordable technology solutions and skill development paths that supercharge businesses, agencies, and career-centric individuals.
            </p>
          </div>
          <span className="text-slate-500 text-xs mt-10 tracking-widest uppercase">EJaytech Concepts • Pursuit of Excellence</span>
        </div>

        <div className="bg-slate-900 text-white p-8 md:p-12 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary rounded-full -z-5 blur-3xl opacity-10 group-hover:scale-125 transition-transform duration-500"></div>
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-xl bg-white/5 text-brand-secondary flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-brand-secondary">Our Vision</h3>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              To become the most reliable globally aligned digital agency and career accelerator in Africa, trusted by millions for professional software code and visually supreme brand designs.
            </p>
          </div>
          <span className="text-slate-500 text-xs mt-10 tracking-widest uppercase">EJaytech Concepts • Future Blueprint</span>
        </div>
      </section>

      {/* Core Values */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-slate-900">Our Strategic Guiding Values</h2>
          <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base">
            These structural principles dictate how we assemble software, compile learning schedules, and maintain partner communications.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <div key={i} className="p-6 rounded-2xl border border-slate-100 bg-white hover:shadow-lg transition">
              <div className="w-10 h-10 rounded-lg bg-brand-accent text-brand-primary flex items-center justify-center mb-6">
                <v.icon className="w-5 h-5 text-brand-secondary" />
              </div>
              <h4 className="text-lg font-bold text-brand-primary mb-2">{v.title}</h4>
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Team */}
      <section className="space-y-12 bg-brand-accent p-8 md:p-12 rounded-3xl border border-slate-100">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-primary">Our Expert Instructors</h2>
          <p className="text-slate-600 text-sm md:text-base">
            Learn directly from active visual creators, branding specialists, and senior backend engineers committed to your success.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((t, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row gap-6 items-center">
              <img 
                src={t.img} 
                alt={t.name} 
                className="w-24 h-24 rounded-full object-cover border-4 border-brand-accent flex-shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-2 text-center md:text-left">
                <h4 className="text-lg font-bold text-brand-primary">{t.name}</h4>
                <p className="text-xs font-semibold text-brand-secondary uppercase">{t.role}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{t.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
