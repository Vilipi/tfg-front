import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { EMPTY, catchError } from 'rxjs';
import { BoardModel } from '../models/board-model';
import { MatDialog } from '@angular/material/dialog';
import { NewBoardPopUpComponent } from './newboard-popup/newboard-popup.component';
import { BoardInfoPopUpComponent } from './board-info-popup/board-info-popup.component';
import { PageEvent } from '@angular/material/paginator';
import { PopUpComponent } from 'src/app/shared/components/popup/popup.component';
import { LoginFacade } from '../../login/service/login.facade';

@Component({
  selector: 'manage-boards',
  templateUrl: './manage-boards.component.html',
  styleUrls: ['./manage-boards.component.scss'],
})
export class ManageBoardsComponent implements OnInit {
  myBoards: BoardModel[] = [];
  paginatedBoards: BoardModel[] = [];
  pageSize: number = 6;
  currentPageIndex: number = 0;
  isProUser: boolean = false;

  constructor(private homeService: HomeService, private dialog: MatDialog, private loginFacade: LoginFacade) {}

  ngOnInit(): void {
    this.loginFacade.getLoginFacade().subscribe((data) => {
      this.isProUser = data.userType === 'pro' ? true : false;
    });

    this.getMyBoards();
  }

  getMyBoards(): void {
    this.homeService
      .getMyApiBoards()
      .pipe(
        catchError((error) => {
          return EMPTY;
        })
      )
      .subscribe((result: BoardModel[]) => {
        this.myBoards = result.filter(
          (item) =>
            item.isAvailable === true && item.creatorUserId === item.userId
        );
        if (this.myBoards.length === 0) {
          this.CreateBoard();
        }
        this.paginate();
      });
  }

  paginate(event?: PageEvent): void {
    if (event) {
      this.currentPageIndex = event.pageIndex;
    }
    const startIndex = this.currentPageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedBoards = this.myBoards.slice(startIndex, endIndex);
  }

  deleteItem(item: any) {
    if (confirm('Are you sure you want to remove this board?')) {
      console.log('Borrar:', item);
      this.homeService.removeApiBoard(item.id).subscribe((result) => {
        if (result) {
          this.myBoards = this.myBoards.filter(
            (e) => e.id !== item.id && e.isAvailable === true
          );
        }
        const startIndex = this.currentPageIndex * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        const newPageItems = this.myBoards.slice(startIndex, endIndex);

        if (newPageItems.length === 0 && this.currentPageIndex > 0) {
          this.currentPageIndex = 0;
        }

        this.paginate();
      });
    }
  }

  createBoard() {
    if (this.myBoards.length >= 4 && !this.isProUser) {
      this.errorDialogFreeUser();
    }else if(this.myBoards.length >= 8 && this.isProUser){
      this.errorDialogProUser();
    } else {
      this.CreateBoard();
    }
  }

  private CreateBoard() {
    const dialogRef = this.dialog.open(NewBoardPopUpComponent, {
      data: '',
      height: '26rem',
      width: '40rem',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getMyBoards();
      }
    });
  }

  editItem(item: any) {
    console.log('Editar:', item);
    const dialogRef = this.dialog.open(BoardInfoPopUpComponent, {
      data: item.id,
      height: '26rem',
      width: '40rem',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getMyBoards();
      }
    });
  }

  private errorDialogFreeUser() {
    const dialogRef = this.dialog.open(PopUpComponent, {
      data: 'You can not create more than 4 boards, upgrade to plus plan to create more!',
      height: '14rem',
      width: '20rem',
    });
  }

  private errorDialogProUser() {
    const dialogRef = this.dialog.open(PopUpComponent, {
      data: 'You can not create more than 8 boards, remove some boards to create more!',
      height: '14rem',
      width: '20rem',
    });
  }


}
