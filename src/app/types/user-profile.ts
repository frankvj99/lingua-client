export enum RoleEnum {
  BasicUser = 1,
  Learner = 2,
  Instructor = 3,
  Admin = 4,
}

export enum UserEducationLevel {
  NotRecorded = 0,
  GradesKThru4 = 1,
  Grades5Thru8 = 2,
  Grades9Thru12 = 3,
  UndergraduateCollege = 4,
  BachelorDegree = 5,
  AdvancedDegree = 6,
}

export interface UserProfileDto {
  id: number;
  name: string;
  email: string;
  picture: string | null;
  gradeLevel: UserEducationLevel;
  profileComplete: boolean;
  roles: RoleEnum[];
  lastLoginAt: string | null;
}
