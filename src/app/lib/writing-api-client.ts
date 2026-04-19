import { apiClient } from "../lib/api-client";
import {
  EditWritingRequest,
  EditWritingResponse,
} from "../types/writing";

export function editAndReviseWritingSample(
  data: EditWritingRequest
): Promise<EditWritingResponse> {
  return apiClient.post<EditWritingResponse>(
    "/Writing/EditAndReviseWritingSample",
    data
  );
}
