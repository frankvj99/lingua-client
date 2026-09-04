"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRandomReadingExerciseByLevelAndType, getReadingQuiz } from "../lib/reading-api-client";
import { ReadingDifficultyLevel, ReadingFeedbackDto, ReadingPromptType, ReadingQuestion } from "../types/reading";
import { provideFeedbackOnIncorrectAnswers, postUserReadingExerciseAndProvideFeedback } from "../lib/reading-api-client";

function formatScore(numberCorrectlyAnswered?: number, numberOfQuestions?: number): string {
  if (!numberOfQuestions) return "division by zero error";
  return `${Math.round(((numberCorrectlyAnswered ?? 0) / numberOfQuestions) * 100)}`;
}

interface ReadingExerciseProps {
  level?: ReadingDifficultyLevel;
  promptType?: ReadingPromptType;
}

export default function ReadingExercise({ level, promptType }: ReadingExerciseProps = {}) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | null>>({});
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [postFeedback, setPostFeedback] = useState<ReadingFeedbackDto | null>(null);
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);

  const buildFeedbackPayload = (): ReadingFeedbackDto => {
    if (!quizData) throw new Error("Quiz data not loaded");

    const allQuestions: ReadingQuestion[] = quizData.readingQuestions.map((question) => ({
      ...question,
      readingQuestionAnswers: question.readingQuestionAnswers.map((answer) => ({
        ...answer,
        isAnswerChosen: answer.id === selectedAnswers[question.id],
      })),
    }));

    return { readingExercise: { ...quizData, readingQuestions: allQuestions } };
  };

  // ✏️ updated: sets submitted, calls API, stores feedback string
  const handleGetFeedback = async () => {
    setPostFeedback(null);
    setFeedback(null);
    setSubmitted(true);
    setIsFeedbackLoading(true);
    try {
      const dto = buildFeedbackPayload();
      const response = await provideFeedbackOnIncorrectAnswers(dto);
      setFeedback(response.feedback);
    } finally {
      setIsFeedbackLoading(false);
    }
  };

  const handlePostAndFeedback = async () => {
    setFeedback(null);
    setPostFeedback(null);
    setSubmitted(true);
    setIsFeedbackLoading(true);
    try {
      const dto = buildFeedbackPayload();
      const response = await postUserReadingExerciseAndProvideFeedback(dto);
      setPostFeedback(response.feedback);
    } finally {
      setIsFeedbackLoading(false);
    }
  };

  const { data: quizData, isLoading, isError, error } = useQuery({
    queryKey: ["readingQuiz", level, promptType],
    queryFn: () =>
      level !== undefined && promptType !== undefined
        ? getRandomReadingExerciseByLevelAndType(level, promptType)
        : getReadingQuiz(),
    // This endpoint returns a random passage each call, so a background
    // refetch (e.g. on window focus) would silently swap the passage/questions
    // out from under the user's in-progress answers.
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  if (isLoading) return <p className="p-4 text-slate-500 text-sm">Loading...</p>;
  if (isError) return <p className="p-4 text-red-600 text-sm">{(error as Error).message || "Something went wrong"}</p>;
  if (!quizData) return null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">

      {/* Passage */}
      <div className="bg-white border border-slate-200 rounded-lg p-5">
        <h2 className="text-xl font-semibold text-slate-900 mb-2">Reading Passage</h2>
        <p className="whitespace-pre-line text-slate-700">{quizData.passageText}</p>
      </div>

      <h3 className="text-lg font-semibold text-slate-900">Questions</h3>

      {/* Questions */}
      <div className="space-y-3">
        {quizData.readingQuestions.map((question, qIndex) => {
          const userAnswerId = selectedAnswers[question.id];
          const userAnswerObj = question.readingQuestionAnswers.find((a) => a.id === userAnswerId);
          const isUserCorrect = userAnswerObj?.isCorrect;

          return (
            <div key={question.id} className="bg-white border border-slate-200 rounded-lg p-5 space-y-3">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-slate-900">
                  <strong>{qIndex + 1}) </strong>
                  {question.text}
                </h4>
                {submitted && (
                  <span className={`text-xs rounded-full px-2 py-0.5 ${isUserCorrect ? "bg-mint-100 text-mint-800" : "bg-red-100 text-red-700"}`}>
                    {isUserCorrect ? "Correct" : "Incorrect"}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                {question.readingQuestionAnswers.map((answer) => (
                  <label key={answer.id} className="flex items-center gap-2 cursor-pointer text-sm text-slate-700">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={answer.id}
                      checked={selectedAnswers[question.id] === answer.id}
                      onChange={() => setSelectedAnswers((prev) => ({ ...prev, [question.id]: answer.id }))}
                      className="accent-navy-800"
                    />
                    <span>{answer.text}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-3 pt-4">
        <button onClick={() => setSubmitted(true)} className="bg-navy-800 text-white text-sm px-4 py-2 rounded-md hover:bg-navy-700 cursor-pointer">
          Submit answers without feedback
        </button>
        <button onClick={handleGetFeedback} className="bg-navy-800 text-white text-sm px-4 py-2 rounded-md hover:bg-navy-700 cursor-pointer">
          Get feedback
        </button>
        <button onClick={handlePostAndFeedback} className="bg-navy-800 text-white text-sm px-4 py-2 rounded-md hover:bg-navy-700 cursor-pointer">
          Submit and get feedback
        </button>
        <button onClick={() => window.location.reload()} className="bg-white text-navy-800 border border-navy-800 text-sm px-4 py-2 rounded-md hover:bg-navy-50 cursor-pointer">
          Reload page
        </button>
      </div>

      {postFeedback && (
        <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-1 text-sm text-slate-700">
          <p><strong>Number of Tries: </strong>{postFeedback.numberOfTries}</p>
          <p><strong>Can try again? </strong>{postFeedback.userCanTryAgain ? "true" : "false"}</p>
          <p><strong>Number Correct: </strong>{postFeedback.numberCorrectlyAnswered}</p>
          <p><strong>Score: </strong>{formatScore(postFeedback.numberCorrectlyAnswered, postFeedback.numberOfQuestions)}</p>
        </div>
      )}

      {(isFeedbackLoading || feedback || postFeedback) && (
        <div className="bg-mint-50 border border-mint-200 rounded-lg p-5">
          <h3 className="text-lg font-semibold text-mint-900 mb-2">Feedback</h3>
          <p className="whitespace-pre-line text-mint-800">
            {isFeedbackLoading ? "Loading..." : feedback ?? postFeedback?.aiFeedback}
          </p>
        </div>
      )}

    </div>
  );
}