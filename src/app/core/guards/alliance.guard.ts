import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SessionService } from "../services/session.service";
import { Session } from '../../shared/models/session';

@Injectable({ providedIn: 'root' })
export class AllianceGuard implements CanActivate {
    public session: Session;

    constructor(
        private router: Router,
        private _ss: SessionService
    ) {
        this.session = this._ss.newSession();
     }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.session.user = this._ss.getCurrentUser();
        if (this.session.user.role == 3 || this.session.user.role == 1) {
            return true;
        } else {
            return false;
        }
    }
}