import { apiClient } from "../lib/api-client";
import {
  EditWritingResponse,
  SubmitWritingRevisionRequest,
  SubmitWritingSampleRequest,
  WritingExerciseRequest,
  WritingExerciseResponse,
} from "../types/writing";

const writingEndpoints = {
  edit: "EditWritingSample",
  revise: "ReviseWritingSample",
  suggest: "SuggestImprovementsForWritingSample",
  editAndRevise: "EditAndReviseWritingSample",
  full: "EditReviseAndSuggestImprovementsForWritingSample",
  secondDraft: "Get2ndRoundWritingFeedback",
} as const;

function postWriting(
  endpoint: string,
  data: WritingExerciseRequest
): Promise<EditWritingResponse> {
    return apiClient.post<EditWritingResponse>(
      `/api/writing/${endpoint}`,
      data
    );
}

export function editWritingSample(data: WritingExerciseRequest) {
  return postWriting(writingEndpoints.edit, data);
}

export function reviseWritingSample(data: WritingExerciseRequest) {
  return postWriting(writingEndpoints.revise, data);
}

export function suggestImprovementsForWritingSample(data: SubmitWritingSampleRequest) {
  return apiClient.post<WritingExerciseResponse>(
    `/api/writing/${writingEndpoints.suggest}`,
    data
  );
}

export function editAndReviseWritingSample(data: WritingExerciseRequest) {
  return postWriting(writingEndpoints.editAndRevise, data);
}

export function editReviseAndSuggestImprovementsForWritingSample(data: WritingExerciseRequest) {
  return postWriting(writingEndpoints.full, data);
}

export function get2ndDraftFeedback(data: SubmitWritingRevisionRequest) {
  return apiClient.post<WritingExerciseResponse>(
    `/api/writing/${writingEndpoints.secondDraft}`,
    data
  )
}
