import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUserComponent } from "./add_user/addUser.component";
import { ListUsersComponent } from './list_users/listUsers.component';
import { UpdateUserComponent } from './update_user/updateUser.component';

const routes: Routes = [
  {
    path: 'agregar', 
    component: AddUserComponent
  },
  {
    path: 'actualizar/:id', 
    component: UpdateUserComponent
  },
  {
    path: 'listar',
    component: ListUsersComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
