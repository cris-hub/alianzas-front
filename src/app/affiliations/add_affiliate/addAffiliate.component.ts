import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../../shared/globals'
import { UseService } from '../services/use.service';
import { AffiliateService } from '../services/affiliate.service';
import { Use } from '../../shared/models/use';
import { User } from '../../shared/models/user';
import { Product } from '../../shared/models/product';
import { ProductService } from '../../products/services/product.service';
import { SessionService } from '../../core/services/session.service';
import { SweetalertService } from '../../core/services/sweetalert.service';
import { ApiAlliancesService } from '../../core/services/apiAlliances.service';
import { Agreement } from '../../shared/models/agreement';

@Component({
    selector: 'form-affiliate',
    templateUrl: './addAffiliate.component.html',
})

export class AddAffiliateComponent implements OnInit {
    public user: User;
    public use: Use;
    public agreements: Agreement[];
    public products: Product[];
    public typeDocuments: any;
    @ViewChild('formAddAffiliate') formAddAffiliate: any;

    constructor(
        private _ss: SessionService,
        private _as: AffiliateService,
        private _sa: SweetalertService,
        private _us: UseService,
        public _ps: ProductService,
        private _aas: ApiAlliancesService,
        private router: Router
    ) {
        this.use = this._us.newUse();
    }

    ngOnInit() {
        this.typeDocuments = Globals.TYPEDOCUMENTS;
        this.user = this._ss.getCurrentUser();
        this.validateAllianceUser();
        this.getAgreements();
        this.getAllianceProducts(this.user.alliance);
    }

    public submitFormAddAffiliate(form: any) {
        if (this.formAddAffiliate.valid) {
            this.use.categoryAffiliate = 'D';
            this.use.allianceId = this.user.alliance;
            this.use.usrIdCreate = this._ss.getCurrentUser().id;
            this.use.usrIdUpdate = this._ss.getCurrentUser().id;
            this.saveUse();
        }
    }

    /**
    * @desc Call service to save use
    */
    public saveUse() {
        this._sa.downdloadAlert('Guardando uso');
        this._aas.saveUse(this.use).subscribe(
            response => {
                this._sa.successAlert("La información fue guardada correctamente");
                this.router.navigate(['/afiliaciones/consulta-afiliado']);
            },
            error => {
                this._sa.errorAlert("Error guardando la información del uso");
            }
        );
    }

    /**
    * @desc Call service to get all agreements actives
    */
    public getAgreements() {
        this._aas.getAgreements().subscribe(
            response => {
                this.agreements = response;
            },
            error => {
                this._sa.errorAlert('Error cargando los convenios');
            }
        );
    }

    /**
     * @desc Call service alliance products
     */
    public getAllianceProducts(allianceId: Number) {
        this._aas.getAllianceProducts(allianceId).subscribe(
            response => {
                this.products = response;
                if (this.products.length === 0) {
                    this._sa.warningAlert("La alianza no contiene productos relacionados, por lo cual no podrá registrar el uso.");
                }
            },
            error => {
                this._sa.errorAlert();
            }
        );
    }

    /**
     * @desc Calculate Total value
     */
    public calculateTotalValue() {
        this.use.totalValue = this.use.productUnitValue * this.use.quantity;
        this.calculateDiscountValue();
    }

    /**
     * @desc Calculate Discount value
     */
    public calculateDiscountValue() {
        this.use.discountValue = this.use.totalValue - this.use.paidValue;
    }

    /**
     * @desc Validate if the user have relation with an alliance
     */
    public validateAllianceUser(){
        if(!this.user.alliance || this.user.alliance === null){
            this._sa.warningAlert("El usuario no se encuentra asociado a ninguna alianza, por lo cual no podrá registrar el uso.")
        }
    }
    
}
