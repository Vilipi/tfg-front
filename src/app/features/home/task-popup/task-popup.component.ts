import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HomeService } from '../services/home.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-popup',
  templateUrl: './task-popup.component.html',
  styleUrls: ['./task-popup.component.scss']
})
export class TaskPopUpComponent implements OnInit {
  taskData: any;
  formEditable = false;
  taskForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private homeService: HomeService) {

    this.taskData = data;

    this.taskForm = this.fb.group({
      id: new FormControl({ value: this.taskData.id, disabled: true }),
      name: new FormControl({ value: this.taskData.name, disabled: true }),
      status: new FormControl({ value: this.taskData.status, disabled: true }),
      description: new FormControl({ value: this.taskData.description, disabled: true })
    });
  }

  ngOnInit(): void {
    console.log(this.data)
  }

  onSave(): void {
    this.formEditable = !this.formEditable;

    this.taskForm.get('name')?.disable();
    this.taskForm.get('description')?.disable();

    this.taskData.name = this.taskForm.get('name')?.value;
    this.taskData.description = this.taskForm.get('description')?.value;

    if (this.taskData.name !== "" && this.taskData.name !== "") {
      this.homeService.updateApiTask(this.taskData).pipe(
        catchError(error => {
          return error;
        })
      ).subscribe(result => {
        console.log(result)
      });
    }
  }

toggleEditable(): void {
  this.formEditable = !this.formEditable;
  this.taskForm.get('name')?.enable();
  this.taskForm.get('description')?.enable();
}

}
