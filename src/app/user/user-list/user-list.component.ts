  import { Component,OnInit  } from '@angular/core';
  import { NgFor,NgIf } from '@angular/common';  
  import { TableModule } from 'primeng/table';
  import { ButtonModule } from 'primeng/button';
  import { Router } from '@angular/router';

  @Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css'],
    standalone: true,
    imports: [NgFor, TableModule,ButtonModule, NgIf]
  })
  export class UserListComponent implements OnInit {
    users: any[] = [];
    filteredUsers: any[] = []; 
    genderFilter: string = ''; 
    loading = false;
    errorMessage = '';
    constructor(private router: Router) { }

    ngOnInit(): void {
      this.loadUsers();
      this.filteredUsers = [...this.users];
    }

loadUsers() {
  this.loading = true;
  try {
    const users = localStorage.getItem('users');
    if (users) {
      this.users = JSON.parse(users);
    } else {
      this.users = [];
    }
  } catch (error) {
    console.error('Error loading users:', error);
    this.errorMessage = 'An error occurred while loading users.';
    this.users = [];
  } finally {
    this.loading = false;
  }
}


    deleteUser(user: any): void {
      const index = this.users.indexOf(user);
      if (index !== -1) {
        this.users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(this.users));
        this.applyGenderFilter({ target: { value: this.genderFilter } } as any);
        console.log('User deleted successfully!');
      } else {
        console.error('User not found!');
      }
    }
  
    navigateToRegister(): void {
      this.router.navigate(['/register']);
    }
    
    applyGenderFilter(event: Event): void {
      const target = event.target as HTMLSelectElement;
      const selectedGender = target.value;
      this.genderFilter = selectedGender;
      if (selectedGender) {
        this.filteredUsers = this.users.filter(user => user.gender === selectedGender);
      } else {
        this.filteredUsers = [...this.users]; 
      }
    }
  }