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

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, request);
  }

  setSession(res: LoginResponse) {
    localStorage.setItem('username', res.username);
    localStorage.setItem('userRole', res.userRole);
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  logout() {
    localStorage.clear();
  }

  isAdmin(): boolean {
    return (this.getUserRole() || '').toLowerCase() === 'admin';
  }
   isUser(): boolean {
    return (this.getUserRole() || '').toLowerCase() === 'user';
  }
}
