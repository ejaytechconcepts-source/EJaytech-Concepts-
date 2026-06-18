/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Clock, 
  CreditCard, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Course } from '../types';

interface CoursesProps {
  onNavigate: (page: string) => void;
  onApplyCourse: (courseTitle: string) => void;
}

export default function Courses({ onNavigate, onApplyCourse }: CoursesProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch('/api/courses');
        const data = await res.json();
        if (data.courses) {
          setCourses(data.courses);
        }
      } catch (err) {
        console.error('Error fetching courses list', err);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  const toggleExpand = (id: string) => {
    if (expandedCourse === id) {
      setExpandedCourse(null);
    } else {
      setExpandedCourse(id);
    }
  };

  const localCourseExtras: Record<string, { learns: string[], banner: string }> = {
    'course-1': {
      learns: ['HTML5 Standard & Semantics', 'CSS3 Layouts, Grid, Flexbox', 'Vanilla JavaScript (ES6+)', 'Bootstrap 5 Framework', 'Responsive Visual Design', 'Git & GitHub Workflows', 'Live Cloud Server Deployment'],
      banner: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop&q=60'
    },
    'course-2': {
      learns: ['Canva Design System Integration', 'Photoshop Advanced Compositions', 'Visual Branding Manuals', 'Logo Typography & Concepting', 'Promotional Social Media Ad Flyers', 'Print Layouts & Vector Basics'],
      banner: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=60'
    },
    'course-3': {
      learns: ['User Research Techniques', 'Interactive wireframing (Lo-fi)', 'High Fidelity Prototyping', 'Figma Design System Libraries', 'Usability Evaluation Labs', 'Developer handoff specs'],
      banner: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&auto=format&fit=crop&q=60'
    },
    'course-4': {
      learns: ['Freelance Profile setup (Upwork, Fiverr)', 'Creating high-response Proposals', 'Personal Branding & LinkedIn setups', 'Digital Marketing funnel systems', 'Personal Content Calendars'],
      banner: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60'
    }
  };

  return (
    <div className="space-y-16 py-6 pb-20 max-w-7xl mx-auto px-6">
      {/* Header section */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-secondary bg-brand-accent px-3.5 py-1.5 rounded-full">
          Intensive Training Tracks
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary tracking-tight">
          Explore Our <span className="text-brand-secondary">Specialized Courses</span>
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Unlock standard modules carefully curated to move you from complete beginner to client-ready technologist within weeks.
        </p>
      </section>

      {/* Courses Catalog Block */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4 text-slate-500 font-mono text-sm">
          <div className="w-10 h-10 border-4 border-brand-secondary border-t-transparent rounded-full animate-spin"></div>
          <p>Compiling curriculum schedules...</p>
        </div>
      ) : (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {courses.map((course) => {
            const extra = localCourseExtras[course.id] || { learns: [], banner: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60' };
            const isExpanded = expandedCourse === course.id;

            return (
              <div 
                key={course.id} 
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 transition duration-300 hover:shadow-2xl flex flex-col justify-between"
              >
                {/* Visual Header */}
                <div>
                  <div className="relative h-56 w-full">
                    <img 
                      src={extra.banner} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-secondary text-brand-primary">
                        <BookOpen className="w-3.5 h-3.5" /> Certified Course
                      </span>
                    </div>
                  </div>

                  {/* Core Details */}
                  <div className="p-6 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-extrabold text-brand-primary font-display">{course.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{course.description}</p>
                    </div>

                    {/* Stats strip */}
                    <div className="grid grid-cols-2 gap-4 bg-brand-accent p-4 rounded-2xl text-xs md:text-sm font-semibold text-brand-primary">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-brand-secondary" />
                        <span><strong>Duration:</strong> {course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-brand-secondary" />
                        <span><strong>Fee:</strong> {course.fee}</span>
                      </div>
                    </div>

                    {/* What Students Will Learn */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-extrabold text-brand-primary uppercase tracking-wider">What You Will Master:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {extra.learns.map((item, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs md:text-sm text-slate-700">
                            <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Syllabus accordion drop-down */}
                    <div className="border-t border-slate-100 pt-4">
                      <button 
                        onClick={() => toggleExpand(course.id)}
                        className="flex items-center justify-between w-full text-left text-xs font-bold text-slate-500 hover:text-brand-secondary transition"
                      >
                        <span>VIEW COMPLETE SYLLABUS LESSONS ({course.syllabus?.length || 0})</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {isExpanded && course.syllabus && (
                        <div className="mt-3 space-y-2.5 pl-2 border-l-2 border-brand-secondary/30">
                          {course.syllabus.map((lesson, idx) => (
                            <div key={idx} className="text-xs md:text-sm text-slate-600 flex gap-2">
                              <span className="font-mono text-brand-secondary font-bold">Week {idx + 1}:</span>
                              <span>{lesson}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Call to Active */}
                <div className="p-6 bg-brand-accent/50 border-t border-slate-100 flex gap-4">
                  <button 
                    onClick={() => onApplyCourse(course.title)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-brand-primary text-white hover:bg-brand-secondary hover:text-brand-primary font-bold rounded-xl transition cursor-pointer text-xs md:text-sm"
                  >
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => onNavigate('login')}
                    className="px-4 py-3.5 text-center text-xs md:text-sm font-bold text-slate-600 hover:text-brand-primary transition"
                  >
                    Student Space Login
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* Trust & Accreditations strip */}
      <section className="bg-brand-primary text-white rounded-3xl p-8 text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-2">
          <ShieldCheck className="w-12 h-12 text-brand-secondary mx-auto" />
          <h3 className="text-xl md:text-2xl font-bold">EJaytech Concepts Standard of Professionalism</h3>
          <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
            Upon successful implementation of your core capstone student project and 80%+ cumulative evaluation scores, you are issued an official, verifiable digital training certificate signed by lead software architects.
          </p>
        </div>
      </section>
    </div>
  );
}
