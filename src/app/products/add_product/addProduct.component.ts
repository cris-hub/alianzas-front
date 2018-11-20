import { Component, ViewChild } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ProductService } from '../services/product.service';
import { SweetalertService } from '../../core/services/sweetalert.service';
import { ApiAlliancesService } from '../../core/services/apiAlliances.service';
import { Router } from '@angular/router';
import { Type } from '../../shared/models/type';
import { SessionService } from '../../core/services/session.service';

@Component({
    selector: 'app-form-product',
    templateUrl: './addProduct.component.html'
})

export class AddProductComponent {
    public product: Product;
    public types: Type[];
    @ViewChild('formAddProduct') formAddProduct: any;

    constructor(
        private _ps: ProductService,
        private _sa: SweetalertService,
        private _aas: ApiAlliancesService,
        private _ss: SessionService,
        private router: Router,
    ) {
        this._ps.newProduct();
    }

    ngOnInit() {
        this.product = this._ps.newProduct();
        this.getTypesProduct('2');
    }

    /**
     * @desc Submit form FormAddProduct 
     */
    public submitFormAddProduct() {
        if (this.formAddProduct.valid) {
            this.product.state = (this.product.state) ? 1 : 0;
            this.createProduct();
        }
    }

    /**
     * @desc Call Service to create product
     */
    public createProduct() {
        this.product.usrIdCreate = this._ss.getCurrentUser().id;
        this.product.usrIdUpdate = this._ss.getCurrentUser().id;
        this._sa.downdloadAlert('Guardando la información del producto');
        this._aas.createProduct(this.product).subscribe(
            response => {
                this._sa.successAlert("El producto fue creado correctamente");
                this.router.navigate(['/productos/listar']);
            },
            error => {
                this._sa.errorAlert('Error al crear el producto');
            }
        )
    }

    /**
    * @desc Call Service to get types of products
    */
    public getTypesProduct(category: string) {
        this._aas.getTypes(category).subscribe(
            response => {
                this.types = response;
            },
            error => {
                this._sa.errorAlert('Error cargando la tipificación');
            }
        );
    }
}