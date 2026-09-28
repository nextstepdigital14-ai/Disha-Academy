import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AdminSidebar, AdminTab } from '../components/admin/AdminSidebar';
import { OverviewTab } from '../components/admin/OverviewTab';
import { NotesManagerTab } from '../components/admin/NotesManagerTab';
import { McqManagerTab } from '../components/admin/McqManagerTab';
import { StudentManagerTab } from '../components/admin/StudentManagerTab';
import { CoursesManagerTab } from '../components/admin/CoursesManagerTab';
import { AnnouncementsTab } from '../components/admin/AnnouncementsTab';
import { WebsiteContentTab } from '../components/admin/WebsiteContentTab';
import { EnquiriesTab } from '../components/admin/EnquiriesTab';
import { ReportsTab } from '../components/admin/ReportsTab';
import { FirebaseSetupModal } from '../components/admin/FirebaseSetupModal';
import { PdfViewerModal } from '../components/notes/PdfViewerModal';

import { notesService } from '../services/notesService';
import { quizService } from '../services/quizService';
import { contentService } from '../services/contentService';
import { enquiryService } from '../services/enquiryService';
import { authService } from '../services/authService';

import {
  UserProfile,
  NoteItem,
  Course,
  Question,
  TestItem,
  TestAttempt,
  Announcement,
  AdmissionEnquiry,
  SiteSettings
} from '../types';
import { ShieldCheck, ShieldAlert, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboardPage: React.FC = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [students, setStudents] = useState<UserProfile[]>([]);
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [tests, setTests] = useState<TestItem[]>([]);
  const [attempts, setAttempts] = useState<TestAttempt[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [enquiries, setEnquiries] = useState<AdmissionEnquiry[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  const [previewNote, setPreviewNote] = useState<NoteItem | null>(null);
  const [loading, setLoading] = useState(true);

  const loadAllAdminData = async () => {
    try {
      const [uList, nList, cList, qList, tList, attList, annList, enqList, setts] =
        await Promise.all([
          authService.getAllUsers(),
          notesService.getNotes(),
          contentService.getCourses(),
          quizService.getQuestions(),
          quizService.getTests(),
          quizService.getAttempts(),
          contentService.getAnnouncements(),
          enquiryService.getEnquiries(),
          contentService.getSettings()
        ]);

      setStudents(uList);
      setNotes(nList);
      setCourses(cList);
      setQuestions(qList);
      setTests(tList);
      setAttempts(attList);
      setAnnouncements(annList);
      setEnquiries(enqList);
      setSettings(setts);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!authLoading) {
      if (!user) {
        navigate('/login');
      } else if (!isAdmin) {
        // Not admin
      } else {
        loadAllAdminData();
      }
    }
  }, [user, isAdmin, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-brand-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  // Role check: Only authorized admins
  if (!user || !isAdmin) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-3xl border border-rose-200 dark:border-rose-900/60 shadow-xl text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-rose-700 dark:text-rose-400">
            Access Restricted: Admin Authorization Required
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            You do not have administrative privileges to access this control center. Please log in with an authorized academy administrator account.
          </p>
          <div className="pt-2 flex gap-3">
            <Link
              to="/dashboard"
              className="flex-1 py-2.5 rounded-xl border font-bold text-xs hover:bg-slate-100"
            >
              Go to Student Dashboard
            </Link>
            <Link
              to="/login"
              className="flex-1 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs hover:bg-brand-700"
            >
              Switch Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const pendingEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-md">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-navy-950 dark:text-white leading-tight">
              Disha Academy Administration
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Logged in as: <strong>{user.displayName}</strong> ({user.email})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </Link>
        </div>
      </div>

      {/* Main Admin Area */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Navigation Sidebar */}
        <AdminSidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          enquiriesCount={pendingEnquiriesCount}
        />

        {/* Tab Workspace */}
        <div className="flex-1 w-full min-w-0">
          {activeTab === 'overview' && (
            <OverviewTab
              students={students}
              notes={notes}
              courses={courses}
              attempts={attempts}
              enquiries={enquiries}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'enquiries' && (
            <EnquiriesTab
              enquiries={enquiries}
              onRefresh={loadAllAdminData}
            />
          )}

          {activeTab === 'notes' && (
            <NotesManagerTab
              notes={notes}
              onRefresh={loadAllAdminData}
              onPreviewNote={(n) => setPreviewNote(n)}
            />
          )}

          {activeTab === 'mcq' && (
            <McqManagerTab
              questions={questions}
              tests={tests}
              onRefresh={loadAllAdminData}
            />
          )}

          {activeTab === 'students' && (
            <StudentManagerTab
              students={students}
              attempts={attempts}
              onRefresh={loadAllAdminData}
            />
          )}

          {activeTab === 'courses' && (
            <CoursesManagerTab
              courses={courses}
              onRefresh={loadAllAdminData}
            />
          )}

          {activeTab === 'announcements' && (
            <AnnouncementsTab
              announcements={announcements}
              onRefresh={loadAllAdminData}
            />
          )}

          {activeTab === 'content' && settings && (
            <WebsiteContentTab
              settings={settings}
              onRefresh={loadAllAdminData}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsTab
              attempts={attempts}
              courses={courses}
              notes={notes}
            />
          )}

          {activeTab === 'firebase' && <FirebaseSetupModal />}
        </div>
      </div>

      {/* PDF Viewer Modal */}
      <PdfViewerModal note={previewNote} onClose={() => setPreviewNote(null)} />
    </div>
  );
};
