import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
    imports: [CommonModule, FormsModule],
})
export class LoginComponent {
  
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(form: NgForm) {
  if (form.invalid) {
    this.errorMessage = 'Please fill required fields.';
    return;
  }

  const payload = {
    username: form.value.username,
    password: form.value.password,
    userRole: form.value.userRole   // 👈 NOTE: property name userRole (capital R)
  };

  console.log('LOGIN PAYLOAD', payload);

  this.authService.login(payload).subscribe({
    next: (res) => {
      this.errorMessage = '';
      this.authService.setSession(res);
      this.router.navigate(['/students']);
    },
    error: (err) => {
      console.log('LOGIN ERROR', err);
      this.errorMessage = err.error?.message || 'Invalid username, password or role.';
    }
  });
}

}
