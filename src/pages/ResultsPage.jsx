import { useNavigate } from "react-router-dom";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import useQuizStore from "../store/quizStore";

export default function ResultsPage() {
    const { score, questions, setQuestions } = useQuizStore();
    const navigate = useNavigate();

    const handleRestart = () => {
        setQuestions([]);
        navigate("/");
    };

    return (
        <div classname="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex flex-col items-center justify-center flex-grow">
                <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
                <p className="mb-6">
                    You scored {score} out of {questions.length}
                </p>
                <button
                   onClick={handleRestart}
                   className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700">
                    Play Again
                   </button>
            </main>
            <Footer />
        </div>
    );
}