import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import useQuizStore from "../store/quizStore";

const CATEGORIES = [
  { id: 9,  name: "General Knowledge" },
  { id: 17, name: "Science & Nature" },
  { id: 18, name: "Computers" },
  { id: 19, name: "Mathematics" },
  { id: 23, name: "History" },
  { id: 21, name: "Sports" },
];

const DIFFICULTIES = ["easy", "medium", "hard"];

export default function StartPage() {
  const navigate     = useNavigate();
  const settings     = useQuizStore((s) => s.settings);
  const setSettings  = useQuizStore((s) => s.setSettings);

  // Local UI state with safe defaults
  const [category, setCategory]       = useState(settings?.category ?? 9);
  const [difficulty, setDifficulty]   = useState(settings?.difficulty ?? "easy");
  const [amount, setAmount]           = useState(settings?.amount ?? 10);

  const onStart = (e) => {
    e.preventDefault();
    // Clamp amount to a sane range 
    const safeAmount = Math.min(25, Math.max(5, Number(amount) || 10));
    setSettings({ amount: safeAmount, category, difficulty });
    navigate("/quiz");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Logo + slogan */}
      <Header />

      <main className="flex flex-col items-center justify-center flex-grow px-6 text-center">
        <h1 className="font-chelsea text-4xl sm:text-5xl lg:text-6xl text-black mb-8">
          Choose your quiz.
        </h1>

        {/* Form card */}
        <form
          onSubmit={onStart}
          className="w-full max-w-3xl bg-white/90 rounded-2xl border-4 border-black/30 shadow-lg p-8 sm:p-10 lg:p-12 text-left grid gap-8"
        >
          {/* Topic */}
          <div>
            <label className="block text-lg font-medium text-black mb-2">Topic</label>
            <select
              value={category}
              onChange={(e) => setCategory(Number(e.target.value))}
              className="w-full h-48 px-4 rounded-xl border-2 border-black/30 text-lg outline-none focus:ring-2 focus:ring-[#3C520A]/40 focus:border-[#3C520A]"
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-lg font-medium text-black mb-2">Difficulty</label>
            <div className="flex flex-wrap gap-4">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  className={
                    "flex-1 h-48 px-8 rounded-xl border-2 text-lg font-medium transition " +
                    (difficulty === d
                      ? "bg-[#3C520A] text-white border-[#3C520A]"
                      : "bg-white text-black border-black/30 hover:bg-black/10")
                  }
                >
                  {d[0].toUpperCase() + d.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Number of questions */}
          <div>
            <label className="block text-lg font-medium text-black mb-2">
              Number of questions
            </label>
            <input
              type="number"
              min={5}
              max={25}
              step={1}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full h-48 px-4 rounded-xl border-2 border-black/30 text-lg outline-none focus:ring-2 focus:ring-[#3C520A]/40 focus:border-[#3C520A]"
            />
            <p className="mt-2 text-sm text-black/60">
              Choose between 5 and 25 questions.
            </p>
          </div>

          {/* Start */}
          <button
            type="submit"
            className="mt-2 h-24 w-full rounded-2xl bg-[#3C520A] text-white text-lg font-semibold shadow hover:opacity-95"
          >
            Start Quiz
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}