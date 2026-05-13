export interface EditWritingRequest {
  writingSample: string;
}

export interface EditWritingResponse {
  revisedText: string;
  
}

export interface SecondDraft {
  originalWritingSample: string;
  openAi1stFeedback: string;
  secondDraftOfWritingSample: string;
}

