import { create } from "zustand";

// Store to manage quiz state
const DEFAULT_SETTINGS = { amount: 10, category: 9, difficulty: "easy" };

const useQuizStore = create((set) => ({
    // Quiz data
    questions: [],
    currentQuestionIndex: 0,
    score: 0,

    // UI state
    loading: false,
    error: null,
    
    // Default quiz settings
    settings: DEFAULT_SETTINGS,

    setSettings: (partial) =>
        set((s) => ({
            settings: { ...s.settings, ...partial },
        })),

    setQuestions: (questions) =>
        set({ questions, currentQuestionIndex: 0, score: 0 }),

    nextQuestion: () =>
        set((s) => ({
            currentQuestionIndex: s.currentQuestionIndex + 1 })),

    increaseScore: () =>
            set((s) => ({
                score: s.score + 1
            })),

            setLoading: (loading) => set({ loading }),
            setError: (error) => set({ error }),
}));

export default useQuizStore;