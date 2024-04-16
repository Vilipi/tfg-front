import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { HomeService } from './services/home.service';
import { catchError } from 'rxjs';
import { BoardModel } from './models/board-model';
import { TaskModel } from './models/task-model';
import { BoardFacade } from './services/board.facade';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from 'src/app/shared/components/popup/popup.component';
import { TaskPopUpComponent } from './task-popup/task-popup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  toDo: string[] = [];
  done: string[] = [];
  toDoTaskModelList: TaskModel[] = [];
  doneTaskModelList: TaskModel[] = [];
  boardList: any[] = [];
  boardNameList: string[] = [];
  currentBoard: BoardModel;
  currentTasks: any = null;
  timeLeft: any;
  intervalId: any;

  constructor(private homeService: HomeService, private boardFacade: BoardFacade, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMyBoards();
    if (this.toDo.length) {
      this.check();
    }
    this.calculateTimeLeft()
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  drop(event: CdkDragDrop<TaskModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.check();
  }



  check() {
    if (this.toDoTaskModelList.length == 0) {
      window.alert("No tasks")
    }
  }

  getMyBoards(): void {
    this.homeService.getMyApiBoards().pipe(
      catchError(error => {
        return error;
      })
    ).subscribe(result => {
      const apidata: BoardModel[] = result;
      this.currentBoard = result[0];
      this.getTasksfromBoard(this.currentBoard.id)
      apidata.forEach(board => {
        this.boardNameList.push(board.name);
        this.boardList.push(board);
        this.boardFacade.setBoardListFacade(this.boardList); // set facade
        this.calculateTimeLeft();
      })
    });
  }

  changeBoard(item: any): void {
    this.currentBoard = item
  }

  checkDrop(event: any, item: any) {
    if (event.container.data.length !== event.previousContainer.data.length) {

      if (item.status === "toDo") {
        item.status = "done";
        this.updateTask(item);
        return;
      }
      if (item.status === "done") {
        item.status = "toDo";
        this.updateTask(item);
        return;
      }
    }
  }

  private getTasksfromBoard(id: number) {
    this.homeService.getApiTasksfromBoard(id).pipe(
      catchError(error => {
        return error;
      })
    ).subscribe(result => {
      this.currentTasks = result;
      this.setStatusofTasks();
    });
  }

  private updateTask(task: TaskModel) {
    this.homeService.updateApiTask(task).pipe(
      catchError(error => {
        return error;
      })
    ).subscribe(result => {
      console.log(result)
    });
  }

  private setStatusofTasks() {
    this.toDoTaskModelList = this.currentTasks
      .filter((task: TaskModel) => task.status === 'toDo')
    this.doneTaskModelList = this.currentTasks
      .filter((task: TaskModel) => task.status === 'done')
  }

  private calculateTimeLeft(): void {
    const startDate: Date = new Date();

    const nextDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1);

    const msUntilNextDay = nextDay.getTime() - startDate.getTime();

    const totalSeconds = Math.floor(msUntilNextDay / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // if (hours === 1 && minutes === 1 && seconds === 34) {      CUANDO LLEHUE A LAS 00:00:00 REFRESH
      this.timeLeft = `${hours} horas ${minutes} minutos ${seconds} segundos`;

      this.intervalId = setInterval(() => {
        this.calculateTimeLeft();
      }, 1000);
    // }
  }

  refresh(){
    // this.homeService.refreshApiBoards();
  }

  viewDetails(item: TaskModel){
      const dialogRef = this.dialog.open(TaskPopUpComponent, {
        data: item,
        height: '25rem',
        width: '40rem',
      });
  }



}
