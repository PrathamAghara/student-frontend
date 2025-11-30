import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StudentService } from '../services/student.service';
import { Student } from '../models/student.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './students-list.html',
  styleUrls: ['./students-list.css']
})
export class StudentsListComponent implements OnInit {

  students: Student[] = [];
  isLoading = true;
  errorMessage = '';

  // form model
  currentStudent: Student = this.getEmptyStudent();
  editing = false;   // false = Add, true = Edit

  constructor(
    private studentService: StudentService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  // ------- ROLE CHECK --------
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  // ------- API CALLS ---------
  loadStudents(): void {
    this.isLoading = true;
    this.studentService.getStudents().subscribe({
      next: data => {
        this.students = data;
        this.isLoading = false;
      },
      error: err => {
        console.error(err);
        this.errorMessage = 'Failed to load students';
        this.isLoading = false;
      }
    });
  }

  // ---- Add / Edit helpers ----

  getEmptyStudent(): Student {
    return {
      id: 0,
      name: '',
      mobile_number: '',
      email: ''
    };
  }

  startAdd(): void {
    this.editing = false;
    this.currentStudent = this.getEmptyStudent();
  }

  startEdit(student: Student): void {
    this.editing = true;
    this.currentStudent = { ...student }; // copy
  }

  saveStudent(): void {
    if (this.editing) {
      // UPDATE
      this.studentService.updateStudent(this.currentStudent).subscribe({
        next: () => {
          this.loadStudents();
          this.cancel();
        },
        error: err => {
          console.error(err);
          alert('Failed to update student');
        }
      });
    } else {
      // ADD (id will be assigned by backend)
      const toCreate = { ...this.currentStudent, id: 0 };
      this.studentService.addStudent(toCreate).subscribe({
        next: () => {
          this.loadStudents();
          this.cancel();
        },
        error: err => {
          console.error(err);
          alert('Failed to add student');
        }
      });
    }
  }

  deleteStudent(id: number): void {
    if (!confirm('Delete this student?')) return;

    this.studentService.deleteStudent(id).subscribe({
      next: () => this.loadStudents(),
      error: err => {
        console.error(err);
        alert('Failed to delete student');
      }
    });
  }

  cancel(): void {
    this.currentStudent = this.getEmptyStudent();
    this.editing = false;
  }
}
