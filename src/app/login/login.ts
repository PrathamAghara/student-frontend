// src/app/login/login.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from '../services/auth.service';
import { LoginRequest } from '../models/login.model';

@Component({
  selector: 'app-login',
  standalone: true,                          // 👈 standalone component
  imports: [CommonModule, FormsModule],      // 👈 needed for *ngIf, ngModel, ngForm
  templateUrl: './login.html',
})
export class LoginComponent {

  // matches template: model.username / model.password / model.userrole
  model = {
    username: '',
    password: '',
    userrole: ''
  };

  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Please fill required fields.';
      return;
    }

    const payload: LoginRequest = {
      username: this.model.username,
      password: this.model.password,
      // TS property name userRole (capital R) ➜ backend UserRole
      userRole: this.model.userrole
    };

    this.authService.login(payload).subscribe({
      next: (res) => {
        this.errorMessage = '';
        this.authService.setSession(res);   // saves username, role, token
        this.router.navigate(['/students']);
      },
      error: (err) => {
        console.log('LOGIN ERROR', err);
        this.errorMessage = err.error?.message || 'Invalid username, password or role.';
      }
    });
  }
}
