import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendTokenResetComponent } from "./send_token_reset/sendTokenReset.component";
import { ValidateTokenComponent } from "./validate_token/validateToken.component";
import { ChangePasswordTokenComponent } from './change_password_token/changePasswordToken.component';

const routes: Routes = [
  {
    path: 'reset/password',
    component: SendTokenResetComponent
  },
  {
    path: 'reset/token',
    component: ValidateTokenComponent
  },
  {
    path: 'reset/token/password',
    component: ChangePasswordTokenComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
