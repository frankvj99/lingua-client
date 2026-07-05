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

export interface UserDashboardDto {
  userId: number;
  userName: string;
  email: string;
  userReadingExercises: UserReadingExerciseDto[];
}
