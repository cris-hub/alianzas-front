import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user';
import { Role } from '../../shared/models/role';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiAlliancesService } from '../../core/services/apiAlliances.service';
import { SweetalertService } from '../../core/services/sweetalert.service';

@Component({
    selector: 'app-list-users',
    templateUrl: './listUsers.component.html'
})

export class ListUsersComponent implements OnInit {
    public user: User;
    public reportUsers: any;
    public roles: Role[];
    public totalUsers: number;
    public queryParams: any;
    public username: string; 
    public name: string;
    public userState: string;
    public userRole: string;
    public page: number;
    public count: number;
    public offset: number;

    constructor(
        private _aas: ApiAlliancesService,
        private _sa: SweetalertService,
        private router: Router,
        private activeRoute: ActivatedRoute
    ) {
        this.totalUsers = 0;
    }

    ngOnInit() {
        this.queryParams = this.activeRoute.snapshot.queryParams;
        this.count = 20;
        this.page = !this.queryParams.page ? 1 : this.queryParams.page;
        this.username = !this.queryParams.username ? '' : this.queryParams.username;
        this.name = !this.queryParams.name ? '' : this.queryParams.name;
        this.userState = !this.queryParams.userState ? '' : this.queryParams.userState;
        this.userRole = !this.queryParams.userRole ? '' : this.queryParams.userRole;
        this.getRoles();
        this.getUsers();
    }

    /**
     * @desc Call service to get all Users 
     */
    public getUsers() {
        if(this.page){
            this.offset = (this.page - 1) * this.count;
        }else{
            this.offset = 0;
        }
        this._sa.downdloadAlert('Obteniendo los usuarios');
        this._aas.getUsers(this.username, this.name, this.userState, this.userRole, this.offset.toString(), this.count.toString()).subscribe(
            response => {
                this.reportUsers = response;
                this.totalUsers = this.reportUsers.count;
                this._sa.closeAlert();
            },
            error => {
                this._sa.errorAlert('Error obteniendo los usuarios');
            }
        );
    }

    /**
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
     * @desc Submit form form-users-search
     */
    public submitformSearchUsers() {
        this.router.navigate(['usuarios/listar'], { queryParams: { username: this.username, name: this.name, userState: this.userState, userRole: this.userRole } });
        this.getUsers();
    }

    /**
     * @desc Load page
     * @param page number
     */
    public loadPage(page: number) {
        this.router.navigate(['usuarios/listar'], { queryParams: { page: page }, queryParamsHandling: 'merge' });
        this.getUsers();
    }

}
