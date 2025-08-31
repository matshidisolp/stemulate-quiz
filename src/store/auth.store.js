import { create } from 'zustand';
import { loginUser, signUpUser, signOutUser } from '../services/auth.service';

export const useAuthStore = create((set) => ({
    // Initial state
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    // Helper for errors
    clearError: () => set({ error: null }),

    // Actions
    login: async (email, password) => {
        set({ isLoading: true, error: null});
        try {
            const user=await loginUser(email, password);
            set({ user, isAuthenticated: true, isLoading: false});
            return user;
        } catch (error) {
            set({ error: error.message || "Login failed", isLoading: false });
        }
    },

    signup: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const user = await signUpUser(email, password);
            set({ user: user, isAuthenticated: true, isLoading: false });
            return user;
        } catch (error) {
            set({ error: error.message || "Sign up failed", isLoading: false });
            throw error;
        }
    },
 
    logout: async() => {
        set({ isLoading: true, error: null });
        try {
            await signOutUser();
            set({ user: null, isAuthenticated: false, isLoading: false });
        } catch (error) {
            set({ error: error.message || "Logout failed", isLoading: false });
        }
    },
}));