import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  MessageCircle,
  Navigation,
  Send,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { SiteSettings } from '../../types';
import { enquiryService } from '../../services/enquiryService';

interface LocationContactSectionProps {
  settings: SiteSettings | null;
}

export const LocationContactSection: React.FC<LocationContactSectionProps> = ({ settings }) => {
  const address = settings?.address || "Plot No. 4, Radhanagari Road, Behind Bank of Maharashtra, Sane Guruji Vasahat, Kanerkar Nagar, Kolhapur, Maharashtra 416011";
  const phone = settings?.phone || "+91 9028321505";
  const email = settings?.email || "dishaacademykolhapur@gmail.com";
  const timings = settings?.officeTimings || "Mon - Sat: 8:00 AM - 8:30 PM | Sun: 9:00 AM - 2:00 PM";
  const mapsUrl = settings?.googleMapsUrl || "https://maps.app.goo.gl/txmmyLExVxMXhjzbA?g_st=ac";
  const whatsappNumber = settings?.whatsappNumber || "919028321505";

  // Form states
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [studentClass, setStudentClass] = useState<'11th' | '12th' | 'Dropper'>('12th');
  const [course, setCourse] = useState<'MHT-CET' | 'JEE' | 'NEET'>('MHT-CET');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await enquiryService.submitEnquiry({
        studentName: name,
        mobileNumber: mobile,
        studentClass,
        interestedCourse: course,
        preferredBatch: 'Regular Classroom Batch',
        message
      });
      setSubmitSuccess(true);
      setName('');
      setMobile('');
      setMessage('');
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to submit enquiry. Please try again or WhatsApp us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const mapEmbedUrl = "https://maps.google.com/maps?q=Disha+Academy+&+Olympiad+School,+Radhanagari+Rd,+Kolhapur&t=&z=15&ie=UTF8&iwloc=&output=embed";

  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" /> Visit Our Campus
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 dark:text-white tracking-tight">
            Connect With Disha Academy & Olympiad School
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            We are conveniently located in Sane Guruji Vasahat on Radhanagari Road, Kolhapur.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Academy Location, Map & Contact Details */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Location & Details Card */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 space-y-6">
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-navy-950 dark:text-white">
                  Disha Academy & Olympiad School
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Head Office & Classroom Center
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-navy-950 dark:text-white block mb-0.5">Official Address</span>
                    <p className="leading-relaxed">{address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-navy-950 dark:text-white block mb-0.5">Contact Number</span>
                    <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-brand-600 dark:hover:text-brand-400 font-semibold">
                      {phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-navy-950 dark:text-white block mb-0.5">Office & Visiting Hours</span>
                    <p>{timings}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-navy-950 dark:text-white block mb-0.5">Email Support</span>
                    <p>{email}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Get Directions & WhatsApp */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions (Google Maps)</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello Disha Academy! I would like to visit the Kolhapur center. Please share landmark details.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-soft h-64 bg-slate-100 dark:bg-slate-800 relative">
              <iframe
                title="Disha Academy Location Map"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-2 left-2 bg-white/90 dark:bg-slate-900/90 text-[11px] font-semibold px-2 py-1 rounded shadow text-slate-700 dark:text-slate-300">
                Plot No. 4, Radhanagari Rd, Kolhapur
              </div>
            </div>

          </div>

          {/* Right Column: Admission Enquiry Form */}
          <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-800/60 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-soft">
            <div className="mb-6 space-y-1">
              <h3 className="text-xl font-bold text-navy-950 dark:text-white">
                Request Admission Consultation
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Leave your details below and our academic counselor will contact you with batch schedules and scholarship details.
              </p>
            </div>

            {submitSuccess ? (
              <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-emerald-800 dark:text-emerald-200">
                  Enquiry Submitted Successfully!
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300 max-w-sm mx-auto leading-relaxed">
                  Thank you! Our admission counselor will call you shortly. You can also connect immediately on WhatsApp for instant assistance.
                </p>
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello Disha Academy! I just submitted an admission enquiry on your website for ${course}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-md transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Follow Up on WhatsApp</span>
                  </a>
                </div>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="block mx-auto text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline pt-2"
                >
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {submitError && (
                  <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Atharva Patil"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="10-digit number e.g. 9822334455"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Current Class / Status *
                    </label>
                    <select
                      value={studentClass}
                      onChange={(e) => setStudentClass(e.target.value as '11th' | '12th' | 'Dropper')}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="11th">Class 11th Science</option>
                      <option value="12th">Class 12th Science / Appearing</option>
                      <option value="Dropper">Dropper / Repeater Batch</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Interested Entrance Program *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['MHT-CET', 'JEE', 'NEET'] as const).map((prog) => (
                      <button
                        type="button"
                        key={prog}
                        onClick={() => setCourse(prog)}
                        className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                          course === prog
                            ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {prog}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Specific Questions or Requirements (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. Interested in morning batch timings, scholarship exam syllabus, or hostel facility..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting Enquiry...' : 'Submit Admission Enquiry'}</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
