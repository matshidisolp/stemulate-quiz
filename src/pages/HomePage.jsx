import { Link } from "react-router-dom";
import Footer from "../components/ui/Footer";
import heroMark from "../assets/Logo.svg";
import AuthForm from "../components/Auth/AuthForm";
import { useAuthStore } from "../store/auth.store";

export default function HomePage() {
    const { isAuthenticated } = useAuthStore();

    return (
        <div className="flex flex-col min-h-screen">

            <main className="flex flex-col tems-center justify-center flex-grow px-4 text-center">
                {/* Logo + slogan */}
              <figure className="flex flex-col items-center">
                <img
                src={heroMark}
                alt="STEMulate logo with slogan"
                className="w-44 sm:w-56 lg:w-64 h-auto mb-6"
                />
                </figure>

                {/* Heading */}
                <h1 className="font-chelsea text-[48px] sm:text-[60px] lg:text-[80px] leading-tight text-black font-bold mb-4">
                    Welcome to STEMulate Quiz!
                </h1>

                {/* Introductory paragraph- stacked */}
                <div className="max-w-3xl text-center italic font-extralight text-black mb-8">
                    <p className="text-base sm:text-lg lg:text-2xl mb-2">
                        Get ready to boost your brain power with fun and challenging quizzes in Math, Science and more.
                    </p>
                    <p className="text-base sm:text-lg lg:text-2xl mb-2">
                        Whether you are revising for exams or just want to test your knowledge –
                    </p>
                    <p className="text-base sm:text-lg lg:text-2xl">
                        STEMulate makes learning easy and exciting!
                    </p>
                </div>

                {/* Auth */}
                <div className="w-full mb-8">
                    <AuthForm />
                </div>

                {/* Start Quiz button only when user is authenticated */}
                {isAuthenticated ? (
                    <Link
                      to="/quiz"
                      className="bg-[#3C520A] text-white px-6 py-3 rounded-lg shadow hover:opacity-95"
                      role="button"
                  >
                    Start Quiz
                  </Link>   
                ) : (
                    <p className="text-sm text-black/70">
                        Log in or create an account to start the quiz.
                    </p>
                )}
            </main>
            
            <Footer />
        </div>
    );
}