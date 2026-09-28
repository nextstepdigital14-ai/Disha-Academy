import React from 'react';
import { NoteItem } from '../../types';
import { FileText, Download, Eye, Calendar, HardDrive, CheckCircle2, Trash2, Edit } from 'lucide-react';
import { notesService } from '../../services/notesService';
import { useAuth } from '../../context/AuthContext';

interface NoteCardProps {
  note: NoteItem;
  onPreview: (note: NoteItem) => void;
  onEdit?: (note: NoteItem) => void;
  onDelete?: (id: string) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onPreview, onEdit, onDelete }) => {
  const { isAdmin } = useAuth();

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await notesService.recordDownload(note.id);

    // If it's a data URL or real URL, trigger download
    const link = document.createElement('a');
    link.href = note.fileUrl;
    link.download = note.fileName || `${note.title}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getSubjectColor = (sub: string) => {
    switch (sub) {
      case 'Physics':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-900';
      case 'Chemistry':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-900';
      case 'Mathematics':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-900';
      case 'Biology':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-200';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft hover:shadow-premium transition-all duration-300 p-5 flex flex-col justify-between group">
      <div className="space-y-3">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getSubjectColor(note.subject)}`}>
              {note.subject}
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {note.course}
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {note.classLevel}
            </span>
          </div>

          {note.isDemo && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700">
              Sample Demo
            </span>
          )}
        </div>

        {/* Note Title */}
        <h3 className="text-base font-bold text-navy-950 dark:text-white leading-snug group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          {note.title}
        </h3>

        {/* Chapter Tag */}
        <div className="text-xs font-semibold text-brand-700 dark:text-brand-400">
          Chapter: {note.chapter} {note.topic ? `• ${note.topic}` : ''}
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {note.description}
        </p>

        {/* Metadata: size, date, uploader */}
        <div className="flex items-center gap-4 text-[11px] text-slate-400 dark:text-slate-500 pt-1">
          <span className="flex items-center gap-1">
            <HardDrive className="w-3.5 h-3.5" /> {note.fileSize}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {note.uploadedAt}
          </span>
          <span className="flex items-center gap-1">
            <Download className="w-3.5 h-3.5" /> {note.downloadCount || 0}
          </span>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <button
          onClick={() => onPreview(note)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Preview PDF</span>
        </button>

        <button
          onClick={handleDownload}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download</span>
        </button>

        {isAdmin && onEdit && onDelete && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(note)}
              className="p-2 text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Edit Note Metadata"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(note.id)}
              className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Delete Note"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
