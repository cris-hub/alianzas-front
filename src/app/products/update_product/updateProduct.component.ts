import { Component, ViewChild } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ProductService } from '../services/product.service';
import { SweetalertService } from '../../core/services/sweetalert.service';
import { ApiAlliancesService } from '../../core/services/apiAlliances.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Type } from '../../shared/models/type';
import { SessionService } from '../../core/services/session.service';

@Component({
    selector: 'app-form-product-update',
    templateUrl: './updateProduct.component.html'
})

export class UpdateProductComponent {
    public idProduct: number;
    public product: Product;
    public types: Type[];
    @ViewChild('formUpdateProduct') formUpdateProduct: any;

    constructor(
        private _ps: ProductService,
        private _sa: SweetalertService,
        private _aas: ApiAlliancesService,
        private _ss: SessionService,
        private router: Router,
        private activeRoute: ActivatedRoute
    ) {
        this.product = this._ps.newProduct();
    }

    ngOnInit() {
        this.activeRoute.params.subscribe(params => this.idProduct = params.id);
        this.getTypesProduct('2');
        this.getProductById(this.idProduct);
    }

    /**
     * @desc Submit form FormUpdateProduct 
     */
    public submitFormUpdateProduct() {
        if (this.formUpdateProduct.valid) {
            this.product.state = (this.product.state) ? 1 : 0;
            this.updateProduct();
        }
    }

    /**
     * @desc Call Service to update product
     */
    public updateProduct() {
        this.product.usrIdUpdate = this._ss.getCurrentUser().id;
        this._sa.downdloadAlert('Actualizando el producto');
        this._aas.updateProduct(this.product).subscribe(
            response => {
                this._sa.successAlert();
                this.router.navigate(['/productos/listar']);
            },
            error => {
                this._sa.errorAlert('Error en la actualización del producto');
            }
        )
    }

    /**
    * @desc Call Service to get product by id
    * @param id product id number
    */
    public getProductById(id: number) {
        this._aas.getProductById(id.toString()).subscribe(
            response => {
                this.product = response;
            },
            error => {
                this._sa.errorAlert('Error cargando la tipificación');
            }
        );
    }

    /**
    * @desc Call Service to get types of products
    * @param category string
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