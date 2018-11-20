import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from "../../shared/models/session";
import { User } from '../../shared/models/user';

@Injectable()
export class SessionService{
    private localStorageService;
    private currentSession : Session = null;

    constructor(private router: Router){
        this.localStorageService = localStorage;
        this.currentSession = this.loadSessionData();
    }

    /**
     * @desc Set Session first time
     */
    public newSession(): Session {
        return {
            token: '',
            refreshToken: '',
            user: this.newUser()
        }
    }

    /**
     * 
     * @desc Set User first time
     */
    public newUser(): User {
        return {
            id: null,
            username: '',
            password: '',
            email: '',
            name: '',
            phone: null,
            role: 0,
            alliance: null,
            enabled: 1,
            changePassword: 0,
            resetToken: '',
            createdAt: null,
            updatedAt: null,
            usrIdCreate: null,
            usrIdUpdate: null
        }
    }

    public setCurrentSession(session: Session): void{
        this.currentSession = session;
        this.localStorageService.setItem('currentUser', JSON.stringify(session));
    } 

    public setCurrentUser(user: User): void{
        this.currentSession.user = user;
        this.localStorageService.setItem('currentUser', JSON.stringify(this.currentSession));
    } 

    public loadSessionData(): Session{  
        var sessionStr   = this.localStorageService.getItem('currentUser');
        return (sessionStr) ?  <Session> JSON.parse(sessionStr) : null;
    }

    public getCurrentSession(): Session{
        return this.currentSession;
    }

    public removeCurrentSession(): void{
        this.localStorageService.removeItem('currentUser');
        this.currentSession = null;
    }

    public getCurrentUser(): User{
        var session : Session = this.getCurrentSession();
        return (session && session.user) ? session.user : null;
    }

    public getCurrentToken(): string{
        var session = this.getCurrentSession();
        return (session && session.token) ? session.token : null;
    }

    public logout(): void{
        this.removeCurrentSession();
        this.router.navigate(['/login']);
    }

    public isAuthenticated(): boolean{
        return (this.getCurrentToken() != null) ? true : false;
    } 

    public isChangePassword(): boolean{
        return (this.getCurrentUser().changePassword == 1) ? true : false;
    } 

}

