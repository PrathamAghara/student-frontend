import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { StudentsListComponent } from './students-list/students-list';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login').then(m => m.LoginComponent)
  },
  {
    path: 'students',
    loadComponent: () =>
      import('./students-list/students-list')
        .then(m => m.StudentsListComponent)
  },
   // default → login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // any unknown URL → login
  { path: '**', redirectTo: 'login' }
];

