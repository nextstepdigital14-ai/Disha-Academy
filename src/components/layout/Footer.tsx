import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import { contentService } from '../../services/contentService';
import { SiteSettings } from '../../types';

export const Footer: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    contentService.getSettings().then(setSettings).catch(console.error);
  }, []);

  const academyName = settings?.academyName || "Disha Academy & Olympiad School";
  const address = settings?.address || "Plot No. 4, Radhanagari Road, Behind Bank of Maharashtra, Sane Guruji Vasahat, Kanerkar Nagar, Kolhapur, Maharashtra 416011";
  const phone = settings?.phone || "+91 9028321505";
  const email = settings?.email || "dishaacademykolhapur@gmail.com";
  const timings = settings?.officeTimings || "Mon - Sat: 8:00 AM - 8:30 PM | Sun: 9:00 AM - 2:00 PM";
  const mapsUrl = settings?.googleMapsUrl || "https://maps.app.goo.gl/txmmyLExVxMXhjzbA?g_st=ac";
  const whatsappNumber = settings?.whatsappNumber || "919028321505";

  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-12 border-t border-navy-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-navy-900">
          
          {/* Col 1: Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-md">
                <Compass className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white block leading-tight">
                  DISHA ACADEMY
                </span>
                <span className="text-xs text-amber-400 font-semibold tracking-wider uppercase">
                  & Olympiad School
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Empowering students in Kolhapur to achieve their highest potential in MHT-CET, JEE Main & Advanced, and NEET-UG with structured learning and personal mentorship.
            </p>

            <div className="pt-2">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Disha Academy! I would like to inquire about coaching batches.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Contact on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Col 2: Programs & Courses */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-l-2 border-brand-500 pl-2">
              Competitive Courses
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/courses/mht-cet" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-brand-400">›</span> MHT-CET (PCM / PCB)
                </Link>
              </li>
              <li>
                <Link to="/courses/jee" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-brand-400">›</span> JEE Main & Advanced (PCM)
                </Link>
              </li>
              <li>
                <Link to="/courses/neet" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-brand-400">›</span> NEET-UG Medical (PCB)
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-brand-400">›</span> 11th & 12th Integrated Batches
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-brand-400">›</span> Dropper / Repeater Achievers
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-amber-400 font-semibold">
                  <span className="text-amber-400">›</span> Scholarship Test (DTSE)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Student & Academic Quick Links */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-l-2 border-brand-500 pl-2">
              Student Hub
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/notes" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-brand-400">›</span> PDF Notes & Study Material
                </Link>
              </li>
              <li>
                <Link to="/mcq-practice" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-brand-400">›</span> Online MCQ Practice System
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-brand-400">›</span> Student Portal & Test History
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-brand-400">›</span> Faculty & Teaching Methodology
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-brand-400">›</span> Admission Enquiry Form
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-brand-400 transition-colors flex items-center gap-1.5 text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5" /> Admin Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Location & Contact */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-l-2 border-brand-500 pl-2">
              Kolhapur Center
            </h4>

            <div className="flex items-start gap-2.5 text-xs sm:text-sm">
              <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-slate-200">{address}</p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold mt-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs sm:text-sm">
              <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                {phone}
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs sm:text-sm">
              <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                {email}
              </a>
            </div>

            <div className="flex items-start gap-2.5 text-xs sm:text-sm pt-1">
              <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span className="text-slate-400">{timings}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {academyName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-slate-300 transition-colors">About Us</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">Contact</Link>
            <span>•</span>
            <Link to="/admissions" className="hover:text-slate-300 transition-colors">Admissions</Link>
            <span>•</span>
            <Link to="/admin" className="hover:text-slate-300 transition-colors">Faculty / Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
