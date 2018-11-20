import { Component, OnInit } from '@angular/core';
import { Alliance } from '../../shared/models/alliance';
import { Router, ActivatedRoute } from '@angular/router';
import { SweetalertService } from '../../core/services/sweetalert.service';
import { ApiAlliancesService } from '../../core/services/apiAlliances.service';

@Component({
    selector: 'app-list-alliances',
    templateUrl: './listAlliances.component.html'
})

export class ListAlliancesComponent implements OnInit {
    public alliance: Alliance;
    public alliancesReport: any;
    public totalAlliances: number;
    public queryParams: any;
    public alliancesName: string; 
    public alliancesState: string;
    public alliancesCategory: string;
    public page: number;
    public count: number;
    public offset: number;

    constructor(
        private _sa: SweetalertService,
        private _aas: ApiAlliancesService,
        private router: Router,
        private activeRoute: ActivatedRoute
    ) {
        this.totalAlliances = 0;
    }

    ngOnInit() {
        this.queryParams = this.activeRoute.snapshot.queryParams;
        this.count = 20;
        this.page = !this.queryParams.page ? 1 : this.queryParams.page;
        this.alliancesName = !this.queryParams.alliance ? '' : this.queryParams.alliance;
        this.alliancesState = !this.queryParams.alliancesState ? '1' : this.queryParams.alliancesState;
        this.alliancesCategory = '';
        this.getAlliances();
    }

    /**
     * @desc Call service to get all Alliances 
     */
    public getAlliances() {
        if(this.page){
            this.offset = (this.page - 1) * this.count;
        }else{
            this.offset = 0;
        }
        this._sa.downdloadAlert('Obteniendo las alianzas');
        this._aas.getAlliancesReport(this.alliancesName, this.alliancesState, this.alliancesCategory, this.offset.toString(), this.count.toString()).subscribe(
            response => {
                this.alliancesReport = response;
                this.totalAlliances = this.alliancesReport.count;
                this._sa.closeAlert();
            },
            error => {
                this._sa.errorAlert('Error obteniendo las alianzas');
            }
        );
    }

    /**
     * @desc Submit form form-alliance-search
     */
    public submitformSearchAlliances() {
        this.router.navigate(['alianzas/listar'], { queryParams: { alliance: this.alliancesName, alliancesState: this.alliancesState } });
        this.getAlliances();
    }

    /**
     * @desc Load page
     * @param page number
     */
    public loadPage(page: number) {
        this.router.navigate(['alianzas/listar'], { queryParams: { page: page }, queryParamsHandling: 'merge' });
        this.getAlliances();
    }
}
