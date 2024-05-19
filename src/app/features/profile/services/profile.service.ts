import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserModel } from "../../login/models/user-model";
import { LoginService } from "../../login/service/login.service";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class ProfileService implements OnInit {

    api = "https://localhost:44369";
    userData: any;
    user: UserModel;

    constructor(private http: HttpClient, private loginService: LoginService) { }

    ngOnInit(): void {
    }

    updateApiProfile(user: UserModel): Observable<any> {
        this.getLocalStorage();
        const data = `${this.user.email}:${this.user.password}`;
        const encodedCredentials = btoa(data);

        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Basic ${encodedCredentials}`
        });

        return this.http.post<any>(`${this.api}/modify/${this.user.id}`, user, { headers });
    }


    getLocalStorage() {
        const userData = localStorage.getItem('userData');
        if (userData) {
            this.user = JSON.parse(userData) as UserModel;
        }
    }

}
