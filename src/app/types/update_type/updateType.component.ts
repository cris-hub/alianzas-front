import { Component, ViewChild } from '@angular/core';
import { Type } from '../../shared/models/type';
import { TypeService } from '../services/type.service';
import { SweetalertService } from '../../core/services/sweetalert.service';
import { ApiAlliancesService } from '../../core/services/apiAlliances.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from '../../shared/models/category';
import { SessionService } from '../../core/services/session.service';

@Component({
    selector: 'app-form-type-update',
    templateUrl: './updateType.component.html'
})

export class UpdateTypeComponent {
    public type: Type;
    public idType: number;
    public categories: Category[];
    @ViewChild('formUpdateType') formUpdateType: any;

    constructor(
        private _ts: TypeService,
        private _sa: SweetalertService,
        private _aas: ApiAlliancesService,
        private _ss: SessionService,
        private router: Router,
        private activeRoute: ActivatedRoute
    ) {
        this.type = _ts.newType();
    }

    ngOnInit() {
        this.activeRoute.params.subscribe(params => this.idType = params.id);
        this.getCategories();
        this.getTypeById(this.idType);
    }

    /**
     * @desc Submit form FormUpdateType
     */
    public submitFormUpdateType() {
        if (this.formUpdateType.valid) {
            this.type.state = (this.type.state) ? 1 : 0;
            this.updateType();
        }
    }

    /**
     * @desc Call Service to update type
     */
    public updateType() {
        this.type.usrIdUpdate = this._ss.getCurrentUser().id;
        this._sa.downdloadAlert('Actualizando la tipificación');
        this._aas.updateType(this.type).subscribe(
            response => {
                this._sa.successAlert();
                this.router.navigate(['tipificacion/listar']);
            },
            error => {
                this._sa.errorAlert('Error en la actualización de la tipificación');
            }
        )
    }

    /**
    * @desc Call Service to get type by id
    * @param id type id number
    */
    public getTypeById(id: number) {
        this._aas.getTypeById(id.toString()).subscribe(
            response => {
                this.type = response;
            },
            error => {
                this._sa.errorAlert('Error cargando la tipificación');
            }
        );
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