import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, GraduationCap, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { notesService } from '../../services/notesService';
import { quizService } from '../../services/quizService';
import { contentService } from '../../services/contentService';
import { NoteItem, Course, Question, Announcement } from '../../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      // Load searchable resources
      notesService.getNotes().then(setNotes).catch(console.error);
      contentService.getCourses().then(setCourses).catch(console.error);
      quizService.getQuestions().then(setQuestions).catch(console.error);
      contentService.getAnnouncements().then(setAnnouncements).catch(console.error);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const qLower = query.toLowerCase().trim();

  const filteredCourses = qLower
    ? courses.filter(
        c =>
          c.name.toLowerCase().includes(qLower) ||
          c.shortDesc.toLowerCase().includes(qLower) ||
          c.subjects.some(s => s.toLowerCase().includes(qLower))
      )
    : [];

  const filteredNotes = qLower
    ? notes.filter(
        n =>
          n.title.toLowerCase().includes(qLower) ||
          n.chapter.toLowerCase().includes(qLower) ||
          n.subject.toLowerCase().includes(qLower) ||
          n.course.toLowerCase().includes(qLower)
      ).slice(0, 5)
    : [];

  const filteredQuestions = qLower
    ? questions.filter(
        q =>
          q.questionText.toLowerCase().includes(qLower) ||
          q.chapter.toLowerCase().includes(qLower) ||
          q.subject.toLowerCase().includes(qLower)
      ).slice(0, 4)
    : [];

  const filteredAnnouncements = qLower
    ? announcements.filter(
        a =>
          a.title.toLowerCase().includes(qLower) ||
          a.content.toLowerCase().includes(qLower)
      ).slice(0, 3)
    : [];

  const hasResults =
    filteredCourses.length > 0 ||
    filteredNotes.length > 0 ||
    filteredQuestions.length > 0 ||
    filteredAnnouncements.length > 0;

  const handleSelect = (url: string) => {
    onClose();
    navigate(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search notes, chapters, courses, MCQs, or announcements..."
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
            ESC
          </span>
        </div>

        {/* Results Body */}
        <div className="overflow-y-auto p-4 space-y-4 flex-1">
          {!query && (
            <div className="text-center py-10 text-slate-400 dark:text-slate-500">
              <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm font-medium">Type to search study resources across Disha Academy</p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
                <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300" onClick={() => setQuery('Rotational Dynamics')}>Rotational Dynamics</span>
                <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300" onClick={() => setQuery('MHT-CET')}>MHT-CET</span>
                <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300" onClick={() => setQuery('Genetics')}>Genetics</span>
                <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300" onClick={() => setQuery('JEE')}>JEE</span>
              </div>
            </div>
          )}

          {query && !hasResults && (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              <p className="text-base font-semibold">No results found for &quot;{query}&quot;</p>
              <p className="text-xs mt-1 text-slate-400">Try searching for a subject like Physics, or a course like CET or NEET.</p>
            </div>
          )}

          {/* Courses matches */}
          {filteredCourses.length > 0 && (
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-2 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" /> Courses ({filteredCourses.length})
              </h5>
              <div className="space-y-1.5">
                {filteredCourses.map(c => (
                  <button
                    key={c.id}
                    onClick={() => handleSelect(`/courses/${c.slug}`)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <p className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{c.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{c.shortDesc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-500 transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Notes matches */}
          {filteredNotes.length > 0 && (
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Study Notes ({filteredNotes.length})
              </h5>
              <div className="space-y-1.5">
                {filteredNotes.map(n => (
                  <button
                    key={n.id}
                    onClick={() => handleSelect(`/notes`)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">{n.subject}</span>
                        <p className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{n.title}</p>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Chapter: {n.chapter} • {n.course} • {n.fileSize}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* MCQs matches */}
          {filteredQuestions.length > 0 && (
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Practice Questions ({filteredQuestions.length})
              </h5>
              <div className="space-y-1.5">
                {filteredQuestions.map(q => (
                  <button
                    key={q.id}
                    onClick={() => handleSelect(`/mcq-practice`)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors flex items-center justify-between group"
                  >
                    <div className="max-w-[85%]">
                      <p className="font-medium text-xs text-slate-800 dark:text-slate-200 line-clamp-2">{q.questionText}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{q.subject} • {q.chapter} ({q.exam})</p>
                    </div>
                    <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold group-hover:underline">Practice</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
