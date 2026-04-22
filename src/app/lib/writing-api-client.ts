import { apiClient } from "../lib/api-client";
import {
  EditWritingRequest,
  EditWritingResponse,
} from "../types/writing";

const writingEndpoints = {
  edit: "EditWritingSample",
  revise: "ReviseWritingSample",
  suggest: "SuggestImprovementsForWritingSample",
  editAndRevise: "EditAndReviseWritingSample",
  full: "EditReviseAndSuggestImprovementsForWritingSample",
} as const;

function postWriting(
  endpoint: string,
  data: EditWritingRequest
): Promise<EditWritingResponse> {
    return apiClient.post<EditWritingResponse>(
      `/Writing/${endpoint}`,
      data
    );
}

export function editWritingSample(data: EditWritingRequest) {
  return postWriting(writingEndpoints.edit, data);
}

export function reviseWritingSample(data: EditWritingRequest) {
  return postWriting(writingEndpoints.revise, data);
}

export function suggestImprovementsForWritingSample(data: EditWritingRequest) {
  return postWriting(writingEndpoints.suggest, data);
}

export function editAndReviseWritingSample(data: EditWritingRequest) {
  return postWriting(writingEndpoints.editAndRevise, data);
}

export function editReviseAndSuggestImprovementsForWritingSample(data: EditWritingRequest) {
  return postWriting(writingEndpoints.full, data);
}
