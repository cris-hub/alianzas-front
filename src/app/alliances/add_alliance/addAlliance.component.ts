import { Component, ViewChild } from '@angular/core';
import { Alliance } from '../../shared/models/alliance';
import { Type } from '../../shared/models/type';
import { AllianceService } from '../services/alliance.service';
import { Observable} from 'rxjs';
import { SweetalertService } from '../../core/services/sweetalert.service';
import { ApiAlliancesService } from '../../core/services/apiAlliances.service';
import { Router } from '@angular/router';
import { SessionService } from '../../core/services/session.service';

@Component({
    selector: 'app-form-alliance',
    templateUrl: './addAlliance.component.html'
})

export class AddAllianceComponent {
    public alliance: Alliance;
    public categories$: Observable<Type[]>;
    public categories: Type[];
    @ViewChild('formAddAlliance') formAddAlliance: any;

    constructor(
        private _as: AllianceService,
        private _sa: SweetalertService,
        private _aas: ApiAlliancesService,
        private _ss: SessionService,
        private router: Router,
    ) {}

    ngOnInit() {
        this.alliance = this._as.newAlliance();
        this.categories$ = this._as.getCategories$('1');
        this.categories$.subscribe(types => this.categories = types);
    }

    /**
     * @desc Submit form FormAddAlliance
     */
    public submitFormAddAlliance() {
        if (this.formAddAlliance.valid) {
            this.alliance.state = (this.alliance.state) ? 1 : 0;
            this.createAlliance(this.alliance);
        }
    }

    /**
     * @desc Use Service to create alliance
     * @param alliance object
     */
    public createAlliance(alliance: Alliance) {
        this.alliance.usrIdCreate = this._ss.getCurrentUser().id;
        this.alliance.usrIdUpdate = this._ss.getCurrentUser().id;
        this._sa.downdloadAlert('Guardando la alianza');
        this._aas.createAlliance(alliance).subscribe(
            response => {
                this._sa.successAlert();
                this.router.navigate(['/alianzas/listar']);
            },
            error => {
                this._sa.errorAlert('Error en el guardado de la alianza');
            }
        )
    }
}