import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarFacade } from './service/sidebar.facade';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isBoardsOpen = false;
  isCommunityOpen = false;

  constructor(private router: Router,
    private sidebarFacade: SidebarFacade) { }

  ngOnInit(): void {
    this.checkSidebarButton();
  }

  checkSidebarButton(){
    this.sidebarFacade.getMyBoardsSidebarFacade().subscribe((data) => {
      this.isBoardsOpen = data;
    });

    this.sidebarFacade.getCommunitySidebarFacade().subscribe((data) => {
      this.isCommunityOpen = data;
    })

  }

  openBoards(){
     this.isBoardsOpen = !this.isBoardsOpen;
     this.sidebarFacade.setMyBoardsSidebarFacade(this.isBoardsOpen);
  }
  openCommunity(){
    this.isCommunityOpen = !this.isCommunityOpen;
    this.sidebarFacade.setCommunitySidebarFacade(this.isCommunityOpen);
  }

  logOut(){
    localStorage.removeItem('userData');
    this.router.navigate(['login'])
  }
}
