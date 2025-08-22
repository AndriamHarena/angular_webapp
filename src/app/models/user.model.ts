export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserRegistration {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserProfileUpdate {
  name: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}
