import React, { useState } from 'react';
import { Announcement } from '../../types';
import { contentService } from '../../services/contentService';
import { Plus, Trash2, Bell, CheckCircle2, X } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

interface AnnouncementsTabProps {
  announcements: Announcement[];
  onRefresh: () => void;
}

export const AnnouncementsTab: React.FC<AnnouncementsTabProps> = ({
  announcements,
  onRefresh
}) => {
  const { showToast } = useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Announcement['category']>('Admissions');
  const [priority, setPriority] = useState<Announcement['priority']>('Normal');
  const [targetAudience, setTargetAudience] = useState<Announcement['targetAudience']>('All');
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await contentService.addAnnouncement({
        title,
        content,
        category,
        priority,
        targetAudience,
        linkText: linkText || undefined,
        linkUrl: linkUrl || undefined,
        isActive: true
      });
      showToast('Announcement posted successfully!', 'success');
      setIsModalOpen(false);
      setTitle('');
      setContent('');
      setLinkText('');
      setLinkUrl('');
      onRefresh();
    } catch {
      showToast('Failed to post announcement', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this announcement?')) {
      await contentService.deleteAnnouncement(id);
      showToast('Announcement removed', 'info');
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
            Announcements & Notice Board
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Broadcast test schedules, holiday notices, scholarship exam dates, and admission alerts.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Publish New Notice</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-navy-950 dark:text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-brand-600" />
                Publish Announcement
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Grand Mock Test Series Starting Sunday"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Announcement['category'])}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  >
                    <option value="Admissions">Admissions</option>
                    <option value="Test Schedule">Test Schedule</option>
                    <option value="Results">Results</option>
                    <option value="Batches">Batches</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Priority *</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Announcement['priority'])}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Content *</label>
                <textarea
                  rows={3}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Full announcement description..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Link Label (Optional)</label>
                  <input
                    type="text"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    placeholder="e.g. View Schedule"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Link URL</label>
                  <input
                    type="text"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="e.g. /mcq-practice"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl border font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-brand-600 text-white font-bold"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Announcements List */}
      <div className="space-y-3">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft flex items-start justify-between gap-4 text-xs"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 text-[10px]">
                  {ann.category}
                </span>
                <span className="text-slate-400 text-[11px]">{ann.createdAt}</span>
                <span className="font-bold text-[10px] text-amber-500 uppercase">{ann.priority}</span>
              </div>

              <h4 className="font-bold text-sm text-navy-950 dark:text-white">{ann.title}</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{ann.content}</p>
            </div>

            <button
              onClick={() => handleDelete(ann.id)}
              className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg"
              title="Delete announcement"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
