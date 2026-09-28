import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle, X } from 'lucide-react';
import { contentService } from '../../services/contentService';
import { SiteSettings } from '../../types';

export const WhatsAppFloating: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    contentService.getSettings().then(setSettings).catch(console.error);
  }, []);

  const whatsappNumber = settings?.whatsappNumber || '919028321505';

  // Dynamic message based on current page
  let defaultMessage = "Hello Disha Academy! I would like to enquire about CET, JEE, and NEET admission batches.";
  if (location.pathname.includes('/courses/mht-cet')) {
    defaultMessage = "Hello Disha Academy! I am interested in the MHT-CET coaching batch. Please share admission and fee details.";
  } else if (location.pathname.includes('/courses/jee')) {
    defaultMessage = "Hello Disha Academy! I am interested in the JEE Main & Advanced coaching program. Please guide me through the admission process.";
  } else if (location.pathname.includes('/courses/neet')) {
    defaultMessage = "Hello Disha Academy! I want to join the NEET Medical coaching batch. Please share batch schedule and fee structure.";
  } else if (location.pathname.includes('/notes')) {
    defaultMessage = "Hello! I am viewing study notes on your website and would like more details about classroom batches.";
  }

  const encodedMsg = encodeURIComponent(defaultMessage);
  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Floating Popup Card if open */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-sm">
                <MessageCircle className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Disha Academy</h4>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">● Usually replies promptly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="my-3 bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl text-xs text-slate-700 dark:text-slate-300 leading-relaxed border border-emerald-100 dark:border-emerald-900/50">
            👋 Welcome to Disha Academy & Olympiad School, Kolhapur! Have questions about MHT-CET, JEE, or NEET batches? Click below to chat with our academic counselor on WhatsApp.
          </div>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-sm py-2.5 px-4 rounded-xl shadow-md transition-colors"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            Start WhatsApp Chat
          </a>
        </div>
      )}

      {/* Main Floating WhatsApp Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat on WhatsApp"
        className="group flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-premium hover:shadow-glow transition-all duration-300 transform hover:scale-105 active:scale-95"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="hidden sm:inline-block font-semibold text-sm">Chat with Us</span>
      </button>
    </div>
  );
};
