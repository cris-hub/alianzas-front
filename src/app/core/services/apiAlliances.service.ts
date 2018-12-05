import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Use } from '../../shared/models/use';
import { AllianceProduct } from '../../shared/models/allianceProduct';
import { SessionService } from './session.service';
import { Product } from '../../shared/models/product';
import { User } from '../../shared/models/user';
import { Alliance } from '../../shared/models/alliance';
import { Observable } from 'rxjs';
import { Type } from '../../shared/models/type';
import { Agreement } from '../../shared/models/agreement';
import { AppConfig } from 'src/app/app.config';

@Injectable()
export class ApiAlliancesService {
    private url;

    constructor(private _http: HttpClient, private _ss: SessionService,private config : AppConfig) {
        Object.assign(environment,this.config.getAllConfig);
        this.conectionConfig();
    }

    /**
     * @desc Config conection services
     */
    private conectionConfig(): void {
        
        this.url = environment.apiAlliancesUrl;
    }

    /**
     * @desc Call POST service to create user
     * @param user object user
     */
    public createUser(user: User) {
        return this._http.post<any>(this.url + 'users', user).pipe(map(res => res));
    }

    /**
     * @desc Call PUT service to update user
     * @param user object user
     */
    public updateUser(user: User) {
        return this._http.put<any>(this.url + 'users', user).pipe(map(res => res));
    }

    /**
     * @desc Call GET service to get user by userName
     * @param username Filter by username
     * @param excludeId Exclude id user of the search
     */
    public getUserByUserName(username: string, excludeId: string) {
        let params = new HttpParams();
        params = params.append('username', username);
        params = params.append('excludeId', excludeId);
        return this._http.get<any>(this.url + 'users/username', { params: params }).pipe(map(res => res));
    }

    /**
     * @desc Call GET service to get user by email
     * @param email Filter by email
     * @param excludeId Exclude id user of the search
     */
    public getUserByEmail(email: string, excludeId: string) {
        let params = new HttpParams();
        params = params.append('email', email);
        params = params.append('excludeId', excludeId);
        return this._http.get<any>(this.url + 'users/email', { params: params }).pipe(map(res => res));
    }

    /**
     * @desc Call GET service to get user by id
     * @param id Filter by id
     */
    public getUserById(id: string) {
        let params = new HttpParams();
        params = params.append('id', id);
        return this._http.get<any>(this.url + 'users/id', { params: params }).pipe(map(res => res));
    }

    /**
     * @desc Call GET service to get users with diferents filters
     * @param username Filter by username
     * @param name Filter by name
     * @param userState filter by state user
     * @param role filter by state roles
     */
    public getUsers(username: string, name: string, userState: string, role: string, offset: string, count: string) {
        let params = new HttpParams();
        params = params.append('username', username);
        params = params.append('name', name);
        params = params.append('userState', userState);
        params = params.append('role', role);
        params = params.append('offset', offset);
        params = params.append('count', count);
        return this._http.get<any>(this.url + 'users', { params: params }).pipe(map(res => res));
    }

    /**
     * @desc Call PUT service to update password user
     * @param user object user
     */
    public userChangePass(user: User) {
        return this._http.put<any>(this.url + 'users/password', user).pipe(map(res => res));
    }

    /**
     * @desc Call PUT service to update password user validating token
     * @param user object user
     */
    public userChangePassToken(user: User) {
        return this._http.put<any>(this.url + 'users/password/token', user).pipe(map(res => res));
    }

    /**
     * @desc call GET service to validate username and send SMS token
     * @param username username
     */
    public sendUserToken(username: string){
        let params = new HttpParams();
        params = params.append('username', username);

        return this._http.get<any>(this.url + 'users/reset-password', { params: params }).pipe(map(res => res));
    }

    /**
     * @desc call GET service to validate token user
     * @param username username
     * @param token token
     */
    public findUserToken(username:string, token: string){
        let params = new HttpParams();
        params = params.append('username', username);
        params = params.append('token', token);

        return this._http.get<any>(this.url + 'users/token', { params: params }).pipe(map(res => res));
    }

    /**
     * @desc call GET service to get roles
     */
    public getRoles() {
        return this._http.get<any>(this.url + 'roles').pipe(map(res => res));
    }

