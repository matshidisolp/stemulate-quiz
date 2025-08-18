import { initializeApp } from 'firebase/app';
import { firebaseEnvVariable } from './config';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: firebaseEnvVariable.apiKey,
  authDomain: firebaseEnvVariable.authDomain,
  projectId: firebaseEnvVariable.projectId,
  storageBucket: firebaseEnvVariable.storageBucket,
  messagingSenderId: firebaseEnvVariable.messagingSenderId,
  appId: firebaseEnvVariable.appId
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);