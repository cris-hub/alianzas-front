import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpBackend, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { AppConfig } from 'src/app/app.config';

@Injectable()
export class ApiColsubsidioService {
    private url;

    constructor(private _http: HttpClient, handler: HttpBackend,private config : AppConfig) {
        Object.assign(environment,this.config.getAllConfig);
        this.conectionConfig();
        this._http = new HttpClient(handler);
    }

    /**
     * 
     * @desc Config conection services
     */
    private conectionConfig(): void {
        this.url = environment.apiGeeColsubsidioUrl;
    }

    /**
     * 
     * @desc Get info affiliation
     * @param typeDocument 
     * @param document 
     */
    public getAffiliation(typeDocument: string, document: string) {
        let params = new HttpParams(); 
        let headers = new HttpHeaders();
        headers = headers.set('x-api-key', environment.apiKeyColsubsidio);
        headers = headers.set('Authorization', 'Basic ZHM6ZHM=');
        params = params.append('numeroId', document);
        params = params.append('tipoId', typeDocument);
        return this._http.get<any>(this.url + 'afiliacion/validador', { params: params, headers: headers }).pipe(map(res => res));
    }
}