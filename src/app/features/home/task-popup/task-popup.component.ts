import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { HomeService } from '../services/home.service';
import { EMPTY, catchError } from 'rxjs';
import { PopUpComponent } from 'src/app/shared/components/popup/popup.component';

@Component({
  selector: 'app-popup',
  templateUrl: './task-popup.component.html',
  styleUrls: ['./task-popup.component.scss'],
})

export class TaskPopUpComponent implements OnInit {
  taskData: any;
  formEditable = false;
  taskForm: FormGroup;
  communityBoard: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TaskPopUpComponent>,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private homeService: HomeService
  ) {
    this.taskData = data.item;
    this.communityBoard = data.community;
    this.taskForm = this.fb.group({
      id: new FormControl({ value: this.taskData.id, disabled: true }),
      name: new FormControl({ value: this.taskData.name, disabled: true },[Validators.maxLength(30)]),
      status: new FormControl({ value: this.taskData.status, disabled: true }),
      description: new FormControl({
        value: this.taskData.description,
        disabled: true,
      },[Validators.maxLength(150)]),
    });
  }

  ngOnInit(): void {
  }

  onSave(): void {
    this.formEditable = !this.formEditable;

    this.taskForm.get('name')?.disable();
    this.taskForm.get('description')?.disable();

    this.taskData.name = this.taskForm.get('name')?.value;
    this.taskData.description = this.taskForm.get('description')?.value;
    if (this.taskData.name !== '' && this.taskData.name !== '') {
      this.homeService
        .updateApiTask(this.taskData)
        .pipe(
          catchError((error) => {
            this.openErrorDialog();
            return EMPTY;
          })
        )
        .subscribe((result) => {
          console.log(result);
        });
    }
  }

  toggleEditable(): void {
    this.formEditable = !this.formEditable;
    this.taskForm.get('name')?.enable();
    this.taskForm.get('description')?.enable();
  }

  removeTask(): void {
    console.log(this.data)
    debugger
    this.homeService
      .removeApiTask(this.taskData.id, this.data.item.boardId)
      .pipe(
        catchError((error) => {
          this.openErrorDialog();
          return EMPTY;
        })
      )
      .subscribe((result) => {
        console.log(result);
        this.dialogRef.close(true);
      });
  }

  private openErrorDialog() {
    const dialogRef = this.dialog.open(PopUpComponent, {
      data: 'Error, try again',
      height: '10rem',
      width: '20rem',
    });
  }
}
