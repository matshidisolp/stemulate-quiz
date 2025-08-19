import { create } from 'zustand';
import { loginUser, SignUpUser } from '../services/auth.service';

export const useAuthStore = create((set) => ({
    // Initial state
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    // Actions
    login: async (email, password) => {
        set({ isLoading: true, error: null});
        try {
            const user=await loginUser(email, password);
            set({ user:user, isAuthenticated: true, isLoading: false});
        } catch (error) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    logout: () => {
        // Firebase sign-out logic 
        set({ user: null, isAuthenticated: false });
    },

    signup: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const user = await SignUpUser(email, password);
            set({ user: user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },
}));