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
    score,
    setQuestions,
    nextQuestion,
    increaseScore,
    loading,
    setLoading,
    error,
    setError,
  } = useQuizStore();

  const navigate = useNavigate(); //navigation hook
  const requestedRef = useRef(false);  //prevent strictMode double-fetch in dev

  const loadQuestions = useCallback(async () => {
    setLoading(true);
    try {
      // request a small set with no category/difficulty to maximize success
      const data = await fetchQuestions(10);
      setQuestions(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to load questions.");
    } finally {
      setLoading(false);
    }
  }, [setLoading, setQuestions, setError]);

  useEffect(() => {
    if (requestedRef.current) return; // guard
    requestedRef.current = true;
    if (questions.length === 0) {
      loadQuestions();
    }
  }, [questions.length, loadQuestions]);

  const currentQuestion =
    questions.length > 0 && currentQuestionIndex < questions.length
      ? questions[currentQuestionIndex]
      : null;

  const handleAnswerSelect = (answer) => {
    if (!currentQuestion) return;
    if (answer === currentQuestion.answer) increaseScore();

    // If last question, navigate to ResultsPage
    if (currentQuestionIndex + 1 >= questions.length) {
        navigate("/results");
    } else {
        nextQuestion();
    }
  };

  // --- Render states ---
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
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
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex flex-col items-center justify-center gap-4 flex-grow">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => {
              requestedRef.current = false; // allow retry
              loadQuestions();
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
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
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex items-center justify-center flex-grow">
          <p>No questions available.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex items-center justify-center flex-grow p-4">
        <QuestionCard
          question={currentQuestion.question}
          options={currentQuestion.options}
          onAnswerSelect={handleAnswerSelect}
        />
      </main>
      <Footer />
    </div>
  );
}