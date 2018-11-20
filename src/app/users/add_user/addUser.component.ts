import { Component, ViewChild, OnInit } from '@angular/core';
import { User } from '../../shared/models/user';
import { Role } from '../../shared/models/role';
import { UserService } from '../../core/services/user.service';
import { SweetalertService } from '../../core/services/sweetalert.service';
import { ApiAlliancesService } from '../../core/services/apiAlliances.service';
import { Router } from '@angular/router';
import { Alliance } from '../../shared/models/alliance';
import { SessionService } from '../../core/services/session.service';

@Component({
    selector: 'app-form-user',
    templateUrl: './addUser.component.html'
})

export class AddUserComponent implements OnInit {
    public user: User;
    public roles: Role[];
    public alliances: Alliance[];

    @ViewChild('formAddUser') formAddUser: any;

    constructor(
        private _us: UserService,
        private _sa: SweetalertService,
        private _aas: ApiAlliancesService,
        private _ss: SessionService,
        private router: Router
    ) { }

    ngOnInit() {
        this.user = this._us.newUser();
        this.getRoles();
        this.getAlliances();
    }

    /**
     * 
     * @desc Submit form FormAddUser
     */
    public submitFormAddUser() {
        if (this.formAddUser.valid) {
            this.user.enabled = (this.user.enabled) ? 1 : 0;
            this.createUser();
        }
    }

    /**
     * 
     * @desc Call service to create user 
     */
    public createUser() {
        this._sa.downdloadAlert('Creando el usuario');
        //Set the username with email
        this.user.username = this.user.email;
        //Set the password with telephone
        this.user.password = this.user.phone.toString();
        //Set attr changePassword with 1 for the firts password change
        this.user.changePassword = 1;

        this.user.usrIdCreate = this._ss.getCurrentUser().id;
        this.user.usrIdUpdate = this._ss.getCurrentUser().id;
        this._aas.createUser(this.user).subscribe(
            response => {
                this._sa.successAlert();
                this.router.navigate(['/usuarios/listar']);
            },
            error => {
                this._sa.errorAlert('Error en la creación del usuario');
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
}