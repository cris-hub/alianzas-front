import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
    private user: User;

    constructor(
        private router: Router
    ) { }

    /**
     * @desc Get user object
     */
    public getUser(): User {
        return this.user;
    }

    /**
     * @desc Update user object
     */
    public updateUser(user: User) {
        this.user = user;
    }

    /**
     * @desc Initialize user object
     */
    public newUser(): User {
        return {
            id: null,
            username: '',
            password: '',
            email: '',
            name: '',
            phone: null,
            role: null,
            alliance: null,
            changePassword: 0,
            resetToken: '',
            enabled: 1,
            createdAt: null,
            updatedAt: null,
            usrIdCreate: null,
            usrIdUpdate: null
        }
    }

    /**
     * 
     * @desc Validate state user object
     * @param uri where will redirect
     */
    public validateStateUser(uri: string) {
        if (!this.user) {
            this.router.navigate([uri]);
        }
    }

}
