import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopUpComponent } from 'src/app/shared/components/popup/popup.component';
import { LoginService } from '../service/login.service';
import { UserModel } from '../models/user-model';
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

  constructor(private router: Router, public dialog: MatDialog, private loginService: LoginService) { }


  ngOnInit(): void {
  }

  onSubmit() {
    const formValues = this.registerForm.value;
    const userData = new UserModel();
    userData.email = formValues.email;
    userData.password = formValues.password;
    console.log(userData)
    this.loginService.login(userData).subscribe(result => {
      const data = result;
      console.log(data);
    });
  }


  signIn(): void {
    this.router.navigate(['home'])
  }

  openDialog() {
    const dialogRef = this.dialog.open(PopUpComponent, {
      data: 'Information to show in popup',
      height: '10rem',
      width: '20rem',
    });
  }
}
