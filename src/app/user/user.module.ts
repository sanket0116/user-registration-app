import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ReactiveFormsModule, 
        RouterModule.forChild([
            { path: '', component: UserRegistrationComponent },
            { path: 'register', component: UserListComponent }
        ]),
        FormsModule,
    ],
    exports: [],
})
export class UserModule { }
