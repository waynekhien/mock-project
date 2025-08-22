// User-related types and interfaces

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt?: string;
  // Extended profile fields
  firstName?: string;
  lastName?: string;
  nickname?: string;
  gender?: 'male' | 'female' | 'other';
  country?: string;
  birthDate?: string;
}

// User update interface - for updating user profile (excludes password)
export interface UserUpdateData {
  email?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  nickname?: string;
  gender?: 'male' | 'female' | 'other';
  country?: string;
  birthDate?: string;
  phone?: string;
  role?: 'admin' | 'user';
}
