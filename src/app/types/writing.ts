export interface EditWritingRequest {
  writingSample: string;
}

export interface EditWritingResponse {
  revisedText: string;
  // add more fields if your API returns them (feedback, suggestions, etc.)
}
