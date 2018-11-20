import { Component, OnInit } from '@angular/core';
import { Agreement } from '../../shared/models/agreement';
import { AgreementService } from '../services/agreement.service';
import { SweetalertService } from '../../core/services/sweetalert.service';
import { ApiAlliancesService } from '../../core/services/apiAlliances.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-list-agreements',
    templateUrl: './listAgreements.component.html'
})

export class ListAgreementsComponent implements OnInit {
    public agreement: Agreement;
    public agreementsReport: any;
    public totalAgreements: number;
    public queryParams: any;
    public agreementName: string; 
    public agreementState: string;
    public page: number;
    public count: number;
    public offset: number;

    constructor(
        private _as: AgreementService,
        private _sa: SweetalertService,
        private _aas: ApiAlliancesService,
        private router: Router,
        private activeRoute: ActivatedRoute
    ) {
        this.totalAgreements = 0;
    }

    ngOnInit() {
        this.queryParams = this.activeRoute.snapshot.queryParams;
        this.count = 20;
        this.page = !this.queryParams.page ? 1 : this.queryParams.page;
        this.agreementName = !this.queryParams.agreement ? '' : this.queryParams.agreement;
        this.agreementState = !this.queryParams.agreementState ? '' : this.queryParams.agreementState;
        this.getAgreementsReport();
    }

    /**
     * @desc Call service to get all agreements report
     */
    public getAgreementsReport() {
        if(this.page){
            this.offset = (this.page - 1) * this.count;
        }else{
            this.offset = 0;
        }
        this._sa.downdloadAlert('Obteniendo los convenios');
        this._aas.getAgreementsReport(this.agreementName, this.agreementState, this.offset.toString(), this.count.toString()).subscribe(
            response => {
                this.agreementsReport = response;
                this.totalAgreements = this.agreementsReport.count;
                this._sa.closeAlert();
            },
            error => {
                this._sa.errorAlert('Error obteniendo los convenios');
            }
        );
    }

    /**
     * @desc Submit form form-agreement-search
     */
    public submitformSearchAgreements() {
        this.router.navigate(['convenios/listar'], { queryParams: { agreement: this.agreementName, agreementState: this.agreementState } });
        this.getAgreementsReport();
    }

    /**
     * @desc Load page
     * @param page number
     */
    public loadPage(page: number) {
        this.router.navigate(['convenios/listar'], { queryParams: { page: page }, queryParamsHandling: 'merge' });
        this.getAgreementsReport();
    }
}
