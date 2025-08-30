import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading } = useAuthStore();
    const location = useLocation();

    // Render nothing while auth state is busy
    if (isLoading) return null;

    if (!isAuthenticated) {
        // Preserve where user wanted to go so you can send them back after login
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
}