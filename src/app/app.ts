import { Component, NgModule } from '@angular/core';
import { StudentsListComponent } from './students-list/students-list';
import { Routes, RouterOutlet } from "@angular/router";
import { LoginComponent } from "../app/login/login";
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,   
  ]
})
export class AppModule { }
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StudentsListComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'student-frontend';
}

export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },

  { path: "login", component: LoginComponent },

  { path: "students", component: StudentsListComponent }
];
