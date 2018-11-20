import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { AllianceProduct } from '../../shared/models/allianceProduct';
import { ProductService } from '../services/product.service';
import { SweetalertService } from '../../core/services/sweetalert.service';
import { ApiAlliancesService } from '../../core/services/apiAlliances.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-list-alliance-products',
    templateUrl: './allianceProducts.component.html'
})

export class AllianceProductsComponent implements OnInit {
    public productsReport: any;
    public allianceProduct: AllianceProduct;
    public allianceProducts: AllianceProduct[];
    public ProductsSelected = [];
    public totalProducts: number;
    public queryParams: any;
    public productName: string; 
    public productState: string;
    public page: number;
    public count: number;
    public offset: number;

    constructor(
        private _ps: ProductService,
        private _sa: SweetalertService,
        private _aas: ApiAlliancesService,
        private router: Router,
        private activeRoute: ActivatedRoute
    ) {
        this.productsReport = [];
        this.allianceProduct = this._ps.newAllianceProduct();
    }

    ngOnInit() {

        this.queryParams = this.activeRoute.snapshot.queryParams;
        this.count = 20;
        this.page = !this.queryParams.page ? 1 : this.queryParams.page;
        this.productName = !this.queryParams.product ? '' : this.queryParams.product;
        this.productState = !this.queryParams.productState ? '' : this.queryParams.productState;

        this.getProducts();
        this.activeRoute.params.subscribe(params => this.allianceProduct.allianceId = params.id);
        this.getAllianceProducts(this.allianceProduct.allianceId);
    }

    /**
     * @desc Call service to update alliance products
     * @param productId product id
     * @param event create or delete relation
     */
    public updateAllianceProducts(productId, event){
        if(event.target.checked){
            this.createAllianceProduct(productId);
        }else{
            this.deleteAllianceProduct(productId);
        }
    }

    /**
     * @desc Call service to create alliance products relation
     * @param productId product id
     */
    public createAllianceProduct(productId) {
        this.allianceProduct.productId = productId;
        this._aas.createAllianceProduct(this.allianceProduct).subscribe(
            response => {

            },
            error => {
                this._sa.errorAlert("Error en la asociación del producto con la alianza");
            }
        )
    }

    /**
     * @desc Call service to delete alliance products relation
     * @param productId product id
     */
    public deleteAllianceProduct(productId) {
        this.allianceProduct.productId = productId;
        this._aas.deleteAllianceProduct(this.allianceProduct).subscribe(
            response => {

            },
            error => {
                this._sa.errorAlert('Error en la desvinculación del producto a la alianza');
            }
        )
    }

    /**
     * @desc Call service to get all products
     */
    public getProducts() {
        if(this.page){
            this.offset = (this.page - 1) * this.count;
        }else{
            this.offset = 0;
        }

        this._sa.downdloadAlert('Obteniendo los productos');
        this._aas.getProductsReport(this.productName, this.productState, this.offset.toString(), this.count.toString()).subscribe(
            response => {
                this.productsReport = response;
                this.totalProducts = this.productsReport.count;
                this._sa.closeAlert();
            },
            error => {
                this._sa.errorAlert('Error obteniendo los productos');
            }
        );
    }

    /**
     * @desc Call service to get all Alliance products
     * @param allianceId alliance id
     */
    public getAllianceProducts(allianceId: Number) {
        this._sa.downdloadAlert('Obteniendo los productos');
        this._aas.getAllianceProducts(allianceId).subscribe(
            response => {
                this.ProductsSelected = response.map(function (product) {
                    return product.id;
                });
                this._sa.closeAlert();
            },
            error => {
                this._sa.errorAlert('Error obteniendo los productos');
            }
        );
    }

    /**
     * @desc Submit form form-product-search
     * @param product product name
     * @param productState product state
     */
    public submitformSearchProducts() {
        this.getProducts();
        this.getAllianceProducts(this.allianceProduct.allianceId);
    }

    /**
     * @desc Load page
     * @param page number
     */
    public loadPage(page: number) {
        this.router.navigate(['productos/alianzas/alianza', this.allianceProduct.allianceId], { queryParams: { page: page }, queryParamsHandling: 'merge' });
        this.getProducts();
        this.getAllianceProducts(this.allianceProduct.allianceId);
    }
}
