import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';

import { ValidateTokenComponent } from './validate_token/validateToken.component';
import { SharedModule } from '../../shared/shared.module';
import { UserService } from '../../core/services/user.service';
import { SendTokenResetComponent } from './send_token_reset/sendTokenReset.component';
import { ChangePasswordTokenComponent } from './change_password_token/changePasswordToken.component';


@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ],
  declarations: [
    SendTokenResetComponent,
    ValidateTokenComponent,
    ChangePasswordTokenComponent
  ],
  providers: [ UserService ]
})
export class UserModule { }
