import React, { useEffect } from 'react';
import { NoteItem } from '../../types';
import { X, Download, ExternalLink, FileText, AlertCircle } from 'lucide-react';
import { notesService } from '../../services/notesService';

interface PdfViewerModalProps {
  note: NoteItem | null;
  onClose: () => void;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({ note, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!note) return null;

  const handleDownload = () => {
    notesService.recordDownload(note.id);
    const link = document.createElement('a');
    link.href = note.fileUrl;
    link.download = note.fileName || `${note.title}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-5xl h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <h3 className="font-bold text-sm sm:text-base text-navy-950 dark:text-white truncate">
                {note.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {note.subject} • {note.chapter} ({note.course} {note.classLevel}) • {note.fileSize}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
            </button>

            <a
              href={note.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Open raw file in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Close viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Iframe Body */}
        <div className="flex-1 bg-slate-100 dark:bg-slate-950 relative overflow-hidden">
          <iframe
            src={note.fileUrl}
            title={note.title}
            className="w-full h-full border-0"
          />
        </div>

        {/* Demo Notification Bar if Demo file */}
        {note.isDemo && (
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border-t border-amber-200 dark:border-amber-800 text-[11px] text-amber-800 dark:text-amber-300 flex items-center justify-between px-6">
            <span>ℹ️ <strong>Demo Study Material:</strong> Sample PDF placeholder metadata shown. Real classroom PDF documents can be uploaded by admin in the Admin Dashboard.</span>
          </div>
        )}
      </div>
    </div>
  );
};
