import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { SweetalertService } from '../services/sweetalert.service';
import { ApiAlliancesService } from '../services/apiAlliances.service';
import { Session } from '../../shared/models/session';
import { User } from '../../shared/models/user';

@Component({ 
    templateUrl: 'changePassword.component.html'
})
export class ChangePasswordComponent implements OnInit {
    @ViewChild('changePassForm') changePassForm: any;
    public session: Session;
    public user: User;
    public changePasswordUser: Number;

    constructor(
        private router: Router,
        private _aas: ApiAlliancesService,
        private _ss: SessionService,
        private _sa: SweetalertService
    ) {
        this.session = this._ss.newSession();
    }

    ngOnInit() {
        this.user = this._ss.getCurrentUser();
        this.changePasswordUser = this.user.changePassword;
    }

    /**
     * Call service to change password
     * @param password new password 
     */
    public changePassword(password: string) {
        if (this.changePassForm.invalid) {
            return;
        }
        this._sa.downdloadAlert('Actualizando la contraseña');
        this.user.changePassword = 0;
        this.user.password = password;
        this._aas.userChangePass(this.user).subscribe(
            response => {
                this._sa.closeAlert();
                this._ss.setCurrentUser(this.user);
                this.router.navigate(['/nosotros']);
                this._sa.successAlert('La contraseña se actualizo correctamente');
            },
            error => {
                this._sa.errorAlert('Error actualizando la contraseña');
            }
        );
    }
}
