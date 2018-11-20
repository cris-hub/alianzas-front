import { Injectable } from '@angular/core';
import { Type } from '../../shared/models/type';
import { Router } from '@angular/router';

@Injectable()
export class TypeService {
    private type: Type;

    constructor(
        private router: Router,
    ) { }

    /**
     * @desc Initialize type object
     */
    public newType(): Type {
        return {
            id: null,
            name: '',
            catId: null,
            state: 1,
            createdAt: null,
            updatedAt: null,
            usrIdCreate: null,
            usrIdUpdate: null
        }
    }
}
