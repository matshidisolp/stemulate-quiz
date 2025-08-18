import { auth } from './firebase';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'firebase/auth';

export const loginUser= async(EmailAuthCredential, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, EmailAuthCredential, password);
        const user = userCredential.user;
        console.log('User logged in:', user);
        return user;
    } catch (error) {
        console.error('Login failed:', error.code, error.message);
        throw error; //Throw error for the calling component to handle.
    }
};

export const SignUpUser = async(EmailAuthCredential, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, EmailAuthCredential, password);
        const user = userCredential.user;
        console.log('User created:', user);
        return user;
    } catch (error) {
        console.error('Signgup failed:', error.code, error.message);
        throw error; //Throw error for the calling component to handle.
    }
}