import React, { useState } from 'react';
import { NoteItem, TargetExam, ClassLevel, SubjectType } from '../../types';
import { notesService } from '../../services/notesService';
import {
  Upload,
  Plus,
  Trash2,
  Edit,
  Eye,
  Search,
  CheckCircle2,
  X,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

interface NotesManagerTabProps {
  notes: NoteItem[];
  onRefresh: () => void;
  onPreviewNote: (note: NoteItem) => void;
}

export const NotesManagerTab: React.FC<NotesManagerTabProps> = ({
  notes,
  onRefresh,
  onPreviewNote
}) => {
  const { showToast } = useNotification();

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<NoteItem | null>(null);
  const [search, setSearch] = useState('');
  const [filterCourse, setFilterCourse] = useState<string>('All');

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<TargetExam | 'All'>('MHT-CET');
  const [classLevel, setClassLevel] = useState<ClassLevel | 'All'>('12th');
  const [subject, setSubject] = useState<SubjectType>('Physics');
  const [chapter, setChapter] = useState('');
  const [topic, setTopic] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCourse('MHT-CET');
    setClassLevel('12th');
    setSubject('Physics');
    setChapter('');
    setTopic('');
    setSelectedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setIsUploadOpen(false);
    setEditingNote(null);
  };

  const handleStartUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile && !editingNote) {
      showToast('Please select a PDF file to upload.', 'warning');
      return;
    }

    setIsUploading(true);

    try {
      if (editingNote) {
        // Edit existing metadata
        await notesService.updateNote(editingNote.id, {
          title,
          description,
          course,
          classLevel,
          subject,
          chapter,
          topic
        });
        showToast('Study note updated successfully!', 'success');
      } else if (selectedFile) {
        // Upload new note
        await notesService.uploadNoteFile(
          selectedFile,
          {
            title,
            description,
            course,
            classLevel,
            subject,
            chapter,
            topic,
            uploadedBy: 'Faculty / Admin',
            isPublished: true
          },
          (prog) => setUploadProgress(Math.round(prog))
        );
        showToast('PDF study note uploaded and published!', 'success');
      }

      resetForm();
      onRefresh();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Upload failed', 'error');
      setIsUploading(false);
    }
  };

  const handleStartEdit = (note: NoteItem) => {
    setEditingNote(note);
    setTitle(note.title);
    setDescription(note.description);
    setCourse(note.course);
    setClassLevel(note.classLevel);
    setSubject(note.subject);
    setChapter(note.chapter);
    setTopic(note.topic || '');
    setIsUploadOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this study note?')) {
      try {
        await notesService.deleteNote(id);
        showToast('Note deleted successfully', 'info');
        onRefresh();
      } catch {
        showToast('Failed to delete note', 'error');
      }
    }
  };

  const handleTogglePublish = async (note: NoteItem) => {
    try {
      await notesService.updateNote(note.id, { isPublished: !note.isPublished });
      showToast(`Note ${!note.isPublished ? 'published' : 'unpublished'}`, 'info');
      onRefresh();
    } catch {
      showToast('Failed to update status', 'error');
    }
  };

  const filteredNotes = notes.filter((n) => {
    const matchSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.chapter.toLowerCase().includes(search.toLowerCase()) ||
      n.subject.toLowerCase().includes(search.toLowerCase());
    const matchCourse = filterCourse === 'All' || n.course === filterCourse;
    return matchSearch && matchCourse;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
            Notes & Study Material Management
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Upload chapter PDFs, formula sheets, question papers, and organize study resources.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setIsUploadOpen(true);
          }}
          className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Upload PDF Notes</span>
        </button>
      </div>

      {/* Upload / Edit Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div
            className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-navy-950 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-600" />
                {editingNote ? 'Edit Study Note Details' : 'Upload New Study Material (PDF)'}
              </h3>
              <button onClick={resetForm} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleStartUpload} className="space-y-4 text-xs">
              {/* File Input */}
              {!editingNote && (
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Select PDF Document *
                  </label>
                  <input
                    type="file"
                    required
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    className="w-full px-3 py-2 border rounded-xl border-dashed border-slate-300 dark:border-slate-700 text-xs"
                  />
                  {selectedFile && (
                    <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                      ✓ Selected: {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                    </p>
                  )}
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Note Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Rotational Dynamics - Comprehensive Formula Sheet"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              {/* Course, Class, Subject */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Course *
                  </label>
                  <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value as TargetExam | 'All')}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    <option value="MHT-CET">MHT-CET</option>
                    <option value="JEE">JEE</option>
                    <option value="NEET">NEET</option>
                    <option value="All">All Courses</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Class *
                  </label>
                  <select
                    value={classLevel}
                    onChange={(e) => setClassLevel(e.target.value as ClassLevel | 'All')}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    <option value="11th">Class 11th</option>
                    <option value="12th">Class 12th</option>
                    <option value="Dropper">Dropper</option>
                    <option value="All">All Classes</option>
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
                    Topic / Subtopic
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

              {/* Description */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description of derivations, key formulas, or questions covered..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              {/* Progress bar */}
              {isUploading && (
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Uploading file...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div
                      className="h-full bg-brand-600 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Actions */}
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
                  disabled={isUploading}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold disabled:opacity-50"
                >
                  {isUploading ? 'Uploading...' : editingNote ? 'Save Changes' : 'Upload & Publish Note'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or chapter..."
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
          />
        </div>

        <select
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
          className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
        >
          <option value="All">All Courses</option>
          <option value="MHT-CET">MHT-CET</option>
          <option value="JEE">JEE</option>
          <option value="NEET">NEET</option>
        </select>
      </div>

      {/* Notes Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Title & Chapter</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Course & Class</th>
                <th className="p-4">Size</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {filteredNotes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No notes found.
                  </td>
                </tr>
              ) : (
                filteredNotes.map((n) => (
                  <tr key={n.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-4">
                      <p className="font-bold text-slate-900 dark:text-white line-clamp-1">{n.title}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Chapter: {n.chapter}</p>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold">{n.subject}</span>
                    </td>
                    <td className="p-4">
                      <span>{n.course} ({n.classLevel})</span>
                    </td>
                    <td className="p-4">{n.fileSize}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleTogglePublish(n)}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          n.isPublished
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        {n.isPublished ? 'Published' : 'Hidden'}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => onPreviewNote(n)}
                          className="p-1.5 hover:text-brand-600 rounded-lg"
                          title="Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleStartEdit(n)}
                          className="p-1.5 hover:text-amber-600 rounded-lg"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(n.id)}
                          className="p-1.5 hover:text-rose-600 rounded-lg"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
