import { apiClient } from "../lib/api-client";
import { UserDashboardDto } from "../types/user-dashboard";
import { UserProfileDto } from "../types/user-profile";

export function getCurrentUserDashboard(): Promise<UserDashboardDto> {
  return apiClient.get<UserDashboardDto>(
    "/api/users/GetCurrentUserDashboard"
  );
}

export function getCurrentUserProfile(): Promise<UserProfileDto> {
  return apiClient.get<UserProfileDto>(
    "/api/users/me"
  );
}

export function updateCurrentUserProfile(data: UserProfileDto): Promise<UserProfileDto> {
  return apiClient.patch<UserProfileDto>(
    "/api/users/me/profile",
    data
  );
}
