import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HomeService } from '../services/home.service';
import { EMPTY, catchError } from 'rxjs';
import { PopUpComponent } from 'src/app/shared/components/popup/popup.component';
import { TaskModel } from '../models/task-model';

@Component({
  selector: 'app-popup',
  templateUrl: './new-task-popup.component.html',
  styleUrls: ['./new-task-popup.component.scss']
})
export class NewTaskPopUpComponent implements OnInit {
  taskForm: FormGroup;
  taskData: TaskModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<NewTaskPopUpComponent>,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private homeService: HomeService) {

    this.taskForm = this.fb.group({
      name: new FormControl({ value: '', disabled: false }, [Validators.maxLength(30)]),
      description: new FormControl({ value: '', disabled: false }, [Validators.maxLength(150)])
    });
  }

  ngOnInit(): void {
    console.log(this.data)
  }

  Create(): void {
    this.taskData = this.createTask();
    this.homeService.createApiTask(this.taskData).pipe(
      catchError(error => {
        this.openDialog('Task could not be created');
        return EMPTY;
      })
    ).subscribe(result => {
      this.dialogRef.close(true);
    })
  }

  createTask():  TaskModel{
    let task: TaskModel = {
      id: 0,
      name: this.taskForm.get('name')?.value,
      description: this.taskForm.get('description')?.value,
      creationDate: new Date(),
      isAvailable: true,
      isCompleted: false,
      status: 'toDo',
      boardId: this.data.id,
      userId: this.data.userId,
      timeLength: this.data.timeLength,
      creatorUserId: this.data.creatorUserId,
      creatorUser: this.data.creatorUser
    }

    return task;
  }
    

  private openDialog(message: string) {
    const dialogRef = this.dialog.open(PopUpComponent, {
      data: `${message}`,
      height: '12rem',
      width: '25rem',
    });
  }

}
