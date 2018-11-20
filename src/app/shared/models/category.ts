export class Category{
    constructor(
        public id: number,
        public name: string,
        public state: number,
        public createdAt: Date,
        public updatedAt: Date
    ){}
}