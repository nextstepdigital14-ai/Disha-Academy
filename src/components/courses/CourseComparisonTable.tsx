import React from 'react';
import { Check, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CourseComparisonTable: React.FC = () => {
  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 shadow-soft bg-white dark:bg-slate-900">
      <table className="w-full text-left text-xs sm:text-sm">
        <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-navy-950 dark:text-white">
          <tr>
            <th className="p-4 sm:p-5 font-bold">Feature / Parameter</th>
            <th className="p-4 sm:p-5 font-bold text-orange-600 dark:text-orange-400">MHT-CET Program</th>
            <th className="p-4 sm:p-5 font-bold text-blue-600 dark:text-blue-400">JEE (Main & Adv)</th>
            <th className="p-4 sm:p-5 font-bold text-emerald-600 dark:text-emerald-400">NEET-UG Medical</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
          <tr>
            <td className="p-4 sm:p-5 font-bold text-slate-900 dark:text-white">Target Colleges</td>
            <td className="p-4 sm:p-5">COEP, VJTI, ICT, SPIT & Top Maharashtra Colleges</td>
            <td className="p-4 sm:p-5">IITs, NITs, IIITs, BITS Pilani & Central Institutes</td>
            <td className="p-4 sm:p-5">AIIMS, GMCs (KEM, BJMC, Kolhapur GMC), AFMC</td>
          </tr>
          <tr>
            <td className="p-4 sm:p-5 font-bold text-slate-900 dark:text-white">Exam Pattern</td>
            <td className="p-4 sm:p-5">CBT (Computer Based Test) by State CET Cell</td>
            <td className="p-4 sm:p-5">CBT (Computer Based Test) by NTA</td>
            <td className="p-4 sm:p-5">Pen & Paper OMR / CBT by NTA</td>
          </tr>
          <tr>
            <td className="p-4 sm:p-5 font-bold text-slate-900 dark:text-white">Total Marks</td>
            <td className="p-4 sm:p-5 font-semibold">200 Marks</td>
            <td className="p-4 sm:p-5 font-semibold">300 Marks</td>
            <td className="p-4 sm:p-5 font-semibold">720 Marks</td>
          </tr>
          <tr>
            <td className="p-4 sm:p-5 font-bold text-slate-900 dark:text-white">Negative Marking</td>
            <td className="p-4 sm:p-5 text-emerald-600 dark:text-emerald-400 font-bold">No Negative Marking</td>
            <td className="p-4 sm:p-5 text-rose-600 dark:text-rose-400 font-semibold">-1 per incorrect answer</td>
            <td className="p-4 sm:p-5 text-rose-600 dark:text-rose-400 font-semibold">-1 per incorrect answer</td>
          </tr>
          <tr>
            <td className="p-4 sm:p-5 font-bold text-slate-900 dark:text-white">Subjects Covered</td>
            <td className="p-4 sm:p-5">Physics, Chemistry, Maths (PCM) or Bio (PCB)</td>
            <td className="p-4 sm:p-5">Physics, Chemistry, Mathematics</td>
            <td className="p-4 sm:p-5">Physics, Chemistry, Biology (Botany & Zoology)</td>
          </tr>
          <tr>
            <td className="p-4 sm:p-5 font-bold text-slate-900 dark:text-white">Board Exam Integration</td>
            <td className="p-4 sm:p-5">HSC Maharashtra Board syllabus (100% aligned)</td>
            <td className="p-4 sm:p-5">CBSE & State Board conceptual foundation</td>
            <td className="p-4 sm:p-5">100% NCERT line-by-line decoding</td>
          </tr>
          <tr>
            <td className="p-4 sm:p-5 font-bold text-slate-900 dark:text-white">Simulated Mock Tests</td>
            <td className="p-4 sm:p-5">30+ Chapter Tests, 20 Full CBTs</td>
            <td className="p-4 sm:p-5">Weekly Rankers Mock Tests & PYQ Series</td>
            <td className="p-4 sm:p-5">35+ OMR Full Tests + High-Speed Bio Drills</td>
          </tr>
          <tr>
            <td className="p-4 sm:p-5 font-bold text-slate-900 dark:text-white">Detailed Info</td>
            <td className="p-4 sm:p-5">
              <Link to="/courses/mht-cet" className="text-brand-600 dark:text-brand-400 font-bold inline-flex items-center gap-1 hover:underline">
                View CET Details <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </td>
            <td className="p-4 sm:p-5">
              <Link to="/courses/jee" className="text-brand-600 dark:text-brand-400 font-bold inline-flex items-center gap-1 hover:underline">
                View JEE Details <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </td>
            <td className="p-4 sm:p-5">
              <Link to="/courses/neet" className="text-brand-600 dark:text-brand-400 font-bold inline-flex items-center gap-1 hover:underline">
                View NEET Details <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
