export class ReportUse{
    constructor(
        public nameAlliance: string,
        public categoryAlliance: string,
        public docTypeAffiliate: string,
        public docNumAffiliate: number,
        public nameAffiliate: string,
        public categoryAffiliate: string,
        public agreementName: string,
        public nitCompany: string,
        public businessName: string,
        public nameBeneficiary: string,
        public docTypeBeneficiary: string,
        public docNumBeneficiary: number,
        public relationship: string,
        public product: string,
        public typeProduct: string,
        public description: string,
        public productUnitValue: number,
        public totalValue: number,
        public quantity: number,
        public discountValue: number,
        public paidValue: number,
        public createdAt: Date,
        public updatedAt: Date
    ){
    }
}