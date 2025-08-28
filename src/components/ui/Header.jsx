// Header component
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

export default function Header() {
    const { pathname } = useLocation();

    return (
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
                <div className="flex items-center justify-between py-3">
                    {/* Brand: Logo + Title + Slogan */}
                    <Link 
                      to="/" 
                      className="flex items-center gap-3 group" 
                      aria-label="Go to home"
                    >
                        <Logo className="w-10 h-10 shrink-0" />
                    
                    <div className="leading-tight">

                        </div>
                        </Link>

                        {/* Right-side nav (will be hidden on mobile) */}
                        <nav className="hidden sm:flex items-center gap-1 text-sm font-medium">
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
                ? "bg-[#3C520A]/12 text-[#3C520A]"
                : "text-black hover:text-[#3C520A] hover:bg-[#3C520A]/10")
        }
    >
        {children}
    </Link>
    );
}