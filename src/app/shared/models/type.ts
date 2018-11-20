import { Category } from "./category";

export class Type{
    constructor(
        public id: number,
        public name: string,
        public catId: number,
        public state: number,
        public createdAt: Date,
        public updatedAt: Date,
        public usrIdCreate: number,
        public usrIdUpdate: number
    ){}
}