import type { UserWritingExerciseDto } from "./user-dashboard";

export enum WritingLength {
  NoneAssigned = 0,
  Short = 1, // Roughly a single paragraph
  Medium = 2, // Roughly a few paragraphs
  Long = 3, // Roughly a full essay
}

export enum WritingMode {
  NoneAssigned = 0,
  Expository = 1, // Explains or informs
  Narrative = 2, // Tells a story
  Persuasive = 3, // Argues a position
  Descriptive = 4, // Paints a vivid picture
}

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
  aiRewrite?: string; 
  numberOfTries: number;
  userCanTryAgain: boolean;
  completedOn: string | null;
}

export interface SubmitWritingSampleRequest {
  userId: number;
  userName: string;
  userEmail: string;
  title: string;
  length: WritingLength;
  mode: WritingMode;
  originalText: string;
}

export interface SubmitWritingRevisionRequest {
  id: number;
  revisedText: string;
}

