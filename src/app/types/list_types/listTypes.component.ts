import { Component, OnInit } from '@angular/core';
import { Type } from '../../shared/models/type';
import { TypeService } from '../services/type.service';
import { SweetalertService } from '../../core/services/sweetalert.service';
import { ApiAlliancesService } from '../../core/services/apiAlliances.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from '../../shared/models/category';

@Component({
    selector: 'app-list-types',
    templateUrl: './listTypes.component.html'
})

export class ListTypesComponent implements OnInit {
    public type: Type;
    public typesReport: any;
    public categories: Category[];
    public totalTypes: number;
    public queryParams: any;
    public typesName: string; 
    public typesState: string;
    public typesCategory: string;
    public page: number;
    public count: number;
    public offset: number;

    constructor(
        private _ts: TypeService,
        private _sa: SweetalertService,
        private _aas: ApiAlliancesService,
        private router: Router,
        private activeRoute: ActivatedRoute
    ) {
        this.totalTypes = 0;
    }

    ngOnInit() {
        this.queryParams = this.activeRoute.snapshot.queryParams;
        this.count = 20;
        this.page = !this.queryParams.page ? 1 : this.queryParams.page;
        this.typesName = !this.queryParams.type ? '' : this.queryParams.type;
        this.typesState = !this.queryParams.typesState ? '' : this.queryParams.typesState;
        this.typesCategory = !this.queryParams.typesCategory ? '' : this.queryParams.typesCategory;
        this.getCategories();
        this.getTypesReport();
    }

    /**
     * @desc Call service to get report types
     */
    public getTypesReport() {
        if(this.page){
            this.offset = (this.page - 1) * this.count;
        }else{
            this.offset = 0;
        }
        this._sa.downdloadAlert('Obteniendo las tipificaciones');
        this._aas.getTypesReport(this.typesName, this.typesState, this.typesCategory, this.offset.toString(), this.count.toString()).subscribe(
            response => {
                this.typesReport = response;
                this.totalTypes = this.typesReport.count;
                this._sa.closeAlert();
            },
            error => {
                this._sa.errorAlert('Error obteniendo las tipificaciones');
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

    /**
     * @desc Submit form form-type-search
     */
    public submitformSearchTypes() {
        this.router.navigate(['tipificacion/listar'], { queryParams: { type: this.typesName, typesState: this.typesState, typesCategory: this.typesState } });
        this.getTypesReport();
    }

    /**
     * @desc Load page
     * @param page number
     */
    public loadPage(page: number) {
        this.router.navigate(['tipificacion/listar'], { queryParams: { page: page }, queryParamsHandling: 'merge' });
        this.getTypesReport();
    }
}
