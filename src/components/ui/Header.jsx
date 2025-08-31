// Header component
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

export default function Header() {
    const { pathname } = useLocation();

    return (
        <header className="bg-transparent py-6">
            <div className="flex flex-col items-center justify-center text-center">
                {/*Logo + slogan */}
                <Link to="/" aria-label="Go to home">
                  <Logo className="w-24 h-24 mb-2" />
                </Link>
            </div>
        </header>
    )
}