import { Component, ViewChild }  from '@angular/core';
import { UseService } from '../services/use.service';
import { ProductService } from '../../products/services/product.service';
import { SessionService } from '../../core/services/session.service';
import { ApiAlliancesService } from '../../core/services/apiAlliances.service';
import { Use } from '../../shared/models/use';
import { User } from '../../shared/models/user';
import { SweetalertService } from '../../core/services/sweetalert.service';
import { Router } from '@angular/router';
import { Product } from '../../shared/models/product';

@Component({
    selector: 'app-form-use',
    templateUrl: './addUse.component.html'
})

export class AddUseComponent{
    public user: User;
    public use: Use;
    public products: Product[];

    @ViewChild('formUse') formUse: any;

    constructor(
        private _us: UseService,
        private _aas: ApiAlliancesService,
        private _sa: SweetalertService,
        private _ss: SessionService,
        public _ps: ProductService,
        private router: Router,
    ){
        this._us.validateStateUse();
        this.use = this._us.getUse();
    }

    ngOnInit() {
        this.user = this._ss.getCurrentUser();
        this.use.allianceId = this.user.alliance;
        this.validateAllianceUser();
        this.getAllianceProducts(this.user.alliance);
    }

    /**
     * @desc Submit Form use
     */
    public submitFormUse(){
        if (this.formUse.valid) {
            this.use.usrIdCreate = this._ss.getCurrentUser().id;
            this.use.usrIdUpdate = this._ss.getCurrentUser().id;
            this.saveUse();
        }
    }

    /**
     * @desc Call service to save use
     */
    public saveUse(){
        
        this._sa.downdloadAlert('Guardando uso');
        this._aas.saveUse(this.use).subscribe(
            response => {
                this._sa.successAlert("La información fue guardada correctamente");
                this.router.navigate(['afiliaciones/consulta-afiliado']);
            },
            error => {
                this._sa.errorAlert("Error guardando la información del uso");
            }
        );
    }

    /**
     * @desc Call service alliance products
     * @param allianceId ID of alliance
     */
    public getAllianceProducts(allianceId: Number) {
        if(this.user.alliance &&  this.user.alliance != null) {
            this._aas.getAllianceProducts(allianceId).subscribe(
                response => {
                    this.products = response;
                    if(this.products.length === 0 ){
                        this._sa.warningAlert("La alianza no contiene productos relacionados, por lo cual no podrá registrar el uso.");
                    }
                },
                error => {
                    this._sa.errorAlert();
                }
            );
        }
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
