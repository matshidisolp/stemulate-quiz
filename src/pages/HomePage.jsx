import { Link } from "react-router-dom";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import heroMark from "../assets/Logo.svg";

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            {/* Logo + slogan */}
            <main className="flex flex-col tems-center justify-center flex-grow px-4 text-center">
              <figure className="flex flex-col items-center">
                <img
                src={heroMark}
                alt="STEMulate logo with slogan"
                className="w-44 sm:w-56 lg:w-64 h-auto mb-6"
                />
                </figure>

                {/* Heading */}
                <h1 className="font-chelsea text-[32px] sm:text-[36px] lg:text-[44px] leading-tight text-black font-bold mb-4">
                    Welcome to STEMulate Quiz!
                </h1>

                {/* Introductory paragraph */}
                <p className="max-w-3xl text-center sm:text-lg italic font-extralight text-black mb-10">
                    Get ready to boost your brain power with fun and challenging quizzes in different topics.
                    Whether you are revising for exams or just want to test your knowledge - STEMulate makes
                    learning easy and exciting!
                </p>

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