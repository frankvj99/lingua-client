import { ReadingQuestion, ReadingAnswer, QuizData } from '../types/reading'

const API_BASE_URL = "https://localhost:7253/api";

export async function getReadingQuiz(): Promise<QuizData> {
  const res = await fetch(`${API_BASE_URL}/Reading/GetRandomQuestionAndAnswers`);

  if (!res.ok) {
    throw new Error("Failed to fetch reading quiz");
  }

  return res.json();
}
