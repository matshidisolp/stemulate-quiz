import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";
import StartPage from "./pages/StartPage";
import ProtectedRoute from "./components/Auth/ProtectedRoutes";
import NotFoundPage from "./pages/NotFound";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />

                {/* Protected Pages */}
                <Route path="/start" element={
                    <ProtectedRoute>
                        <StartPage />
                    </ProtectedRoute>
                } />
                <Route
                  path="/quiz"
                  element={
                    <ProtectedRoute>
                        <QuizPage />
                    </ProtectedRoute>
                  }
                />

                <Route path="/results" element={
                    <ProtectedRoute>
                        <ResultsPage />
                    </ProtectedRoute>
                } />
                {/* Catch-all for 404 */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
}