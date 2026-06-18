/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  MessageSquare, 
  Globe, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

interface FAQListItem {
  q: string;
  a: string;
}

export default function Contact() {
  const [form, setForm] = useState({ fullname: '', email: '', subject: '', message: '' });
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const contactOptions = [
    { icon: Phone, title: 'Call Support Line', desc: '+234 813 540 2154', href: 'tel:+2348135402154' },
    { icon: Mail, title: 'Corporate Inquiries', desc: 'info@ejaytech.com', href: 'mailto:info@ejaytech.com' },
    { icon: MapPin, title: 'Physical Tech Space', desc: 'No. 12 Capital Plaza, Suite 4B, Garki, Abuja, Nigeria', href: '#' },
  ];

  const faqList: FAQListItem[] = [
    { q: 'How does the application process work at EJaytech Concepts?', a: 'Applying is simple! Choose a course, fill in the Registration form, and receive your unique Student ID automatically. Once our administrator reviews and approves your submission, you receive an email invite to configure your portal.' },
    { q: 'Can I pay for my professional courses in instalments?', a: 'Yes! We support flexible fee options. You can pay 60% upon registration approval and the remaining balance midway through your learning cycle.' },
    { q: 'Is there a physical training option or is it strictly online?', a: 'We offer an interactive hybrid model. Physical sessions take place at our Abuja office, while regional and global students attend live online coding classes with recorded access.' },
    { q: 'What certification will I receive after graduation?', a: 'You will receive an official, verifiable Certificate of Completion detailing your capstone projects, stack focus, and core training hours at EJaytech Concepts.' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullname || !form.email || !form.subject || !form.message) {
      setError('Please fill in all information parameters.');
      return;
    }

    setLoading(true);
    setMsg('');
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setMsg(data.message || 'Thank you! Your message was transmitted.');
        setForm({ fullname: '', email: '', subject: '', message: '' });
      } else {
        setError(data.error || 'Transmission failed.');
      }
    } catch {
      setError('Connectivity issue. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const triggerWhatsApp = () => {
    const text = encodeURIComponent('Hello EJaytech Concepts! I am interested in inquiring about your custom courses & training solutions.');
    window.open(`https://wa.me/2348135402154?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-24 py-6 pb-20 max-w-7xl mx-auto px-6">
      {/* Title */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-secondary bg-brand-accent px-3.5 py-1.5 rounded-full animate-pulse">
          Connect With Our Team
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary tracking-tight">
          How Can We Help <span className="text-brand-secondary">Your Vision?</span>
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Have an elaborate enterprise project to build, or would you like to enroll in an upcoming practical tech cohort? Drop a message!
        </p>
      </section>

      {/* Grid of contact details & Form */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Info options (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-brand-primary">Corporate Contacts</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Reach out directly to schedule a project scoping discussion or check physical lab learning slots.
            </p>
          </div>

          <div className="space-y-4">
            {contactOptions.map((opt, i) => (
              <a 
                key={i} 
                href={opt.href}
                className="flex items-start gap-4 p-5 rounded-2xl border border-slate-100 bg-brand-accent hover:border-brand-secondary/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-primary text-brand-secondary flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <opt.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{opt.title}</h4>
                  <p className="text-xs md:text-sm text-gray-500 font-medium mt-0.5">{opt.desc}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Social connections */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Join our community</h4>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Linkedin, href: '#' }
              ].map((soc, i) => (
                <a 
                  key={i} 
                  href={soc.href}
                  className="w-10 h-10 rounded-full border border-slate-200 text-slate-500 hover:text-brand-secondary hover:border-brand-secondary flex items-center justify-center transition"
                >
                  <soc.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Float WhatsApp CTA */}
            <div className="pt-4">
              <button 
                id="floating-whatsapp-trigger"
                onClick={triggerWhatsApp}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition shadow-lg cursor-pointer transform hover:-translate-y-0.5"
              >
                <MessageSquare className="w-5 h-5 animate-bounce" /> Live Chat on WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 md:p-10 rounded-3xl border border-slate-200">
          <div className="space-y-2 mb-8">
            <h3 className="text-xl font-bold text-slate-900">Transmit a Secure Inquiry</h3>
            <p className="text-xs md:text-sm text-gray-500">
              Submitted records are screened by our admin team using encrypted pathways.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-slate-600">Full Name</label>
                <input 
                  type="text" 
                  value={form.fullname}
                  onChange={(e) => setForm({ ...form, fullname: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-secondary rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none transition-all"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-slate-600">Email Address</label>
                <input 
                  type="email" 
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="e.g. johndoe@gmail.com"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-secondary rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-slate-600">Subject Interest</label>
              <input 
                type="text" 
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="e.g. Inquiring on Frontend Training Cohorts"
                className="w-full bg-slate-50 border border-slate-200 focus:border-brand-secondary rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none transition-all"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-slate-600">Your Detailed Message</label>
              <textarea 
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Describe your design parameters or specific technical questions..."
                className="w-full bg-slate-50 border border-slate-200 focus:border-brand-secondary rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none transition-all h-[140px] resize-none"
                required
              ></textarea>
            </div>

            {msg && (
              <p className="text-xs md:text-sm font-semibold text-emerald-600 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" /> {msg}
              </p>
            )}

            {error && (
              <p className="text-xs md:text-sm font-semibold text-rose-500">
                {error}
              </p>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-primary text-white hover:bg-brand-secondary hover:text-brand-primary font-bold rounded-xl transition cursor-pointer text-sm"
            >
              {loading ? 'Transmitting Inquiries...' : 'Transmit Secure Message'} <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section className="bg-brand-accent p-8 md:p-12 rounded-3xl border border-slate-100">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-10">
          <HelpCircle className="w-8 h-8 text-brand-secondary mx-auto animate-pulse" />
          <h2 className="text-2xl md:text-3xl font-bold text-brand-primary">Frequently Answered Questions</h2>
          <p className="text-slate-600 text-xs md:text-sm">
            Everything you need to learn regarding modern registration checklists, certificates, and student tools.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqList.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition duration-200"
              >
                <button 
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left font-bold text-brand-primary text-sm md:text-base flex justify-between items-center hover:bg-slate-50 transition"
                >
                  <span>{faq.q}</span>
                  <span className="text-lg font-mono text-brand-secondary">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Google Maps Embed Simulation */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-brand-primary font-bold">
          <MapPin className="w-5 h-5 text-brand-secondary" />
          <span>Interactive Location Guide</span>
        </div>
        <div className="h-80 bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 relative">
          {/* Authentic simulation container of Google Map embed with real look */}
          <div className="absolute inset-0 bg-slate-900 opacity-5"></div>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126093.81882006732!2d7.38722880721245!3d9.053151815197825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e745f4cd62e19%3A0xda129ef19cf9f538!2sGarki%2C%20Abuja%2C%20Nigeria!5e0!3m2!1sen!2s!4v1718700000000" 
            className="w-full h-full border-0"
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
