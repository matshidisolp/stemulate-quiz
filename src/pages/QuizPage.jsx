import { useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import QuestionCard from "../components/QuestionCard";
import useQuizStore from "../store/quizStore";
import { fetchQuestions } from "../services/api";

export default function QuizPage() {
  const {
    questions,
    currentQuestionIndex,
    score,                    // reserved for Results page
    setQuestions,
    nextQuestion,
    increaseScore,
    loading,
    setLoading,
    error,
    setError,
    settings,                 // { amount, category, difficulty }
  } = useQuizStore();

  const navigate = useNavigate();
  const requestedRef = useRef(false); // prevent StrictMode double-fetch in dev

  // fetch questions once (using settings)
  const loadQuestions = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchQuestions(
        settings.amount,
        settings.category,
        settings.difficulty
      );
      setQuestions(data);
      setError(null);
    } catch (err) {
      const status = err?.response?.status;

      if (status == 429) {
        setError("Too many requests right now. Please wait a few seconds and try again");
      } else {
        setError("failed to load questions. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, [setLoading, setQuestions, setError, settings]);

  useEffect(() => {
    if (requestedRef.current) return;
    requestedRef.current = true;
    if (questions.length === 0) loadQuestions();
  }, [settings.amount, settings.category, settings.difficulty]);

  // current question 
  const currentQuestion =
    questions.length > 0 && currentQuestionIndex < questions.length
      ? questions[currentQuestionIndex]
      : null;

  //  handle answer 
  const handleAnswerSelect = (answer) => {
    if (!currentQuestion) return;

    if (answer === currentQuestion.answer) {
      increaseScore();
    }

    // last question -> go to results
    if (currentQuestionIndex + 1 >= questions.length) {
      navigate("/results");
    } else {
      nextQuestion();
    }
  };

  //  render states 
  if (loading) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-grow items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-800" />
            <p className="text-lg font-semibold">Loading questions…</p>
          </div>
          <p className="mt-2 text-slate-600">
            Please wait a moment. We’re preparing your quiz.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

  if (error) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-grow items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-lg font-semibold">Couldn’t load your quiz</p>
          <p className="mt-2 text-slate-600">
            {error}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={loadQuestions}
              className="rounded-xl bg-[#3C520A] px-4 py-2 text-white hover:opacity-95"
            >
              Retry
            </button>

            <button
              onClick={() => navigate("/")}
              className="rounded-xl border px-4 py-2 text-slate-800 hover:bg-slate-50"
            >
              Change settings
            </button>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Tip: If this keeps happening, try a different topic or difficulty.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

  if (!currentQuestion) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-grow items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-lg font-semibold">No questions found</p>
          <p className="mt-2 text-slate-600">
            Try a different topic or difficulty, then start again.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/")}
              className="rounded-xl bg-[#3C520A] px-4 py-2 text-white hover:opacity-95"
            >
              Back to settings
            </button>

            <button
              onClick={loadQuestions}
              className="rounded-xl border px-4 py-2 text-slate-800 hover:bg-slate-50"
            >
              Try again
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

  //  main quiz view 
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-grow items-start justify-center px-4 py-10">
        <div className="w-full mx-auto max-w-2xl">
            <QuestionCard
              question={currentQuestion.question}
              options={currentQuestion.options}
              onAnswerSelect={handleAnswerSelect}
            />
        </div>
      </main>
      <Footer />
    </div>
  );
}
