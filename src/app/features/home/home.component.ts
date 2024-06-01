import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { HomeService } from './services/home.service';
import { EMPTY, catchError } from 'rxjs';
import { BoardModel } from './models/board-model';
import { TaskModel } from './models/task-model';
import { BoardFacade } from './services/board.facade';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from 'src/app/shared/components/popup/popup.component';
import { TaskPopUpComponent } from './task-popup/task-popup.component';
import { NewTaskPopUpComponent } from './new-task-popup/new-task-popup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  toDo: string[] = [];
  inProgress: string[] = [];
  done: string[] = [];
  toDoTaskModelList: TaskModel[] = [];
  inProgressTaskModelList: TaskModel[] = [];
  doneTaskModelList: TaskModel[] = [];
  boardList: any[] = [];
  boardNameList: string[] = [];
  currentBoard: BoardModel;
  currentTasks: any = [];
  timeLeft: any;
  intervalId: any;
  communityBoard: boolean = false;
  longBoard: boolean;

  constructor(
    private homeService: HomeService,
    private boardFacade: BoardFacade,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMyBoards();
    if (this.toDo.length) {
      this.check();
    }
    // this.calculateTimeLeft();
  }

  // ngOnDestroy(): void {
  //   clearInterval(this.intervalId);
  // }

  drop(event: CdkDragDrop<TaskModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.check();
  }

  check() {
    if (this.toDoTaskModelList.length == 0 && this.inProgressTaskModelList.length == 0) {
      window.alert('Board completed!');
    }
  }

  getMyBoards(): void {
    this.homeService
      .getMyApiBoards()
      .pipe(
        catchError((error) => {
          this.openDialog(
            'No boards to show, create a board or add some from the community tab!'
          );
          return EMPTY;
        })
      )
      .subscribe((result) => {
        if (result.length == 0) {
          this.openDialog(
            'No boards to show, create a board or add some from the community tab!'
          );
        } else {
          const apidata: BoardModel[] = result;
          this.currentBoard = result[0];
          this.changeBoard(result[0]);
          apidata.forEach((board) => {
            this.boardNameList.push(board.name);
            this.boardList.push(board);
            this.boardFacade.setBoardListFacade(this.boardList);
            // this.calculateTimeLeft();
          });
        }
      });
  }

  changeBoard(item: BoardModel): void {
    this.homeService
      .getApiTasksfromBoard(item.id)
      .pipe(
        catchError((error) => {
          this.openDialog('No tasks to show, add some task to start!');
          this.currentBoard = item;
          this.currentTasks = [];
          this.longBoard = this.currentBoard.type === 'Short' ? false : true;
          this.setStatusofTasks();
          this.checkUserBoard();
          return EMPTY;
        })
      )
      .subscribe((result) => {
        this.currentBoard = item;
        this.currentTasks = result;
        this.longBoard = this.currentBoard.type === 'Short' ? false : true;
        this.setStatusofTasks();
        this.checkUserBoard();
      });
  }

  checkDrop(event: any, item: any) {
    console.log(event, item);

    if (event.container.data.length !== event.previousContainer.data.length) {
      if (this.longBoard) {
        // Lógica cuando longBoard es true
        if (item.status === 'toDo' && event.container.id === 'inProgressList') {
          item.status = 'inProgress';
          this.updateTask(item);
          return;
        }
        if (item.status === 'inProgress' && event.container.id === 'doneList') {
          item.status = 'done';
          this.updateTask(item);
          return;
        }
        if (item.status === 'done' && event.container.id === 'inProgressList') {
          item.status = 'inProgress';
          this.updateTask(item);
          return;
        }
        if (item.status === 'inProgress' && event.container.id === 'todoList') {
          item.status = 'toDo';
          this.updateTask(item);
          return;
        }
      } else {
        // Lógica cuando longBoard es false
        if (item.status === 'toDo' && event.container.id === 'doneList') {
          item.status = 'done';
          this.updateTask(item);
          return;
        }
        if (item.status === 'done' && event.container.id === 'todoList') {
          item.status = 'toDo';
          this.updateTask(item);
          return;
        }
      }
    }
  }

  private updateTask(task: TaskModel) {
    this.homeService
      .updateApiTask(task)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((result) => {
        console.log(result);
      });
  }

  private setStatusofTasks() {
    this.toDoTaskModelList = this.currentTasks.filter(
      (task: TaskModel) => task.status === 'toDo'
    );

    this.inProgressTaskModelList = this.currentTasks.filter(
      (task: TaskModel) => task.status === 'inProgress'
    );

    this.doneTaskModelList = this.currentTasks.filter(
      (task: TaskModel) => task.status === 'done'
    );
  }

  private calculateTimeLeft(): void {
    const startDate: Date = new Date();

    const nextDay = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + 1
    );

    const msUntilNextDay = nextDay.getTime() - startDate.getTime();

    const totalSeconds = Math.floor(msUntilNextDay / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    this.timeLeft = `${hours} horas ${minutes} minutos ${seconds} segundos`;

    this.intervalId = setInterval(() => {
      this.calculateTimeLeft();
    }, 1000);
  }

  refresh() {
    // this.homeService.refreshApiBoards();
  }

  viewDetails(item: TaskModel, community: boolean) {
    const dialogRef = this.dialog.open(TaskPopUpComponent, {
      data: { item, community },
      height: '25rem',
      width: '40rem',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.changeBoard(this.currentBoard);
      }
    });
  }

  addTask() {
    const dialogRef = this.dialog.open(NewTaskPopUpComponent, {
      data: this.currentBoard,
      height: '16rem',
      width: '40rem',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.changeBoard(this.currentBoard);
      }
    });
  }

  openDialog(message: string) {
    const dialogRef = this.dialog.open(PopUpComponent, {
      data: `${message}`,
      height: '12rem',
      width: '25rem',
    });
  }

  private checkUserBoard(): void {
    console.log(this.currentBoard);
    if (this.currentBoard.creatorUserId !== this.currentBoard.userId) {
      this.communityBoard = true;
    } else {
      this.communityBoard = false;
    }
  }
}
