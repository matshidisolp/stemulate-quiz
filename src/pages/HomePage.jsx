import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function HomePage() {
    const Navigate = useNavigate();

    const startQuiz = () => {
        navigate('/quiz');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="flex flex-col items-center justify-center h-[80vh">
                <h2 className="text-2xl font-bold mb-6">Welcome to STEMulate Quiz.</h2>
                <button
                  onClick={startQuiz}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
                  >
                    Start Quiz
                  </button>
            </main>
            <Footer />
        </div>
    );
}