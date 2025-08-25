import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const QuizPage = () => {
    const { isAuthenticated } = useAuthStore();

    if(!isAuthenticated) {
        return <Navigate to='/login' />;
    }

    return (
        <div>
            <h1>Welcome to STEMulate Quiz</h1>
            <p>Get ready to boost your brain power with fun and challenging quizzes in Math and Science. 
                Whether you are revising for exams or just want to test your knowledge - STEMulate makes learning easy and exciting!
            </p>
        </div>
    );
};