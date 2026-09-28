import React from 'react';
import { Link } from 'react-router-dom';
import { Target, CheckCircle2, Award, BookCheck, ArrowRight, ShieldCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "Conceptual Clarity",
      desc: "Fundamental concepts taught from ground up with visual derivations and board-aligned theory."
    },
    {
      num: "02",
      title: "Graded Practice Drills",
      desc: "Progress from fundamental NCERT/State Board questions to advanced multi-concept PYQs."
    },
    {
      num: "03",
      title: "Daily Doubt Solving",
      desc: "One-on-one sessions ensuring no student moves forward with unresolved queries."
    },
    {
      num: "04",
      title: "Simulated Testing",
      desc: "Weekly CBT & OMR testing with time management analysis and negative marking discipline."
    }
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" /> About Disha Academy
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 dark:text-white tracking-tight leading-tight">
              A Disciplined Environment Dedicated to Academic Excellence
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Located conveniently in Sane Guruji Vasahat on Radhanagari Road, Kolhapur, <strong>Disha Academy & Olympiad School</strong> provides premier preparatory coaching for MHT-CET, JEE Main & Advanced, and NEET-UG aspirants.
            </p>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              We believe every aspiring engineer and medical doctor can excel when provided with clear fundamental understanding, systematic revision routines, and genuine personal attention from dedicated mentors.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h4 className="text-lg font-bold text-brand-600 dark:text-brand-400">Class 11 & 12</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Integrated Board + Competitive Exam Foundation</p>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h4 className="text-lg font-bold text-amber-500">Repeater / Dropper</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">High-Intensity Test Series & Focused Revision</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 underline underline-offset-4"
              >
                <span>Read more about our institute and methodology</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Teaching Methodology Column */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-soft space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-navy-950 dark:text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-brand-600" />
                Our 4-Stage Teaching Methodology
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                A tested roadmap that transforms potential into consistent exam performance
              </p>
            </div>

            <div className="space-y-4">
              {steps.map((st) => (
                <div key={st.num} className="flex items-start gap-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <div className="w-9 h-9 rounded-lg bg-brand-600 text-white flex items-center justify-center font-extrabold text-sm flex-shrink-0 shadow-sm">
                    {st.num}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{st.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Want to experience a demo lecture?</span>
              <Link
                to="/admissions"
                className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
              >
                Register for Free Demo Class →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
