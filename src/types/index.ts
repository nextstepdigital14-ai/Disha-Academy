export type UserRole = 'student' | 'admin';

export type TargetExam = 'MHT-CET' | 'JEE' | 'NEET';

export type SubjectType = 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology';

export type ClassLevel = '11th' | '12th' | 'Dropper';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  phone?: string;
  studentClass?: ClassLevel;
  targetExam?: TargetExam;
  createdAt: string;
  isActive: boolean;
  photoURL?: string;
}

export interface BatchInfo {
  id: string;
  name: string;
  timing: string;
  startDate: string;
  seatsTotal: number;
  seatsAvailable: number;
  mode: 'Offline Classroom' | 'Hybrid' | 'Online Live';
}

export interface CourseSyllabusSubject {
  subject: SubjectType;
  chapters: string[];
}

export interface Course {
  id: string;
  slug: string; // 'mht-cet', 'jee', 'neet'
  name: string;
  badge: string;
  shortDesc: string;
  fullDesc: string;
  targetAudience: string;
  duration: string;
  eligibility: string;
  subjects: SubjectType[];
  features: string[];
  examPattern: {
    format: string;
    totalMarks: number;
    markingScheme: string;
    negativeMarking: string;
    duration: string;
  };
  batches: BatchInfo[];
  feeStructure: {
    tuitionFee: string;
    registrationFee: string;
    installments: string;
    scholarshipInfo: string;
  };
  syllabusOverview: CourseSyllabusSubject[];
  faqs: { question: string; answer: string }[];
  isPublished: boolean;
}

export interface NoteItem {
  id: string;
  title: string;
  description: string;
  course: TargetExam | 'All';
  classLevel: ClassLevel | 'All';
  subject: SubjectType;
  chapter: string;
  topic?: string;
  fileUrl: string;
  fileName: string;
  fileSize: string;
  fileType: 'pdf' | 'doc' | 'notes';
  uploadedAt: string;
  uploadedBy: string;
  isPublished: boolean;
  downloadCount: number;
  isDemo: boolean;
}

export interface Question {
  id: string;
  exam: TargetExam;
  subject: SubjectType;
  chapter: string;
  topic?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questionText: string;
  options: [string, string, string, string];
  correctOptionIndex: number; // 0, 1, 2, 3
  explanation: string;
  positiveMarks: number;
  negativeMarks: number;
}

export interface TestItem {
  id: string;
  title: string;
  description: string;
  exam: TargetExam;
  subject: SubjectType | 'Full Syllabus';
  chapters: string[];
  questionIds: string[];
  durationMinutes: number;
  totalMarks: number;
  markingScheme: {
    positive: number;
    negative: number;
  };
  isPublished: boolean;
  createdAt: string;
}

export interface TestAttempt {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  testId: string;
  testTitle: string;
  exam: TargetExam;
  subject: string;
  totalQuestions: number;
  attemptedCount: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  markedCount: number;
  score: number;
  maxMarks: number;
  percentage: number;
  timeTakenSeconds: number;
  completedAt: string;
  userAnswers: Record<string, number>; // questionId -> optionIndex
  markedForReview: string[]; // questionId[]
  chapterBreakdown: Record<string, { total: number; correct: number; incorrect: number }>;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'Admissions' | 'Test Schedule' | 'Results' | 'General' | 'Batches';
  priority: 'Normal' | 'High' | 'Urgent';
  targetAudience: 'All' | ClassLevel;
  createdAt: string;
  expiresAt?: string;
  isActive: boolean;
  linkText?: string;
  linkUrl?: string;
}

export interface AdmissionEnquiry {
  id: string;
  studentName: string;
  mobileNumber: string;
  email?: string;
  studentClass: ClassLevel | 'Dropper';
  interestedCourse: TargetExam;
  preferredBatch: string;
  message?: string;
  submittedAt: string;
  status: 'New' | 'Contacted' | 'Enrolled' | 'Closed';
  adminNotes?: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  subject: SubjectType;
  experience: string;
  qualification: string;
  bio: string;
  image?: string;
}

export interface Testimonial {
  id: string;
  studentName: string;
  exam: TargetExam;
  scoreOrRank: string;
  college: string;
  avatar?: string;
  content: string;
  year: string;
  isDemo: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Classroom' | 'Lab' | 'Events' | 'Campus' | 'Olympiad';
  url: string;
  description: string;
}

export interface SiteSettings {
  academyName: string;
  tagline: string;
  heroSubtitle: string;
  address: string;
  googleMapsUrl: string;
  phone: string;
  whatsappNumber: string; // digits only e.g. 919028321505
  email: string;
  officeTimings: string;
  announcementTicker: string;
  isTickerActive: boolean;
  facultyList: FacultyMember[];
  galleryImages: GalleryItem[];
}
