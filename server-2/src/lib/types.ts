export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string | undefined;
}

export interface IEventData {
  email: string;
  firstName: string;
  otp: string;
}
