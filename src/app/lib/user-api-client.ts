import { apiClient } from "../lib/api-client";
import { UserDashboardDto } from "../types/user-dashboard";

export function getCurrentUserDashboard(): Promise<UserDashboardDto> {
  return apiClient.get<UserDashboardDto>(
    "/api/users/GetCurrentUserDashboard"
  );
}
