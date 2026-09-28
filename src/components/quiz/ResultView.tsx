import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  RotateCcw,
  BookOpen,
  ArrowRight,
  BarChart2,
  ChevronDown
} from 'lucide-react';
import { TestAttempt, Question } from '../../types';
import { Link } from 'react-router-dom';

interface ResultViewProps {
  attempt: TestAttempt;
  questions: Question[];
  onRetake: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ attempt, questions, onRetake }) => {
  useEffect(() => {
    if (attempt.percentage >= 60) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [attempt.percentage]);

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6">
      
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-br from-navy-900 via-brand-900 to-navy-950 text-white rounded-3xl p-6 sm:p-10 shadow-premium relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider">
              {attempt.exam} Assessment Report
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {attempt.testTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Completed on {new Date(attempt.completedAt).toLocaleString()}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/20">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-navy-950 flex items-center justify-center font-black text-2xl shadow-lg">
              <Trophy className="w-8 h-8" />
            </div>
            <div className="text-left">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Your Score</span>
              <div className="text-3xl sm:text-4xl font-black text-white">
                {attempt.score} <span className="text-lg font-normal text-slate-300">/ {attempt.maxMarks}</span>
              </div>
              <span className="text-xs font-bold text-amber-300">
                {attempt.percentage.toFixed(1)}% Accuracy
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft text-center">
          <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
          <span className="text-2xl font-black text-slate-900 dark:text-white">{attempt.correctCount}</span>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Correct Answers</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft text-center">
          <XCircle className="w-6 h-6 text-rose-500 mx-auto mb-2" />
          <span className="text-2xl font-black text-slate-900 dark:text-white">{attempt.incorrectCount}</span>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Incorrect Answers</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft text-center">
          <HelpCircle className="w-6 h-6 text-amber-500 mx-auto mb-2" />
          <span className="text-2xl font-black text-slate-900 dark:text-white">{attempt.unansweredCount}</span>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Unanswered</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft text-center">
          <Clock className="w-6 h-6 text-brand-500 mx-auto mb-2" />
          <span className="text-2xl font-black text-slate-900 dark:text-white">{formatSeconds(attempt.timeTakenSeconds)}</span>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Time Taken</p>
        </div>
      </div>

      {/* Chapter Breakdown Table */}
      {attempt.chapterBreakdown && Object.keys(attempt.chapterBreakdown).length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <h3 className="font-bold text-base text-navy-950 dark:text-white">Chapter-Wise Performance Breakdown</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3">Chapter</th>
                  <th className="p-3 text-center">Questions</th>
                  <th className="p-3 text-center">Correct</th>
                  <th className="p-3 text-center">Incorrect</th>
                  <th className="p-3 text-right">Accuracy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {Object.entries(attempt.chapterBreakdown).map(([ch, data]) => {
                  const acc = data.total > 0 ? (data.correct / data.total) * 100 : 0;
                  return (
                    <tr key={ch}>
                      <td className="p-3 font-semibold text-slate-900 dark:text-white">{ch}</td>
                      <td className="p-3 text-center">{data.total}</td>
                      <td className="p-3 text-center text-emerald-600 font-bold">{data.correct}</td>
                      <td className="p-3 text-center text-rose-600 font-bold">{data.incorrect}</td>
                      <td className="p-3 text-right font-bold text-slate-900 dark:text-white">{acc.toFixed(0)}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          onClick={onRetake}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-bold shadow-md transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Retake This Test</span>
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            to="/mcq-practice"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 py-3 px-5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span>Practice Another Topic</span>
          </Link>
          <Link
            to="/dashboard"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 py-3 px-5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs sm:text-sm font-bold transition-colors"
          >
            <span>Student Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Answer Key & In-Depth Explanations Section */}
      <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-xl text-navy-950 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-600" />
            Answer Key & Detailed Solutions
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {questions.length} Questions Reviewed
          </span>
        </div>

        <div className="space-y-6">
          {questions.map((q, idx) => {
            const userAnswer = attempt.userAnswers[q.id];
            const isCorrect = userAnswer === q.correctOptionIndex;
            const isUnanswered = userAnswer === undefined;

            return (
              <div
                key={q.id}
                className={`p-6 rounded-3xl border transition-all ${
                  isCorrect
                    ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
                    : isUnanswered
                    ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/60'
                    : 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/60'
                }`}
              >
                {/* Question Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-navy-900 text-white flex items-center justify-center font-bold text-xs">
                      Q{idx + 1}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {q.subject} • {q.chapter}
                    </span>
                  </div>

                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      isCorrect
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : isUnanswered
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    }`}
                  >
                    {isCorrect ? '✓ Correct' : isUnanswered ? '— Unattempted' : '✗ Incorrect'}
                  </span>
                </div>

                {/* Question Text */}
                <p className="font-semibold text-sm sm:text-base text-navy-950 dark:text-white leading-relaxed mb-4">
                  {q.questionText}
                </p>

                {/* Options List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {q.options.map((opt, optIdx) => {
                    const isUserChoice = userAnswer === optIdx;
                    const isRightChoice = q.correctOptionIndex === optIdx;

                    let optStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300';
                    if (isRightChoice) {
                      optStyle = 'border-emerald-500 bg-emerald-100/60 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 font-bold';
                    } else if (isUserChoice && !isCorrect) {
                      optStyle = 'border-rose-500 bg-rose-100/60 dark:bg-rose-950/80 text-rose-900 dark:text-rose-200 font-bold';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 transition-colors ${optStyle}`}
                      >
                        <span className="font-mono font-bold w-5 h-5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center text-xs flex-shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="flex-1">{opt}</span>
                        {isRightChoice && <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />}
                        {isUserChoice && !isCorrect && <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />}
                      </div>
                    );
                  })}
                </div>

                {/* In-Depth Explanation Box */}
                <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm leading-relaxed space-y-1">
                  <span className="font-bold text-brand-600 dark:text-brand-400 block text-xs uppercase tracking-wider">
                    Explanation:
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 font-normal">
                    {q.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
