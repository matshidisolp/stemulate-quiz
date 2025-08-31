import { useNavigate } from "react-router-dom";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import useQuizStore from "../store/quizStore";
import { useAuthStore } from "../store/auth.store";

export default function ResultsPage() {
    const { score, questions, setQuestions } = useQuizStore();
    const { logout } = useAuthStore();
    const navigate = useNavigate();

    // Restart Quiz
    const handleRestart = () => {
        setQuestions([]);
        navigate("/start");
    };

    //Sign out, clear auth and return to home
    const handleSignOut = async () => {
        try {
            await logout();
            navigate("/");
        } catch (err) {
            console.error("Sign out failed:", err.message || err);
        }
    };

    return (
        <div classname="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex flex-col items-center justify-center flex-grow">
                <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
                <p className="mb-6">
                    You scored {score} out of {questions.length}
                </p>

                {/* Navigation buttons */}
                <div className="flex gap-6">
                    <button
                      onClick={handleRestart}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
                    >
                        Play Again
                    </button>

                    <button
                      onClick={handleSignOut}
                      className="bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700"
                    >
                        Sign Out
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
}