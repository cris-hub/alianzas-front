import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/product';
import { SweetalertService } from '../../core/services/sweetalert.service';
import { Router } from '@angular/router';
import { AllianceProduct } from '../../shared/models/allianceProduct';

@Injectable()
export class ProductService {
    private product: Product;

    constructor(
        private _sa: SweetalertService,
        private router: Router,
    ) { }

    /**
     * @desc Initialize product object
     */
    public newProduct(): Product {
        return {
            id: null,
            name: '',
            typId: null,
            state: 1,
            createdAt: null,
            updatedAt: null,
            usrIdCreate: null,
            usrIdUpdate: null
        }
    }

    /**
     * @desc Initialize AllianceProduct object
     */
    public newAllianceProduct(): AllianceProduct {
        return {
            allianceId: null,
            productId: null
        }
    }

    /**
     * @desc Validate state product object
     */
    public validateStateProduct(){
        if(!this.product){
            this.router.navigate(['productos/listar']);
        }
    }
}
