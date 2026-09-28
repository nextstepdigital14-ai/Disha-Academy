import React from 'react';
import { Quote, Star, Award, GraduationCap } from 'lucide-react';
import { Testimonial } from '../../types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Quote className="w-3.5 h-3.5" /> Student Experiences
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 dark:text-white tracking-tight">
            Hear From Our Students
          </h2>
          <div className="inline-block bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 px-3 py-1 rounded-lg">
            <p className="text-xs text-amber-800 dark:text-amber-300 font-medium">
              ℹ️ Note: Editable sample placeholders clearly marked as demo content. Can be updated with verified student results in Admin Panel.
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-7 border border-slate-200 dark:border-slate-800 shadow-soft hover:shadow-premium transition-all duration-300 flex flex-col justify-between relative group"
            >
              {/* Demo Badge */}
              {t.isDemo && (
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
                    Sample Demo
                  </span>
                </div>
              )}

              <div className="space-y-4">
                {/* Score & Exam Badge */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                    {t.exam}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                    {t.scoreOrRank}
                  </span>
                </div>

                {/* Content */}
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed italic">
                  &quot;{t.content}&quot;
                </p>
              </div>

              {/* Student Info Footer */}
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  {t.studentName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-navy-950 dark:text-white">
                    {t.studentName}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                    {t.college} ({t.year})
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
