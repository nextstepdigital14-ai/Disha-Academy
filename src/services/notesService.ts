import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';
import { db, storage, isFirebaseConfigured } from '../config/firebase';
import { NoteItem } from '../types';
import { initialNotes } from './seedData';

const LOCAL_NOTES_KEY = 'disha_notes_store';

function getLocalNotes(): NoteItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_NOTES_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_NOTES_KEY, JSON.stringify(initialNotes));
      return initialNotes;
    }
    return JSON.parse(raw);
  } catch {
    return initialNotes;
  }
}

function saveLocalNotes(notes: NoteItem[]) {
  localStorage.setItem(LOCAL_NOTES_KEY, JSON.stringify(notes));
}

export const notesService = {
  isLive: isFirebaseConfigured && db !== null && storage !== null,

  async getNotes(): Promise<NoteItem[]> {
    if (this.isLive && db) {
      try {
        const querySnapshot = await getDocs(collection(db, 'notes'));
        if (!querySnapshot.empty) {
          const liveNotes: NoteItem[] = [];
          querySnapshot.forEach(docSnap => {
            liveNotes.push({ id: docSnap.id, ...(docSnap.data() as Omit<NoteItem, 'id'>) });
          });
          return liveNotes;
        }
      } catch (err) {
        console.warn('Failed to load notes from Firestore, using local store:', err);
      }
    }
    return getLocalNotes();
  },

  async uploadNoteFile(
    file: File,
    noteData: Omit<NoteItem, 'id' | 'fileUrl' | 'fileName' | 'fileSize' | 'fileType' | 'uploadedAt' | 'downloadCount' | 'isDemo'>,
    onProgress?: (progress: number) => void
  ): Promise<NoteItem> {
    const id = 'note-' + Date.now();
    const formattedSize = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
    let fileUrl = '';

    // If live Firebase Storage is available
    if (this.isLive && storage) {
      try {
        const storageRef = ref(storage, `notes/${id}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              if (onProgress) onProgress(progress);
            },
            (error) => reject(error),
            async () => {
              fileUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      } catch (storageError) {
        console.warn('Firebase Storage upload failed, creating local object blob URL:', storageError);
      }
    }

    // If live storage failed or not configured, create a data URL / Blob URL for seamless browser viewing
    if (!fileUrl) {
      fileUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    }

    const newNote: NoteItem = {
      ...noteData,
      id,
      fileUrl,
      fileName: file.name,
      fileSize: formattedSize,
      fileType: file.name.endsWith('.pdf') ? 'pdf' : 'doc',
      uploadedAt: new Date().toISOString().split('T')[0],
      downloadCount: 0,
      isDemo: false
    };

    if (this.isLive && db) {
      try {
        await setDoc(doc(db, 'notes', id), newNote);
      } catch (e) {
        console.warn('Failed to save note to Firestore:', e);
      }
    }

    // Always keep local store updated
    const local = getLocalNotes();
    local.unshift(newNote);
    saveLocalNotes(local);

    return newNote;
  },

  async updateNote(id: string, updates: Partial<NoteItem>): Promise<NoteItem> {
    if (this.isLive && db) {
      try {
        await updateDoc(doc(db, 'notes', id), updates);
      } catch (e) {
        console.warn('Failed to update note in Firestore:', e);
      }
    }

    const local = getLocalNotes();
    const idx = local.findIndex(n => n.id === id);
    if (idx !== -1) {
      local[idx] = { ...local[idx], ...updates };
      saveLocalNotes(local);
      return local[idx];
    }
    throw new Error('Note not found');
  },

  async deleteNote(id: string): Promise<void> {
    if (this.isLive && db) {
      try {
        await deleteDoc(doc(db, 'notes', id));
      } catch (e) {
        console.warn('Firestore delete note error:', e);
      }
    }

    const local = getLocalNotes();
    const filtered = local.filter(n => n.id !== id);
    saveLocalNotes(filtered);
  },

  async recordDownload(id: string): Promise<void> {
    const local = getLocalNotes();
    const idx = local.findIndex(n => n.id === id);
    if (idx !== -1) {
      local[idx].downloadCount = (local[idx].downloadCount || 0) + 1;
      saveLocalNotes(local);
      if (this.isLive && db) {
        const firestore = db;
        updateDoc(doc(firestore, 'notes', id), { downloadCount: local[idx].downloadCount }).catch(() => {});
      }
    }
  }
};
