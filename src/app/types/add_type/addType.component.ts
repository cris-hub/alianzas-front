import { Component, ViewChild } from '@angular/core';
import { Type } from '../../shared/models/type';
import { Category } from '../../shared/models/category';
import { TypeService } from '../services/type.service';
import { SweetalertService } from '../../core/services/sweetalert.service';
import { ApiAlliancesService } from '../../core/services/apiAlliances.service';
import { Router } from '@angular/router';
import { SessionService } from '../../core/services/session.service';

@Component({
    selector: 'app-form-type',
    templateUrl: './addtype.component.html'
})

export class AddTypeComponent {
    public type: Type;
    public categories: Category[];
    @ViewChild('formAddType') formAddType: any;

    constructor(
        private _ts: TypeService,
        private _sa: SweetalertService,
        private _aas: ApiAlliancesService,
        private _ss: SessionService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.type = this._ts.newType();
        this.getCategories();
    }

    /**
     * @desc Submit form FormAddType
     */
    public submitFormAddType() {
        if (this.formAddType.valid) {
            this.type.state = (this.type.state) ? 1 : 0;
            this.createType();
        }
    }

    /**
     * @desc Call Service to create type
     */
    public createType() {
        this.type.usrIdCreate = this._ss.getCurrentUser().id;
        this.type.usrIdUpdate = this._ss.getCurrentUser().id;
        this._sa.downdloadAlert('Guardando la información');
        this._aas.createType(this.type).subscribe(
            response => {
                this._sa.successAlert("La tipificación fue creada correctamente");
                this.router.navigate(['tipificacion/listar']);
            },
            error => {
                this._sa.errorAlert('Error al crear la tipificación');
            }
        )
    }

    /**
    * @desc Call service to get all categories
    */
    public getCategories() {
        this._aas.getCategories().subscribe(
            response => {
                this.categories = response;
            },
            error => {
                this._sa.errorAlert('Error cargando los roles');
            }
        );
    }
}