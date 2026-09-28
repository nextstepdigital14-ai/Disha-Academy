import React, { useState, useEffect } from 'react';
import { LocationContactSection } from '../components/home/LocationContactSection';
import { contentService } from '../services/contentService';
import { SiteSettings } from '../types';
import { MapPin, Phone, Mail, Clock, MessageCircle, ExternalLink } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    contentService.getSettings().then(setSettings).catch(console.error);
  }, []);

  return (
    <div className="py-12 sm:py-16 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase tracking-wider">
          <MapPin className="w-4 h-4" /> Get In Touch
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-950 dark:text-white tracking-tight">
          Visit or Contact Disha Academy
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          We welcome parents and students to visit our campus in Sane Guruji Vasahat, Kolhapur for a personal discussion with our faculty counselors.
        </p>
      </div>

      <LocationContactSection settings={settings} />
    </div>
  );
};
