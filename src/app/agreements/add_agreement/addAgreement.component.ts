import { Component, ViewChild } from '@angular/core';
import { Agreement } from '../../shared/models/agreement';
import { AgreementService } from '../services/agreement.service';
import { SweetalertService } from '../../core/services/sweetalert.service';
import { ApiAlliancesService } from '../../core/services/apiAlliances.service';
import { Router } from '@angular/router';
import { SessionService } from '../../core/services/session.service';

@Component({
    selector: 'app-form-agreement',
    templateUrl: './addAgreement.component.html'
})

export class AddAgreementComponent {
    public agreement: Agreement;
    @ViewChild('formAddAgreement') formAddAgreement: any;

    constructor(
        private _as: AgreementService,
        private _sa: SweetalertService,
        private _aas: ApiAlliancesService,
        private _ss: SessionService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.agreement = this._as.newAgreement();
    }

    /**
     * @desc Submit form FormAddAgreement
     */
    public submitformAddAgreement() {
        if (this.formAddAgreement.valid) {
            this.agreement.state = (this.agreement.state) ? 1 : 0;
            this.createAgreement();
        }
    }

    /**
     * @desc Call Service to create agreement
     */
    public createAgreement() {
        this.agreement.usrIdCreate = this._ss.getCurrentUser().id;
        this.agreement.usrIdUpdate = this._ss.getCurrentUser().id;
        this._sa.downdloadAlert('Guardando la información');
        this._aas.createAgreement(this.agreement).subscribe(
            response => {
                this._sa.successAlert("El convenio fue creado correctamente");
                this.router.navigate(['convenios/listar']);
            },
            error => {
                this._sa.errorAlert('Error al crear el convenio');
            }
        )
    }
}