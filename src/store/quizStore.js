import { create } from "zustand";

// Store to manage quiz state
const useQuizStore = create((set) => ({
    question: [],
    currentQuestionIndex: 0,
    score: 0,
    loading: false,
    error: null, 

    setQuestions: (questions) =>
        set({ questions, currentQuestionIndex: 0, score: 0 }),

    nextQuestion: () =>
        set((state) => ({
            currentQuestionIndex: state.currentQuestionIndex + 1,
        })),

        increaseScore: () =>
            set((state) => ({
                score: state.score + 1,
            })),

            setLoading: (loading) => set({ loading }),

            setError: (error) => set({ error }),
}));

export default useQuizStore;