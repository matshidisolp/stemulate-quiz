import { initializeApp } from 'firebase/app';
import { firebaseEnvVariables } from './config';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: firebaseEnvVariables.apiKey,
  authDomain: firebaseEnvVariables.authDomain,
  projectId: firebaseEnvVariables.projectId,
  storageBucket: firebaseEnvVariables.storageBucket,
  messagingSenderId: firebaseEnvVariables.messagingSenderId,
  appId: firebaseEnvVariables.appId
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);