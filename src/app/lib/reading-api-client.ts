import { apiClient } from "../lib/api-client";
import { QuizData } from "../types/reading";

export function getReadingQuiz(): Promise<QuizData> {
  return apiClient.get<QuizData>(
    "/Reading/GetRandomReadingExercise"
  );
}
