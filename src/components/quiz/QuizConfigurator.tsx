import React, { useState } from 'react';
import { TargetExam, SubjectType } from '../../types';
import { Play, Sparkles, BookOpen, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface QuizConfiguratorProps {
  onStartCustomTest: (params: {
    exam: TargetExam;
    subject: SubjectType | 'All';
    difficulty: 'Any' | 'Easy' | 'Medium' | 'Hard';
    questionCount: number;
    durationMinutes: number;
  }) => void;
}

export const QuizConfigurator: React.FC<QuizConfiguratorProps> = ({ onStartCustomTest }) => {
  const [exam, setExam] = useState<TargetExam>('MHT-CET');
  const [subject, setSubject] = useState<SubjectType | 'All'>('All');
  const [difficulty, setDifficulty] = useState<'Any' | 'Easy' | 'Medium' | 'Hard'>('Any');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [durationMinutes, setDurationMinutes] = useState<number>(10);

  const availableSubjects: (SubjectType | 'All')[] =
    exam === 'JEE'
      ? ['All', 'Physics', 'Chemistry', 'Mathematics']
      : ['All', 'Physics', 'Chemistry', 'Mathematics', 'Biology'];

  const handleStart = () => {
    onStartCustomTest({
      exam,
      subject,
      difficulty,
      questionCount,
      durationMinutes
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-soft space-y-6">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Self-Assessment Simulator
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
          Configure Custom Practice Test
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Tailor exam type, subject focus, question count, and time limit to sharpen your speed and accuracy.
        </p>
      </div>

      <div className="space-y-5 text-xs sm:text-sm">
        {/* Step 1: Target Exam */}
        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-2">
            1. Select Target Exam:
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(['MHT-CET', 'JEE', 'NEET'] as TargetExam[]).map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => {
                  setExam(ex);
                  if (ex === 'JEE' && subject === 'Biology') setSubject('All');
                }}
                className={`py-3 px-4 rounded-2xl font-bold border transition-all text-center ${
                  exam === ex
                    ? 'bg-brand-600 text-white border-brand-600 shadow-md scale-[1.02]'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Subject */}
        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-2">
            2. Subject Focus:
          </label>
          <div className="flex flex-wrap gap-2">
            {availableSubjects.map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => setSubject(sub)}
                className={`py-2 px-3.5 rounded-xl font-semibold border transition-all ${
                  subject === sub
                    ? 'bg-navy-900 text-white dark:bg-brand-600 border-navy-900 dark:border-brand-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                {sub === 'All' ? 'All Subjects (Full Syllabus)' : sub}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Difficulty & Question Count */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-2">
              3. Difficulty Level:
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['Any', 'Easy', 'Medium', 'Hard'] as const).map((dif) => (
                <button
                  key={dif}
                  type="button"
                  onClick={() => setDifficulty(dif)}
                  className={`py-2 px-2 text-center rounded-xl font-bold text-xs border transition-all ${
                    difficulty === dif
                      ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {dif}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-2">
              4. Number of Questions & Time:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { count: 5, mins: 10 },
                { count: 10, mins: 15 },
                { count: 15, mins: 25 }
              ].map((opt) => (
                <button
                  key={opt.count}
                  type="button"
                  onClick={() => {
                    setQuestionCount(opt.count);
                    setDurationMinutes(opt.mins);
                  }}
                  className={`py-2 px-2 text-center rounded-xl font-bold text-xs border transition-all ${
                    questionCount === opt.count
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {opt.count} Qs ({opt.mins}m)
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className="pt-2">
        <button
          onClick={handleStart}
          className="w-full inline-flex items-center justify-center gap-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm sm:text-base py-3.5 px-6 rounded-2xl shadow-premium hover:shadow-glow transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>Launch Practice Test ({exam} • {questionCount} Questions)</span>
        </button>
      </div>
    </div>
  );
};
