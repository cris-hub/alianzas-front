export class Beneficiary{
    constructor(
        public name: string,
        public docType: string,
        public docNum: number,
        public relationship: string,
        public temporal? : boolean
    ){
    }
}