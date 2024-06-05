import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarFacade } from './service/sidebar.facade';
import { MatDialog } from '@angular/material/dialog';
import { PaypalComponent } from 'src/app/paypal/paypal.component';
import { LoginFacade } from 'src/app/features/login/service/login.facade';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isBoardsOpen = false;
  isCommunityOpen = false;
  IsProUser = false;

  constructor(private router: Router, private sidebarFacade: SidebarFacade,  public dialog: MatDialog, private loginFacade: LoginFacade) {}

  ngOnInit(): void {
    this.checkSidebarButton();

    this.loginFacade.getLoginFacade().subscribe((data) => {
      this.IsProUser = data.userType === 'pro' ? true : false;
    });
  }

  checkSidebarButton() {
    this.sidebarFacade.getMyBoardsSidebarFacade().subscribe((data) => {
      this.isBoardsOpen = data;
    });

    this.sidebarFacade.getCommunitySidebarFacade().subscribe((data) => {
      this.isCommunityOpen = data;
    });
  }

  openBoards() {
    this.isBoardsOpen = !this.isBoardsOpen;
    this.sidebarFacade.setMyBoardsSidebarFacade(this.isBoardsOpen);
  }
  openCommunity() {
    this.isCommunityOpen = !this.isCommunityOpen;
    this.sidebarFacade.setCommunitySidebarFacade(this.isCommunityOpen);
  }

  BePremium() {
    const dialogRef = this.dialog.open(PaypalComponent, {
      data: '',
    });
  }

  logOut() {
    localStorage.removeItem('userData');
    this.router.navigate(['login']);
  }
}
