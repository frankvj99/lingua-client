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

export class UserProfileDto {
  id: number;
  name: string;
  email: string;
  picture: string | null;
  gradeLevel: UserEducationLevel;
  profileComplete: boolean;
  roles: RoleEnum[];
  lastLoginAt: string | null;

  constructor(data: {
    id: number;
    name?: string;
    email?: string;
    picture?: string | null;
    gradeLevel?: UserEducationLevel;
    profileComplete?: boolean;
    roles?: RoleEnum[];
    lastLoginAt?: string | null;
  }) {
    this.id = data.id;
    this.name = data.name ?? "";
    this.email = data.email ?? "";
    this.picture = data.picture ?? null;
    this.gradeLevel = data.gradeLevel ?? UserEducationLevel.NotRecorded;
    this.profileComplete = data.profileComplete ?? false;
    this.roles = data.roles ?? [];
    this.lastLoginAt = data.lastLoginAt ?? null;
  }
}
