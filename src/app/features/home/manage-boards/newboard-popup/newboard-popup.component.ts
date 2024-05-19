import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { catchError } from 'rxjs';
import { HomeService } from '../../services/home.service';
import { TaskModel } from '../../models/task-model';

@Component({
  selector: 'newboard-popup',
  templateUrl: './newboard-popup.component.html',
  styleUrls: ['./newboard-popup.component.scss']
})
export class NewBoardPopUpComponent implements OnInit {
  taskData: TaskModel;
  formEditable = false;
  boardForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private homeService: HomeService) {

    this.taskData = data;

    this.boardForm = this.fb.group({
      name: new FormControl({ value: this.taskData.name, disabled: true }),
      type: new FormControl({ value: this.taskData.type, disabled: true }),
      timeLength: new FormControl({ value: this.taskData.timeLength, disabled: true }),
      description: new FormControl({ value: this.taskData.description, disabled: true }),

    });
  }

  ngOnInit(): void {
    console.log(this.data)
  }

  onSave(): void {
  }

  toggleEditable(): void {
  }
}
