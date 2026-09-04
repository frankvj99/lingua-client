export interface UserStreakRecordDto {
  id: number;
  startedOn: string;
  lastActivityOn: string;
  endedOn: string | null;
  length: number;
  isActive: boolean;
}

export interface UserStreakDto {
  currentStreak: number;
  longestStreak: number;
  lastActivityOn: string | null;
}
