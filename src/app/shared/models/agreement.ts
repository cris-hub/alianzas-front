export class Agreement{
    constructor(
        public id: number,
        public name: string,
        public state: number,
        public createdAt: Date,
        public updatedAt: Date,
        public usrIdCreate: number,
        public usrIdUpdate: number
    ){}
}