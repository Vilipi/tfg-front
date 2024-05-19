import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../models/user-model';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from 'src/app/shared/components/popup/popup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    nickname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

 

  constructor(public dialog: MatDialog, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const formValues = this.registerForm.value;

    if (formValues.password === formValues.passwordConfirm) {
      const userData = new UserModel();
      userData.name = formValues.nickname;
      userData.email = formValues.email;
      userData.password = formValues.password;

      this.loginService.register(userData).subscribe(result =>
        console.log(result));
        this.router.navigate(['/login']);

    }
    else {
      const dialogRef = this.dialog.open(PopUpComponent, {
        data: 'Passwords are not the same',
        height: '10rem',
        width: '20rem',
      });
    }
  }

}
