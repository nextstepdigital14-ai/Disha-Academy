import React from 'react';
import { BatchInfo } from '../../types';
import { Clock, Calendar, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BatchScheduleCardProps {
  batch: BatchInfo;
  courseName: string;
}

export const BatchScheduleCard: React.FC<BatchScheduleCardProps> = ({ batch, courseName }) => {
  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-soft flex flex-col justify-between space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
            {batch.mode}
          </span>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {batch.seatsAvailable} of {batch.seatsTotal} seats open
          </span>
        </div>

        <h4 className="font-bold text-sm text-navy-950 dark:text-white leading-snug">
          {batch.name}
        </h4>

        <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-1">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span>{batch.timing}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
            <span>Commences: <strong>{batch.startDate}</strong></span>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 dark:border-slate-700/80">
        <Link
          to={`/admissions?course=${encodeURIComponent(courseName)}&batch=${encodeURIComponent(batch.name)}`}
          className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-700/60 hover:bg-brand-600 hover:text-white text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors group"
        >
          <span>Enquire For This Batch</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
