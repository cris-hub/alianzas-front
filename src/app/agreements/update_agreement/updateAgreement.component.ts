import { Component, ViewChild } from '@angular/core';
import { Agreement } from "../../shared/models/agreement";
import { AgreementService } from '../services/agreement.service';
import { SweetalertService } from '../../core/services/sweetalert.service';
import { ApiAlliancesService } from '../../core/services/apiAlliances.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../core/services/session.service';

@Component({
    selector: 'app-form-agreement-update',
    templateUrl: './updateAgreement.component.html'
})

export class UpdateAgreementComponent {
    public agreement: Agreement;
    public idAgreement: number;
    @ViewChild('formUpdateAgreement') formUpdateAgreement: any;

    constructor(
        private _as: AgreementService,
        private _sa: SweetalertService,
        private _aas: ApiAlliancesService,
        private _ss: SessionService,
        private router: Router,
        private activeRoute: ActivatedRoute
    ) {
        this.agreement = this._as.newAgreement();
    }

    ngOnInit() {
        this.activeRoute.params.subscribe(params => this.idAgreement = params.id);
        this.getAgreementById(this.idAgreement);
    }

    /**
     * @desc Submit form FormUpdateAgreement
     */
    public submitFormUpdateAgreement() {
        if (this.formUpdateAgreement.valid) {
            this.agreement.state = (this.agreement.state) ? 1 : 0;
            this.updateAgreement();
        }
    }

    /**
    * @desc Call Service to get agreement by id
    * @param id agreement id number
    */
    public getAgreementById(id: number) {
        this._aas.getAgreementById(id.toString()).subscribe(
            response => {
                this.agreement = response;
            },
            error => {
                this._sa.errorAlert('Error cargando el convenio');
            }
        );
    }

    /**
     * @desc Call Service to update agreement
     */
    public updateAgreement() {
        this.agreement.usrIdUpdate = this._ss.getCurrentUser().id;
        this._sa.downdloadAlert('Actualizando el convenio');
        this._aas.updateAgreement(this.agreement).subscribe(
            response => {
                this._sa.successAlert();
                this.router.navigate(['convenios/listar']);
            },
            error => {
                this._sa.errorAlert('Error en la actualización del convenio');
            }
        )
    }
}