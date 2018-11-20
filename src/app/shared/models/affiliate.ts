export class Affiliate{
    constructor(
        public docType: string,
        public docNum: number,
        public name: string,
        public category: string,
        public statusAffiliation: string,
        public typeContribution: string,
        public typeAffiliate:string,
        public percentageContribution: number,
        public nitCompany: string,
        public businessName: string,
        public retirementDate: string
    ){}
}