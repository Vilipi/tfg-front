import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user-model';
import { LoginFacade } from './login.facade';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    api = environment.API_URL;
    credentials: UserModel;

    constructor(private http: HttpClient, private loginFacade: LoginFacade) { }

    login(credentials: any): Observable<any> {
        const data = `${credentials.email}:${credentials.password}`;

        const encodedCredentials = btoa(data);
        return this.http.post<any>(`${this.api}/login`, credentials, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Basic ${encodedCredentials}`
            }
        });
    }

    register(user: any): Observable<any> {
        return this.http.post<any>(`${this.api}/register`, user, {
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        });
    }

    getCredentials() {
        this.loginFacade.getLoginFacade().subscribe(
            result => {
                this.credentials = result;
            }
        )
    }
}
