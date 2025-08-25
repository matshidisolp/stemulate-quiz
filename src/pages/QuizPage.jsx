import Header from "../components/Header";
import QuestionCard from "../components/QuestionCard";
import useQuizStore from "../store/quizStore";

export default function QuizPage() {
    const {
        questions, 
        currentQuestionIndex,
        setQuestions,
        increaseScore,
        nextQuestion,
    } = useQuizStore();

    //will use API data here
    if (questions.length === 0) {
        setQuestions([
            {
                question: "What is the symbol for helium?",
                options: ["H", "He", "Hm", "Hi"],
            }, 
            {
                question: "Which planet is known as the red planet?",
                options: ["Earth", "Mars", "Venus", "Jupiter"],
            }
        ]);
    }

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswerSelect = (answer) => {
        if (answer === currentQuestion.answer) {
            increaseScore();
        }
        nextQuestion();
    };

    if (currentQuestionIndex >= questions.length) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-100">
                <Header />
                <main className="flex items-center justify-center flex-grow">
                    <p className="text-lg">Quiz completed!</p>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex items-center justify-center flex-grow">
                <QuestionCard
                  question={currentQuestion.question}
                  options={currentQuestion.options}
                  onAnswerSelect={handleAnswerSelect}
                />
            </main>
            <Footer />
        </div>
    );
}