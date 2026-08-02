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

