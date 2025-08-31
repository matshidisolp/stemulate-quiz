import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/ui/Footer";
import ProtectedRoute from "../components/Auth/ProtectedRoutes";
import useQuizStore from "../store/quizStore";

const CATEGORIES = [
    { id: 9, name: "General Knowledge" },
    { id: 17, name: "Science & Nature" },
    { id: 18, name: "Computers" },
    { id: 19, name: "Mathematics" },
    { id: 23, name: "History" },
];

const DIFFICULTIES = ["easy", "medium", "hard"];

export default function StartPage() {
    const navigate = useNavigate();
    // Individual selection to avoid "getSnapshot" loop
    const settings  = useQuizStore((s) => s.settings);
    const setSettings = useQuizStore((s) => s.setSettings);

    // Guards against undefined settings + local state
    const initialCategory = settings?.category ?? 9;
    const initialDifficulty = settings?.difficulty ?? "easy";
    const initialAmount = settings?.amount ?? 10;

    const [category, setCategory] = useState(initialCategory);
    const [difficulty, setDifficulty] = useState(initialDifficulty);
    const [amount, setAmount] = useState(initialAmount);

    const onStart = (e) => {
        e.preventDefault();
        setSettings({ amount, category, difficulty });
        navigate("/quiz");
    };

    return (
        <ProtectedRoute>
            <div className="flex flex-col min-h-screen">
                <main className="flex flex-col items-center justify-center flex-grow px-4 text-center">
                    <h1 className="font-chelsea text-4xl text-black mb-6">
                        Choose your quiz.
                    </h1>

                    <form
                      onSubmit={onStart}
                      className="w-full max-w-xl bg-white/90 rounded-2xl border border-black/10 shadow p-6 text-left grid gap-5"
                    >
                        <div>
                            <label className="block text-sm font-medium text-black mb-1">
                                Topic
                            </label>
                            <select
                              value={category}
                              onChange={(e) => setCategory(Number(e.target.value))}
                              className="w-full h-12 rounded-xl border border-black/20 bg-white px-3 outline-none focus:ring-2 focus:ring-[#3C520A]/40"
                            >
                                {CATEGORIES.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>  
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-1">
                                Difficulty
                            </label>
                            <div className="flex gap-3">
                                {DIFFICULTIES.map((d) => (
                                    <button
                                      key={d}
                                      type="button"
                                      onClick={() => setDifficulty(d)}
                                      className={
                                        "h-11 px-5 rounded-xl border " +
                                        (difficulty === d
                                            ? "bg-[#3C520A] text-white border-transparent"
                                            : "bg-white text-black border-black/20")
                                      }
                                    >
                                        {d[0].toUpperCase() + d.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-1">
                                Number of questions
                            </label>
                            <input
                              type="number"
                              min={5}
                              max={25}
                              step={1}
                              value={amount}
                              onChange={(e) => setAmount(Number(e.target.value))}
                              className="w-32 h-12 rounded-xl border border-black/20 bg-white px-3 outline-none focus:ring-2 focus:ring-[#3C520A]/40"
                            /> 
                        </div>

                        <button
                          type="submit"
                          className="mt-2 h-12 w-full rounded-2xl bg-[#3C520A] text-white font-medium shadow hover:opacity-95"
                        >
                            Start Quiz
                        </button>
                    </form>
                </main>
                <Footer />
            </div>
        </ProtectedRoute>
    );
}