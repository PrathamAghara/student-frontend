// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://localhost:7211/api/users';   // your API base

  constructor(private http: HttpClient) { }

  // ---- LOGIN ----
  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, request);
  }

  // ---- SAVE USER DATA + TOKEN ----
  setSession(res: LoginResponse) {

    // save username & role
    localStorage.setItem('username', res.username);
    localStorage.setItem('userRole', res.userRole);

    // save JWT token
    if (res.token) {
      localStorage.setItem('token', res.token);
    }
  }

  // ---- GET TOKEN ----
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ---- ROLE HELPERS ----
  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  isAdmin(): boolean {
    return (this.getUserRole() || '').toLowerCase() === 'admin';
  }

  isUser(): boolean {
    return (this.getUserRole() || '').toLowerCase() === 'user';
  }

  // ---- LOGOUT ----
  logout() {
    localStorage.clear();
  }
}
