import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { contentService } from '../services/contentService';
import { Course, SiteSettings } from '../types';
import { BatchScheduleCard } from '../components/courses/BatchScheduleCard';
import {
  GraduationCap,
  Calendar,
  Clock,
  BookOpen,
  Award,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  MessageCircle,
  Send,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { enquiryService } from '../services/enquiryService';

export const CourseDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [course, setCourse] = useState<Course | null>(null);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  // Quick form states
  const [studentName, setStudentName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [studentClass, setStudentClass] = useState<'11th' | '12th' | 'Dropper'>('12th');
  const [preferredBatch, setPreferredBatch] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Accordion for syllabus subjects
  const [openSubject, setOpenSubject] = useState<string | null>('Physics');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) return;

    setLoading(true);
    Promise.all([
      contentService.getCourseBySlug(slug),
      contentService.getSettings()
    ])
      .then(([c, s]) => {
        if (!c) {
          navigate('/courses');
          return;
        }
        setCourse(c);
        setSettings(s);
        setPreferredBatch(c.batches[0]?.name || 'Morning Batch');
        setOpenSubject(c.subjects[0] || 'Physics');
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-brand-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!course) {
    return null;
  }

  const whatsappNumber = settings?.whatsappNumber || '919028321505';
  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello Disha Academy! I would like to enquire about the ${course.name} batch details and fees.`
  )}`;

  const handleSubmitEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await enquiryService.submitEnquiry({
        studentName,
        mobileNumber,
        studentClass,
        interestedCourse: course.slug === 'mht-cet' ? 'MHT-CET' : course.slug === 'jee' ? 'JEE' : 'NEET',
        preferredBatch,
        message: `Direct course page enquiry for ${course.name}`
      });
      setSubmitSuccess(true);
      setStudentName('');
      setMobileNumber('');
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-10 space-y-12">
      {/* Course Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-navy-950 via-brand-950 to-navy-900 text-white rounded-3xl p-8 sm:p-12 shadow-premium relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" /> {course.badge}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              {course.name}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {course.fullDesc}
            </p>

            {/* Quick Metadata Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <span className="text-slate-400 block text-[11px]">Duration:</span>
                <span className="font-bold text-white">{course.duration}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <span className="text-slate-400 block text-[11px]">Eligibility:</span>
                <span className="font-bold text-white">{course.eligibility}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 col-span-2 sm:col-span-1">
                <span className="text-slate-400 block text-[11px]">Subjects:</span>
                <span className="font-bold text-white">{course.subjects.join(', ')}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a
                href="#enquiry-form"
                className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
              >
                Enquire For Batch Admission
              </a>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Left Content: Exam Pattern, Highlights, Syllabus & FAQs */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Exam Pattern Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
              <h3 className="text-xl font-bold text-navy-950 dark:text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-600" />
                Official Exam Pattern & Marking Scheme
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <span className="text-slate-400 block text-[11px]">Format:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{course.examPattern.format}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <span className="text-slate-400 block text-[11px]">Total Marks:</span>
                  <span className="font-black text-brand-600 dark:text-brand-400 text-sm">{course.examPattern.totalMarks} Marks</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <span className="text-slate-400 block text-[11px]">Duration:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{course.examPattern.duration}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <span className="text-slate-400 block text-[11px]">Negative Mark:</span>
                  <span className="font-bold text-rose-600 dark:text-rose-400">{course.examPattern.negativeMarking}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 pt-1">
                <strong>Marking Rules:</strong> {course.examPattern.markingScheme}
              </p>
            </div>

            {/* Program Highlights */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
              <h3 className="text-xl font-bold text-navy-950 dark:text-white">
                Program Pedagogical Features
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                {course.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Syllabus Overview Accordion */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-navy-950 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-brand-600" />
                  Syllabus Breakdown by Subject
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  All chapters thoroughly taught, practiced with 15-year PYQs, and assessed weekly.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {course.syllabusOverview.map((item) => {
                  const isOpen = openSubject === item.subject;

                  return (
                    <div
                      key={item.subject}
                      className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenSubject(isOpen ? null : item.subject)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-bold text-sm sm:text-base text-navy-950 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-brand-500" />
                          <span>{item.subject} Syllabus ({item.chapters.length} Key Chapters)</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-brand-600' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                            {item.chapters.map((ch, idx) => (
                              <div key={idx} className="flex items-center gap-2 py-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                <span>{ch}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Batch Schedules Grid */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-navy-950 dark:text-white">
                Upcoming Batch Timings ({course.batches.length} Batches)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.batches.map((b) => (
                  <BatchScheduleCard key={b.id} batch={b} courseName={course.name} />
                ))}
              </div>
            </div>

            {/* Fee Structure Box */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700/80 space-y-4">
              <h3 className="text-xl font-bold text-navy-950 dark:text-white">
                Fee Structure & Scholarship Options
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block text-xs">Standard Tuition Fee:</span>
                  <span className="font-extrabold text-base text-navy-950 dark:text-white mt-1 block">
                    {course.feeStructure.tuitionFee}
                  </span>
                  <p className="text-xs text-slate-500 mt-1">{course.feeStructure.installments}</p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block text-xs">Scholarship Concessions:</span>
                  <p className="font-bold text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                    {course.feeStructure.scholarshipInfo}
                  </p>
                </div>
              </div>
            </div>

            {/* FAQs */}
            {course.faqs.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
                <h3 className="text-xl font-bold text-navy-950 dark:text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-brand-600" />
                  Course Specific FAQs
                </h3>

                <div className="space-y-3">
                  {course.faqs.map((faq, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs sm:text-sm space-y-1">
                      <h4 className="font-bold text-navy-950 dark:text-white">{faq.question}</h4>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Admission Enquiry Sticky Form */}
          <div id="enquiry-form" className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-premium space-y-4">
              <div className="space-y-1">
                <span className="text-amber-500 font-bold text-xs uppercase tracking-wider">
                  Direct Admission
                </span>
                <h3 className="text-lg font-extrabold text-navy-950 dark:text-white">
                  Enquire for {course.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Reserve a seat or book a free counseling & demo session in Kolhapur.
                </p>
              </div>

              {submitSuccess ? (
                <div className="p-5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
                    Enquiry Received!
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">
                    Our academic counselor will contact you shortly with batch schedule and fee structure.
                  </p>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#25D366] text-white text-xs font-bold py-2 px-4 rounded-xl shadow"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>Follow Up on WhatsApp</span>
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmitEnquiry} className="space-y-3.5 text-xs">
                  {submitError && (
                    <div className="p-3 bg-rose-50 text-rose-700 rounded-xl flex items-center gap-1.5 text-xs">
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
                      placeholder="e.g. Atharva Patil"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="10-digit phone"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Current Class / Status *
                    </label>
                    <select
                      value={studentClass}
                      onChange={(e) => setStudentClass(e.target.value as '11th' | '12th' | 'Dropper')}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    >
                      <option value="11th">Class 11th Science</option>
                      <option value="12th">Class 12th Science</option>
                      <option value="Dropper">Dropper / Repeater</option>
                    </select>
                  </div>

                  {course.batches.length > 0 && (
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Preferred Batch
                      </label>
                      <select
                        value={preferredBatch}
                        onChange={(e) => setPreferredBatch(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                      >
                        {course.batches.map((b) => (
                          <option key={b.id} value={b.name}>
                            {b.name} ({b.timing})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-colors disabled:opacity-50 text-xs sm:text-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Batch Enquiry'}</span>
                  </button>

                  <div className="text-center pt-1">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold hover:underline inline-flex items-center gap-1"
                    >
                      <MessageCircle className="w-3 h-3 fill-current" />
                      <span>Prefer instant chat on WhatsApp?</span>
                    </a>
                  </div>
                </form>
              )}
            </div>

            {/* Quick Practice Link */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
              <span className="font-bold text-navy-950 dark:text-white block">Test Your Knowledge:</span>
              <p className="text-slate-600 dark:text-slate-300">
                Attempt chapter-wise simulated MCQs tailored specifically for {course.name}.
              </p>
              <Link
                to="/mcq-practice"
                className="inline-flex items-center gap-1 font-bold text-brand-600 dark:text-brand-400 hover:underline"
              >
                <span>Launch {course.name} MCQ Practice</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
