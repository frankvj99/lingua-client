import { apiClient } from "../lib/api-client";
import {
  QuizData,
  ReadingDifficultyLevel,
  ReadingFeedbackDto,
  ReadingPromptType,
} from "../types/reading";

export function getReadingQuiz(): Promise<QuizData> {
  return apiClient.get<QuizData>(
    // "/api/reading/random-exercise" // With ROUTE_MAP
    "/api/Reading/GetRandomReadingExercise"
  );
}

export function getRandomReadingExerciseByLevelAndType(
  level: ReadingDifficultyLevel,
  promptType: ReadingPromptType
): Promise<QuizData> {
  const params = new URLSearchParams({
    level: level.toString(),
    promptType: promptType.toString(),
  });
  return apiClient.get<QuizData>(
    `/api/Reading/GetRandomReadingExercise/ByLevelAndType?${params.toString()}`
  );
}

export function postUserReadingExerciseAndProvideFeedback(
  data: ReadingFeedbackDto
): Promise<{ feedback: ReadingFeedbackDto }> {
  return apiClient.post<{ feedback: ReadingFeedbackDto }>(
    "/api/Reading/PostUserReadingExerciseAndProvideFeedback",
    data
  );
}

export function provideFeedbackOnIncorrectAnswers(
  data: ReadingFeedbackDto
): Promise<{ feedback: string }> {
  return apiClient.post<{ feedback: string }>(
    // "/api/reading/feedback", // With ROUTE_MAP
    "/api/Reading/ProvideFeedbackOnIncorrectAnswers",
    data
  );
}
