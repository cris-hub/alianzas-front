import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';

import { UserService } from '../core/services/user.service';
import { AddUserComponent } from './add_user/addUser.component';
import { UpdateUserComponent } from './update_user/updateUser.component';
import { ListUsersComponent } from './list_users/listUsers.component';
import { UsernameDirective } from './directives/username.directive';
import { UserEmailDirective } from './directives/useremail.directive';

@NgModule({
    imports: [
        CommonModule,
        UsersRoutingModule,
        SharedModule
    ],
    declarations: [
        AddUserComponent,
        UpdateUserComponent,
        ListUsersComponent,
        UsernameDirective,
        UserEmailDirective
    ],
    providers: [
        UserService,
    ]
})
export class UsersModule { }
