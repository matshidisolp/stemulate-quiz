import { useNavigate } from "react-router-dom";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import useQuizStore from "../store/quizStore";
import { useAuthStore } from "../store/auth.store";

export default function ResultsPage() {
  const { score, questions, setQuestions } = useQuizStore();
  const { logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const total = questions?.length || 0;

  // Restart Quiz
  const handleRestart = () => {
    setQuestions([]);
    navigate("/start");
  };

  // Sign out (only if logged in)
  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Sign out failed:", err?.message || err);
    }
  };

  // If user refreshes results page or lands here directly
  if (total === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex flex-col items-center justify-center flex-grow px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">No results yet</h2>
          <p className="mb-6 text-black/70">
            Start a quiz first, then your score will show here.
          </p>

          <button
            onClick={() => navigate("/start")}
            className="bg-[#3C520A] text-white px-6 py-3 rounded-lg shadow hover:opacity-95"
          >
            Start a quiz
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>

        <p className="mb-2">
          You scored <span className="font-bold">{score}</span> out of{" "}
          <span className="font-bold">{total}</span>
        </p>

        <p className="mb-6 text-black/70">
          {score === total ? "Perfect score — well done!" : "Nice work — keep practicing!"}
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={handleRestart}
            className="bg-[#3C520A] text-white px-6 py-3 rounded-lg shadow hover:opacity-95"
          >
            Play Again
          </button>

          {!isAuthenticated ? (
            <button
              onClick={() => navigate("/")}
              className="border px-6 py-3 rounded-lg shadow-sm hover:bg-white"
            >
              Back Home
            </button>
          ) : (
            <button
              onClick={handleSignOut}
              className="bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700"
            >
              Sign Out
            </button>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}