    /**
     * @desc call GET service to get Uses
     * @param startDate Filter by startDate
     * @param finishedDate Filter by finishedDate
     * @param category filter by state category
     * @param alliances filter by alliances
     * @param offset Paginate offset
     * @param count Paginate count
     */
    //Get Uses report
    public getUsesReport(startDate: string, finishedDate: string, category: string, alliances: string, offset: string, count: string) {
        let params = new HttpParams();
        params = params.append('startDate', startDate);
        params = params.append('finishedDate', finishedDate);
        params = params.append('category', category);
        params = params.append('alliances', alliances);
        params = params.append('offset', offset);
        params = params.append('count', count);
        return this._http.get<any>(this.url + 'uses', { params: params }).pipe(map(res => res));
    }

    /**
     * @desc call POST service to save use
     * @param use Use
     */
    public saveUse(use: Use) {
        return this._http.post<any>(this.url + 'uses', use).pipe(map(res => res));
    }

    /**
     * @desc Call POST service to create product
     * @param product 
     */
    public createProduct(product: Product) {
        return this._http.post<any>(this.url + 'products', product).pipe(map(res => res));
    }

    /**
     * @desc Call PUT service to update product
     * @param product 
     */
    public updateProduct(product: Product) {
        return this._http.put<any>(this.url + 'products', product).pipe(map(res => res));
    }

    /**
     * @desc call GET service to get products
     */
    public getProducts() {
        return this._http.get<any>(this.url + 'products').pipe(map(res => res));
    }

    /**
     * @desc Call GET service to get product by name
     * @param name Filter by name
     * @param excludeId Filter excluding id
     */
    public getProductByName(name: string, excludeId:string) {
        let params = new HttpParams();
        params = params.append('name', name);
        params = params.append('excludeId', excludeId);
        return this._http.get<any>(this.url + 'products/name', { params: params }).pipe(map(res => res));
    }

    /**
     * @desc Call GET service to get product by id
     * @param id Filter by id
     */
    public getProductById(id:string) {
        let params = new HttpParams();
        params = params.append('id', id);
        return this._http.get<any>(this.url + 'products/id', { params: params }).pipe(map(res => res));
    }

    /**
     * @desc call GET service to get products report
     * @param product Filter by product
     * @param productState Fliter by product state 
     * @param offset Paginate offset
     * @param count Paginate count
     */
    public getProductsReport(product: string, productState: string, offset: string, count: string) {
        let params = new HttpParams();
        params = params.append('product', product);
        params = params.append('productState', productState);
        params = params.append('offset', offset);
        params = params.append('count', count);
        return this._http.get<any>(this.url + 'products/report', { params: params }).pipe(map(res => res));
    }

    /**
     * @desc call POST service to create relation of alliance with product
     * @param allianceProduct 
     */
    public createAllianceProduct(allianceProduct: AllianceProduct) {
        return this._http.post<any>(this.url + 'alliance-products', allianceProduct).pipe(map(res => res));
    }

    /**
     * @desc call DELETE service to remove relation of alliance with product
     * @param allianceProduct 
     */
    public deleteAllianceProduct(allianceProduct: AllianceProduct) {
        return this._http.delete<any>(this.url + 'alliance-products/alliance/' + allianceProduct.allianceId + '/product/' + allianceProduct.productId).pipe(map(res => res));
    }

    /**
     * @desc call GET service to get products of one alliance
     * @param allianceId Filter by alliance
     */
    public getAllianceProducts(allianceId: Number) {
        let params = new HttpParams();
        params = params.append('allianceId', allianceId.toString());
        return this._http.get<any>(this.url + 'alliance-products', { params: params }).pipe(map(res => res));
    }

    /**
     * @desc call POST service to create alliance
     * @param alliance 
     */
    public createAlliance(alliance: Alliance) {
        return this._http.post<any>(this.url + 'alliances', alliance).pipe(map(res => res));
    }

    /**
     * @desc Call PUT service to update alliance
     * @param alliance 
     */
    public updateAlliance(alliance: Alliance) {
        return this._http.put<any>(this.url + 'alliances', alliance).pipe(map(res => res));
    }

    /**
     * @desc Call GET service to get alliance by id
     * @param id Filter by id
     */
    public getAllianceById(id:string) {
        let params = new HttpParams();
        params = params.append('id', id);
        return this._http.get<any>(this.url + 'alliances/id', { params: params }).pipe(map(res => res));
    }

    /**
     * @desc Call GET service to get product by name
     * @param name Filter by name
     * @param excludeId Filter excluding id
     */
    public getAllianceByName(name: string, excludeId:string) {
        let params = new HttpParams();
        params = params.append('name', name);
        params = params.append('excludeId', excludeId);
        return this._http.get<any>(this.url + 'alliances/name', { params: params }).pipe(map(res => res));
    }

