import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { Globals } from '../../shared/globals';
import { Use } from '../../shared/models/use';
import { Affiliate } from '../../shared/models/affiliate';
import { Beneficiary } from '../../shared/models/beneficiary';
import { UseService } from '../services/use.service';
import { PrinterService } from '../../core/services/printer.service';
import { AffiliateService } from '../services/affiliate.service';
import { SweetalertService } from '../../core/services/sweetalert.service';
import { BeneficiaryService } from '../services/beneficiary.service';
import { AffiliationsService } from '../services/affiliations.service';

declare var moment: any;

@Component({
    selector: 'affiliations',
    templateUrl: './consultAffiliations.component.html',
})
export class ConsultAffiliationsComponent implements OnInit, OnDestroy {

    @ViewChild('formSearch') formSearch: any;
    public affiliation: boolean;
    public benefits: boolean;
    public use: Use;
    public docNumBeneficiary: number;
    public affiliate: Affiliate;
    public affiliate$: Observable<Affiliate>;
    public beneficiaries$: Observable<Beneficiary[]>;
    public beneficiaries: Beneficiary[];
    public typeDocuments: any;
    public keepTransaction: boolean;
    public affiliateSubscription: Subscription;
    public beneficiariesSubscription: Subscription;
    public logo: string;
    public firma: string;
    public footer: string;

    constructor(
        private _us: UseService,
        private _ps: PrinterService,
        private _as: AffiliateService,
        private _sa: SweetalertService,
        private _bs: BeneficiaryService,
        private _afs: AffiliationsService,
        private router: Router
    ) {
        this.affiliate = this._as.getAffiliate();
        if (!this.affiliate) {
            this.affiliate = this._as.newAffiliate();
        }
    }

    ngOnInit() {
        this.keepTransaction = false;
        this.benefits = true;
        this.typeDocuments = Globals.TYPEDOCUMENTS;
        this.affiliation = (this.affiliate.docType != '') ? true : false;
        this.beneficiaries = this._bs.getBeneficiaries();
        this.use = this._us.newUse();
        this.convertImgPdf();
    }

    ngOnDestroy() {
        if (!this.keepTransaction) {
            this.affiliate = this._as.newAffiliate();
            this._as.addAffiliate(this.affiliate);
            this.beneficiaries = [];
            this._bs.setBeneficiaries(this.beneficiaries);
            if (this.affiliateSubscription) {
                this.affiliateSubscription.unsubscribe();
            }
            if (this.beneficiariesSubscription) {
                this.beneficiariesSubscription.unsubscribe();
            }
        }
    }

    /**
     * @desc Submit function form search
     * @param typeDocument 
     * @param document 
     */
    public submitFormSearch(typeDocument: string, document: string) {
        if (this.formSearch.valid) {
            this.benefits = true;
            this._afs.searchAffiliation(typeDocument, document);
            this.affiliate$ = this._afs.getAffiliate$();
            this.affiliateSubscription = this.affiliate$.subscribe(
                affiliate => {
                    this.affiliation = (affiliate.docType) ? true : false;
                    if (affiliate.statusAffiliation == 'RETIR') {
                        let date = moment();
                        let retirementDate = moment(affiliate.retirementDate);
                        let daysRetirement = moment.duration(date.diff(retirementDate)).asDays();
                        this.benefits = (daysRetirement <= 365) ? true : false;
                    }
                    this.affiliate = affiliate;
                    this._as.addAffiliate(this.affiliate);
                }
            );

            this.beneficiaries$ = this._afs.getBeneficiaries$();
            this.beneficiariesSubscription = this.beneficiaries$.subscribe(
                beneficiaries => {
                    debugger
                    if (!beneficiaries[0].docType || beneficiaries[0].docType == '') {
                        this.beneficiaries = [];
                    } else {
                        this.beneficiaries = beneficiaries;
                    }
                    this._bs.setBeneficiaries(this.beneficiaries);
                }
            );
        }
    }

    /**
     * @desc Update use with affiliate info
     */
    public updateUseAffiliate() {
        this.use.docTypeAffiliate = this.affiliate.docType;
        this.use.docNumAffiliate = this.affiliate.docNum;
        this.use.nameAffiliate = this.affiliate.name;
        this.use.categoryAffiliate = this.affiliate.category;
        this.use.nitCompany = this.affiliate.nitCompany;
        this.use.businessName = this.affiliate.businessName;

        this._us.updateUse(this.use);
    }

    /**
     * @desc Update use with beneficiary info
     */
    public updateUseBeneficiary() {
        if (this.docNumBeneficiary != this.affiliate.docNum) {
            let selectedBeneficiary = this.beneficiaries.filter(element => element.docNum == this.docNumBeneficiary);
            this.use.nameBeneficiary = selectedBeneficiary[0].name;
            this.use.docTypeBeneficiary = selectedBeneficiary[0].docType;
            this.use.docNumBeneficiary = selectedBeneficiary[0].docNum;
            this.use.relationship = selectedBeneficiary[0].relationship;
        } else {
            this.use.nameBeneficiary = this.affiliate.name;
            this.use.docTypeBeneficiary = this.affiliate.docType;
            this.use.docNumBeneficiary = this.affiliate.docNum;
            this.use.relationship = 'Afiliado';
        }

        this._us.updateUse(this.use);
    }

