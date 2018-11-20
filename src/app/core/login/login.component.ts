import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { SweetalertService } from '../services/sweetalert.service';
import { ApiAlliancesService } from '../services/apiAlliances.service';
import { AuthenticationService } from '../services/authentication.service';
import { Session } from '../../shared/models/session';
import { FormControl } from '../../../../node_modules/@angular/forms';

@Component({ 
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit, AfterViewInit {
    @ViewChild('loginForm') loginForm: any;
    public session: Session;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private _aas: ApiAlliancesService,
        private _ss: SessionService,
        private _sa: SweetalertService
    ) {
        this.session = this._ss.newSession();
    }

    loginRecaptcha = new FormControl(false);

    ngOnInit() {
        this._ss.logout();
    }

    ngAfterViewInit(){
        this._sa.closeAlert();
    }

    onScriptLoad() {
        console.log('Google reCAPTCHA loaded and is ready for use!')
    }
 
    onScriptError() {
        console.log('Something went long when loading the Google reCAPTCHA')
    }

    /**
     * Submit form login
     * @param username 
     * @param password 
     */
    public submitLogin(username: string, password: string) {
        if (this.loginForm.invalid) {
            return;
        }
        this._sa.downdloadAlert('Cargando información de la sesión');
        this.authenticationService.login(username, password).subscribe(
            response => {
                this.session.token = response.headers.get('authorization');
                this.session.refreshToken = response.headers.get('refreshToken');
                this._ss.setCurrentSession(this.session);
                this.getInfoUser(username, '');
                this._sa.closeAlert();
            },
            error => {
                if(error.status === 403){
                    this._sa.errorAlert('Usuario o contraseña incorrecto');
                }else{
                    this._sa.errorAlert('Error en el servicio de autenticación')
                }
            }
        );
    }

    /**
     * @desc Call service to get info user
     * @param username 
     * @param excludeId 
     */
    public getInfoUser(username: string, excludeId: string){
        this._sa.downdloadAlert('Cargando información del usuario');
        this._aas.getUserByUserName(username, excludeId).subscribe(
            response => {
                this.session.user = response;
                this._ss.setCurrentSession(this.session);
                this._sa.closeAlert();
            },
            error => {
                debugger;
                this._sa.errorAlert('Error cargando la información del usuario');
            },
            () => this.router.navigate(['/nosotros'])
        )
    }
}
