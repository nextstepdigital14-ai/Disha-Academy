import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { notesService } from '../services/notesService';
import { quizService } from '../services/quizService';
import { contentService } from '../services/contentService';
import { NoteItem, TestAttempt, Announcement, TargetExam, ClassLevel } from '../types';
import { PdfViewerModal } from '../components/notes/PdfViewerModal';
import {
  User,
  BookOpen,
  CheckCircle2,
  FileText,
  Clock,
  Award,
  TrendingUp,
  Bell,
  ArrowRight,
  Download,
  Calendar,
  Settings,
  Sparkles
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';

export const StudentDashboardPage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useNotification();
  const navigate = useNavigate();

  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [attempts, setAttempts] = useState<TestAttempt[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [previewNote, setPreviewNote] = useState<NoteItem | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'tests' | 'notes' | 'profile'>('overview');

  // Profile Edit states
  const [phone, setPhone] = useState(user?.phone || '');
  const [studentClass, setStudentClass] = useState<ClassLevel>(user?.studentClass || '12th');
  const [targetExam, setTargetExam] = useState<TargetExam>(user?.targetExam || 'MHT-CET');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!user) {
      navigate('/login');
      return;
    }

    Promise.all([
      notesService.getNotes(),
      quizService.getAttempts(user.uid),
      contentService.getAnnouncements()
    ])
      .then(([n, atts, anns]) => {
        setNotes(n.filter((note) => note.isPublished));
        // Filter personal attempts for this logged-in student
        const personal = atts.filter((a) => a.studentId === user.uid || a.studentEmail === user.email);
        setAttempts(personal);
        setAnnouncements(anns.filter((a) => a.isActive));
      })
      .catch(console.error);
  }, [user, navigate]);

  if (!user) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await updateProfile({ phone, studentClass, targetExam });
      showToast('Profile information updated successfully!', 'success');
    } catch {
      showToast('Failed to update profile.', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  // Performance calculations
  const totalTests = attempts.length;
  const avgScore =
    totalTests > 0
      ? attempts.reduce((acc, curr) => acc + curr.percentage, 0) / totalTests
      : 0;
  const bestScore = totalTests > 0 ? Math.max(...attempts.map((a) => a.percentage)) : 0;

  // Notes recommended for student's course
  const recommendedNotes = notes
    .filter((n) => n.course === user.targetExam || n.course === 'All')
    .slice(0, 4);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Greeting Banner */}
      <div className="bg-gradient-to-r from-navy-950 via-brand-900 to-navy-900 text-white rounded-3xl p-6 sm:p-10 shadow-premium relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Student Learning Portal
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Welcome back, {user.displayName}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Target Goal: <strong className="text-amber-400">{user.targetExam || 'MHT-CET'}</strong> • Class: <strong className="text-amber-400">{user.studentClass || '12th'}</strong> • Kolhapur Batch
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/mcq-practice"
              className="px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm shadow-md transition-colors inline-flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Take a Mock Test</span>
            </Link>
            <Link
              to="/notes"
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-colors inline-flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Browse Notes</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft">
          <Clock className="w-5 h-5 text-brand-500 mb-2" />
          <span className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white">{totalTests}</span>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Tests Completed</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft">
          <TrendingUp className="w-5 h-5 text-emerald-500 mb-2" />
          <span className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white">
            {avgScore.toFixed(0)}%
          </span>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Average Accuracy</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft">
          <Award className="w-5 h-5 text-amber-500 mb-2" />
          <span className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white">
            {bestScore.toFixed(0)}%
          </span>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Personal Best Mock</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft">
          <BookOpen className="w-5 h-5 text-purple-500 mb-2" />
          <span className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white">
            {recommendedNotes.length}
          </span>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Recommended Modules</p>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6 text-xs sm:text-sm font-bold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'overview'
              ? 'border-brand-600 text-brand-600 dark:text-brand-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Dashboard Overview
        </button>

        <button
          onClick={() => setActiveTab('tests')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'tests'
              ? 'border-brand-600 text-brand-600 dark:text-brand-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Test History & Results ({attempts.length})
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'notes'
              ? 'border-brand-600 text-brand-600 dark:text-brand-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          My Study Material
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'profile'
              ? 'border-brand-600 text-brand-600 dark:text-brand-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Account Profile
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Recommended Notes */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base sm:text-lg text-navy-950 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-600" />
                Recommended Study Notes for {user.targetExam || 'MHT-CET'}
              </h3>
              <Link to="/notes" className="text-xs font-bold text-brand-600 hover:underline">
                View All Notes →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendedNotes.map((note) => (
                <div
                  key={note.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-soft flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                      {note.subject}
                    </span>
                    <h4 className="font-bold text-sm text-navy-950 dark:text-white line-clamp-1">
                      {note.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      Chapter: {note.chapter} ({note.fileSize})
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => setPreviewNote(note)}
                      className="flex-1 py-1.5 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold hover:bg-slate-200"
                    >
                      Preview
                    </button>
                    <a
                      href={note.fileUrl}
                      download={note.fileName}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-brand-600 text-white hover:bg-brand-700"
                      title="Download PDF"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Practice Launcher */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-bold text-sm text-navy-950 dark:text-white">
                  Ready to test your concept retention?
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Take a 10-minute speed drill on recent chapter derivations and formulas.
                </p>
              </div>
              <Link
                to="/mcq-practice"
                className="px-5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs shadow hover:bg-brand-700 transition-colors"
              >
                Start Chapter Practice
              </Link>
            </div>
          </div>

          {/* Right Column: Academy Notices */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
            <h3 className="font-bold text-sm text-navy-950 dark:text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-500" />
              Active Academy Notices
            </h3>

            <div className="space-y-3">
              {announcements.map((ann) => (
                <div
                  key={ann.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[10px] text-brand-600">{ann.category}</span>
                    <span className="text-[10px] text-slate-400">{ann.createdAt}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white leading-snug">{ann.title}</h4>
                  <p className="text-slate-500 text-[11px] line-clamp-2">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Test History */}
      {activeTab === 'tests' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-soft">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-sm text-navy-950 dark:text-white">
              Your Personal Test History ({attempts.length})
            </h3>
            <Link to="/mcq-practice" className="text-xs font-bold text-brand-600 hover:underline">
              Practice Another Test →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Test Title</th>
                  <th className="p-4">Exam</th>
                  <th className="p-4">Score</th>
                  <th className="p-4">Accuracy</th>
                  <th className="p-4">Correct / Total</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {attempts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-slate-400">
                      No test attempts found. Go to MCQ practice and attempt your first mock test!
                    </td>
                  </tr>
                ) : (
                  attempts.map((att) => (
                    <tr key={att.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-4 font-bold text-slate-900 dark:text-white">{att.testTitle}</td>
                      <td className="p-4 font-semibold text-brand-600">{att.exam}</td>
                      <td className="p-4 font-black">
                        {att.score} / {att.maxMarks}
                      </td>
                      <td className="p-4">
                        <span
                          className={`font-bold ${
                            att.percentage >= 60 ? 'text-emerald-600' : 'text-amber-600'
                          }`}
                        >
                          {att.percentage.toFixed(0)}%
                        </span>
                      </td>
                      <td className="p-4">
                        {att.correctCount} / {att.totalQuestions}
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
      )}

      {/* Tab 3: My Notes */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-navy-950 dark:text-white">
              Full Notes Library ({notes.length} Available)
            </h3>
            <Link to="/notes" className="text-xs font-bold text-brand-600 hover:underline">
              Open Notes Filter Page →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-soft flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                      {note.subject}
                    </span>
                    <span className="text-[10px] text-slate-400">{note.course}</span>
                  </div>
                  <h4 className="font-bold text-sm text-navy-950 dark:text-white line-clamp-1">{note.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{note.description}</p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setPreviewNote(note)}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold hover:bg-slate-200"
                  >
                    Preview
                  </button>
                  <a
                    href={note.fileUrl}
                    download={note.fileName}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-1.5 px-3 rounded-lg bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 text-center"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Profile Editor */}
      {activeTab === 'profile' && (
        <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-soft space-y-6">
          <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="w-14 h-14 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-bold text-xl uppercase">
              {user.displayName.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-lg text-navy-950 dark:text-white">{user.displayName}</h3>
              <p className="text-xs text-slate-500">{user.email}</p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Full Name (Read Only)
              </label>
              <input
                type="text"
                disabled
                value={user.displayName}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Mobile Number (WhatsApp)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit phone"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Academic Class
                </label>
                <select
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value as ClassLevel)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                >
                  <option value="11th">Class 11th</option>
                  <option value="12th">Class 12th</option>
                  <option value="Dropper">Dropper / Repeater</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Target Exam Track
                </label>
                <select
                  value={targetExam}
                  onChange={(e) => setTargetExam(e.target.value as TargetExam)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                >
                  <option value="MHT-CET">MHT-CET</option>
                  <option value="JEE">JEE</option>
                  <option value="NEET">NEET</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isUpdating}
              className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold transition-colors disabled:opacity-50"
            >
              {isUpdating ? 'Saving Changes...' : 'Save Profile Changes'}
            </button>
          </form>
        </div>
      )}

      {/* PDF Viewer Modal */}
      <PdfViewerModal note={previewNote} onClose={() => setPreviewNote(null)} />
    </div>
  );
};
