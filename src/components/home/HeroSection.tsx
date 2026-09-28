import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  MessageCircle,
  GraduationCap,
  Award,
  BookOpen,
  CheckCircle2,
  MapPin,
  Sparkles
} from 'lucide-react';
import { SiteSettings } from '../../types';

interface HeroSectionProps {
  settings: SiteSettings | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ settings }) => {
  const whatsappNumber = settings?.whatsappNumber || '919028321505';
  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hello Disha Academy! I would like to know more about your CET/JEE/NEET courses and admission process.'
  )}`;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-950 py-16 lg:py-24 border-b border-slate-200/60 dark:border-slate-800">
      {/* Background Subtle Geometric Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-brand-400 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-amber-400 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Location & Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 text-xs font-semibold text-brand-700 dark:text-brand-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>Kolhapur’s Dedicated Center for CET, JEE & NEET</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-navy-950 dark:text-white tracking-tight leading-[1.15]">
              Your Journey to{' '}
              <span className="bg-gradient-to-r from-brand-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                CET, JEE & NEET
              </span>{' '}
              Success Starts Here.
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Structured preparation, experienced faculty guidance, comprehensive study material, regular simulated testing, and dedicated one-on-one doubt solving at Disha Academy & Olympiad School.
            </p>

            {/* Feature Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 max-w-lg mx-auto lg:mx-0 text-xs">
              <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-soft">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="font-semibold text-slate-700 dark:text-slate-200">Limited Batch Size</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-soft">
                <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0" />
                <span className="font-semibold text-slate-700 dark:text-slate-200">Chapter Tests & CBT</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-soft col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span className="font-semibold text-slate-700 dark:text-slate-200">Daily Doubt Support</span>
              </div>
            </div>

            {/* Primary & Secondary Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <Link
                to="/courses"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-premium hover:shadow-glow transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <BookOpen className="w-5 h-5" />
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </Link>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-premium transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Contact on WhatsApp</span>
              </a>
            </div>

            {/* Secondary Link to MCQ Practice */}
            <div className="pt-2 text-xs text-slate-500 dark:text-slate-400">
              <span>Looking for self-assessment? </span>
              <Link to="/mcq-practice" className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2 hover:text-brand-700">
                Try free interactive chapter MCQs →
              </Link>
            </div>
          </div>

          {/* Right Visual Card Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Image Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-white dark:bg-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80"
                  alt="Students studying in classroom at Disha Academy Kolhapur"
                  className="w-full h-80 sm:h-96 object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/50 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wider font-bold text-amber-500">2026-27 Batches</p>
                      <h4 className="text-sm font-bold text-navy-950 dark:text-white">Admissions Open (11th, 12th & Repeaters)</h4>
                    </div>
                    <Link
                      to="/admissions"
                      className="text-xs font-bold px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white transition-colors"
                    >
                      Enquire
                    </Link>
                  </div>
                </div>
              </div>

              {/* Floating Top Floating Card: Exam Tracks */}
              <div className="absolute -top-5 -left-5 bg-white dark:bg-slate-800 p-3.5 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-white">MHT-CET • JEE • NEET</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Structured 3-Tier Pedagogy</p>
                </div>
              </div>

              {/* Floating Bottom Card: Study Material */}
              <div className="absolute -bottom-5 -right-5 bg-white dark:bg-slate-800 p-3.5 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-white">Full Notes & CBT</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Chapter-wise Question Banks</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
