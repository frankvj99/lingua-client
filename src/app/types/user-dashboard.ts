import { createInitialRSCPayloadFromFallbackPrerender } from "next/dist/client/flight-data-helpers";

export interface UserReadingExerciseDto {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  readingPassageId: number;
  readingPassagePreviewText: string;
  numberOfQuestions: number;
  numberCorrectlyAnswered: number;
  numberOfTries: number;
  userCanTryAgain: boolean;
  completedOn: string | null;
}

export interface UserWritingExerciseDto {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  originalText: string;
  initialFeedback: string | null;
  revisedText: string | null;
  finalFeedback: string | null;
  aiRewrite: string | null;
  numberOfTries: number;
  submittedOn: string;
  revisedOn: string | null;
  completedOn: string | null;
}

export interface UserDashboardDto {
  userId: number;
  userName: string;
  email: string;
  brainBalance: number;
  userReadingExercises: UserReadingExerciseDto[];
  userWritingExercises: UserWritingExerciseDto[];
}
