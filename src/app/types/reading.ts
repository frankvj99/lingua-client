export enum ReadingDifficultyLevel {
  NoneAssigned = 0,
  Middle = 1, // Roughly grades 5-8
  High = 2, // Roughly grades 9-12
  UndergraduateCollege = 3, // Any undergraduate college
}

export interface ReadingQuestion {
  id: number;
  text: string;
  lastDisplayed: string;
  readingPassageId: number;
  readingQuestionAnswers: ReadingAnswer[];  
}

export interface ReadingAnswer {
  id: number;
  text: string;
  isCorrect: boolean;
  isAnswerChosen: boolean;
  lastDisplayed: string;
  readingQuestionId: number;
}

export interface QuizData {
  passageId: number;
  passageText: string;
  passageLastDisplayed: string;
  readingQuestions: ReadingQuestion[];
}

export interface ReadingFeedbackDto {
  readingExercise: QuizData;
  aiFeedback?: string;
  numberOfQuestions?: number;
  numberCorrectlyAnswered?: number;
  numberOfTries?: number;
  userCanTryAgain?: boolean;
}

