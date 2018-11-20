import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Session } from '../../shared/models/session';
import { SessionService } from '../services/session.service';

@Injectable()
export class RefreshJwtInterceptor implements HttpInterceptor {
    public session: Session;
    constructor(
        private _ss: SessionService,
    ) { 
        this.session = this._ss.newSession();
     }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                tap(event => {
                    if (event instanceof HttpResponse) {
                        if(event.headers.get('authorization') != null){
                            this.session.token = event.headers.get('authorization');
                            this.session.refreshToken = event.headers.get('refreshToken');
                            this.session.user = this._ss.getCurrentUser();
                            this._ss.setCurrentSession(this.session);
                        }
                    }
                })
            )
    }
}