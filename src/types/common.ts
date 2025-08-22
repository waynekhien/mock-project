// Common API and utility types

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
