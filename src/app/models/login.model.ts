// src/app/models/login.model.ts
export interface LoginRequest {
  username: string;
  password: string;
  userRole: string;   // match what your backend expects (UserRole)
}

export interface LoginResponse {
  token: string;      // 👈 this was missing
  userId: number;
  username: string;
  userRole: string;
}
