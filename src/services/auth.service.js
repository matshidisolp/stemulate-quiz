import { auth } from './firebase';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged as firebaseOnAuthStateChanged,
} from 'firebase/auth';

// Login with email and password
export async function loginUser(email, password) {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", user);
        return user;
    } catch (error) {
        console.error("Login failed:", error.code, error.message);
        throw error;
    }
}

// Signup with email and password
export async function signUpUser(email, password) {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User created:', user);
        return user;
    } catch (error) {
        console.error('Signgup failed:', error.code, error.message);
        throw error; //Throw error for the calling component to handle.
    }
}

// Sign ut current user
export async function signOutUser() {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Signout failed:", error.code, error.message);
        throw error;
    }
}

// Watches if user logs in or out
export function subscribeToAuthChanges(callback) {
    return firebaseOnAuthStateChanged(auth, callback);
}
