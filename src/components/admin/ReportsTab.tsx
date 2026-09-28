import React from 'react';
import { TestAttempt, Course, NoteItem } from '../../types';
import { BarChart3, TrendingUp, Award, CheckCircle2, Clock, Users, BookOpen } from 'lucide-react';

interface ReportsTabProps {
  attempts: TestAttempt[];
  courses: Course[];
  notes: NoteItem[];
}

export const ReportsTab: React.FC<ReportsTabProps> = ({ attempts, courses, notes }) => {
  // Aggregate stats
  const totalAttempts = attempts.length;
  const avgPercentage =
    totalAttempts > 0
      ? attempts.reduce((acc, a) => acc + a.percentage, 0) / totalAttempts
      : 0;

  const cetAttempts = attempts.filter((a) => a.exam === 'MHT-CET').length;
  const jeeAttempts = attempts.filter((a) => a.exam === 'JEE').length;
  const neetAttempts = attempts.filter((a) => a.exam === 'NEET').length;

  return (
    <div className="space-y-8 text-xs sm:text-sm">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
          Quiz & Test Performance Analytics
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Aggregated analytics on student test attempts, course interest distribution, and score accuracy.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft">
          <Clock className="w-5 h-5 text-brand-500 mb-2" />
          <span className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white">{totalAttempts}</span>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Total Tests Taken</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft">
          <TrendingUp className="w-5 h-5 text-emerald-500 mb-2" />
          <span className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white">
            {avgPercentage.toFixed(1)}%
          </span>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Average Test Accuracy</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft">
          <Award className="w-5 h-5 text-amber-500 mb-2" />
          <span className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white">
            {attempts.length > 0 ? Math.max(...attempts.map((a) => a.percentage)).toFixed(0) : 0}%
          </span>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Highest Mock Score</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft">
          <BookOpen className="w-5 h-5 text-purple-500 mb-2" />
          <span className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white">{notes.length}</span>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Active Study Resources</p>
        </div>
      </div>

      {/* Exam Distribution Visual Bars */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
        <h3 className="font-bold text-base text-navy-950 dark:text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-brand-600" />
          Student Participation by Exam Track
        </h3>

        <div className="space-y-4 pt-2">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span>MHT-CET Program</span>
              <span>{cetAttempts} tests ({totalAttempts > 0 ? ((cetAttempts / totalAttempts) * 100).toFixed(0) : 0}%)</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-orange-500 transition-all duration-500"
                style={{ width: `${totalAttempts > 0 ? (cetAttempts / totalAttempts) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span>JEE Main & Advanced</span>
              <span>{jeeAttempts} tests ({totalAttempts > 0 ? ((jeeAttempts / totalAttempts) * 100).toFixed(0) : 0}%)</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-500"
                style={{ width: `${totalAttempts > 0 ? (jeeAttempts / totalAttempts) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span>NEET-UG Medical</span>
              <span>{neetAttempts} tests ({totalAttempts > 0 ? ((neetAttempts / totalAttempts) * 100).toFixed(0) : 0}%)</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${totalAttempts > 0 ? (neetAttempts / totalAttempts) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Attempts Log Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-soft">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 font-bold text-sm text-navy-950 dark:text-white">
          All Student Test Submissions ({attempts.length})
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Student</th>
                <th className="p-4">Test Title</th>
                <th className="p-4">Exam</th>
                <th className="p-4">Score</th>
                <th className="p-4">Accuracy</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {attempts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No student attempts recorded yet.
                  </td>
                </tr>
              ) : (
                attempts.map((att) => (
                  <tr key={att.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-4 font-bold text-slate-900 dark:text-white">
                      {att.studentName}
                    </td>
                    <td className="p-4">{att.testTitle}</td>
                    <td className="p-4">
                      <span className="font-semibold text-brand-600">{att.exam}</span>
                    </td>
                    <td className="p-4 font-bold">
                      {att.score} / {att.maxMarks}
                    </td>
                    <td className="p-4">
                      <span
                        className={`font-extrabold ${
                          att.percentage >= 60 ? 'text-emerald-600' : 'text-amber-600'
                        }`}
                      >
                        {att.percentage.toFixed(0)}%
                      </span>
                    </td>
                    <td className="p-4 text-slate-400">
                      {new Date(att.completedAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
