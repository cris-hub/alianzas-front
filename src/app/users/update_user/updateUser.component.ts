import { Component, ViewChild, OnInit } from '@angular/core';
import { User } from '../../shared/models/user';
import { Role } from '../../shared/models/role';
import { UserService } from '../../core/services/user.service';
import { SweetalertService } from '../../core/services/sweetalert.service';
import { ApiAlliancesService } from '../../core/services/apiAlliances.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Alliance } from '../../shared/models/alliance';
import { SessionService } from '../../core/services/session.service';

@Component({
    selector: 'app-form-user',
    templateUrl: './updateUser.component.html'
})

export class UpdateUserComponent implements OnInit {
    public user: User;
    public roles: Role[];
    public alliances: Alliance[];
    public idUser: number;

    @ViewChild('formUpdateUser') formUpdateUser: any;

    constructor(
        private _us: UserService,
        private _sa: SweetalertService,
        private _aas: ApiAlliancesService,
        private _ss: SessionService,
        private router: Router,
        private activeRoute: ActivatedRoute,
    ) {
       this.user = this._us.newUser();
    }

    ngOnInit() {
        this.activeRoute.params.subscribe(params => this.idUser = params.id);
        this.getRoles();
        this.getAlliances();
        this.getUserById(this.idUser);
    }

    /**
     * 
     * @desc Submit form FormUpdateUser
     */
    public submitFormUpdateUser() {
        if (this.formUpdateUser.valid) {
            this.user.enabled = (this.user.enabled) ? 1 : 0;
            this.user.changePassword = (this.user.changePassword) ? 1 : 0;
            this.user.resetToken = '';
            this.updateUser();
        }
    }

    /**
     * 
     * @desc Call service to update user 
     */
    public updateUser() {
        //Set the username with email
        this.user.username = this.user.email;
        if (this.user.changePassword == 1) {
            //Set the password with telephone
            this.user.password = this.user.phone.toString();
        }
        this.user.usrIdUpdate = this._ss.getCurrentUser().id;
        this._sa.downdloadAlert('Actualizando el usuario');
        this._aas.updateUser(this.user).subscribe(
            response => {
                this._sa.successAlert();
                this.router.navigate(['/usuarios/listar']);
            },
            error => {
                this._sa.errorAlert('Error en la actualización del usuario');
            }
        )
    }

    /**
     * 
     * @desc Call service to get all roles 
     */
    public getRoles() {
        this._aas.getRoles().subscribe(
            response => {
                this.roles = response;
            },
            error => {
                this._sa.errorAlert('Error cargando los roles');
            }
        );
    }

    /**
     * 
     * @desc Call service to get all Alliances 
     */
    public getAlliances() {
        this._aas.getAlliances('').subscribe(
            response => {
                this.alliances = response;
            },
            error => {
                this._sa.errorAlert('Error cargando las alianzas');
            }
        );
    }

    /**
    * @desc Call Service to get user by id
    * @param id user id number
    */
    public getUserById(id: number) {
        this._aas.getUserById(id.toString()).subscribe(
            response => {
                this.user = response;
            },
            error => {
                this._sa.errorAlert('Error cargando el usuario');
            }
        );
    }
}