//QuestionCard displays a single quiz questions and its options

export default function QuestionCard({ question, options, onAnswerSelect }) {
  return (
    <section
      className="
        w-full mx-auto
        max-w-md sm:max-w-lg            /* narrow column on desktop */
        text-center
      "
      aria-live="polite"
    >
      {/* Question */}
      <h2
        className="
          font-chelsea text-3xl sm:text-4xl md:text-5xl
          leading-snug sm:leading-snug
          text-black
          mb-8 sm:mb-10
        "
      >
        {question}
      </h2>

      {/* Options */}
      <div className="flex flex-col gap-5">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => onAnswerSelect(opt)}
            className="
              h-18 sm:h-16
              rounded-2xl
              px-6
              font-semibold text-xl sm:text-xl
              text-black
              bg-[#3C520A]/25
              hover:bg-[#3C520A]/40
              active:bg-[#3C520A]/50
              focus:outline-none focus-visible:ring-4 focus-visible:ring-[#3C520A]/40
              shadow-sm
              transition
            "
          >
            {opt}
          </button>
        ))}
      </div>
    </section>
  );
}