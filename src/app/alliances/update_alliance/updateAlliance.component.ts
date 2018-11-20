import { Component, ViewChild } from '@angular/core';
import { Alliance } from '../../shared/models/alliance';
import { AllianceService } from '../services/alliance.service';
import { Type } from '../../shared/models/type';
import { Observable } from 'rxjs';
import { SweetalertService } from '../../core/services/sweetalert.service';
import { ApiAlliancesService } from '../../core/services/apiAlliances.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../core/services/session.service';

@Component({
    selector: 'app-form-alliance',
    templateUrl: './updateAlliance.component.html'
})

export class UpdateAllianceComponent {
    public alliance: Alliance;
    public allianceId: number;
    public categories$: Observable<Type[]>;
    public categories: Type[];
    @ViewChild('formUpdateAlliance') formUpdateAlliance: any;

    constructor(
        private _as: AllianceService,
        private _sa: SweetalertService,
        private _aas: ApiAlliancesService,
        private _ss: SessionService,
        private activeRoute: ActivatedRoute,
        private router: Router,
    ) {
        this.alliance = _as.newAlliance();
    }

    ngOnInit() {
        this.activeRoute.params.subscribe(params => this.allianceId = params.id);
        this.getAllianceById(this.allianceId);
        this.categories$ = this._as.getCategories$('1');
        this.categories$.subscribe(types => this.categories = types);
    }

    /**
     * @desc Submit form FormUpdateAlliance
     */
    public submitFormUpdateAlliance() {
        if (this.formUpdateAlliance.valid) {
            this.alliance.state = (this.alliance.state) ? 1 : 0;
            this.updateAlliance(this.alliance);
        }
    }

    /**
    * @desc Call Service to get alliance by id
    * @param id type id number
    */
    public getAllianceById(id: number) {
        this._aas.getAllianceById(id.toString()).subscribe(
            response => {
                this.alliance = response;
            },
            error => {
                this._sa.errorAlert('Error cargando la tipificación');
            }
        );
    }

    /**
     * @desc Use Service to update alliance
     * @param alliance object
     */
    public updateAlliance(alliance: Alliance) {
        this.alliance.usrIdUpdate = this._ss.getCurrentUser().id;
        this._sa.downdloadAlert('Actualizando la alianza');
        this._aas.updateAlliance(alliance).subscribe(
            response => {
                this._sa.successAlert();
                this.router.navigate(['/alianzas/listar']);
            },
            error => {
                this._sa.errorAlert('Error en la actualización de la alianza');
            }
        )
    }
}