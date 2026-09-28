import React from 'react';
import {
  Users,
  FileText,
  CheckCircle2,
  Mail,
  GraduationCap,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { UserProfile, NoteItem, Course, TestAttempt, AdmissionEnquiry } from '../../types';
import { AdminTab } from './AdminSidebar';

interface OverviewTabProps {
  students: UserProfile[];
  notes: NoteItem[];
  courses: Course[];
  attempts: TestAttempt[];
  enquiries: AdmissionEnquiry[];
  onNavigateTab: (tab: AdminTab) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  students,
  notes,
  courses,
  attempts,
  enquiries,
  onNavigateTab
}) => {
  const pendingEnquiries = enquiries.filter(e => e.status === 'New').length;

  return (
    <div className="space-y-8">
      {/* Top Welcome Card */}
      <div className="bg-gradient-to-r from-navy-950 via-brand-900 to-navy-900 text-white rounded-3xl p-6 sm:p-8 shadow-premium">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">
              Management Portal
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Disha Academy Administration
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Overview of student engagement, study material uploads, test scores, and admission enquiries.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateTab('notes')}
              className="px-4 py-2.5 rounded-xl bg-white text-navy-950 hover:bg-slate-100 font-bold text-xs shadow-md transition-colors"
            >
              Upload PDF Note
            </button>
            <button
              onClick={() => onNavigateTab('mcq')}
              className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition-colors"
            >
              Add New MCQ
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div
          onClick={() => onNavigateTab('students')}
          className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft cursor-pointer hover:border-brand-500 transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white">{students.length}</span>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Registered Students</p>
        </div>

        <div
          onClick={() => onNavigateTab('notes')}
          className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft cursor-pointer hover:border-brand-500 transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white">{notes.length}</span>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Published Notes</p>
        </div>

        <div
          onClick={() => onNavigateTab('enquiries')}
          className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft cursor-pointer hover:border-brand-500 transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Mail className="w-5 h-5" />
            </div>
            {pendingEnquiries > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white">
                {pendingEnquiries} New
              </span>
            )}
          </div>
          <span className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white">{enquiries.length}</span>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Total Enquiries</p>
        </div>

        <div
          onClick={() => onNavigateTab('reports')}
          className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft cursor-pointer hover:border-brand-500 transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white">{attempts.length}</span>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Quiz Attempts</p>
        </div>
      </div>

      {/* Two Column Layout: Recent Enquiries & Recent Test Attempts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Enquiries Box */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-navy-950 dark:text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-600" />
              Latest Admission Enquiries
            </h3>
            <button
              onClick={() => onNavigateTab('enquiries')}
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              View All
            </button>
          </div>

          {enquiries.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-6">No enquiries received yet.</p>
          ) : (
            <div className="space-y-3">
              {enquiries.slice(0, 4).map((enq) => (
                <div
                  key={enq.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{enq.studentName}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {enq.interestedCourse} • Class {enq.studentClass} • {enq.mobileNumber}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      enq.status === 'New'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        : enq.status === 'Contacted'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}
                  >
                    {enq.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Quiz Attempts */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-navy-950 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Recent Student Test Attempts
            </h3>
            <button
              onClick={() => onNavigateTab('reports')}
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              View Analytics
            </button>
          </div>

          {attempts.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-6">No test attempts logged yet.</p>
          ) : (
            <div className="space-y-3">
              {attempts.slice(0, 4).map((att) => (
                <div
                  key={att.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{att.studentName}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {att.testTitle} ({att.exam})
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900 dark:text-white block">
                      {att.score} / {att.maxMarks}
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                      {att.percentage.toFixed(0)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
