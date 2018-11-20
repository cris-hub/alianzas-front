export class Use{
    constructor(
        public allianceId: number,
        public productId: number,
        public agreementId: number,
        public description: string,
        public docTypeAffiliate: string,
        public docNumAffiliate: number,
        public nameAffiliate: string,
        public categoryAffiliate: string,
        public nitCompany: string,
        public businessName: string,
        public nameBeneficiary: string,
        public docTypeBeneficiary: string,
        public docNumBeneficiary: number,
        public relationship: string,
        public productUnitValue: number,
        public totalValue: number,
        public quantity: number,
        public discountValue: number,
        public paidValue: number,
        public createdAt: Date,
        public updatedAt: Date,
        public usrIdCreate: number,
        public usrIdUpdate: number
    ){
    }
}