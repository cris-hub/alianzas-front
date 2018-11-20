import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../../shared/globals';
import { Affiliate } from '../../shared/models/affiliate';
import { Beneficiary } from '../../shared/models/beneficiary';
import { AffiliateService } from '../services/affiliate.service';
import { BeneficiaryService } from '../services/beneficiary.service';

@Component({
    selector: 'form-benefeciary',
    templateUrl: './addBeneficiary.component.html'
})

export class AddBeneficiaryComponent implements OnInit{

    @ViewChild('formAddBeneficiary') formAddBeneficiary: any;
    public affiliate: Affiliate;
    public beneficiary: Beneficiary;
    public typeDocuments: any;

    constructor(
        private _as: AffiliateService,
        private _bs: BeneficiaryService,
        private router: Router
    ){
        this.affiliate = this._as.getAffiliate();
        if(!this.affiliate){
            this.router.navigate(['/afiliaciones/consulta-afiliado']);
        }
    }

    ngOnInit(){
        this.typeDocuments = Globals.TYPEDOCUMENTS;
        this.beneficiary = this._bs.newBeneficiary();
        this.beneficiary.temporal = true
    }

    public submitFormAddBeneficiary(){
        if (this.formAddBeneficiary.valid) {
            this.newBeneficiary();
        }
    }

    public newBeneficiary(): void{
        debugger
        this._bs.addBeneficiary(this.beneficiary);
        this.beneficiary = this._bs.newBeneficiary();
        this.router.navigate(['afiliaciones/consulta-afiliado']);
    }
}
