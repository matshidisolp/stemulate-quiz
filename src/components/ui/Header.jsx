// Header component
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

export default function Header() {
    const { pathname } = useLocation();

    return (
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
                <div className="flex items-center justify-between py-3">
                    {/* Brand */}
                    <Link to="/" className="flex items-center gap-3 group" aria-label="Go to home">
                    <Logo className="w-10 h-10 shrink-0" />
                    <div className="leading-tight">
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight group-hover:text-blue-600 transition-colors">
                            STEMulate Quiz App 
                        </h1>
                        {/* Slogan */}
                        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                            <span className="font-medium">Your Brain.</span>{" "}
                            <span className="font-medium">Your Game.</span>{" "}
                            <span className="font-medium">Your Win</span>
                        </p>
                        </div>
                        </Link>

                        {/* Simple nav */}
                        <nav className="hidden sm:flex items-center gap-1 text-sm">
                            <NavLink to="/" active={pathname === "/"}>Home</NavLink>
                            <NavLink to="/quiz" active={pathname === "/quiz"}>Quiz</NavLink>
                            <NavLink to="/results" active={pathname === "/results"}>Results</NavLink>
                        </nav>
                </div>
            </div>
        </header>
    );
}

/** Small helper so active link styles stay tidy */
function NavLink({ to, active, children }) {
    return (
        <Link
        to={to}
        className={
            "px-3 py-2 rounded-md transition-colors " +
            (active
                ? "bg-blue-50 text-blue-700"
                : "text-gray-600 hover:text-blue-700 hover:bg-blue-50"
            )
        }
    >
        {children}
    </Link>
    );
}