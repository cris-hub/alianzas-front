import { Injectable } from '@angular/core';
import { Beneficiary } from '../../shared/models/beneficiary';

@Injectable({
    providedIn: 'root',
  })
export class BeneficiaryService {

    private beneficiaries: Beneficiary[];
    constructor(){
        this.beneficiaries = [];
    }

    /**
     * 
     * @desc Get beneficiaries object array
     */
    public getBeneficiaries(){
        debugger

        return this.beneficiaries;
    }
    
    /**
     * 
     * @desc add beneficiary object to array
     * @param beneficiary Beneficiary
     */
    public addBeneficiary(beneficiary: Beneficiary){
        this.beneficiaries.push(beneficiary);
    }

    /**
     * 
     * @desc set array benefiriaries
     * @param beneficiary Beneficiary[]
     */
    public setBeneficiaries(beneficiary: Beneficiary[]){
        this.beneficiaries = beneficiary;
    }

    /**
     * 
     * @desc clean array benefiriaries
     */
    public cleanBeneficiaries(){
        this.beneficiaries = [];
    }

    /**
     * 
     * @desc Initialize Beneficiary object
     */
    public newBeneficiary(): Beneficiary{
        return {
            name: '',
            docType: '',
            docNum: null,
            relationship: '',
        }
    }

}