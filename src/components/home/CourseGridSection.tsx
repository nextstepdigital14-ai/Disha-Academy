import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../../types';
import { ArrowRight, CheckCircle2, Users, Calendar, MessageCircle } from 'lucide-react';

interface CourseGridSectionProps {
  courses: Course[];
  whatsappNumber: string;
}

export const CourseGridSection: React.FC<CourseGridSectionProps> = ({ courses, whatsappNumber }) => {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase tracking-wider">
            Targeted Academic Programs
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 dark:text-white tracking-tight">
            Specialized Coaching for MHT-CET, JEE & NEET
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Every course combines conceptual classroom lectures with chapter-wise problem sets, regular Computer Based Tests (CBT), and personal mentorship.
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => {
            const waEnquiryUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              `Hello Disha Academy! I would like to enquire about the ${course.name} batch and admissions.`
            )}`;

            return (
              <div
                key={course.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-soft hover:shadow-premium transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
              >
                {/* Card Header & Badge */}
                <div className="p-6 sm:p-7 border-b border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                      {course.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {course.duration}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-navy-950 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {course.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {course.shortDesc}
                  </p>

                  {/* Subject Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {course.subjects.map((sub) => (
                      <span
                        key={sub}
                        className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Features List */}
                <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Program Highlights</p>
                    {course.features.slice(0, 4).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Batch snapshot */}
                  {course.batches.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 -mx-6 -mb-6 p-4 px-6 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-brand-500" />
                          <span>Next Batch: {course.batches[0].startDate}</span>
                        </div>
                        <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                          <Users className="w-3.5 h-3.5" />
                          <span>{course.batches[0].seatsAvailable} seats left</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                        Timing: {course.batches[0].timing}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="p-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                  <Link
                    to={`/courses/${course.slug}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-brand-50 dark:bg-brand-950/60 hover:bg-brand-100 dark:hover:bg-brand-900/60 text-brand-700 dark:text-brand-300 text-xs sm:text-sm font-bold py-2.5 px-3 rounded-xl transition-colors"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href={waEnquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center p-2.5 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300 rounded-xl transition-colors"
                    title="Enquire on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA for Course Comparison */}
        <div className="mt-12 text-center">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 underline underline-offset-4"
          >
            <span>Compare full syllabus, marking schemes, and fee details across all courses →</span>
          </Link>
        </div>

      </div>
    </section>
  );
};
