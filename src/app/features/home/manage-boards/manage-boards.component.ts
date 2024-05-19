import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { EMPTY, catchError } from 'rxjs';
import { BoardModel } from '../models/board-model';
import { MatDialog } from '@angular/material/dialog';
import { NewBoardPopUpComponent } from './newboard-popup/newboard-popup.component';

@Component({
  selector: 'manage-boards',
  templateUrl: './manage-boards.component.html',
  styleUrls: ['./manage-boards.component.scss'],
})
export class ManageBoardsComponent implements OnInit {
  myBoards: BoardModel[] = [];
  constructor(private homeService: HomeService, private dialog: MatDialog ) {}

  ngOnInit(): void {
    this.getMyBoards();
    // console.log(this.items);
  }

  editItem(item: any) {
    console.log('Editar:', item);
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
        this.myBoards = result.filter(item => item.isAvailable === true);
      });
  }
  

  deleteItem(item: any) {
    console.log('Borrar:', item);
    this.homeService.removeApiBoard(item.id).subscribe(result => {
      console.log(result);
      if (result) {
        this.myBoards = this.myBoards.filter(e => e.id !== item.id && e.isAvailable === true);
      }
    })
  }

  createBoard() {
    this.openDialog();
    console.log('Create Board');
  }

  private openDialog() {
    const dialogRef = this.dialog.open(NewBoardPopUpComponent, {
      data: '',
      height: '25rem',
      width: '40rem',
    });
  }
}
