/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Code, Palette, Laptop, Settings, CheckCircle2, ChevronRight, BarChart, Server } from 'lucide-react';

export default function Services() {
  const serviceDetails = [
    {
      title: "Web Development Processes",
      icon: Code,
      desc: "We design and deploy modern, high-intensity responsive websites and custom school or database systems.",
      pts: ["React / Vite & Node architectures", "Educational Portal management platforms", "SEO optimized search engine profiles", "Continuous server care & database replication"]
    },
    {
      title: "Graphic Design & Artworks",
      icon: Palette,
      desc: "Delivering visual branding packages, manuals, promotional flyers, and corporate templates that build immediate confidence.",
      pts: ["Canva Pro corporate presets", "Logo brand guidelines & typography manuals", "Social media campaign artwork boards", "Brochures, magazines & print advertising assets"]
    },
    {
      title: "Software & IT Support Nodes",
      icon: Laptop,
      desc: "Installation, maintenance, and technical backup for agency hardware, private servers, and administrative computers.",
      pts: ["Hardware installation consultations", "Encrypted private networks (VPN)", "Continuous malware security check logs", "Technical staffing backup options"]
    },
    {
      title: "Interactive Consultations",
      icon: Settings,
      desc: "We align digital setups and curriculum methodologies with regional regulatory parameters for ultimate security.",
      pts: ["Enterprise system blueprints", "Educational digitization roadmaps", "Professional digital workflow trainings", "Database optimization inspections"]
    }
  ];

  return (
    <div className="space-y-24 py-6 pb-20 max-w-7xl mx-auto px-6">
      {/* Services Title list */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-secondary bg-brand-accent px-3.5 py-1.5 rounded-full">
          What We Deliver
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary tracking-tight">
          Our Advanced <span className="text-brand-secondary">Core Services</span>
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed text-sm md:text-base">
          At EJaytech Concepts, we merge sophisticated software layouts with delightful visual brand artwork assemblies.
        </p>
      </section>

      {/* Grid List */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {serviceDetails.map((detStr, i) => (
          <div key={i} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg hover:shadow-2xl transition duration-300 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-accent text-brand-primary flex items-center justify-center flex-shrink-0">
                <detStr.icon className="w-6 h-6 text-brand-secondary" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-brand-primary font-display">{detStr.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{detStr.desc}</p>
              </div>
              
              <div className="space-y-2 pt-2 border-t border-slate-100">
                {detStr.pts.map((pt, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs md:text-sm text-slate-700 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <a 
                href="https://wa.me/2348135402154?text=Hello%20EJaytech%20Concepts!%20I%20am%20inquiring%20about%20your%20services."
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-secondary hover:text-brand-primary transition"
              >
                Inquire For This Space <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
