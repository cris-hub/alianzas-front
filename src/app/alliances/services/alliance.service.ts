import { Injectable } from '@angular/core';
import { Alliance } from '../../shared/models/alliance';
import { Type } from '../../shared/models/type';
import { SweetalertService } from '../../core/services/sweetalert.service';
import { ApiAlliancesService } from '../../core/services/apiAlliances.service';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AllianceService {
    private alliance: Alliance;
    private alliances$ = new Subject<Alliance[]>();
    private types$ = new Subject<Type[]>();
    private categories$ = new Subject<Type[]>();

    constructor(
        private _sa: SweetalertService,
        private _aas: ApiAlliancesService,
        private router: Router,
    ) { }

    /**
     * 
     * @desc Get alliance object
     */
    public getAlliance(): Alliance {
        return this.alliance;
    }

    /**
     * 
     * @desc Update alliance object
     */
    public updateAlliance(alliance: Alliance) {
        this.alliance = alliance;
    }

    /**
     * 
     * @desc Initialize alliance object
     */
    public newAlliance(): Alliance {
        return {
            id: null,
            name: '',
            description: '',
            typId: 0,
            state: 1,
            createdAt: null,
            updatedAt: null,
            usrIdCreate: null,
            usrIdUpdate: null
        }
    }

    /**
     * GET alliances service
     */
    public getAlliancesService(allianceCategory: string) {
        this._sa.downdloadAlert('Obteniendo las alianzas');
        this._aas.getAlliances(allianceCategory).subscribe(
            response => {
                this.alliances$.next(response);
                this._sa.closeAlert();
            },
            error => {
                this._sa.errorAlert('Error obteniendo las alianzas');
            }
        );
    }

    /**
    * GET categories service
    */
    public getCategoriesService(category: string) {
        this._aas.getTypes(category).subscribe(
            response => {
                this.categories$.next(response);
            },
            error => {
                this._sa.errorAlert('Error cargando las categorias');
            }
        );
    }

    /**
    * GET types service
    */
    public getTypesService(category: string) {
        this._aas.getTypes(category).subscribe(
            response => {
                this.types$.next(response);
            },
            error => {
                this._sa.errorAlert('Error cargando los tipos');
            }
        );
    }

    public getAlliances$(allianceCategory: string): Observable<Alliance[]> {
        this.getAlliancesService(allianceCategory);
        return this.alliances$.asObservable();
    }

    public getCategories$(category: string): Observable<Type[]> {
        this.getCategoriesService(category);
        return this.categories$.asObservable();
    }

    public getTypes$(category: string): Observable<Type[]> {
        this.getTypesService(category);
        return this.types$.asObservable();
    }

    public validateStateAlliance() {
        if (!this.alliance) {
            this.router.navigate(['alianzas/listar']);
        }
    }
}
