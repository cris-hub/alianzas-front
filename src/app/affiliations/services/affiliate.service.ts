import { Injectable } from '@angular/core';
import { Affiliate } from '../../shared/models/affiliate';

/*@Injectable({
    providedIn: 'root',
})*/
export class AffiliateService {
    private affiliate: Affiliate;

    /**
     * @desc set affiliate
     * @param affiliate Affiliate
     */
    public addAffiliate(affiliate: Affiliate) {
        this.affiliate = affiliate;
    }

    /**
     * @desc get affiliate object
     */
    public getAffiliate() {
        return this.affiliate;
    }

    /**
     * @desc Initialize Affiliate object
     */
    public newAffiliate(): Affiliate {
        return {
            docType: '',
            docNum: null,
            name: '',
            category: '',
            statusAffiliation: '',
            typeContribution: '',
            typeAffiliate: null,
            percentageContribution: null,
            nitCompany: '',
            businessName: '',
            retirementDate: ''
        }
    }
}