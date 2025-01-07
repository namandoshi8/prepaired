import { Lightbulb } from "lucide-react";
import QuestionNote from "./QuestionNote";

function Questions({ questions, activeQuestion }) {
  return (
    <div className="p-5 border rounded-lg mt-10">
      <div className="gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {questions.map((question, index) => (
          <h2
            key={index}
            className={`rounded-full border text-center cursor-pointer p-2 ${
              activeQuestion === index
                ? "bg-primary text-white"
                : " bg-gray-200"
            }`}
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>
      <h2 className="my-5 text-lg ">{questions[activeQuestion]?.question}</h2>
      <QuestionNote />
    </div>
  );
}

export default Questions;
