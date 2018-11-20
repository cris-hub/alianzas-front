export class User {
    constructor(
        public id: number,
        public username: string,
        public password: string,
        public email: string,
        public name: string,
        public phone: number,
        public role: number,
        public alliance: number,
        public changePassword: number,
        public resetToken: string,
        public enabled: number,
        public createdAt: Date,
        public updatedAt: Date,
        public usrIdCreate: number,
        public usrIdUpdate: number
    ) {}
}