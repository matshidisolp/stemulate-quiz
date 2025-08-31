import { Link } from "react-router-dom";
import Header from "../components/ui/Header"; 

export default function NotFoundPage() {
  return (
    <div className="flex flex-col min-h-screen bg-brandOlive text-center">
      <Header />

      <main className="flex flex-col items-center justify-center flex-grow px-6">
        <h1 className="text-6xl font-bold text-[#3C520A] mb-4">404</h1>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          Oops! Page not found.
        </h2>
        <p className="text-lg sm:text-xl text-black/80 max-w-xl mb-8">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="bg-[#3C520A] text-white px-6 py-3 rounded-2xl shadow hover:opacity-90"
        >
          Go Back Home
        </Link>
      </main>
    </div>
  );
}