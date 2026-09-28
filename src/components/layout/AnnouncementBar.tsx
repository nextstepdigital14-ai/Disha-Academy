import React, { useState, useEffect } from 'react';
import { Megaphone, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { contentService } from '../../services/contentService';
import { SiteSettings } from '../../types';

export const AnnouncementBar: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [dismissed, setDismissed] = useState<boolean>(false);

  useEffect(() => {
    contentService.getSettings().then(setSettings).catch(console.error);
  }, []);

  if (dismissed || !settings?.isTickerActive || !settings?.announcementTicker) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-navy-900 via-brand-900 to-navy-950 text-white text-xs sm:text-sm font-medium py-2 px-4 shadow-sm relative z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden flex-1">
          <span className="bg-accent-500 text-white text-[11px] uppercase tracking-wider font-bold px-2 py-0.5 rounded flex items-center gap-1 flex-shrink-0">
            <Megaphone className="w-3.5 h-3.5" /> Notice
          </span>
          <p className="truncate text-slate-200">
            {settings.announcementTicker}
          </p>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <Link
            to="/admissions"
            className="hidden md:inline-flex items-center gap-1 text-accent-400 hover:text-accent-300 font-semibold underline underline-offset-2 transition-colors"
          >
            Apply Now <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
            title="Dismiss notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
