import React, { useState, useEffect } from 'react';
import { contentService } from '../services/contentService';
import { SiteSettings } from '../types';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { GallerySection } from '../components/home/GallerySection';
import { ShieldCheck, Target, Award, Compass, BookOpen, Users, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    contentService.getSettings().then(setSettings).catch(console.error);
  }, []);

  return (
    <div className="py-12 sm:py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* About Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4" /> Academic Legacy & Vision
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-950 dark:text-white tracking-tight">
            About Disha Academy & Olympiad School
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Established in Kolhapur to nurture scientific curiosity, conceptual rigor, and competitive exam discipline in Maharashtra’s young engineering and medical aspirants.
          </p>
        </div>

        {/* Narrative Section */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-soft grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white leading-tight">
              Shaping Academic Excellence in Kolhapur
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              At <strong>Disha Academy & Olympiad School</strong>, we bridge the critical gap between school board curriculums and high-pressure competitive examinations like MHT-CET, JEE Main/Advanced, and NEET-UG.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Our campus situated in Sane Guruji Vasahat, Kolhapur provides a quiet, distraction-free environment equipped with multimedia classrooms, demonstration labs, and individual mentoring rooms.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              We do not believe in rote memorization or overwhelming students with unstructured materials. Instead, we break down complex physics mechanics, organic synthesis pathways, advanced calculus, and genetics into intuitive, easily memorable mental frameworks.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <Link
                to="/admissions"
                className="px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
              >
                Apply for Upcoming Batch
              </Link>
              <Link
                to="/courses"
                className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors"
              >
                Explore Courses
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-xl border-4 border-slate-100 dark:border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
              alt="Disha Academy Classroom"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-navy-950 dark:text-white">Our Mission</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              To provide every student in Kolhapur and western Maharashtra with world-class exam preparation, ethical values, and personalized academic guidance without the need to relocate to distant coaching hubs.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-navy-950 dark:text-white">Olympiad School Focus</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Early foundation workshops for high school and junior college students to build strong logic, reasoning, and mathematical intuition for National and International Olympiads.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-navy-950 dark:text-white">Student Wellness</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              We maintain balanced schedules, regular stress-management talks, and open communication with parents to ensure students stay healthy and focused throughout their 2-year journey.
            </p>
          </div>
        </div>

      </div>

      {/* Faculty and Gallery Components */}
      <FeaturesSection facultyList={settings?.facultyList} />
      <GallerySection images={settings?.galleryImages} />
    </div>
  );
};
