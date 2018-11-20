import { Injectable } from '@angular/core';
import { Affiliate } from '../../shared/models/affiliate';
import { Beneficiary } from '../../shared/models/beneficiary';
import { AffiliateService } from '../services/affiliate.service';
import { BeneficiaryService } from '../services/beneficiary.service';
import { ApiColsubsidioService } from '../services/apiColsubsidio.service';
import { SweetalertService } from '../../core/services/sweetalert.service';
import { Observable, Subject } from 'rxjs';
import { Globals } from '../../shared/globals';

@Injectable({
    providedIn: 'root',
})
export class AffiliationsService {
    private affiliate: Affiliate;
    private affiliate$ = new Subject<Affiliate>();
    private beneficiary: Beneficiary;
    private beneficiaries: Beneficiary[];
    private beneficiaries$ = new Subject<Beneficiary[]>();

    constructor(
        private _as: AffiliateService,
        private _bs: BeneficiaryService,
        private _acs: ApiColsubsidioService,
        private _sa: SweetalertService
    ) {
        this.affiliate = this._as.newAffiliate();
        this.beneficiary = this._bs.newBeneficiary();
    }
    
    /**
     * @desc Search affiliation info 
     * @param typeDocument 
     * @param document 
     */
    public searchAffiliation(typeDocument: string, document: string): any {
        this.beneficiaries = [];
        this._sa.downdloadAlert("Buscando información del afiliado");
        this._acs.getAffiliation(typeDocument, document).subscribe(
            response => {
                let infoAffiliate = response.data[0].afiliado;
                let infoCompany = response.data[0].afiliado.empleadores.companias[0];
                let beneficiaries = response.data[0].afiliado.pacs;
                //Parce Affiliate info
                this.affiliate.docType = this.findDocType(this.cleanInfo(infoAffiliate.tipoDocumento));
                this.affiliate.docNum = this.cleanInfo(infoAffiliate.numeroDocumento);
                this.affiliate.name = this.cleanInfo(infoAffiliate.primerNombre) + ' ' + this.cleanInfo(infoAffiliate.segundoNombre) + ' ' + this.cleanInfo(infoAffiliate.primerApellido) + ' ' + this.cleanInfo(infoAffiliate.segundoApellido);
                this.affiliate.category = this.cleanInfo(infoAffiliate.afiliacion.categoria);
                this.affiliate.typeContribution = this.cleanInfo(infoAffiliate.typeContribution);
                this.affiliate.businessName = this.cleanInfo(infoCompany.nombre);
                this.affiliate.percentageContribution = this.cleanInfo(infoAffiliate.afiliacion.categoria);
                this.affiliate.statusAffiliation = this.cleanInfo(infoAffiliate.estado);
                this.affiliate.typeContribution = this.cleanInfo(infoAffiliate.afiliacion.tipoSalario);
                this.affiliate.nitCompany = this.cleanInfo(infoCompany.numberoDocumento);
                this.affiliate.retirementDate = this.cleanInfo(infoAffiliate.afiliacion.fechaRetiro);
                this.affiliate.typeAffiliate = this.findTypeAffiliate(this.cleanInfo(infoAffiliate.afiliacion.tipoTrabajador));

                beneficiaries.forEach(element => {
                    var beneficiary: any = {};
                    beneficiary.name = this.cleanInfo(element.primerNombre) + ' ' + this.cleanInfo(element.segundoNombre) + ' ' + this.cleanInfo(element.primerApellido) + ' ' + this.cleanInfo(element.segundoApellido);
                    beneficiary.docNum = this.cleanInfo(element.numeroDocumento);
                    beneficiary.docType = this.findDocType(this.cleanInfo(element.tipoDocumento));
                    beneficiary.relationship = this.cleanInfo(element.relacion.descripcion);
                    this.beneficiaries.push(beneficiary);
                });

                this.affiliate$.next(this.affiliate);
                this.beneficiaries$.next(this.beneficiaries);
                this._sa.closeAlert();
            },
            error => {
                this._sa.errorAlert('Error en el servicio de consulta de afiliación');
            }
        )
    }

    /**
    * @desc Clean info if coming with incorrect info
    * @param value 
    */
    public cleanInfo(value) {
        let patterns = ['null', null]
        if (!value || patterns.includes(value)) {
            value = '';
        }
        return value;
    }

    /**
     * @desc Conversion document type
     * @param value 
     */
    public findDocType(value) {
        if (value == '') {
            return '';
        }

        let typeDocuments = Globals.TYPEDOCUMENTS;
        var typeDocument = typeDocuments.filter(function (item) {
            return item.codeTypeDocument == value;
        })[0];
        return typeDocument.typeDocument;
    }

    /**
     * @desc Conversion types Affiliates
     * @param value 
     */
    public findTypeAffiliate(value) {
        if (value == '') {
            return '';
        }

        let typesAffiliates = Globals.TYPESAFIL;
        var typeAffiliate = typesAffiliates.filter(function (item) {
            return item.code == value;
        })[0];
        return typeAffiliate.denomination;
    }

    /**
     * @desc Observable get affiliate info
     */
    public getAffiliate$(): Observable<Affiliate> {
        return this.affiliate$.asObservable();
    }

    /**
     * @desc Observable get beneficiaries info
     */
    public getBeneficiaries$(): Observable<Beneficiary[]> {
        return this.beneficiaries$.asObservable();
    }

}