import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

interface AdminCredentials {
  email: string;
  password: string;
  createdAt: any;
  websiteId: string;
}

export async function verifyAdminCredentials(email: string, password: string): Promise<boolean> {
  try {
    const credentialsRef = doc(db, 'adminCredentials', 'main');
    const credentialsSnap = await getDoc(credentialsRef);

    if (!credentialsSnap.exists()) {
      return false;
    }

    const credentials = credentialsSnap.data() as AdminCredentials;

    // Simple credential check
    return credentials.email === email && credentials.password === password;
  } catch (error) {
    console.error('Error verifying admin credentials:', error);
    return false;
  }
}

export async function getAdminCredentials(): Promise<AdminCredentials | null> {
  try {
    const credentialsRef = doc(db, 'adminCredentials', 'main');
    const credentialsSnap = await getDoc(credentialsRef);

    if (!credentialsSnap.exists()) {
      return null;
    }

    return credentialsSnap.data() as AdminCredentials;
  } catch (error) {
    console.error('Error getting admin credentials:', error);
    return null;
  }
}

export function setAdminSession(email: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('adminEmail', email);
    localStorage.setItem('adminLoggedIn', 'true');
  }
}

export function clearAdminSession() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminLoggedIn');
  }
}

export function isAdminLoggedIn(): boolean {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('adminLoggedIn') === 'true';
  }
  return false;
}

export function getAdminEmail(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('adminEmail');
  }
  return null;
}
