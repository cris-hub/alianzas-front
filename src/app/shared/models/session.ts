import { User } from './user';

export class Session {
    constructor(
        public token: string,
        public refreshToken: string,
        public user: User){
    }
}