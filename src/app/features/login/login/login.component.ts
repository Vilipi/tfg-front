import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopUpComponent } from 'src/app/shared/components/popup/popup.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
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
