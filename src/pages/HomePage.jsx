import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex flex-col items-center justify-center h-[80vh">
                <h2 className="text-2xl font-bold mb-6">Welcome to STEMulate Quiz.</h2>

                <Link
                  to="/quiz"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-700"
                  role="button"
                  onClick={() => console.log("Navigating to /quiz")}
                  >
                    Start Quiz
                  </Link>
            </main>
            <Footer />
        </div>
    );
}