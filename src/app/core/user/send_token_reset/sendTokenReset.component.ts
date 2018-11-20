import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SweetalertService } from '../../services/sweetalert.service';
import { ApiAlliancesService } from '../../services/apiAlliances.service';
import { User } from '../../../shared/models/user';
import { UserService } from '../../services/user.service';

@Component({
    templateUrl: 'sendTokenReset.component.html'
})
export class SendTokenResetComponent implements OnInit {
    @ViewChild('userValidateForm') userValidateForm: any;
    public user: User;

    constructor(
        private router: Router,
        private _aas: ApiAlliancesService,
        private _sa: SweetalertService,
        private _us: UserService
    ) { }

    ngOnInit() {
    }

    /**
     * 
     * Call service to validate username and send SMS with token
     * @param username username
     */
    public sendUserToken(username: string) {
        if (this.userValidateForm.invalid) {
            return;
        }
        this._sa.downdloadAlert("Validando");
        this._aas.sendUserToken(username).subscribe(
            response => {
                if (response != null) {
                    this._sa.successAlert("Se ha enviado un mensaje de texto con el código para cambio de contraseña")
                    this.user = response;
                    this._us.updateUser(this.user);
                    this.router.navigate(['/user/reset/token']);
                } else {
                    this._sa.errorAlert('El nombre de usuario no existe');
                }
            },
            error => {
                this._sa.errorAlert('Error en la validación de la información');
            }
        );
    }
}
