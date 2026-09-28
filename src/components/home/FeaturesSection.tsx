import React from 'react';
import {
  Users,
  Award,
  BookOpen,
  HelpCircle,
  BarChart3,
  Clock,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { FacultyMember } from '../../types';

interface FeaturesSectionProps {
  facultyList?: FacultyMember[];
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ facultyList }) => {
  const features = [
    {
      icon: <Users className="w-6 h-6 text-brand-600 dark:text-brand-400" />,
      title: "Experienced Faculty Mentors",
      description: "Learn directly from seasoned subject matter experts with 12+ to 16+ years of specialized CET, JEE, and NEET coaching experience."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      title: "Simulated CBT & OMR Testing",
      description: "Weekly chapter tests, cumulative unit tests, and full-length simulated CBT mocks mirroring the exact NTA and State CET interface."
    },
    {
      icon: <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: "Curated Study Material & Notes",
      description: "Comprehensive printed theory modules, formula cheat-sheets, solved derivations, and online downloadable PDF notes for all chapters."
    },
    {
      icon: <HelpCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      title: "Daily 1-on-1 Doubt Solving",
      description: "Dedicated daily doubt resolution hours where students can sit with faculty to resolve conceptual hurdles without hesitation."
    },
    {
      icon: <Award className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: "Focused Small Batch Sizes",
      description: "Strict limits on student intake per batch ensure every student receives personalized attention and targeted performance guidance."
    },
    {
      icon: <Clock className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
      title: "Regular Parent Counseling",
      description: "Periodic progress reporting, attendance monitoring, and counselor meetings to keep students motivated and on track."
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> The Disha Advantage
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 dark:text-white tracking-tight">
            Why Students & Parents Choose Disha Academy
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Our student-centric academic ecosystem combines rigorous classroom pedagogy with continuous assessment and compassionate mentorship.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-brand-300 dark:hover:border-brand-700 transition-all duration-300 hover:shadow-soft group"
            >
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-navy-950 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Faculty Highlights Preview */}
        {facultyList && facultyList.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-100 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-xl font-bold text-navy-950 dark:text-white">
                  Meet Our Department Heads & Senior Faculty
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Experienced educators dedicated to student success in Kolhapur
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {facultyList.map((fac) => (
                <div
                  key={fac.id}
                  className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200 dark:border-slate-700/80 shadow-soft space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold text-base">
                    {fac.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-navy-950 dark:text-white">{fac.name}</h4>
                    <p className="text-xs font-semibold text-brand-600 dark:text-brand-400">{fac.role}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{fac.qualification}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
                    <span className="font-bold text-slate-800 dark:text-slate-200">Exp: {fac.experience}</span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{fac.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
