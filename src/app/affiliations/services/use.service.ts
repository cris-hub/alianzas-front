import { Injectable } from '@angular/core';
import { Use } from '../../shared/models/use';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
  })
export class UseService {
    private use: Use;
    private uses: Use[];

    constructor(private router: Router) {}

    /**
     * @desc Get use array object
     */
    public getUses(){
        return this.uses;
    }

    /**
     * @desc Set use array object
     */
    public setUses(uses: Use[]){
        this.uses = uses;
    }

    /**
     * @desc Get use object
     */
    public getUse(): Use {
        return this.use;
    }

    /**
     * @desc Update use object
     */
    public updateUse(use: Use) {
        this.use = use;
    }

    /**
     * @desc Initialize use object
     */
    public newUse(): Use {
        return {
            allianceId: null,
            productId: null,
            agreementId: null,
            description: '',
            docTypeAffiliate: '',
            docNumAffiliate: null,
            nameAffiliate: '',
            categoryAffiliate: '',
            nitCompany: '',
            businessName: '',
            nameBeneficiary: '',
            docTypeBeneficiary: '',
            docNumBeneficiary: null,
            relationship: '',
            productUnitValue: null,
            totalValue:null,
            quantity: null,
            discountValue: null,
            paidValue: null,
            createdAt: null,
            updatedAt: null,
            usrIdCreate: null,
            usrIdUpdate: null
        }
    }

    public validateStateUse(){
        if(!this.use){
            this.router.navigate(['/afiliaciones/consulta-afiliado']);
        }
    }
}