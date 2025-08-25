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
    useEffect(() => {
            if (questions.length === 0) {
             setQuestions([
               {
                question: "What is the symbol for helium?",
                options: ["H", "He", "Hm", "Hi"],
               }, 
               {
                question: "Which planet is known as the red planet?",
                options: ["Earth", "Mars", "Venus", "Jupiter"],
               },
           ]);
       }
    }, [questions.length, setQuestion]);

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswerSelect = (answer) => {
        if (answer === currentQuestion.answer) {
            increaseScore();
        }
        nextQuestion();
    };

    // Completed quiz
    if (questions.length > 0 && currentQuestionIndex >= questions.length) {
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

    // For while questions are loading
    if (questions.length === 0) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-100">
                <Header />
                <main className="flex items-center justify-center flex-grow">
                    <p>Loading questions...</p>
                </main>
                <Footer />
            </div>
        );
    }

    // Show current question
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