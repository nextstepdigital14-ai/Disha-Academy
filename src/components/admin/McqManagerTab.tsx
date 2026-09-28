import React, { useState } from 'react';
import { Question, TestItem, TargetExam, SubjectType } from '../../types';
import { quizService } from '../../services/quizService';
import {
  Plus,
  Trash2,
  Edit,
  Search,
  CheckCircle2,
  X,
  FileQuestion,
  Sparkles
} from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

interface McqManagerTabProps {
  questions: Question[];
  tests: TestItem[];
  onRefresh: () => void;
}

export const McqManagerTab: React.FC<McqManagerTabProps> = ({
  questions,
  tests,
  onRefresh
}) => {
  const { showToast } = useNotification();

  const [activeSubTab, setActiveSubTab] = useState<'questions' | 'tests'>('questions');
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [search, setSearch] = useState('');
  const [filterExam, setFilterExam] = useState<string>('All');
  const [filterSubject, setFilterSubject] = useState<string>('All');

  // Question Form states
  const [exam, setExam] = useState<TargetExam>('MHT-CET');
  const [subject, setSubject] = useState<SubjectType>('Physics');
  const [chapter, setChapter] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState<[string, string, string, string]>(['', '', '', '']);
  const [correctOptionIndex, setCorrectOptionIndex] = useState<number>(0);
  const [explanation, setExplanation] = useState('');
  const [positiveMarks, setPositiveMarks] = useState<number>(1);
  const [negativeMarks, setNegativeMarks] = useState<number>(0);

  const resetForm = () => {
    setExam('MHT-CET');
    setSubject('Physics');
    setChapter('');
    setTopic('');
    setDifficulty('Medium');
    setQuestionText('');
    setOptions(['', '', '', '']);
    setCorrectOptionIndex(0);
    setExplanation('');
    setPositiveMarks(1);
    setNegativeMarks(0);
    setEditingQuestion(null);
    setIsQuestionModalOpen(false);
  };

  const handleStartEdit = (q: Question) => {
    setEditingQuestion(q);
    setExam(q.exam);
    setSubject(q.subject);
    setChapter(q.chapter);
    setTopic(q.topic || '');
    setDifficulty(q.difficulty);
    setQuestionText(q.questionText);
    setOptions([...q.options] as [string, string, string, string]);
    setCorrectOptionIndex(q.correctOptionIndex);
    setExplanation(q.explanation);
    setPositiveMarks(q.positiveMarks);
    setNegativeMarks(q.negativeMarks);
    setIsQuestionModalOpen(true);
  };

  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();

    if (options.some((opt) => opt.trim() === '')) {
      showToast('Please fill all 4 answer options.', 'warning');
      return;
    }

    try {
      if (editingQuestion) {
        await quizService.updateQuestion(editingQuestion.id, {
          exam,
          subject,
          chapter,
          topic,
          difficulty,
          questionText,
          options,
          correctOptionIndex,
          explanation,
          positiveMarks: Number(positiveMarks),
          negativeMarks: Number(negativeMarks)
        });
        showToast('Question updated successfully!', 'success');
      } else {
        await quizService.addQuestion({
          exam,
          subject,
          chapter,
          topic,
          difficulty,
          questionText,
          options,
          correctOptionIndex,
          explanation,
          positiveMarks: Number(positiveMarks),
          negativeMarks: Number(negativeMarks)
        });
        showToast('New MCQ question added to bank!', 'success');
      }

      resetForm();
      onRefresh();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Error saving question', 'error');
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this MCQ?')) {
      await quizService.deleteQuestion(id);
      showToast('Question deleted', 'info');
      onRefresh();
    }
  };

  const handleExamPresetChange = (selectedExam: TargetExam) => {
    setExam(selectedExam);
    if (selectedExam === 'MHT-CET') {
      setPositiveMarks(subject === 'Mathematics' ? 2 : 1);
      setNegativeMarks(0);
    } else {
      setPositiveMarks(4);
      setNegativeMarks(1);
    }
  };

  const filteredQuestions = questions.filter((q) => {
    const matchSearch =
      q.questionText.toLowerCase().includes(search.toLowerCase()) ||
      q.chapter.toLowerCase().includes(search.toLowerCase());
    const matchExam = filterExam === 'All' || q.exam === filterExam;
    const matchSubject = filterSubject === 'All' || q.subject === filterSubject;
    return matchSearch && matchExam && matchSubject;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
            MCQ Question Bank & Test Manager
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Create exam-specific questions, configure negative marking, and manage online tests.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setIsQuestionModalOpen(true);
          }}
          className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Question</span>
        </button>
      </div>

      {/* Question Form Modal */}
      {isQuestionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div
            className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-navy-950 dark:text-white flex items-center gap-2">
                <FileQuestion className="w-5 h-5 text-brand-600" />
                {editingQuestion ? 'Edit MCQ Question' : 'Add MCQ to Question Bank'}
              </h3>
              <button onClick={resetForm} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="space-y-4 text-xs">
              {/* Exam, Subject, Difficulty */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Exam *
                  </label>
                  <select
                    value={exam}
                    onChange={(e) => handleExamPresetChange(e.target.value as TargetExam)}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    <option value="MHT-CET">MHT-CET</option>
                    <option value="JEE">JEE (Main & Adv)</option>
                    <option value="NEET">NEET-UG</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Subject *
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value as SubjectType)}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Biology">Biology</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Difficulty *
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as 'Easy' | 'Medium' | 'Hard')}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              {/* Chapter & Topic */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Chapter Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={chapter}
                    onChange={(e) => setChapter(e.target.value)}
                    placeholder="e.g. Rotational Dynamics"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Topic
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Moment of Inertia"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Question Text */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Question Text *
                </label>
                <textarea
                  rows={3}
                  required
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="Enter the complete question problem statement..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              {/* Four Options */}
              <div className="space-y-2">
                <label className="block font-bold text-slate-700 dark:text-slate-300">
                  Four Answer Options & Select Correct Choice *
                </label>
                {(['A', 'B', 'C', 'D'] as const).map((letter, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correctOption"
                      checked={correctOptionIndex === idx}
                      onChange={() => setCorrectOptionIndex(idx)}
                      className="w-4 h-4 text-brand-600 focus:ring-brand-500 cursor-pointer"
                      title={`Mark Option ${letter} as correct`}
                    />
                    <span className="font-bold w-6">{letter}.</span>
                    <input
                      type="text"
                      required
                      value={options[idx]}
                      onChange={(e) => {
                        const newOpts = [...options] as [string, string, string, string];
                        newOpts[idx] = e.target.value;
                        setOptions(newOpts);
                      }}
                      placeholder={`Option ${letter} text`}
                      className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>
                ))}
              </div>

              {/* Marking Scheme */}
              <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Positive Marks (+) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={positiveMarks}
                    onChange={(e) => setPositiveMarks(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Negative Marks (-) (0 for no penalty) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    value={negativeMarks}
                    onChange={(e) => setNegativeMarks(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
              </div>

              {/* Explanation */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Detailed Solution & Explanation *
                </label>
                <textarea
                  rows={2}
                  required
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Explain step-by-step formula and derivation for students..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold"
                >
                  {editingQuestion ? 'Update Question' : 'Save Question to Bank'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions by text or chapter..."
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
          />
        </div>

        <select
          value={filterExam}
          onChange={(e) => setFilterExam(e.target.value)}
          className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
        >
          <option value="All">All Exams</option>
          <option value="MHT-CET">MHT-CET</option>
          <option value="JEE">JEE</option>
          <option value="NEET">NEET</option>
        </select>

        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
        >
          <option value="All">All Subjects</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Biology">Biology</option>
        </select>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filteredQuestions.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-400 text-xs">
            No questions match criteria. Click &quot;Add New Question&quot; to expand the question bank.
          </div>
        ) : (
          filteredQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-soft flex flex-col sm:flex-row items-start justify-between gap-4 text-xs"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-400">#{idx + 1}</span>
                  <span className="px-2 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 font-bold text-[10px]">
                    {q.exam}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-[10px]">
                    {q.subject}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Chapter: {q.chapter}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600">
                    +{q.positiveMarks} / -{q.negativeMarks}
                  </span>
                </div>

                <p className="font-bold text-sm text-navy-950 dark:text-white leading-relaxed">
                  {q.questionText}
                </p>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                  {q.options.map((opt, optIdx) => (
                    <div
                      key={optIdx}
                      className={`p-2 rounded-lg border ${
                        q.correctOptionIndex === optIdx
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold'
                          : 'border-slate-100 dark:border-slate-800'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}. {opt}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 sm:self-center">
                <button
                  onClick={() => handleStartEdit(q)}
                  className="p-2 text-slate-500 hover:text-amber-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  title="Edit question"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteQuestion(q.id)}
                  className="p-2 text-slate-500 hover:text-rose-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  title="Delete question"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
