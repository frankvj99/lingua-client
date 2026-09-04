import { apiClient } from "../lib/api-client";
import { UserStreakDto, UserStreakRecordDto } from "../types/user-streak-record";

export function getCurrentStreak(): Promise<UserStreakDto> {
  return apiClient.get<UserStreakDto>("/api/userstreaks/current");
}

export function getStreakHistory(): Promise<UserStreakRecordDto[]> {
  return apiClient.get<UserStreakRecordDto[]>("/api/userstreaks/history");
}
