export class Alliance {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public typId: number,
        public state: number,
        public createdAt: Date,
        public updatedAt: Date,
        public usrIdCreate: number,
        public usrIdUpdate: number
    ) {}
}