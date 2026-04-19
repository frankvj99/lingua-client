export interface ReadingQuestion {
  id: number;
  text: string;
  lastDisplayed: string;
  readingPassageId: number;
}

export interface ReadingAnswer {
  id: number;
  text: string;
  isCorrect: boolean;
  lastDisplayed: string;
  readingQuestionId: number;
}

export interface QuizData {
  passageId: number;
  passageText: string;
  passageLastDisplayed: string;
  readingQuestions: ReadingQuestion[];
  readingQuestionAnswers: ReadingAnswer[];
}
