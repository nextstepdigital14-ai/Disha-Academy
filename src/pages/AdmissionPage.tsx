import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TargetExam, ClassLevel } from '../types';
import { enquiryService } from '../services/enquiryService';
import {
  GraduationCap,
  CheckCircle2,
  Calendar,
  Award,
  Send,
  MessageCircle,
  FileCheck,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { contentService } from '../services/contentService';

export const AdmissionPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCourse = (searchParams.get('course') as TargetExam) || 'MHT-CET';
  const initialBatch = searchParams.get('batch') || '';

  const [studentName, setStudentName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [studentClass, setStudentClass] = useState<ClassLevel>('12th');
  const [course, setCourse] = useState<TargetExam>(initialCourse);
  const [preferredBatch, setPreferredBatch] = useState(initialBatch || 'Regular Classroom Batch');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [whatsappNumber, setWhatsappNumber] = useState('919028321505');

  useEffect(() => {
    window.scrollTo(0, 0);
    contentService.getSettings().then((s) => {
      if (s.whatsappNumber) setWhatsappNumber(s.whatsappNumber);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await enquiryService.submitEnquiry({
        studentName,
        mobileNumber,
        email: email || undefined,
        studentClass,
        interestedCourse: course,
        preferredBatch,
        message
      });
      setSubmitSuccess(true);
      setStudentName('');
      setMobileNumber('');
      setEmail('');
      setMessage('');
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : 'Submission failed. Please check inputs.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const waEnquiryUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello Disha Academy! I would like to inquire regarding direct admission for ${course} (Class ${studentClass}).`
  )}`;

  return (
    <div className="py-12 sm:py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Banner Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" /> Academic Year 2026 - 2027 Admissions
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-950 dark:text-white tracking-tight">
            Enroll for CET, JEE & NEET Preparation
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Secure your admission in our upcoming batches. Limited seats per batch to guarantee personal mentorship, daily doubt solving, and structured performance tracking.
          </p>
        </div>

        {/* 2 Column Grid: Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Scholarship & Admission Process */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* DTSE Scholarship Box */}
            <div className="p-7 rounded-3xl bg-gradient-to-br from-brand-900 to-navy-950 text-white shadow-premium space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-amber-400 text-navy-950 flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </span>
                <span className="text-amber-300 text-xs font-bold uppercase tracking-wider">
                  Merit Scholarship Scheme
                </span>
              </div>

              <h3 className="text-xl font-bold tracking-tight">
                Disha Talent Search Exam (DTSE 2026)
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                Appearing students can qualify for up to <strong>50% to 75% fee concessions</strong> based on their score in our diagnostic talent evaluation test and 10th Board performance.
              </p>

              <div className="pt-2 flex items-center gap-3 text-xs text-slate-200">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Free Test Registration</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Conducted Every Sunday</span>
                </div>
              </div>
            </div>

            {/* 4-Step Admission Procedure */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-7 border border-slate-200 dark:border-slate-800 shadow-soft space-y-5">
              <h3 className="font-bold text-base text-navy-950 dark:text-white flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-brand-600" />
                Admission Procedure in 4 Steps
              </h3>

              <div className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Submit Online Form or Visit Campus</h4>
                    <p className="text-slate-500 mt-0.5">Fill out your details on this page or visit our Radhanagari Road center.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Counseling & Academic Evaluation</h4>
                    <p className="text-slate-500 mt-0.5">Meet with subject teachers to determine target percentiles and batch suitability.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Attend Free Classroom Demo</h4>
                    <p className="text-slate-500 mt-0.5">Experience our smart classroom teaching style and interact with current batch students.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Enrollment & Kit Collection</h4>
                    <p className="text-slate-500 mt-0.5">Receive printed study modules, question banks, and portal login credentials.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Document Checklist */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white">Documents Required at Enrollment:</h4>
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                  <span>Photocopy of Class 10th / 11th marksheet</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                  <span>2 passport-size student photographs</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                  <span>Aadhaar card copy for registration verification</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column: Admission Form */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-premium space-y-6">
            <div className="space-y-1">
              <h3 className="text-2xl font-extrabold text-navy-950 dark:text-white">
                Admission Application Form
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Submit this application to reserve your seat and schedule a counseling appointment.
              </p>
            </div>

            {submitSuccess ? (
              <div className="p-8 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-3xl text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-900 dark:text-emerald-200">
                  Admission Enquiry Successfully Registered!
                </h4>
                <p className="text-xs text-emerald-800 dark:text-emerald-300 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{studentName}</strong>! Our academic counselor will call you within 24 hours. You can also chat directly on WhatsApp for immediate seat reservation.
                </p>
                <div className="pt-2">
                  <a
                    href={waEnquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold py-3 px-6 rounded-xl shadow-md transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Follow Up on WhatsApp</span>
                  </a>
                </div>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="block mx-auto text-xs text-slate-500 hover:underline pt-2"
                >
                  Submit another admission application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                {submitError && (
                  <div className="p-3 bg-rose-50 text-rose-700 rounded-xl flex items-center gap-2 text-xs">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Enter student name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="10-digit number"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Academic Class *
                    </label>
                    <select
                      value={studentClass}
                      onChange={(e) => setStudentClass(e.target.value as ClassLevel)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    >
                      <option value="11th">Class 11th Science</option>
                      <option value="12th">Class 12th Science</option>
                      <option value="Dropper">Dropper / Repeater</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Target Course *
                    </label>
                    <select
                      value={course}
                      onChange={(e) => setCourse(e.target.value as TargetExam)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    >
                      <option value="MHT-CET">MHT-CET (PCM/PCB)</option>
                      <option value="JEE">JEE Main & Advanced</option>
                      <option value="NEET">NEET-UG Medical</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Preferred Batch Timing
                  </label>
                  <input
                    type="text"
                    value={preferredBatch}
                    onChange={(e) => setPreferredBatch(e.target.value)}
                    placeholder="e.g. Morning Batch / Evening Batch / Weekend"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Message or Specific Inquiries
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Any specific questions regarding fees, scholarship test, or hostel guidance..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Registering Application...' : 'Submit Admission Application'}</span>
                </button>

                <p className="text-[11px] text-slate-400 text-center">
                  🔒 We respect your privacy. Your information is securely handled by Disha Academy administration.
                </p>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
