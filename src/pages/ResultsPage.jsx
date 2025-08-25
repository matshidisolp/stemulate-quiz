import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ResultsPage() {
    const navigate = useNavigate();

    return (
        <div classname="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex flex-col items-center justify-center flex-grow">
                <h2 className="text-2xl font-bold mb-4">Your score</h2>
                {/* Zustand state to update user results */}
                <p className="mb-6">You scored X out of Y!</p>
                <button
                   onClick={() => navigate("/")}
                   className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700">
                    Play Again
                   </button>
            </main>
            <Footer />
        </div>
    );
}