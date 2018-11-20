import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SweetalertService } from '../../services/sweetalert.service';
import { ApiAlliancesService } from '../../services/apiAlliances.service';
import { User } from '../../../shared/models/user';
import { UserService } from '../../../core/services/user.service';

@Component({
    templateUrl: 'validateToken.component.html'
})
export class ValidateTokenComponent implements OnInit {
    @ViewChild('tokenValidateForm') tokenValidateForm: any;
    public user: User;

    constructor(
        private router: Router,
        private _aas: ApiAlliancesService,
        private _sa: SweetalertService,
        private _us: UserService
    ) { }

    ngOnInit() {
        this._us.validateStateUser('/user/reset/password');
        this.user = this._us.getUser();
    }

    /**
     * 
     * Call service to validate token
     * @param token token
     */
    public validateToken(token: string) {
        if (this.tokenValidateForm.invalid) {
            return;
        }
        this._sa.downdloadAlert("Validando");
        this._aas.findUserToken(this.user.username, token).subscribe(
            response => {
                if (response != null) {
                    this.user.resetToken = token;
                    this.router.navigate(['user/reset/token/password'])
                    this._sa.closeAlert();
                } else {
                    this._sa.errorAlert('El token no es valido');
                }
            },
            error => {
                this._sa.errorAlert('Error en la validación de la información');
            }
        );
    }

    
}
