import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../config/firebase';
import { Question, TestItem, TestAttempt, TargetExam, SubjectType } from '../types';
import { initialQuestions, initialTests } from './seedData';

const LOCAL_QUESTIONS_KEY = 'disha_questions_store';
const LOCAL_TESTS_KEY = 'disha_tests_store';
const LOCAL_ATTEMPTS_KEY = 'disha_attempts_store';

function getLocalQuestions(): Question[] {
  try {
    const raw = localStorage.getItem(LOCAL_QUESTIONS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_QUESTIONS_KEY, JSON.stringify(initialQuestions));
      return initialQuestions;
    }
    return JSON.parse(raw);
  } catch {
    return initialQuestions;
  }
}

function saveLocalQuestions(items: Question[]) {
  localStorage.setItem(LOCAL_QUESTIONS_KEY, JSON.stringify(items));
}

function getLocalTests(): TestItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_TESTS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_TESTS_KEY, JSON.stringify(initialTests));
      return initialTests;
    }
    return JSON.parse(raw);
  } catch {
    return initialTests;
  }
}

function saveLocalTests(items: TestItem[]) {
  localStorage.setItem(LOCAL_TESTS_KEY, JSON.stringify(items));
}

function getLocalAttempts(): TestAttempt[] {
  try {
    const raw = localStorage.getItem(LOCAL_ATTEMPTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalAttempts(items: TestAttempt[]) {
  localStorage.setItem(LOCAL_ATTEMPTS_KEY, JSON.stringify(items));
}

export const quizService = {
  isLive: isFirebaseConfigured && db !== null,

  async getQuestions(): Promise<Question[]> {
    if (this.isLive && db) {
      try {
        const snap = await getDocs(collection(db, 'questions'));
        if (!snap.empty) {
          const list: Question[] = [];
          snap.forEach(d => list.push({ id: d.id, ...(d.data() as Omit<Question, 'id'>) }));
          return list;
        }
      } catch (err) {
        console.warn('Firestore questions error:', err);
      }
    }
    return getLocalQuestions();
  },

  async addQuestion(q: Omit<Question, 'id'>): Promise<Question> {
    const id = 'q-' + Date.now();
    const newQ: Question = { ...q, id };

    if (this.isLive && db) {
      try {
        await setDoc(doc(db, 'questions', id), newQ);
      } catch (err) {
        console.warn('Firestore add question error:', err);
      }
    }

    const local = getLocalQuestions();
    local.push(newQ);
    saveLocalQuestions(local);
    return newQ;
  },

  async updateQuestion(id: string, updates: Partial<Question>): Promise<Question> {
    if (this.isLive && db) {
      try {
        await updateDoc(doc(db, 'questions', id), updates);
      } catch (err) {
        console.warn('Firestore update question error:', err);
      }
    }

    const local = getLocalQuestions();
    const idx = local.findIndex(q => q.id === id);
    if (idx !== -1) {
      local[idx] = { ...local[idx], ...updates };
      saveLocalQuestions(local);
      return local[idx];
    }
    throw new Error('Question not found');
  },

  async deleteQuestion(id: string): Promise<void> {
    if (this.isLive && db) {
      try {
        await deleteDoc(doc(db, 'questions', id));
      } catch (err) {
        console.warn('Firestore delete question error:', err);
      }
    }

    const local = getLocalQuestions().filter(q => q.id !== id);
    saveLocalQuestions(local);
  },

  async getTests(): Promise<TestItem[]> {
    if (this.isLive && db) {
      try {
        const snap = await getDocs(collection(db, 'tests'));
        if (!snap.empty) {
          const list: TestItem[] = [];
          snap.forEach(d => list.push({ id: d.id, ...(d.data() as Omit<TestItem, 'id'>) }));
          return list;
        }
      } catch (err) {
        console.warn('Firestore tests error:', err);
      }
    }
    return getLocalTests();
  },

  async createTest(testData: Omit<TestItem, 'id' | 'createdAt'>): Promise<TestItem> {
    const id = 'test-' + Date.now();
    const newTest: TestItem = {
      ...testData,
      id,
      createdAt: new Date().toISOString().split('T')[0]
    };

    if (this.isLive && db) {
      try {
        await setDoc(doc(db, 'tests', id), newTest);
      } catch (err) {
        console.warn('Firestore create test error:', err);
      }
    }

    const local = getLocalTests();
    local.unshift(newTest);
    saveLocalTests(local);
    return newTest;
  },

  async deleteTest(id: string): Promise<void> {
    if (this.isLive && db) {
      try {
        await deleteDoc(doc(db, 'tests', id));
      } catch (err) {
        console.warn('Firestore delete test error:', err);
      }
    }
    const local = getLocalTests().filter(t => t.id !== id);
    saveLocalTests(local);
  },

  async getAttempts(studentId?: string): Promise<TestAttempt[]> {
    if (this.isLive && db) {
      try {
        const snap = await getDocs(collection(db, 'attempts'));
        if (!snap.empty) {
          const list: TestAttempt[] = [];
          snap.forEach(d => {
            const data = { id: d.id, ...(d.data() as Omit<TestAttempt, 'id'>) };
            if (!studentId || data.studentId === studentId) {
              list.push(data);
            }
          });
          return list.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
        }
      } catch (err) {
        console.warn('Firestore attempts error:', err);
      }
    }
    const all = getLocalAttempts();
    if (studentId) {
      return all.filter(a => a.studentId === studentId);
    }
    return all.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
  },

  async saveAttempt(attempt: Omit<TestAttempt, 'id'>): Promise<TestAttempt> {
    const id = 'attempt-' + Date.now();
    const fullAttempt: TestAttempt = { ...attempt, id };

    if (this.isLive && db) {
      try {
        await setDoc(doc(db, 'attempts', id), fullAttempt);
      } catch (err) {
        console.warn('Firestore save attempt error:', err);
      }
    }

    const local = getLocalAttempts();
    local.unshift(fullAttempt);
    saveLocalAttempts(local);
    return fullAttempt;
  },

  // Dynamic test builder from existing questions pool
  async generateDynamicTest(params: {
    exam: TargetExam;
    subject?: SubjectType | 'All';
    chapter?: string;
    difficulty?: 'Any' | 'Easy' | 'Medium' | 'Hard';
    questionCount: number;
    durationMinutes: number;
  }): Promise<{ test: TestItem; questions: Question[] }> {
    const allQuestions = await this.getQuestions();
    let filtered = allQuestions.filter(q => q.exam === params.exam);

    if (params.subject && params.subject !== 'All') {
      filtered = filtered.filter(q => q.subject === params.subject);
    }
    if (params.chapter && params.chapter !== 'All') {
      filtered = filtered.filter(q => q.chapter === params.chapter);
    }
    if (params.difficulty && params.difficulty !== 'Any') {
      filtered = filtered.filter(q => q.difficulty === params.difficulty);
    }

    // Shuffle and pick
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(params.questionCount, shuffled.length));

    // Determine marking scheme based on exam
    let pos = 4;
    let neg = 1;
    if (params.exam === 'MHT-CET') {
      pos = params.subject === 'Mathematics' ? 2 : 1;
      neg = 0; // No negative marking in CET
    }

    const calculatedMax = selected.reduce((sum, q) => sum + (q.positiveMarks || pos), 0);

    const test: TestItem = {
      id: 'custom-' + Date.now(),
      title: `${params.exam} ${params.subject && params.subject !== 'All' ? params.subject : 'Practice'} Test`,
      description: `Custom practice test with ${selected.length} questions. Exam format: ${params.exam}`,
      exam: params.exam,
      subject: params.subject && params.subject !== 'All' ? params.subject : 'Full Syllabus',
      chapters: Array.from(new Set(selected.map(q => q.chapter))),
      questionIds: selected.map(q => q.id),
      durationMinutes: params.durationMinutes,
      totalMarks: calculatedMax || selected.length * pos,
      markingScheme: {
        positive: pos,
        negative: neg
      },
      isPublished: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    return { test, questions: selected };
  }
};
