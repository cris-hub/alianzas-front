import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ProductService } from '../services/product.service';
import { SweetalertService } from '../../core/services/sweetalert.service';
import { ApiAlliancesService } from '../../core/services/apiAlliances.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-list-products',
    templateUrl: './listProducts.component.html'
})

export class ListProductsComponent implements OnInit {
    public product: Product;
    public productsReport: any;
    public totalProducts: number;
    public queryParams: any;
    public productName: string; 
    public productState: string;
    public page: number;
    public count: number;
    public offset: number;

    constructor(
        private _sa: SweetalertService,
        private _aas: ApiAlliancesService,
        private router: Router,
        private activeRoute: ActivatedRoute
    ) {
        this.totalProducts = 0;
    }

    ngOnInit() {
        this.queryParams = this.activeRoute.snapshot.queryParams;
        this.count = 20;
        this.page = !this.queryParams.page ? 1 : this.queryParams.page;
        this.productName = !this.queryParams.product ? '' : this.queryParams.product;
        this.productState = !this.queryParams.productState ? '' : this.queryParams.productState;
        this.getProductsReport();
    }

    /**
     * @desc Call service to get all products 
     */
    public getProductsReport() {
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
     * @desc Submit form form-product-search
     */
    public submitformSearchProducts() {
        this.router.navigate(['productos/listar'], { queryParams: { product: this.productName, productState: this.productState } });
        this.getProductsReport();
    }

    /**
     * @desc Load page
     * @param page number
     */
    public loadPage(page: number) {
        this.router.navigate(['productos/listar'], { queryParams: { page: page }, queryParamsHandling: 'merge' });
        this.getProductsReport();
    }
}
