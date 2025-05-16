export interface User {
  username: string;
  email: string;
  age: number;
  createdAt: string;
  role: Role;
  gender: Gender;
}
export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  GUEST = "GUEST",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}
