import React, { useState, useEffect } from 'react';
import { CourseGridSection } from '../components/home/CourseGridSection';
import { CourseComparisonTable } from '../components/courses/CourseComparisonTable';
import { contentService } from '../services/contentService';
import { Course, SiteSettings } from '../types';
import { GraduationCap, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    contentService.getCourses().then(setCourses).catch(console.error);
    contentService.getSettings().then(setSettings).catch(console.error);
  }, []);

  const whatsappNumber = settings?.whatsappNumber || '919028321505';

  return (
    <div className="py-12 sm:py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Banner Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" /> Academic Coaching Programs
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-950 dark:text-white tracking-tight">
            Targeted Entrance Coaching for CET, JEE & NEET
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Choose the program tailored to your career aspirations in Engineering or Medicine. Every course provides full board integration, experienced faculty mentorship, and regular Computer Based Testing.
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="pt-8">
          <CourseGridSection courses={courses} whatsappNumber={whatsappNumber} />
        </div>

        {/* Comprehensive Comparison Table */}
        <div className="pt-12 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white">
              Course Comparison & Exam Formats
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Understand the key differences between MHT-CET, JEE Main/Advanced, and NEET exam patterns and marking schemes.
            </p>
          </div>

          <CourseComparisonTable />
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-gradient-to-r from-navy-950 via-brand-900 to-navy-900 text-white rounded-3xl p-8 sm:p-12 shadow-premium text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Need Guidance Choosing the Right Stream?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Our experienced academic counselors can help evaluate your strengths, target percentiles, and guide you towards the most suitable batch.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/admissions"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition-colors"
            >
              Request Free Counseling Session
            </Link>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello Disha Academy! I would like to speak with an academic counselor regarding course selection.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm shadow-md transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
