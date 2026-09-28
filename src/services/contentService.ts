import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../config/firebase';
import {
  SiteSettings,
  Course,
  Announcement,
  Testimonial,
  FacultyMember,
  GalleryItem
} from '../types';
import {
  initialSettings,
  initialCourses,
  initialAnnouncements,
  initialTestimonials
} from './seedData';

const LOCAL_SETTINGS_KEY = 'disha_site_settings';
const LOCAL_COURSES_KEY = 'disha_courses_store';
const LOCAL_ANNOUNCEMENTS_KEY = 'disha_announcements_store';
const LOCAL_TESTIMONIALS_KEY = 'disha_testimonials_store';

function getLocalSettings(): SiteSettings {
  try {
    const raw = localStorage.getItem(LOCAL_SETTINGS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify(initialSettings));
      return initialSettings;
    }
    return JSON.parse(raw);
  } catch {
    return initialSettings;
  }
}

function saveLocalSettings(settings: SiteSettings) {
  localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify(settings));
}

function getLocalCourses(): Course[] {
  try {
    const raw = localStorage.getItem(LOCAL_COURSES_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_COURSES_KEY, JSON.stringify(initialCourses));
      return initialCourses;
    }
    return JSON.parse(raw);
  } catch {
    return initialCourses;
  }
}

function saveLocalCourses(courses: Course[]) {
  localStorage.setItem(LOCAL_COURSES_KEY, JSON.stringify(courses));
}

function getLocalAnnouncements(): Announcement[] {
  try {
    const raw = localStorage.getItem(LOCAL_ANNOUNCEMENTS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_ANNOUNCEMENTS_KEY, JSON.stringify(initialAnnouncements));
      return initialAnnouncements;
    }
    return JSON.parse(raw);
  } catch {
    return initialAnnouncements;
  }
}

function saveLocalAnnouncements(list: Announcement[]) {
  localStorage.setItem(LOCAL_ANNOUNCEMENTS_KEY, JSON.stringify(list));
}

function getLocalTestimonials(): Testimonial[] {
  try {
    const raw = localStorage.getItem(LOCAL_TESTIMONIALS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_TESTIMONIALS_KEY, JSON.stringify(initialTestimonials));
      return initialTestimonials;
    }
    return JSON.parse(raw);
  } catch {
    return initialTestimonials;
  }
}

function saveLocalTestimonials(list: Testimonial[]) {
  localStorage.setItem(LOCAL_TESTIMONIALS_KEY, JSON.stringify(list));
}

export const contentService = {
  isLive: isFirebaseConfigured && db !== null,

  async getSettings(): Promise<SiteSettings> {
    if (this.isLive && db) {
      try {
        const snap = await getDoc(doc(db, 'settings', 'general'));
        if (snap.exists()) {
          return snap.data() as SiteSettings;
        }
      } catch (err) {
        console.warn('Firestore settings error:', err);
      }
    }
    return getLocalSettings();
  },

  async updateSettings(settings: SiteSettings): Promise<SiteSettings> {
    if (this.isLive && db) {
      try {
        await setDoc(doc(db, 'settings', 'general'), settings);
      } catch (err) {
        console.warn('Firestore update settings error:', err);
      }
    }
    saveLocalSettings(settings);
    return settings;
  },

  async getCourses(): Promise<Course[]> {
    if (this.isLive && db) {
      try {
        const snap = await getDocs(collection(db, 'courses'));
        if (!snap.empty) {
          const list: Course[] = [];
          snap.forEach(d => list.push({ id: d.id, ...(d.data() as Omit<Course, 'id'>) }));
          return list;
        }
      } catch (err) {
        console.warn('Firestore courses error:', err);
      }
    }
    return getLocalCourses();
  },

  async getCourseBySlug(slug: string): Promise<Course | null> {
    const courses = await this.getCourses();
    return courses.find(c => c.slug.toLowerCase() === slug.toLowerCase()) || null;
  },

  async updateCourse(id: string, updates: Partial<Course>): Promise<Course> {
    if (this.isLive && db) {
      try {
        await updateDoc(doc(db, 'courses', id), updates);
      } catch (err) {
        console.warn('Firestore update course error:', err);
      }
    }

    const local = getLocalCourses();
    const idx = local.findIndex(c => c.id === id);
    if (idx !== -1) {
      local[idx] = { ...local[idx], ...updates };
      saveLocalCourses(local);
      return local[idx];
    }
    throw new Error('Course not found');
  },

  async getAnnouncements(): Promise<Announcement[]> {
    if (this.isLive && db) {
      try {
        const snap = await getDocs(collection(db, 'announcements'));
        if (!snap.empty) {
          const list: Announcement[] = [];
          snap.forEach(d => list.push({ id: d.id, ...(d.data() as Omit<Announcement, 'id'>) }));
          return list;
        }
      } catch (err) {
        console.warn('Firestore announcements error:', err);
      }
    }
    return getLocalAnnouncements();
  },

  async addAnnouncement(ann: Omit<Announcement, 'id' | 'createdAt'>): Promise<Announcement> {
    const id = 'ann-' + Date.now();
    const newAnn: Announcement = {
      ...ann,
      id,
      createdAt: new Date().toISOString().split('T')[0]
    };

    if (this.isLive && db) {
      try {
        await setDoc(doc(db, 'announcements', id), newAnn);
      } catch (err) {
        console.warn('Firestore add announcement error:', err);
      }
    }

    const local = getLocalAnnouncements();
    local.unshift(newAnn);
    saveLocalAnnouncements(local);
    return newAnn;
  },

  async deleteAnnouncement(id: string): Promise<void> {
    if (this.isLive && db) {
      try {
        await deleteDoc(doc(db, 'announcements', id));
      } catch (err) {
        console.warn('Firestore delete announcement error:', err);
      }
    }
    const local = getLocalAnnouncements().filter(a => a.id !== id);
    saveLocalAnnouncements(local);
  },

  async getTestimonials(): Promise<Testimonial[]> {
    return getLocalTestimonials();
  },

  async addTestimonial(t: Omit<Testimonial, 'id'>): Promise<Testimonial> {
    const id = 'testi-' + Date.now();
    const newT: Testimonial = { ...t, id };
    const local = getLocalTestimonials();
    local.unshift(newT);
    saveLocalTestimonials(local);
    return newT;
  },

  async deleteTestimonial(id: string): Promise<void> {
    const local = getLocalTestimonials().filter(t => t.id !== id);
    saveLocalTestimonials(local);
  },

  async updateFaculty(facultyList: FacultyMember[]): Promise<void> {
    const settings = await this.getSettings();
    settings.facultyList = facultyList;
    await this.updateSettings(settings);
  },

  async updateGallery(galleryImages: GalleryItem[]): Promise<void> {
    const settings = await this.getSettings();
    settings.galleryImages = galleryImages;
    await this.updateSettings(settings);
  }
};
