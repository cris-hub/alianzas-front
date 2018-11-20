import { Injectable } from '@angular/core';
import { Agreement } from "../../shared/models/agreement";
import { ApiAlliancesService } from '../../core/services/apiAlliances.service';
import { Router } from '@angular/router';

@Injectable()
export class AgreementService {
    private agreement: Agreement;

    constructor(
        private _aas: ApiAlliancesService,
        private router: Router,
    ) { }

    /**
     * @desc Initialize Agreement object
     */
    public newAgreement(): Agreement {
        return {
            id: null,
            name: '',
            state: 1,
            createdAt: null,
            updatedAt: null,
            usrIdCreate: null,
            usrIdUpdate: null
        }
    }
}
