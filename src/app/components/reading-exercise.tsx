"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getReadingQuiz } from "../lib/reading-api-client";

// --- Component ---
export default function ReadingExercise() {
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number | null>
  >({});

  const [submitted, setSubmitted] = useState(false);

  // 🔑 TanStack Query
  const {
    data: quizData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["readingQuiz"],
    queryFn: getReadingQuiz,
  });

  // --- Loading / Error States ---
  if (isLoading) return <p className="p-4">Loading...</p>;

  if (isError)
    return (
      <p className="p-4 text-red-600">
        {(error as Error).message || "Something went wrong"}
      </p>
    );

  if (!quizData) return null;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      
      {/* Passage */}
      <div className="border rounded-xl p-4 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Reading Passage</h2>
        <p className="whitespace-pre-line">{quizData.passageText}</p>
      </div>

      {/* Questions Header */}
      <h3 className="text-lg font-semibold">Questions</h3>

      {/* Questions */}
      {quizData.readingQuestions.map((question, qIndex) => {
        const userAnswerId = selectedAnswers[question.id];

        const userAnswerObj = quizData.readingQuestionAnswers.find(
          (a) => a.id === userAnswerId
        );

        const isUserCorrect = userAnswerObj?.isCorrect;

        return (
          <div
            key={question.id}
            className="border rounded-xl p-4 shadow-sm space-y-3"
          >
            <div className="flex items-center gap-2">
              <h4 className="font-medium">
                <strong>{qIndex + 1}) </strong>
                {question.text}
              </h4>

              {submitted && (
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    isUserCorrect
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {isUserCorrect ? "Correct" : "Incorrect"}
                </span>
              )}
            </div>

            {/* Answers */}
            <div className="space-y-2">
              {quizData.readingQuestionAnswers
                .filter((a) => a.readingQuestionId === question.id)
                .map((answer) => (
                  <label
                    key={answer.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={answer.id}
                      checked={selectedAnswers[question.id] === answer.id}
                      onChange={() =>
                        setSelectedAnswers((prev) => ({
                          ...prev,
                          [question.id]: answer.id,
                        }))
                      }
                    />
                    <span>{answer.text}</span>
                  </label>
                ))}
            </div>
          </div>
        );
      })}

      {/* Submit */}
      <div className="flex justify-center pt-4">
        <button
          onClick={() => setSubmitted(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Submit Answers
        </button>
      </div>
    </div>
  );
}
