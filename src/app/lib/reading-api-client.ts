import { apiClient } from "../lib/api-client";
import { QuizData, ReadingFeedbackDto } from "../types/reading";

export function getReadingQuiz(): Promise<QuizData> {
  return apiClient.get<QuizData>(
    "/Reading/GetRandomReadingExercise"
  );
}

export function provideFeedbackOnIncorrectAnswers(
  data: ReadingFeedbackDto
): Promise<QuizData> {
  return apiClient.post<QuizData>(
    "/Reading/ProvideFeedbackOnIncorrectAnswers",
    data
  );
}
