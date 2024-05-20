import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,NgIf ]  
})
export class UserRegistrationComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      fatherName: ['', Validators.required],
      subject: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      let users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push(this.userForm.value);
      localStorage.setItem('users', JSON.stringify(users));
      this.router.navigate(['/user-list']);
    } else {
      this.userForm.markAllAsTouched(); 
    }
  }
  
}
