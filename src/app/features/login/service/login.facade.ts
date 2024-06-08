import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { UserModel } from "../models/user-model";

@Injectable({
    providedIn: 'root'
})

export class LoginFacade {
    private loginFacade: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(new UserModel);

    public getLoginFacade(): Observable<UserModel> {
        return this.loginFacade.asObservable();
    }

    public setLoginFacade(data: UserModel): void {
        this.loginFacade.next(data);
    }
}
