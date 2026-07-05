import { apiClient } from "../lib/api-client";
import { QuizData, ReadingFeedbackDto } from "../types/reading";
import { UserDashboardDto } from "../types/user-dashboard";

export function getReadingQuiz(): Promise<QuizData> {
  return apiClient.get<QuizData>(
    // "/api/reading/random-exercise" // With ROUTE_MAP
    "/api/Reading/GetRandomReadingExercise"
  );
}

export function getCurrentUserDashboard(): Promise<UserDashboardDto> {
  return apiClient.get<UserDashboardDto>(
    "/api/Reading/GetCurrentUserDashboard"
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
