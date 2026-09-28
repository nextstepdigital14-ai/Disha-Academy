import React from 'react';
import { AlertCircle, CheckCircle2, Clock, X } from 'lucide-react';

interface SubmitConfirmModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  totalQuestions: number;
  attemptedCount: number;
  markedCount: number;
  unansweredCount: number;
}

export const SubmitConfirmModal: React.FC<SubmitConfirmModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
  totalQuestions,
  attemptedCount,
  markedCount,
  unansweredCount
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-navy-950 dark:text-white">Submit Test?</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Review your attempt before submitting</p>
            </div>
          </div>
          <button onClick={onCancel} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats summary table */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40">
            <span className="block text-2xl font-black text-emerald-600 dark:text-emerald-400">{attemptedCount}</span>
            <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">Answered</span>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/40">
            <span className="block text-2xl font-black text-amber-600 dark:text-amber-400">{unansweredCount}</span>
            <span className="text-[11px] font-semibold text-amber-800 dark:text-amber-300">Unanswered</span>
          </div>

          <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/40">
            <span className="block text-2xl font-black text-purple-600 dark:text-purple-400">{markedCount}</span>
            <span className="text-[11px] font-semibold text-purple-800 dark:text-purple-300">Marked Review</span>
          </div>
        </div>

        {unansweredCount > 0 && (
          <p className="text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-200 dark:border-amber-900/50 leading-relaxed">
            ⚠️ You still have <strong>{unansweredCount} unanswered questions</strong>. Once submitted, answers cannot be edited.
          </p>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Return to Test
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md transition-colors"
          >
            Confirm & Finish
          </button>
        </div>
      </div>
    </div>
  );
};
