//QuestionCard displays a single quiz questions and its options
export default function QuestionCard({ question, options, onAnswerSelect }) {
    return (
        <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">{question}</h2>
            <div className="flex flex-col gap-2">
                {options.map((option, index) => (
                    <button
                    key={index}
                    className="border rounded-lg p-2 hover:bg-blue-100"
                    onClick={() => onAnswerSelect(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}