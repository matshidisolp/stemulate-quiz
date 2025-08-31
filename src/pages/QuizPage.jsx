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
      setError(err?.message || "Failed to load questions. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [setLoading, setQuestions, setError, settings]);

  useEffect(() => {
    if (requestedRef.current) return;
    requestedRef.current = true;
    if (questions.length === 0) loadQuestions();
  }, [questions.length, loadQuestions]);

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
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex items-center justify-center flex-grow">
          <p>Loading questions...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex flex-col items-center justify-center gap-4 flex-grow">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => {
              requestedRef.current = false; // allow retry
              loadQuestions();
            }}
            className="bg-[#3C520A] text-white px-4 py-2 rounded-xl hover:opacity-95"
          >
            Try Again
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex items-center justify-center flex-grow">
          <p>No questions available.</p>
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
