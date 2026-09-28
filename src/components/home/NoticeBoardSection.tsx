import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Calendar, ArrowRight, AlertCircle, FileText, CheckCircle } from 'lucide-react';
import { Announcement } from '../../types';

interface NoticeBoardSectionProps {
  announcements: Announcement[];
}

export const NoticeBoardSection: React.FC<NoticeBoardSectionProps> = ({ announcements }) => {
  const activeAnnouncements = announcements.filter(a => a.isActive);

  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Bell className="w-3.5 h-3.5" /> Notice Board
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white tracking-tight">
              Latest Announcements & Test Schedules
            </h2>
          </div>
          <Link
            to="/admissions"
            className="text-xs sm:text-sm font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
          >
            <span>View all admission updates</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeAnnouncements.map((ann) => {
            const isUrgent = ann.priority === 'Urgent';
            const isHigh = ann.priority === 'High';

            return (
              <div
                key={ann.id}
                className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-soft flex flex-col justify-between ${
                  isUrgent
                    ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60'
                    : isHigh
                    ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/60'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={`font-bold px-2 py-0.5 rounded ${
                        isUrgent
                          ? 'bg-rose-600 text-white'
                          : isHigh
                          ? 'bg-amber-500 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {ann.category}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-[11px]">
                      <Calendar className="w-3 h-3" /> {ann.createdAt}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-navy-950 dark:text-white leading-snug">
                    {ann.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {ann.content}
                  </p>
                </div>

                {ann.linkUrl && (
                  <div className="pt-4 mt-4 border-t border-slate-200/60 dark:border-slate-700/60">
                    <Link
                      to={ann.linkUrl}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
                    >
                      <span>{ann.linkText || 'Learn More'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
