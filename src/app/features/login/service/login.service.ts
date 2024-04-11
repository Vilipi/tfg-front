import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user-model';


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    api = "https://localhost:44369"

    constructor(private http: HttpClient) { }

    login(credentials: any): Observable<any> {
        const data = `${credentials.email}:${credentials.password}`;

        const encodedCredentials = btoa(data);
        return this.http.get<any>(`${this.api}/user/1`, {

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
}
