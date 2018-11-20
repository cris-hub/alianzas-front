import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SweetalertService } from '../../services/sweetalert.service';
import { ApiAlliancesService } from '../../services/apiAlliances.service';
import { User } from '../../../shared/models/user';
import { UserService } from '../../services/user.service';

@Component({ 
    templateUrl: 'changePasswordToken.component.html'
})
export class ChangePasswordTokenComponent implements OnInit {
    @ViewChild('changePassForm') changePassTokenForm: any;
    public user: User;

    constructor(
        private router: Router,
        private _aas: ApiAlliancesService,
        private _sa: SweetalertService,
        private _us: UserService
    ) {
    }

    ngOnInit() {
        this._us.validateStateUser('/user/reset/password');
        this.user = this._us.getUser();
    }

    /**
     * 
     * Call service to change password and set blank reset_token
     * @param password new password 
     */
    public changePasswordToken(password: string) {
        if (this.changePassTokenForm.invalid) {
            return;
        }
        this.user.password = password;
        this._sa.downdloadAlert('Actualizando la contraseña');
        this._aas.userChangePassToken(this.user).subscribe(
            response => {
                this._sa.closeAlert();
                this._sa.successAlert("La contraseña fue actualizada, por favor inicie sesión")
                this.router.navigate(['/login'])
            },
            error => {
                this._sa.errorAlert('Error actualizando la contraseña');
            }
        );
    }
}
