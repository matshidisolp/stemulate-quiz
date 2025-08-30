import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";
import ProtectedRoute from "./components/Auth/ProtectedRoutes";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route
                  path="/quiz"
                  element={
                    <ProtectedRoute>
                        <QuizPage />
                    </ProtectedRoute>
                  }
                />

                <Route path="/results" element={<ResultsPage />} />
            </Routes>
        </Router>
    );
}