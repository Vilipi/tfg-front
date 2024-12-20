// auth.service.ts
import { Injectable } from '@angular/core';
import { UserModel } from '../features/login/models/user-model';
import { LoginFacade } from '../features/login/service/login.facade';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: UserModel;

  constructor(private loginFacade: LoginFacade) { }

  isLoggedIn(): boolean {
    this.getLocalStorage();
    if(this.user){
      this.loginFacade.setLoginFacade(this.user);
      return true; 
    }
    else {
      return false;
    }
  }

  private getLocalStorage(): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.user = JSON.parse(userData) as UserModel;
    }
  }
}