    /**
     * @desc Call GET service to get alliances
     * @param alliance Filter by name alliance
     * @param allianceState Fliter by alliance state
     * @param allianceCategory Fliter by category
     */
    public getAlliances(allianceCategory: string): Observable<Alliance[]> {
        let params = new HttpParams();
        params = params.append('allianceCategory', allianceCategory);
        return this._http.get<Alliance[]>(this.url + 'alliances', { params: params }).pipe(map(res => res));
    }

    /**
     * @desc Call GET service to get alliances
     * @param alliance Filter by name alliance
     * @param allianceState Fliter by alliance state
     * @param allianceCategory Fliter by category
     * @param offset Paginate offset
     * @param count Paginate count
     */
    public getAlliancesReport(alliance: string, allianceState: string, allianceCategory: string, offset: string, count: string){
        let params = new HttpParams();
        params = params.append('alliance', alliance);
        params = params.append('allianceState', allianceState);
        params = params.append('allianceCategory', allianceCategory);
        params = params.append('offset', offset);
        params = params.append('count', count);
        return this._http.get<any>(this.url + 'alliances/report', { params: params }).pipe(map(res => res));
    }

    /**
     * Post to service for create type
     * @param type 
     */
    public createType(type: Type) {
        return this._http.post<any>(this.url + 'types', type).pipe(map(res => res));
    }

    /**
     * @desc POST to service for update type
     * @param type 
     */
    public updateType(type: Type) {
        return this._http.put<any>(this.url + 'types', type).pipe(map(res => res));
    }

    /**
     * @desc Call GET service to get type by id
     * @param id Filter by id
     */
    public getTypeById(id:string) {
        let params = new HttpParams();
        params = params.append('id', id);
        return this._http.get<any>(this.url + 'types/id', { params: params }).pipe(map(res => res));
    }

    /**
     * @desc call GET service to get Types
     * @param typeCategory Filter by category
     */
    public getTypes(typeCategory: string) {
        let params = new HttpParams();
        params = params.append('typeCategory', typeCategory);
        return this._http.get<any>(this.url + 'types', { params: params }).pipe(map(res => res));
    }

    /**
     * @desc call GET service to get Types report
     * @param type Filter by type name
     * @param typeState Filter by type state
     * @param typeCategory Filter by type category
     * @param type Filter by type name
     * @param offset Paginate offset
     * @param count Paginate count
     */
    public getTypesReport(type: string, typeState: string, typeCategory: string, offset: string, count: string) {
        let params = new HttpParams();
        params = params.append('type', type);
        params = params.append('typeState', typeState);
        params = params.append('typeCategory', typeCategory);
        params = params.append('offset', offset);
        params = params.append('count', count);
        return this._http.get<any>(this.url + 'types/report', { params: params }).pipe(map(res => res));
    }

    /**
     * @desc call GET service to get categories
     */
    public getCategories() {
        return this._http.get<any>(this.url + 'categories').pipe(map(res => res));
    }

    /**
     * @desc Call POST service to create agreement
     * @param agreement Agreement
     */
    public createAgreement(agreement: Agreement) {
        return this._http.post<any>(this.url + 'agreements', agreement).pipe(map(res => res));
    }

    /**
     * @desc Call PUT service to update type
     * @param agreement Agreement
     */
    public updateAgreement(agreement: Agreement) {
        return this._http.put<any>(this.url + 'agreements', agreement).pipe(map(res => res));
    }

    /**
     * @desc Call GET service to get type by id
     * @param id Filter by id
     */
    public getAgreementById(id:string) {
        let params = new HttpParams();
        params = params.append('id', id);
        return this._http.get<any>(this.url + 'agreements/id', { params: params }).pipe(map(res => res));
    }

    /**
     * @desc Call GET service to get agreements
     */
    public getAgreements() {
        return this._http.get<any>(this.url + 'agreements').pipe(map(res => res));
    }

    /**
     * @desc call GET to service agreements report
     * @param offset Paginate offset
     * @param count Paginate count
     */
    public getAgreementsReport(agreement: string, agreementState: string, offset: string, count: string) {
        let params = new HttpParams();
        params = params.append('agreementName', agreement);
        params = params.append('agreementState', agreementState);
        params = params.append('offset', offset);
        params = params.append('count', count);
        return this._http.get<any>(this.url + 'agreements/report', { params: params }).pipe(map(res => res));
    }
}