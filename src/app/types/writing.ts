import { UserWritingExerciseDto } from "./user-dashboard";

export type WritingExerciseRequest = Pick<
  UserWritingExerciseDto,
  | "id"
  | "originalText"
  | "initialFeedback"
  | "revisedText"
  | "finalFeedback"
  | "aiRewrite"
  | "numberOfTries"
>;

export interface EditWritingResponse {
  result: string;
}

export interface WritingExerciseResponse {
  id: number;
  feedback: string;
  numberOfTries: number;
  userCanTryAgain: boolean;
  completedOn: string | null;
}

export interface SubmitWritingSampleRequest {
  userId: number;
  userName: string;
  userEmail: string;
  originalText: string;
}

export interface SubmitWritingRevisionRequest {
  id: number;
  revisedText: string;
}

