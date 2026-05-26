import { apiClient } from "../lib/api-client";
import { QuizData, ReadingFeedbackDto } from "../types/reading";

export function getReadingQuiz(): Promise<QuizData> {
  return apiClient.get<QuizData>(
    "/api/reading/random-exercise"
    // "/api/Reading/GetRandomReadingExercise"
  );
}

export function provideFeedbackOnIncorrectAnswers(
  data: ReadingFeedbackDto
): Promise<{ feedback: string }> {
  return apiClient.post<{ feedback: string }>(
    "/Reading/ProvideFeedbackOnIncorrectAnswers",
    data
  );
}
