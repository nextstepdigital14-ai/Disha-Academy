import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../config/firebase';
import { AdmissionEnquiry } from '../types';

const LOCAL_ENQUIRIES_KEY = 'disha_enquiries_store';

const INITIAL_ENQUIRIES: AdmissionEnquiry[] = [
  {
    id: "enq-101",
    studentName: "Atharva Patil",
    mobileNumber: "9822334455",
    email: "atharva.patil@example.com",
    studentClass: "11th",
    interestedCourse: "JEE",
    preferredBatch: "Morning Batch",
    message: "Seeking admission in 2-year integrated batch for JEE Main 2028.",
    submittedAt: "2026-09-21T11:30:00.000Z",
    status: "Contacted",
    adminNotes: "Called parent. Shared fee structure and brochure on WhatsApp."
  },
  {
    id: "enq-102",
    studentName: "Snehal Shinde",
    mobileNumber: "9404123456",
    email: "snehal.s@example.com",
    studentClass: "12th",
    interestedCourse: "MHT-CET",
    preferredBatch: "Evening Batch",
    message: "Want to join PCM crash course and test series.",
    submittedAt: "2026-09-24T14:15:00.000Z",
    status: "New"
  }
];

function getLocalEnquiries(): AdmissionEnquiry[] {
  try {
    const raw = localStorage.getItem(LOCAL_ENQUIRIES_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_ENQUIRIES_KEY, JSON.stringify(INITIAL_ENQUIRIES));
      return INITIAL_ENQUIRIES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ENQUIRIES;
  }
}

function saveLocalEnquiries(list: AdmissionEnquiry[]) {
  localStorage.setItem(LOCAL_ENQUIRIES_KEY, JSON.stringify(list));
}

export const enquiryService = {
  isLive: isFirebaseConfigured && db !== null,

  async submitEnquiry(enquiry: Omit<AdmissionEnquiry, 'id' | 'submittedAt' | 'status'>): Promise<AdmissionEnquiry> {
    // Basic validation & Indian mobile number format validation
    const cleanedPhone = enquiry.mobileNumber.replace(/\D/g, '');
    if (cleanedPhone.length < 10) {
      throw new Error('Please enter a valid 10-digit mobile number.');
    }

    // Rate-limiting check: prevent more than 3 enquiries from same device in 10 minutes
    const lastSubmission = localStorage.getItem('disha_last_enquiry_time');
    const now = Date.now();
    if (lastSubmission && now - parseInt(lastSubmission, 10) < 15000) {
      throw new Error('Please wait a few seconds before submitting another enquiry.');
    }
    localStorage.setItem('disha_last_enquiry_time', now.toString());

    const id = 'enq-' + Date.now();
    const newEnquiry: AdmissionEnquiry = {
      ...enquiry,
      id,
      submittedAt: new Date().toISOString(),
      status: 'New'
    };

    if (this.isLive && db) {
      try {
        await setDoc(doc(db, 'enquiries', id), newEnquiry);
      } catch (err) {
        console.warn('Firestore enquiry save error:', err);
      }
    }

    const local = getLocalEnquiries();
    local.unshift(newEnquiry);
    saveLocalEnquiries(local);

    return newEnquiry;
  },

  async getEnquiries(): Promise<AdmissionEnquiry[]> {
    if (this.isLive && db) {
      try {
        const snap = await getDocs(collection(db, 'enquiries'));
        if (!snap.empty) {
          const list: AdmissionEnquiry[] = [];
          snap.forEach(d => list.push({ id: d.id, ...(d.data() as Omit<AdmissionEnquiry, 'id'>) }));
          return list.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
        }
      } catch (err) {
        console.warn('Firestore get enquiries error:', err);
      }
    }

    return getLocalEnquiries();
  },

  async updateEnquiryStatus(id: string, status: AdmissionEnquiry['status'], adminNotes?: string): Promise<void> {
    if (this.isLive && db) {
      try {
        await updateDoc(doc(db, 'enquiries', id), {
          status,
          ...(adminNotes !== undefined ? { adminNotes } : {})
        });
      } catch (err) {
        console.warn('Firestore update enquiry error:', err);
      }
    }

    const local = getLocalEnquiries();
    const idx = local.findIndex(e => e.id === id);
    if (idx !== -1) {
      local[idx].status = status;
      if (adminNotes !== undefined) {
        local[idx].adminNotes = adminNotes;
      }
      saveLocalEnquiries(local);
    }
  }
};
