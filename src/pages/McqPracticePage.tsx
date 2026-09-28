import React, { useState, useEffect } from 'react';
import { quizService } from '../services/quizService';
import { TestItem, Question, TargetExam, SubjectType, TestAttempt } from '../types';
import { QuizConfigurator } from '../components/quiz/QuizConfigurator';
import { QuizInterface } from '../components/quiz/QuizInterface';
import { useAuth } from '../context/AuthContext';
import {
  CheckCircle2,
  Clock,
  Award,
  Play,
  Sparkles,
  BookOpen,
  RotateCcw,
  ArrowRight,
  TrendingUp,
  History
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const McqPracticePage: React.FC = () => {
  const { user } = useAuth();

  const [tests, setTests] = useState<TestItem[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [recentAttempts, setRecentAttempts] = useState<TestAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  // Active test execution state
  const [activeTest, setActiveTest] = useState<TestItem | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadData();
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [tList, qList, atts] = await Promise.all([
        quizService.getTests(),
        quizService.getQuestions(),
        quizService.getAttempts(user?.uid)
      ]);
      setTests(tList.filter((t) => t.isPublished));
      setQuestions(qList);
      setRecentAttempts(atts.slice(0, 3));
    } catch (err) {
      console.error('Failed to load quiz data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartPresetTest = (test: TestItem) => {
    // Collect questions belonging to test
    const testQs = questions.filter((q) => test.questionIds.includes(q.id));
    if (testQs.length === 0) {
      // Fallback: pick any questions of matching exam
      const fallback = questions.filter((q) => q.exam === test.exam).slice(0, 5);
      setActiveQuestions(fallback);
    } else {
      setActiveQuestions(testQs);
    }
    setActiveTest(test);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartCustomTest = async (params: {
    exam: TargetExam;
    subject: SubjectType | 'All';
    difficulty: 'Any' | 'Easy' | 'Medium' | 'Hard';
    questionCount: number;
    durationMinutes: number;
  }) => {
    const { test, questions: generatedQs } = await quizService.generateDynamicTest(params);
    if (generatedQs.length === 0) {
      alert(`No questions found matching ${params.exam} (${params.subject}). Please try another filter.`);
      return;
    }
    setActiveQuestions(generatedQs);
    setActiveTest(test);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If a test is actively running, render the full QuizInterface
  if (activeTest && activeQuestions.length > 0) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <QuizInterface
          test={activeTest}
          questions={activeQuestions}
          onExit={() => {
            setActiveTest(null);
            setActiveQuestions([]);
            loadData();
          }}
        />
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Banner Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" /> Interactive Testing Simulator
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-950 dark:text-white tracking-tight">
            Online MCQ Practice & Mock Series
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Practice exam-grade questions for MHT-CET, JEE Main, and NEET. Real-time timer, question palette, custom marking schemes with negative marks calculation, and in-depth step-by-step solutions.
          </p>
        </div>

        {/* Recent Attempts Alert for Logged In Students */}
        {recentAttempts.length > 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-navy-950 dark:text-white flex items-center gap-2">
                <History className="w-4 h-4 text-brand-600" />
                Your Recent Test Attempts
              </h3>
              <Link
                to="/dashboard"
                className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
              >
                View Full Scorecards in Dashboard →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recentAttempts.map((att) => (
                <div
                  key={att.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 dark:text-white line-clamp-1">{att.testTitle}</p>
                    <p className="text-[11px] text-slate-400">
                      {att.exam} • {new Date(att.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="font-black text-sm text-brand-600 dark:text-brand-400 block">
                      {att.score}/{att.maxMarks}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold">
                      {att.percentage.toFixed(0)}% Accuracy
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Two Columns: Configurator & Preset Mock Tests */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Preset Official Tests */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-1">
              <h3 className="text-2xl font-extrabold text-navy-950 dark:text-white">
                Preset Entrance Mock Tests
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Curated by faculty matching real exam duration and negative marking schemes.
              </p>
            </div>

            <div className="space-y-4">
              {tests.map((test) => {
                const isCet = test.exam === 'MHT-CET';
                const isJee = test.exam === 'JEE';

                return (
                  <div
                    key={test.id}
                    className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft hover:shadow-premium transition-all duration-300 flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                            isCet
                              ? 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300'
                              : isJee
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                              : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          }`}
                        >
                          {test.exam}
                        </span>

                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {test.durationMinutes} Minutes
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-navy-950 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {test.title}
                      </h4>

                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                        {test.description}
                      </p>

                      <div className="flex flex-wrap gap-3 pt-2 text-[11px] text-slate-500 dark:text-slate-400">
                        <span>
                          Questions: <strong>{test.questionIds.length}</strong>
                        </span>
                        <span>•</span>
                        <span>
                          Marks: <strong>{test.totalMarks}</strong>
                        </span>
                        <span>•</span>
                        <span>
                          Marking: <strong>+{test.markingScheme.positive} / -{test.markingScheme.negative}</strong>
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleStartPresetTest(test)}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all group-hover:scale-[1.01]"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Start This Mock Test</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Custom Test Generator */}
          <div className="lg:col-span-6 sticky top-28">
            <QuizConfigurator onStartCustomTest={handleStartCustomTest} />
          </div>

        </div>

      </div>
    </div>
  );
};
