# Disha Academy & Olympiad School — Coaching Academy Web Platform

A complete, modern, interactive, responsive, and production-ready web application built for **Disha Academy & Olympiad School**, premier coaching institute located in **Kolhapur, Maharashtra**.

The platform is designed to promote the academy, provide structured study materials with in-browser PDF viewing, deliver a full-featured Computer-Based Test (CBT) MCQ practice simulator with negative marking calculations, and handle online admission consultations with direct WhatsApp integration.

---

## 📍 Verified Academy Identity & Location

- **Academy Name**: Disha Academy & Olympiad School
- **Official Address**: Plot No. 4, Radhanagari Road, Behind Bank of Maharashtra, Sane Guruji Vasahat, Kanerkar Nagar, Kolhapur, Maharashtra 416011
- **Google Maps Location**: [https://maps.app.goo.gl/txmmyLExVxMXhjzbA?g_st=ac](https://maps.app.goo.gl/txmmyLExVxMXhjzbA?g_st=ac)
- **Primary Contact**: `+91 9028321505`
- **WhatsApp**: `919028321505` ([Chat on WhatsApp](https://wa.me/919028321505))
- **Email**: `dishaacademykolhapur@gmail.com`
- **Office Timings**: Mon - Sat: 8:00 AM - 8:30 PM | Sun: 9:00 AM - 2:00 PM

> **Note on Verification**: All details (exact name, address, landmark, phone, coordinates) have been extracted directly from the verified Google Maps link and business registry. In addition, every single item (timings, phone, WhatsApp number, faculty, fees, hero headline, announcements) is dynamically editable by administrators in the **Admin Control Center**.

---

## 🚀 Tech Stack

- **Frontend Core**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS (custom theme with Navy, Royal Blue, Amber, and Emerald accents)
- **Icons**: Lucide React
- **Routing**: React Router v7
- **Backend & Database**: Firebase Authentication, Cloud Firestore, Firebase Storage
- **Hybrid Store Architecture**: Live Firebase Cloud integration with zero-friction Local Persistent Fallback store so all interactive features (logins, PDF uploads, MCQ tests, score tracking, enquiries, settings) operate smoothly both offline/out-of-the-box and in production.
- **Animations & Effects**: Canvas Confetti, smooth Tailwind transitions, custom glassmorphism.

---

## 🌟 Key Features & Pages

### 1. Home Page (`/`)
- **Top Announcement Bar**: Displays admissions ticker from `siteSettings`, editable from Admin.
- **Header**: Academy logo, navigation links, theme toggle (Dark/Light mode), global search (`⌘K`), and "Enquire Now" CTA.
- **Hero Section**: Headline *"Your Journey to CET, JEE & NEET Success Starts Here."* with supporting text focusing on structured preparation and mentorship without unverified claims.
- **Course Cards**: Overview of MHT-CET, JEE Main/Advanced, and NEET-UG with batch start dates and seat counters.
- **Why Disha Academy**: 6 distinct advantages including small batches, daily doubt clearing, and simulated CBTs.
- **Faculty Section**: Department heads for Physics, Chemistry, Math, and Biology (editable in Admin).
- **Notice Board**: Categorized notices with priority labels (Urgent, High, Normal).
- **Student Testimonials**: Sample testimonials clearly labeled with `Sample Demo` badges as required.
- **Campus Gallery**: High-resolution image gallery with interactive category filters (Classroom, Lab, Campus, Events, Olympiad).
- **FAQ Accordion**: Answers to common parent and student questions.
- **Location & Google Map Section**: Address card, embedded map, "Get Directions" button opening the verified Google Maps link, and quick admission consultation form.

### 2. Courses Pages (`/courses`, `/courses/:slug`)
- Dedicated detail pages for:
  - **MHT-CET** (`/courses/mht-cet`): PCM / PCB State Board integration, 200 marks pattern, shortcut techniques.
  - **JEE Main & Advanced** (`/courses/jee`): Conceptual rigor, numerical problem solving, 300 marks (+4 / -1) CBT pattern.
  - **NEET-UG Medical** (`/courses/neet`): NCERT line-by-line decoding, 720 marks pattern, diagram-based drills.
- Detailed syllabus breakdown by subject and chapter.
- Batch schedule cards with live seat counters and timing details.
- Official fee structures and scholarship concession info.
- Side-by-side **Course Comparison Table**.
- Course-specific admission enquiry form.

### 3. Student Portal & Dashboard (`/dashboard`)
- Role-based protected route for authenticated students.
- Greeting banner with target exam and class level.
- Quick-access summary cards for completed tests, average accuracy, and personal best score.
- **My Notes**: Downloadable study material recommended for the student's selected exam.
- **Test History**: Personal attempt records with scorecards, accuracy, and timestamps.
- **Profile Manager**: Edit contact phone, academic class (11th, 12th, Dropper), and target exam goal.

### 4. Notes & Study Material Library (`/notes`)
- Public notes preview and student full-access library.
- Filter by **Course** (MHT-CET, JEE, NEET, All), **Class** (11th, 12th, Dropper, All), **Subject** (Physics, Chem, Math, Bio), and **Chapter Keyword Search**.
- **In-Browser PDF Viewer**: Clean modal previewing documents directly with fullscreen and raw link options.
- **Download Counter**: Automatically increments download statistics in the database.
- Admin upload support for actual PDF files with progress indicators.

### 5. Interactive MCQ Practice System (`/mcq-practice`)
- **Preset Mock Tests**: Official full-syllabus and booster sprints for MHT-CET, JEE, and NEET.
- **Custom Test Generator**: Allows students to select exam, subject, difficulty (Easy, Medium, Hard), number of questions (5, 10, 15), and timer duration.
- **Exam Testing Screen**:
  - Live countdown timer with auto-submit when time expires.
  - Question Palette (Answered, Unanswered, Marked for Review, Not Visited).
  - Configurable marking scheme calculation (+4/-1 for JEE/NEET, +1/0 or +2/0 for MHT-CET).
  - Previous, Next, Clear Selection, and Mark for Review buttons.
  - Submit confirmation dialog displaying attempt summary.
- **Detailed Result Report**:
  - Confetti celebration for scores >= 60%.
  - Total marks, score, accuracy percentage, correct/incorrect/unanswered breakdown, and time taken.
  - Chapter-wise performance and accuracy breakdown table.
  - Question-by-question review displaying student's selected answer vs correct answer and in-depth explanations.
  - "Retake Test" and "Save to Dashboard" buttons.

### 6. Admin Control Center (`/admin`)
- Protected route accessible exclusively to authenticated administrators.
- **Overview**: Registered students count, published notes, active courses, test attempts, and recent activity.
- **Notes Manager**: Upload PDF files to Firebase Storage/Local store, edit metadata, toggle publish status, and delete notes.
- **MCQ Question Bank**: Create questions, set 4 options, choose correct choice, write explanations, and configure positive/negative marks.
- **Student Manager**: View student registrations, target goals, activate/deactivate accounts, and inspect individual test scores.
- **Courses & Batches**: Edit course descriptions, tuition fees, installment terms, and batch timings.
- **Announcements**: Publish, edit, and delete notice board announcements.
- **Website Content**: Edit verified address, phone, WhatsApp number, hero text, announcement ticker, and faculty list.
- **Admission Enquiries**: View student submissions, update status (New, Contacted, Enrolled, Closed), add counselor notes, and start direct WhatsApp chats.
- **Analytics & Reports**: Visual participation charts by exam and full test attempts history log.
- **Firebase Backend Config**: Live status indicator, `.env` snippet copy tool, and copyable security rules.

### 7. WhatsApp Integration
- Floating WhatsApp chat bubble on every page with expandable counselor greeting.
- Official `https://wa.me/919028321505` URL format with editable number in Admin.
- Pre-filled dynamic messages (automatically customized when browsing MHT-CET, JEE, or NEET course pages).
- Direct WhatsApp buttons in the hero, admission forms, course cards, and footer.

---

## 🔑 Pre-Configured Demo Accounts

For immediate local testing and evaluation without any manual account creation:

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@dishaacademy.com` | `admin123` |
| **Student** | `student@dishaacademy.com` | `student123` |

*(Quick autofill buttons are also provided directly on the Login page for 1-click access!)*

---

## 🛠️ Local Development Setup

### 1. Prerequisites
- Node.js (v18 or higher, tested on v24)
- npm or pnpm

### 2. Installation
```bash
# Clone or navigate to the project directory
cd disha-academy

# Install dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:5173/`.

### 4. Build for Production
```bash
npm run build
```
Creates an optimized, tree-shaken production bundle in `dist/`.

---

## ☁️ Firebase Configuration & Deployment

### Step 1: Create Firebase Project
1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project named `disha-academy`.
3. In **Authentication** > **Sign-in method**, enable **Email/Password**.
4. In **Firestore Database**, create a database.
5. In **Storage**, create a default storage bucket.

### Step 2: Configure Environment Variables
Copy `.env.example` to `.env` and fill in your credentials from Firebase Project Settings > General > Web App:
```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=disha-academy.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=disha-academy
VITE_FIREBASE_STORAGE_BUCKET=disha-academy.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:abcdef
```

### Step 3: Deploy Security Rules
The repository contains ready-to-use security rules files:
- `firestore.rules`: Least-privilege rules restricting admin writes, securing student attempts, and permitting public enquiry submissions.
- `storage.rules`: Allows public read for published notes; restricts uploads, edits, and deletions strictly to admins.

To deploy via Firebase CLI:
```bash
npm install -g firebase-tools
firebase login
firebase init
firebase deploy --only firestore:rules,storage:rules,hosting
```

---

## 📁 Project Structure

```
disha-academy/
├── public/
│   ├── favicon.svg             # Disha Academy compass / graduation icon
│   ├── robots.txt              # Search engine directives
│   └── sitemap.xml             # XML sitemap for SEO
├── src/
│   ├── components/
│   │   ├── admin/              # Admin control center modules (Overview, Notes, MCQ, etc.)
│   │   ├── common/             # Reusable UI primitives
│   │   ├── courses/            # Course cards, comparison table, batch schedule cards
│   │   ├── home/               # Hero, courses, features, about, notice board, gallery, FAQ, map
│   │   ├── layout/             # Navbar, AnnouncementBar, Footer, WhatsAppFloating, GlobalSearch
│   │   ├── notes/              # Notes filter, note cards, PDF viewer modal
│   │   └── quiz/               # Question palette, timer badge, submit modal, result view
│   ├── config/
│   │   └── firebase.ts         # Firebase initialization with local persistent fallback
│   ├── context/
│   │   ├── AuthContext.tsx      # Firebase auth provider & role management
│   │   ├── ThemeContext.tsx     # Light & dark mode provider
│   │   └── NotificationContext.tsx # Toast alerts system
│   ├── pages/                  # 12 complete responsive application pages
│   ├── services/
│   │   ├── authService.ts       # Authentication service
│   │   ├── notesService.ts      # Study material Firestore & Storage service
│   │   ├── quizService.ts       # MCQ questions, test attempts & scoring engine
│   │   ├── enquiryService.ts    # Admission enquiry submission & status service
│   │   ├── contentService.ts    # Settings, courses, announcements & faculty service
│   │   └── seedData.ts          # Rich verified academy data, questions, notes, and tests
│   ├── types/
│   │   └── index.ts             # Complete TypeScript interfaces
│   ├── App.tsx                 # Route declarations & global layout wrappers
│   ├── index.css               # Tailwind directives & academic styles
│   └── main.tsx                # React root mount
├── .env.example                # Sample environment variables
├── firebase.json               # Firebase hosting and rule configuration
├── firestore.rules             # Production Firestore security rules
├── storage.rules               # Production Storage security rules
├── tailwind.config.js          # Tailwind theme colors, fonts, shadows
└── tsconfig.json               # TypeScript configuration
```

---

## 🏆 Summary

Disha Academy & Olympiad School's web portal delivers an authentic, trustworthy Indian coaching academy experience in Kolhapur. It is completely interactive, responsive on mobile, tablet, and desktop, equipped with robust assessment tools, real PDF study material handlers, and comprehensive administrative controls.
