export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  picture?: string;
  role?: string;
  confirmPassword?: string | undefined;
}

export interface IEventData {
  id: string;
  delayInMinutes: number;
  firstName?: string;
  email?: string;
  otp?: string;
}

export type EventTypes =
  | "new-user"
  | "user-verified"
  | "password-reset"
  | "password-changed";

export interface IJWTPayload {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}
