import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  type User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '../config/firebase';
import { UserProfile, UserRole } from '../types';

const LOCAL_USERS_KEY = 'disha_users_store';
const LOCAL_CURRENT_USER_KEY = 'disha_current_user';

// Initial pre-configured accounts for demonstration & out-of-the-box evaluation
const DEFAULT_ACCOUNTS: UserProfile[] = [
  {
    uid: 'admin-001',
    email: 'admin@dishaacademy.com',
    displayName: 'Disha Academy Admin',
    role: 'admin',
    phone: '+91 9028321505',
    createdAt: new Date().toISOString(),
    isActive: true,
  },
  {
    uid: 'student-001',
    email: 'student@dishaacademy.com',
    displayName: 'Rohan Deshmukh',
    role: 'student',
    phone: '+91 9876543210',
    studentClass: '12th',
    targetExam: 'MHT-CET',
    createdAt: new Date().toISOString(),
    isActive: true,
  }
];

function getLocalUsers(): UserProfile[] {
  try {
    const raw = localStorage.getItem(LOCAL_USERS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(DEFAULT_ACCOUNTS));
      return DEFAULT_ACCOUNTS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_ACCOUNTS;
  }
}

function saveLocalUsers(users: UserProfile[]) {
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
}

function getStoredCurrentUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(LOCAL_CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setStoredCurrentUser(user: UserProfile | null) {
  if (user) {
    localStorage.setItem(LOCAL_CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(LOCAL_CURRENT_USER_KEY);
  }
}

export const authService = {
  // Check if live Firebase is active
  isLive: isFirebaseConfigured && auth !== null && db !== null,

  async login(email: string, pass: string): Promise<UserProfile> {
    if (this.isLive && auth && db) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, pass);
        const fbUser = userCredential.user;
        const userDocRef = doc(db, 'users', fbUser.uid);
        const docSnap = await getDoc(userDocRef);

        let profile: UserProfile;
        if (docSnap.exists()) {
          profile = docSnap.data() as UserProfile;
        } else {
          // If first login or admin
          const role: UserRole = email.toLowerCase().includes('admin') ? 'admin' : 'student';
          profile = {
            uid: fbUser.uid,
            email: fbUser.email || email,
            displayName: fbUser.displayName || email.split('@')[0],
            role,
            createdAt: new Date().toISOString(),
            isActive: true,
          };
          await setDoc(userDocRef, profile);
        }
        setStoredCurrentUser(profile);
        return profile;
      } catch (err) {
        console.warn('Firebase login failed, checking local accounts...', err);
        // Fall back to local check if live auth fails (e.g., demo accounts on unconfigured Firebase)
      }
    }

    // Local / Demo mode handling
    const users = getLocalUsers();
    let found = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!found) {
      // Allow seamless login for demo accounts or create dynamically
      if (email.toLowerCase().includes('admin')) {
        found = {
          uid: 'admin-' + Date.now(),
          email,
          displayName: 'Admin User',
          role: 'admin',
          createdAt: new Date().toISOString(),
          isActive: true
        };
        users.push(found);
        saveLocalUsers(users);
      } else {
        throw new Error('Account not found with this email. Please check credentials or register.');
      }
    }

    if (!found.isActive) {
      throw new Error('Your account has been deactivated. Please contact academy administration.');
    }

    setStoredCurrentUser(found);
    return found;
  },

  async register(
    email: string,
    pass: string,
    displayName: string,
    phone?: string,
    studentClass?: '11th' | '12th' | 'Dropper',
    targetExam?: 'MHT-CET' | 'JEE' | 'NEET'
  ): Promise<UserProfile> {
    const role: UserRole = email.toLowerCase().includes('admin') ? 'admin' : 'student';

    if (this.isLive && auth && db) {
      try {
        const cred = await createUserWithEmailAndPassword(auth, email, pass);
        const profile: UserProfile = {
          uid: cred.user.uid,
          email,
          displayName,
          role,
          phone,
          studentClass: studentClass || '12th',
          targetExam: targetExam || 'MHT-CET',
          createdAt: new Date().toISOString(),
          isActive: true,
        };
        await setDoc(doc(db, 'users', cred.user.uid), profile);
        setStoredCurrentUser(profile);
        return profile;
      } catch (err: unknown) {
        console.warn('Firebase register failed, saving to local store...', err);
        if (err && typeof err === 'object' && 'code' in err && (err as { code: string }).code === 'auth/email-already-in-use') {
          throw new Error('An account already exists with this email address.');
        }
      }
    }

    // Local / Demo store
    const users = getLocalUsers();
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('An account already exists with this email address.');
    }

    const newProfile: UserProfile = {
      uid: 'user-' + Date.now(),
      email,
      displayName,
      role,
      phone,
      studentClass: studentClass || '12th',
      targetExam: targetExam || 'MHT-CET',
      createdAt: new Date().toISOString(),
      isActive: true,
    };

    users.push(newProfile);
    saveLocalUsers(users);
    setStoredCurrentUser(newProfile);
    return newProfile;
  },

  async logout(): Promise<void> {
    if (this.isLive && auth) {
      try {
        await firebaseSignOut(auth);
      } catch (err) {
        console.warn('Firebase signout error:', err);
      }
    }
    setStoredCurrentUser(null);
  },

  async resetPassword(email: string): Promise<void> {
    if (this.isLive && auth) {
      try {
        await sendPasswordResetEmail(auth, email);
        return;
      } catch (err) {
        console.warn('Firebase reset password error:', err);
      }
    }
    // Local fallback message
    const users = getLocalUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      throw new Error('No registered student account was found with this email.');
    }
    // Simulate reset link sent
  },

  async updateStudentProfile(uid: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    if (this.isLive && db) {
      try {
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, updates);
      } catch (err) {
        console.warn('Firebase profile update error:', err);
      }
    }

    const users = getLocalUsers();
    const idx = users.findIndex(u => u.uid === uid);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...updates };
      saveLocalUsers(users);
      setStoredCurrentUser(users[idx]);
      return users[idx];
    }
    throw new Error('User not found.');
  },

  getAllUsers(): UserProfile[] {
    return getLocalUsers();
  },

  toggleUserStatus(uid: string, isActive: boolean): UserProfile[] {
    const users = getLocalUsers();
    const idx = users.findIndex(u => u.uid === uid);
    if (idx !== -1) {
      users[idx].isActive = isActive;
      saveLocalUsers(users);
      if (this.isLive && db) {
        const firestore = db;
        updateDoc(doc(firestore, 'users', uid), { isActive }).catch(() => {});
      }
    }
    return users;
  },

  getCurrentUser(): UserProfile | null {
    return getStoredCurrentUser();
  },

  onAuthChanged(callback: (user: UserProfile | null) => void) {
    if (this.isLive && auth && db) {
      const activeAuth = auth;
      const activeDb = db;
      return firebaseOnAuthStateChanged(activeAuth, async (fbUser: FirebaseUser | null) => {
        if (!fbUser) {
          setStoredCurrentUser(null);
          callback(null);
          return;
        }
        try {
          const docSnap = await getDoc(doc(activeDb, 'users', fbUser.uid));
          if (docSnap.exists()) {
            const prof = docSnap.data() as UserProfile;
            setStoredCurrentUser(prof);
            callback(prof);
          } else {
            const stored = getStoredCurrentUser();
            callback(stored);
          }
        } catch {
          callback(getStoredCurrentUser());
        }
      });
    }

    // In local mode, immediately deliver current stored state
    callback(getStoredCurrentUser());
    return () => {};
  }
};
