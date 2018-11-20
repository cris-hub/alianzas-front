import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SessionService } from "../services/session.service";

@Injectable({ providedIn: 'root' })
export class PasswordGuard implements CanActivate {

    constructor(
        private router: Router,
        private _ss: SessionService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this._ss.isChangePassword()) {
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/password']);
        return false;
    }
}