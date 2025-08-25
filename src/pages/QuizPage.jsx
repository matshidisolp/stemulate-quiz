import Header from "../components/Header";
import QuestionCard from "../components/QuestionCard";

export default function QuizPage() {
    //will use API data will be here 
    const question = "What is the symbol for helium?";
    const options = ["H", "He", "Hm", "Hi"];

    const handleAnswerSelect = (answer) => {
        console.log("Selectd answer:", answer);
        //Will use Zustand state management
    };

    return (
        <div classname="min-h-screen bg-gray-100">
            <Header />
            <main className="flex item-center justify-center h-[80vh]">
                <QuestionCard
                   question={question}
                   options={options}
                   onAnswerSelect={handleAnswerSelect}
                />
            </main>
            <Footer />
        </div>
    );
}