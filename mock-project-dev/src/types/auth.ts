// Authentication-related types and interfaces

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: {
    email: string;
    confirmPassword: string;
    role: string;
    id: number;
    phone?: string;
    firstName?: string;
    lastName?: string;
    nickname?: string;
    birthDate?: string;
    gender?: string;
    country?: string;
  };
}
