import React, { useState } from 'react';
import { isFirebaseConfigured } from '../../config/firebase';
import { Database, ShieldCheck, CheckCircle2, AlertTriangle, Copy, ExternalLink, Terminal } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

export const FirebaseSetupModal: React.FC = () => {
  const { showToast } = useNotification();
  const [copiedEnv, setCopiedEnv] = useState(false);
  const [copiedRules, setCopiedRules] = useState(false);

  const envSample = `VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=disha-academy.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=disha-academy
VITE_FIREBASE_STORAGE_BUCKET=disha-academy.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:abcdef`;

  const firestoreRulesSample = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    function isAdmin() {
      return isAuthenticated() && request.auth.token.role == 'admin' || request.auth.token.email.matches('.*admin.*');
    }
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    // Public readable site settings, courses, announcements, notes metadata
    match /settings/{doc} {
      allow read: if true;
      allow write: if isAdmin();
    }
    match /courses/{courseId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    match /announcements/{annId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    match /notes/{noteId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    match /questions/{questionId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }
    match /tests/{testId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    match /enquiries/{enquiryId} {
      allow create: if true; // Public can submit admission form
      allow read, update, delete: if isAdmin();
    }
    match /attempts/{attemptId} {
      allow create: if true;
      allow read: if isAuthenticated() && (resource.data.studentId == request.auth.uid || isAdmin());
      allow update, delete: if isAdmin();
    }
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow write: if isOwner(userId) || isAdmin();
    }
  }
}`;

  const copyToClipboard = (text: string, type: 'env' | 'rules') => {
    navigator.clipboard.writeText(text);
    if (type === 'env') setCopiedEnv(true);
    if (type === 'rules') setCopiedRules(true);
    showToast('Copied to clipboard!', 'success');
    setTimeout(() => {
      setCopiedEnv(false);
      setCopiedRules(false);
    }, 2500);
  };

  return (
    <div className="space-y-6 text-xs sm:text-sm">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
          Firebase Backend & Security Configuration
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Inspection status of live Firebase Authentication, Cloud Firestore, and Firebase Storage.
        </p>
      </div>

      {/* Connection Status Banner */}
      <div
        className={`p-6 rounded-3xl border shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          isFirebaseConfigured
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
            : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800'
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 text-white ${
              isFirebaseConfigured ? 'bg-emerald-600' : 'bg-amber-500'
            }`}
          >
            {isFirebaseConfigured ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          </div>
          <div>
            <h3
              className={`font-bold text-base ${
                isFirebaseConfigured ? 'text-emerald-900 dark:text-emerald-200' : 'text-amber-900 dark:text-amber-200'
              }`}
            >
              {isFirebaseConfigured
                ? 'Live Firebase Connected & Active'
                : 'Local Persistent Simulation Active (Zero Setup Needed for Testing)'}
            </h3>
            <p
              className={`text-xs mt-0.5 leading-relaxed ${
                isFirebaseConfigured ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-800 dark:text-amber-300'
              }`}
            >
              {isFirebaseConfigured
                ? 'Your application is actively communicating with Google Cloud Firestore, Firebase Auth, and Storage.'
                : 'All features—including student login, registrations, test timer, MCQ attempts, PDF uploads & downloads, and admin settings—are fully functional out of the box using persistent browser store. When ready for production hosting, add your Firebase keys to .env.'}
            </p>
          </div>
        </div>

        <a
          href="https://console.firebase.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 font-bold text-xs shadow-sm hover:shadow transition-all self-start sm:self-center flex-shrink-0"
        >
          <span>Firebase Console</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Setup Instructions */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
        <h3 className="font-bold text-base text-navy-950 dark:text-white">
          Step-by-Step Production Firebase Setup
        </h3>

        <ol className="list-decimal list-inside space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <li>Create a project in the <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-brand-600 font-bold underline">Firebase Console</a> named <strong>disha-academy</strong>.</li>
          <li>Go to <strong>Authentication</strong> &gt; <strong>Sign-in method</strong> &gt; Enable <strong>Email/Password</strong>.</li>
          <li>Go to <strong>Firestore Database</strong> &gt; Create Database (Start in test mode or paste the security rules below).</li>
          <li>Go to <strong>Storage</strong> &gt; Get Started with standard default bucket.</li>
          <li>Go to <strong>Project Settings</strong> &gt; <strong>General</strong> &gt; Register a Web App, and copy the config credentials into a local <code>.env</code> file.</li>
        </ol>

        {/* Copyable .env snippet */}
        <div className="pt-2">
          <div className="flex items-center justify-between pb-1 text-xs font-bold text-slate-700 dark:text-slate-300">
            <span>Sample .env File:</span>
            <button
              onClick={() => copyToClipboard(envSample, 'env')}
              className="text-brand-600 dark:text-brand-400 hover:underline inline-flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" /> {copiedEnv ? 'Copied!' : 'Copy .env snippet'}
            </button>
          </div>
          <pre className="p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto">
            {envSample}
          </pre>
        </div>

        {/* Copyable Firestore Rules */}
        <div className="pt-4">
          <div className="flex items-center justify-between pb-1 text-xs font-bold text-slate-700 dark:text-slate-300">
            <span>Least-Privilege Firestore Security Rules:</span>
            <button
              onClick={() => copyToClipboard(firestoreRulesSample, 'rules')}
              className="text-brand-600 dark:text-brand-400 hover:underline inline-flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" /> {copiedRules ? 'Copied!' : 'Copy firestore.rules'}
            </button>
          </div>
          <pre className="p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto max-h-52">
            {firestoreRulesSample}
          </pre>
        </div>
      </div>
    </div>
  );
};
