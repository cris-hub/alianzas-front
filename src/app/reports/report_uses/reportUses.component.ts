import { Component } from '@angular/core';
import { ReportUse } from '../../shared/models/reportUse';
import { ApiAlliancesService } from '../../core/services/apiAlliances.service';
import { PrinterService } from '../../core/services/printer.service';
import { SweetalertService } from '../../core/services/sweetalert.service';
import { Alliance } from '../../shared/models/alliance';
import { Type } from '../../shared/models/type';
import { ActivatedRoute } from '@angular/router';

declare var moment: any;

@Component({
    selector: 'app-report',
    templateUrl: './reportUses.component.html'
})

export class ReportUsesComponent {
    public reportUses: any;
    public reportUsesExcel: any;
    public alliances: Alliance[];
    public categories: Type[];
    public totalUses: number;
    public startDate: any;
    public finishedDate: any;
    public category: string;
    public startDateFormat: string;
    public finishedDateFormat: string;
    public page: number;
    public count: number;
    public offset: number;
    public alliancesSelected: any;

    public dropdownListAlliances = [];
    public selectedItemsAlliances = [];
    public dropdownSettingsAlliances = {};

    constructor(
        private _aas: ApiAlliancesService,
        private _ps: PrinterService,
        private _sa: SweetalertService
    ) {
        this.reportUses = [];
        this.totalUses = 0;
    }

    ngOnInit() {
        this.count = 20;
        this.category = '';
        this.initAlliances();
        this.getCategories('1');
    }

    /**
     * @desc Initializes the list and config of dropdown list of alliances
     */
    private initAlliances() {
        this.getAlliances('', '1', '');
        this.dropdownSettingsAlliances = {
            singleSelection: false,
            idField: 'id',
            textField: 'name',
            selectAllText: 'Todos',
            unSelectAllText: 'Quitar todos',
            itemsShowLimit: 3,
            allowSearchFilter: true,
            searchPlaceholderText: 'Buscar'
        };
    }

    /**
     * @desc Submit form form-search-uses
     */
    public submitformSearchUses() {
        this.startDateFormat = this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.day;
        this.finishedDateFormat = this.finishedDate.year + '-' + this.finishedDate.month + '-' + this.finishedDate.day;
        let diffDays = moment.duration(moment(this.finishedDateFormat).diff(moment(this.startDateFormat))).asDays();
        debugger
        if (diffDays < 0){
            this._sa.warningAlert("El rango de fecha no puede ser inferior a 1 dia");
        }else if(diffDays > 30){
            this._sa.warningAlert("El rango de fecha no puede ser superior a 30 dias");
        }else{
            this.alliancesSelected = this.selectedItemsAlliances.map(function (alliance) {
                return alliance.id;
            });
            this.getUses();
        }
       
    }

    /**
     * @desc Get types by category
     * @param category  category Filter 
     */
    public getCategories(category: string) {
        this._aas.getTypes(category).subscribe(
            response => {
                this.categories = response;
            },
            error => {
                this._sa.errorAlert('Error cargando las categorias');
            }
        );
    }

    /**
     * @desc Get alliances
     * @param alliance  Alliance Filter 
     * @param allianceState Alliance State Filter
     */
    public getAlliances(alliance: string, allianceState: string, allianceCategory: string) {
        this._sa.downdloadAlert('Obteniendo las alianzas');
        this._aas.getAlliances(allianceCategory).subscribe(
            response => {
                this.selectedItemsAlliances = []
                this.alliances = response;
                this._sa.closeAlert();
            },
            error => {
                this._sa.errorAlert('Error obteniendo las alianzas');
            }
        );
    }

    /**
     * @desc Get data uses with pagination
     */
    public getUses() {
        if(this.page){
            this.offset = (this.page - 1) * this.count;
        }else{
            this.offset = 0;
        }

        this._sa.downdloadAlert('Obteniendo la información');
        this._aas.getUsesReport(this.startDateFormat, this.finishedDateFormat, this.category, this.alliancesSelected.toString(),  this.offset.toString(), this.count.toString()).subscribe(
            response => {
                this.reportUses = response;
                this.totalUses = this.reportUses.count;
                this._sa.closeAlert();
            },
            error => {
                this._sa.errorAlert('Error en la consulta.')
            }
        )
    }

    /**
     * @desc Get data uses for excel
     */
    public getUsesExcel() {
        this._sa.downdloadAlert('Generando excel');
        this._aas.getUsesReport(this.startDateFormat, this.finishedDateFormat, this.category, this.alliancesSelected.toString(),  '', '').subscribe(
            response => {
                this.reportUsesExcel = response;
                this.exportExcel();
                this._sa.closeAlert();
            },
            error => {
                this._sa.errorAlert('Error en la consulta.')
            }
        )
    }

    /**
     * @desc Invoke Export Excel from PrinterService
     */
    public exportExcel(): void {
        var result = Object.assign([], this.reportUsesExcel.usesList);
        //Set header of report
        result.splice(0, 0,
            {"nameAlliance":"Nombre alianza",
            "categoryAlliance":"Categoria alianza",
            "docTypeAffiliate":"Tipo documento afiliado",
            "docNumAffiliate":"Documento afiliado",
            "nameAffiliate":"Nombre Afiliado",
            "categoryAffiliate":"Categoria Afiliado",
            "agreementName":"Convenio",
            "nitCompany":"NIT",
            "businessName":"Nombre empresa",
            "nameBeneficiary":"Nombre beneficiario",
            "docTypeBeneficiary":"Tipo de documento beneficiario",
            "docNumBeneficiary":"Numero documento beneficiario",
            "relationship":"relationship",
            "product":"Producto",
            "typeProduct":"Tipo producto",
            "description":"Descripción",
            "productUnitValue":"Valor unidad",
            "totalValue":"Valor total",
            "quantity":"Cantidad",
            "discountValue":"Descuento",
            "paidValue":"Valor pagado",
            "createdAt":"Fecha creacion"}
        );

        this._ps.exportAsExcelFile(result, 'usos');
    }

    /**
     * @desc Load page
     * @param page number
     */
    public loadPage(page: number) {
        this.getUses();
    }
}