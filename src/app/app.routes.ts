import { Routes } from '@angular/router';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'user-list', loadComponent: () => import('./user/user-list/user-list.component').then(m => m.UserListComponent) }
];
