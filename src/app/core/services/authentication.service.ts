import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private url;

    constructor(private _http: Http) {
        this.conectionConfig();
    }

    //Config conection services
    private conectionConfig(): void {
        this.url = environment.apiAlliancesUrl;
    }

    login(username: string, password: string) {
        return this._http.post(this.url + 'login', { username, password }).pipe(map(res => res));
    }
}