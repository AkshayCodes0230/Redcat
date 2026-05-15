import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  increment, 
  serverTimestamp,
  getDocFromServer,
  onSnapshot 
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
// @ts-ignore
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth();

async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'stats', 'visitors'));
    console.log("Firebase connection successful");
  } catch (error) {
    console.warn("Initial Firebase connection check failed. This might be expected if the document doesn't exist yet.", error);
  }
}
testConnection();

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  // Don't throw for non-critical errors like visitor count
  if (path === 'stats/visitors') {
    return;
  }
  throw new Error(JSON.stringify(errInfo));
}

export async function incrementVisitorCount() {
  const visitorDoc = doc(db, 'stats', 'visitors');
  
  try {
    // Single call to increment if exists, or create if not.
    // serverTimestamp() and increment(1) work together nicely with merge: true.
    await setDoc(visitorDoc, {
      count: increment(1),
      updatedAt: serverTimestamp()
    }, { merge: true });
    
    // We don't return the count here because we fetch it in Footer/Badge anyway.
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'stats/visitors');
    return false;
  }
}

export async function getVisitorCount() {
  const path = 'stats/visitors';
  const visitorDoc = doc(db, 'stats', 'visitors');
  try {
    const snap = await getDoc(visitorDoc);
    return snap.exists() ? snap.data().count : 0;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return 0;
  }
}

export function subscribeToVisitorCount(callback: (count: number) => void) {
  const visitorDoc = doc(db, 'stats', 'visitors');
  return onSnapshot(visitorDoc, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.data().count || 0);
    }
  }, (error) => {
    handleFirestoreError(error, OperationType.GET, 'stats/visitors');
  });
}
