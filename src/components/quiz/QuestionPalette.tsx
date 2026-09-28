import React from 'react';
import { Question } from '../../types';

interface QuestionPaletteProps {
  questions: Question[];
  currentIndex: number;
  userAnswers: Record<string, number>;
  markedForReview: string[];
  visitedQuestions: Set<number>;
  onSelectQuestion: (index: number) => void;
}

export const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  questions,
  currentIndex,
  userAnswers,
  markedForReview,
  visitedQuestions,
  onSelectQuestion
}) => {
  let answeredCount = 0;
  let markedCount = 0;
  let notAnsweredCount = 0;
  let notVisitedCount = 0;

  questions.forEach((q, idx) => {
    const isAnswered = userAnswers[q.id] !== undefined;
    const isMarked = markedForReview.includes(q.id);
    const isVisited = visitedQuestions.has(idx);

    if (isAnswered) answeredCount++;
    if (isMarked) markedCount++;
    if (isVisited && !isAnswered) notAnsweredCount++;
    if (!isVisited) notVisitedCount++;
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-4">
      <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
        Question Palette ({questions.length} Questions)
      </h4>

      {/* Status Legend */}
      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-md bg-emerald-500 text-white flex items-center justify-center font-bold text-[10px]">
            {answeredCount}
          </span>
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-md bg-amber-500 text-white flex items-center justify-center font-bold text-[10px]">
            {notAnsweredCount}
          </span>
          <span>Unanswered</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-md bg-purple-600 text-white flex items-center justify-center font-bold text-[10px]">
            {markedCount}
          </span>
          <span>Marked Review</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-[10px]">
            {notVisitedCount}
          </span>
          <span>Not Visited</span>
        </div>
      </div>

      {/* Numbers Grid */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="grid grid-cols-5 gap-2 max-h-56 overflow-y-auto pr-1">
          {questions.map((q, idx) => {
            const isCurrent = currentIndex === idx;
            const isAnswered = userAnswers[q.id] !== undefined;
            const isMarked = markedForReview.includes(q.id);
            const isVisited = visitedQuestions.has(idx);

            let bgClass = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200';
            if (isMarked) {
              bgClass = 'bg-purple-600 text-white hover:bg-purple-700';
            } else if (isAnswered) {
              bgClass = 'bg-emerald-500 text-white hover:bg-emerald-600';
            } else if (isVisited) {
              bgClass = 'bg-amber-500 text-white hover:bg-amber-600';
            }

            return (
              <button
                key={q.id}
                onClick={() => onSelectQuestion(idx)}
                className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${bgClass} ${
                  isCurrent ? 'ring-2 ring-brand-500 ring-offset-2 dark:ring-offset-slate-900 scale-105' : ''
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