    /**
     * @desc Redirect to form for create beneficiary
     */
    public redirectCreateBeneficiary() {
        this.keepTransaction = true;
        this.router.navigate(['/afiliaciones/agregar-beneficiario']);
    }

    /**
     * @desc Redirect to form for create use and update use with affiliate and beneficiaries info
     */
    public sendUse() {
        this.keepTransaction = true;
        if (this.docNumBeneficiary) {
            this.updateUseAffiliate();
            this.updateUseBeneficiary();
            this.router.navigate(['/afiliaciones/agregar-uso']);
        } else {
            this._sa.warningAlert('Debe seleccionar un usuario para continuar');
        }
    }

    /**
     * Convert image to String
     * @param url 
     * @param callback 
     */
    public toDataURL(url, callback) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onload = function () {
            var fileReader = new FileReader();
            fileReader.onloadend = function () {
                callback(fileReader.result);
            }
            fileReader.readAsDataURL(httpRequest.response);
        };
        httpRequest.open('GET', url);
        httpRequest.responseType = 'blob';
        httpRequest.send();
    }

    /**
     * @desc Generate pfd certificate
     */
    public generateCertificate() {
        var beneficiaries = '';
        this.beneficiaries.forEach(row => {
            debugger
            beneficiaries = `${ row.name }  ${row.temporal ? '(Adjuntar documento que acredite parentesco con el afiliado), ' : ', ' } ${beneficiaries}`
            
            
        })
        var docDefinition = {
            pageMargins: [40, 188, 50, 93],
            header: [
                {
                    image: this.logo,
                    width: 600,
                    height: 78
                }
            ],
            content: [
                {
                    text: 'LA CAJA COLOMBIANA DE SUBSIDIO FAMILIAR',
                    style: ['content', 'head'],
                    margin: [0, 0, 0, 10]
                },
                {
                    text: 'COLSUBSIDIO',
                    style: ['content', 'head'],
                    margin: [0, 0, 0, 35]
                },
                {
                    text: 'HACE CONSTAR:',
                    style: ['content', 'head'],
                    margin: [0, 0, 0, 90]
                },
                {
                    text: 'Que el (la) señor(a) ' + this.affiliate.name + ' identificado(a) con ' + this.affiliate.docType + ' No.'
                        + this.affiliate.docNum + ', se encuentra afiliado(a) a esta Caja de Compensación Familiar, a través de'
                        + ' a través de ' + this.affiliate.businessName + ' con NIT. ' + this.affiliate.nitCompany + '.',
                    style: ['content', 'body'],
                    margin: [20, 0, 0, 37]
                },
                {
                    text: 'En su grupo familiar figura(n) el(los) siguiente(s) registro(s) ' + beneficiaries.slice(0, -2) + ' como beneficiario(s) de la cuota monetaria',
                    style: ['content', 'body'],
                    margin: [20, 0, 0, 70]
                },
                {
                    image: this.firma,
                    style: ['head'],
                    width: 120
                },
                {
                    text: 'JOSE BOCANEGRA',
                    style: ['content', 'head'],
                },
                {
                    text: 'Jefe de operaciones Sección de afiliaciones',
                    style: ['content', 'head'],
                },
                {
                    text: 'Departamento de Administración de afiliados',
                    style: ['content', 'head'],
                    margin: [0, 0, 0, 45]
                },
                {
                    text: 'Bogotá D.C.' + new Date().getDate() + '/' + (new Date().getMonth()+1)+ '/' + new Date().getFullYear(),
                    style: ['content'],
                },
            ],
            footer: [
                {
                    image: this.footer,
                    width: 560,
                    height: 40,
                    margin: [20, 0, 20, 0]
                },
                {
                    text: 'Calle 26 # 25-50 Conmutador 742 0100 - Fax 340 2690 - A.A. 8573 Audioservicios Colsubsidio: 745 0999 Bogotá, D.C. www.',
                    margin: [20, 0, 20, 0],
                    fontSize: 10,
                },
            ],

            styles: {
                content: {
                    fontSize: 10.5,
                },
                body: {
                    alignment: 'justified'
                },
                head: {
                    alignment: 'center'
                }
            }
        };
        this._ps.pdfMake.createPdf(docDefinition).download();
    }

    /**
     * @desc Convert images to string base 64
     */
    public convertImgPdf() {
        this.toDataURL('../assets/img/headerpdf.jpeg', dataUrl => {
            this.logo = dataUrl;
        });
        this.toDataURL('../assets/img/firma.jpeg', dataUrl => {
            this.firma = dataUrl;
        });
        this.toDataURL('../assets/img/footerpdf.jpeg', dataUrl => {
            this.footer = dataUrl;
        });
    }

}