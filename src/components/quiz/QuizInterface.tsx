import React, { useState } from 'react';
import { Question, TestItem, TestAttempt } from '../../types';
import { QuestionPalette } from './QuestionPalette';
import { TimerBadge } from './TimerBadge';
import { SubmitConfirmModal } from './SubmitConfirmModal';
import { ResultView } from './ResultView';
import { quizService } from '../../services/quizService';
import { useAuth } from '../../context/AuthContext';
import {
  ChevronLeft,
  ChevronRight,
  BookmarkCheck,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ShieldAlert,
  Send
} from 'lucide-react';

interface QuizInterfaceProps {
  test: TestItem;
  questions: Question[];
  onExit: () => void;
}

export const QuizInterface: React.FC<QuizInterfaceProps> = ({ test, questions, onExit }) => {
  const { user } = useAuth();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [markedForReview, setMarkedForReview] = useState<string[]>([]);
  const [visitedQuestions, setVisitedQuestions] = useState<Set<number>>(new Set([0]));
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<TestAttempt | null>(null);
  const [startTime] = useState<number>(Date.now());
  const [showMobilePalette, setShowMobilePalette] = useState<boolean>(false);

  const currentQ = questions[currentIndex];
  if (!currentQ && !testResult) {
    return <div className="p-8 text-center text-slate-500">No questions available for this test.</div>;
  }

  // Answer selection handler
  const handleSelectOption = (optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));
  };

  const handleClearAnswer = () => {
    setUserAnswers((prev) => {
      const next = { ...prev };
      delete next[currentQ.id];
      return next;
    });
  };

  const handleToggleMarkForReview = () => {
    setMarkedForReview((prev) =>
      prev.includes(currentQ.id)
        ? prev.filter((id) => id !== currentQ.id)
        : [...prev, currentQ.id]
    );
  };

  const handleNavigate = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < questions.length) {
      setCurrentIndex(newIndex);
      setVisitedQuestions((prev) => new Set(prev).add(newIndex));
    }
  };

  // Final calculation of marks and saving
  const handleFinalSubmit = async () => {
    setIsSubmitModalOpen(false);
    const timeTakenSeconds = Math.round((Date.now() - startTime) / 1000);

    let correctCount = 0;
    let incorrectCount = 0;
    let attemptedCount = 0;
    let totalScore = 0;
    let maxMarks = 0;

    const chapterBreakdown: Record<string, { total: number; correct: number; incorrect: number }> = {};

    questions.forEach((q) => {
      const pos = q.positiveMarks ?? test.markingScheme.positive ?? 1;
      const neg = q.negativeMarks ?? test.markingScheme.negative ?? 0;
      maxMarks += pos;

      const ch = q.chapter || 'General';
      if (!chapterBreakdown[ch]) {
        chapterBreakdown[ch] = { total: 0, correct: 0, incorrect: 0 };
      }
      chapterBreakdown[ch].total++;

      const selected = userAnswers[q.id];
      if (selected !== undefined) {
        attemptedCount++;
        if (selected === q.correctOptionIndex) {
          correctCount++;
          totalScore += pos;
          chapterBreakdown[ch].correct++;
        } else {
          incorrectCount++;
          totalScore -= neg;
          chapterBreakdown[ch].incorrect++;
        }
      }
    });

    const unansweredCount = questions.length - attemptedCount;
    const percentage = maxMarks > 0 ? Math.max(0, (totalScore / maxMarks) * 100) : 0;

    const attemptData: Omit<TestAttempt, 'id'> = {
      studentId: user?.uid || 'guest-' + Date.now(),
      studentName: user?.displayName || 'Guest Aspirant',
      studentEmail: user?.email || 'guest@example.com',
      testId: test.id,
      testTitle: test.title,
      exam: test.exam,
      subject: test.subject,
      totalQuestions: questions.length,
      attemptedCount,
      correctCount,
      incorrectCount,
      unansweredCount,
      markedCount: markedForReview.length,
      score: totalScore,
      maxMarks,
      percentage,
      timeTakenSeconds,
      completedAt: new Date().toISOString(),
      userAnswers,
      markedForReview,
      chapterBreakdown
    };

    const saved = await quizService.saveAttempt(attemptData);
    setTestResult(saved);
  };

  if (testResult) {
    return (
      <ResultView
        attempt={testResult}
        questions={questions}
        onRetake={() => {
          setTestResult(null);
          setUserAnswers({});
          setMarkedForReview([]);
          setCurrentIndex(0);
          setVisitedQuestions(new Set([0]));
        }}
      />
    );
  }

  const answeredCount = Object.keys(userAnswers).length;
  const unansweredCount = questions.length - answeredCount;
  const isMarked = markedForReview.includes(currentQ.id);

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      {/* Test Interface Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-soft flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
              {test.exam}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              Subject: {currentQ.subject}
            </span>
          </div>
          <h2 className="font-extrabold text-base sm:text-lg text-navy-950 dark:text-white mt-1">
            {test.title}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Live Countdown Timer */}
          <TimerBadge
            totalSeconds={test.durationMinutes * 60}
            onTimeUp={handleFinalSubmit}
          />

          {/* Mobile palette toggle */}
          <button
            onClick={() => setShowMobilePalette(!showMobilePalette)}
            className="lg:hidden px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold"
          >
            {showMobilePalette ? 'Hide Palette' : 'Questions'}
          </button>

          {/* Submit Test Button */}
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Test</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Main Question Workspace */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-soft flex flex-col justify-between min-h-[500px]">
          
          <div className="space-y-6">
            {/* Question Top Subheader */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-navy-900 text-white flex items-center justify-center font-bold text-sm">
                  {currentIndex + 1}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  of {questions.length} Questions
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold">
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  +{currentQ.positiveMarks ?? test.markingScheme.positive}
                </span>
                <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                  -{currentQ.negativeMarks ?? test.markingScheme.negative}
                </span>
              </div>
            </div>

            {/* Chapter & Topic Breadcrumb */}
            <div className="text-xs text-brand-600 dark:text-brand-400 font-semibold">
              Chapter: {currentQ.chapter} {currentQ.topic ? `• ${currentQ.topic}` : ''}
            </div>

            {/* Question Text */}
            <div className="text-base sm:text-lg font-medium text-navy-950 dark:text-white leading-relaxed">
              {currentQ.questionText}
            </div>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((optText, optIdx) => {
                const isSelected = userAnswers[currentQ.id] === optIdx;

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3 text-xs sm:text-sm ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50/80 dark:bg-brand-950/60 text-brand-900 dark:text-brand-100 shadow-sm font-semibold'
                        : 'border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-brand-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="flex-1 pt-0.5 leading-snug">{optText}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Action Controls */}
          <div className="pt-8 mt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleMarkForReview}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  isMarked
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                }`}
              >
                <BookmarkCheck className="w-3.5 h-3.5" />
                <span>{isMarked ? 'Marked' : 'Mark for Review'}</span>
              </button>

              {userAnswers[currentQ.id] !== undefined && (
                <button
                  type="button"
                  onClick={handleClearAnswer}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                >
                  Clear Selection
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentIndex === 0}
                onClick={() => handleNavigate(currentIndex - 1)}
                className="inline-flex items-center gap-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (currentIndex < questions.length - 1) {
                    handleNavigate(currentIndex + 1);
                  } else {
                    setIsSubmitModalOpen(true);
                  }
                }}
                className="inline-flex items-center gap-1 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md transition-colors"
              >
                <span>{currentIndex === questions.length - 1 ? 'Save & Review' : 'Save & Next'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Question Palette */}
        <div className={`lg:col-span-4 ${showMobilePalette ? 'block' : 'hidden lg:block'}`}>
          <QuestionPalette
            questions={questions}
            currentIndex={currentIndex}
            userAnswers={userAnswers}
            markedForReview={markedForReview}
            visitedQuestions={visitedQuestions}
            onSelectQuestion={(idx) => {
              handleNavigate(idx);
              setShowMobilePalette(false);
            }}
          />

          <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-1">
            <p className="font-semibold text-slate-700 dark:text-slate-300">Exam Instructions:</p>
            <p>• Review all marked questions before submission.</p>
            <p>• Negative marking applies according to exam rules.</p>
            <p>• Test auto-submits when timer reaches 00:00.</p>
          </div>
        </div>

      </div>

      {/* Confirmation Modal */}
      <SubmitConfirmModal
        isOpen={isSubmitModalOpen}
        onCancel={() => setIsSubmitModalOpen(false)}
        onConfirm={handleFinalSubmit}
        totalQuestions={questions.length}
        attemptedCount={answeredCount}
        markedCount={markedForReview.length}
        unansweredCount={unansweredCount}
      />
    </div>
  );
};
