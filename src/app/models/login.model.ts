export interface LoginRequest {
  username: string;
  password: string;
  userRole: string;   // match form control name
}

export interface LoginResponse {
  userId: number;
  username: string;
  userRole: string;
}
