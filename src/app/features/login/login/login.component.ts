import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopUpComponent } from 'src/app/shared/components/popup/popup.component';
import { LoginService } from '../service/login.service';
import { UserModel } from '../models/user-model';
import { catchError, throwError } from 'rxjs';
import { LoginFacade } from '../service/login.facade';
import { log } from 'console';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: Router, public dialog: MatDialog, private loginService: LoginService, private loginFacade: LoginFacade) { }


  ngOnInit(): void {
  }

  onSubmit() {
    const formValues = this.registerForm.value;
    const userData = new UserModel();
    userData.email = formValues.email;
    userData.password = formValues.password;
    userData.name = "";
    userData.id = 0;

    this.loginService.login(userData).pipe(
      catchError(error => {
        this.openDialog();
        return error;
      })
    ).subscribe(result => {
      const data = result;
      if (data.isAvailable === true) {
        this.saveDataOnFacade(userData, result);
        this.router.navigate(['home']);
      } else {
      }
    });
  }

  signIn(): void {
    this.router.navigate(['home'])
  }

  openDialog() {
    const dialogRef = this.dialog.open(PopUpComponent, {
      data: 'Error, try again',
      height: '10rem',
      width: '20rem',
    });
  }

  saveDataOnFacade(userData: UserModel, result: any) : void{
    const user = result;
    user.password = userData.password;
    this.loginFacade.setLoginFacade(result);
  }
}
