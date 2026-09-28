import React, { useState, useEffect } from 'react';
import { NoteItem, TargetExam, ClassLevel, SubjectType } from '../types';
import { notesService } from '../services/notesService';
import { NotesFilter } from '../components/notes/NotesFilter';
import { NoteCard } from '../components/notes/NoteCard';
import { PdfViewerModal } from '../components/notes/PdfViewerModal';
import { useAuth } from '../context/AuthContext';
import { FileText, Lock, BookOpen, Sparkles, Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NotesPage: React.FC = () => {
  const { user } = useAuth();

  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewNote, setPreviewNote] = useState<NoteItem | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<TargetExam | 'All'>('All');
  const [selectedClass, setSelectedClass] = useState<ClassLevel | 'All'>('All');
  const [selectedSubject, setSelectedSubject] = useState<SubjectType | 'All'>('All');

  useEffect(() => {
    window.scrollTo(0, 0);
    loadNotes();
  }, []);

  const loadNotes = async () => {
    setLoading(true);
    try {
      const data = await notesService.getNotes();
      setNotes(data);
    } catch (err) {
      console.error('Error loading notes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCourse('All');
    setSelectedClass('All');
    setSelectedSubject('All');
  };

  // Filter logic
  const filteredNotes = notes.filter((n) => {
    if (!n.isPublished) return false;

    const matchesSearch =
      searchQuery === '' ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.topic && n.topic.toLowerCase().includes(searchQuery.toLowerCase())) ||
      n.subject.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCourse =
      selectedCourse === 'All' || n.course === selectedCourse || n.course === 'All';

    const matchesClass =
      selectedClass === 'All' || n.classLevel === selectedClass || n.classLevel === 'All';

    const matchesSubject =
      selectedSubject === 'All' || n.subject === selectedSubject;

    return matchesSearch && matchesCourse && matchesClass && matchesSubject;
  });

  return (
    <div className="py-12 sm:py-16 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" /> Comprehensive Academic Repository
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-950 dark:text-white tracking-tight">
            Study Material, Formula Sheets & Notes
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Curated by Disha Academy’s subject faculty for MHT-CET, JEE Main & Advanced, and NEET-UG. In-depth theory, derivations, quick formula booklets, and previous years question compilations.
          </p>
        </div>

        {/* Guest Preview Notice if not logged in */}
        {!user && (
          <div className="p-6 rounded-3xl bg-gradient-to-r from-brand-50 to-blue-50 dark:from-slate-900 dark:to-brand-950/40 border border-brand-200 dark:border-brand-900/60 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-600 text-white flex items-center justify-center flex-shrink-0 font-bold shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-navy-950 dark:text-white">
                  Student Portal Access & Downloads
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  You are currently viewing the public preview. Registered Disha students get full access to all chapter PDF downloads, test series solutions, and mock tests.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 flex-shrink-0">
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs shadow-sm hover:shadow transition-all"
              >
                Student Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition-colors"
              >
                Register Free
              </Link>
            </div>
          </div>
        )}

        {/* Filters Box */}
        <NotesFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCourse={selectedCourse}
          onCourseChange={setSelectedCourse}
          selectedClass={selectedClass}
          onClassChange={setSelectedClass}
          selectedSubject={selectedSubject}
          onSubjectChange={setSelectedSubject}
          onReset={handleResetFilters}
          totalCount={filteredNotes.length}
        />

        {/* Notes Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-64 rounded-3xl bg-slate-100 dark:bg-slate-800 animate-pulse border border-slate-200 dark:border-slate-800"
              />
            ))}
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="p-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
            <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-700 dark:text-slate-200">
              No Study Material Found
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              No notes match your selected criteria. Try resetting filters or searching for another chapter keyword.
            </p>
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-brand-600 hover:underline pt-2"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onPreview={(n) => setPreviewNote(n)}
              />
            ))}
          </div>
        )}

      </div>

      {/* PDF Viewer Modal */}
      <PdfViewerModal
        note={previewNote}
        onClose={() => setPreviewNote(null)}
      />
    </div>
  );
};
