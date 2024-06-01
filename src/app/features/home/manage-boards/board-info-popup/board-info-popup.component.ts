import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HomeService } from '../../services/home.service';
import { BoardModel } from '../../models/board-model';
import { PopUpComponent } from 'src/app/shared/components/popup/popup.component';

@Component({
  selector: 'board-info-popup',
  templateUrl: './board-info-popup.component.html',
  styleUrls: ['./board-info-popup.component.scss']
})
export class BoardInfoPopUpComponent implements OnInit {
  boardData: BoardModel = new BoardModel();
  boardForm: FormGroup;
  isEditable = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<BoardInfoPopUpComponent>,
    private fb: FormBuilder,
    private homeService: HomeService
  ) {
    this.boardForm = this.fb.group({
      name: new FormControl({ value: '', disabled: true },[Validators.maxLength(30)]),
      timeLength: new FormControl({ value: 0, disabled: false }),
      description: new FormControl({ value: '', disabled: true },[Validators.maxLength(130)]),
      isPublic: new FormControl({ value: this.boardData.isPublic, disabled: true })
    });
  }

  ngOnInit(): void {
    this.getBoardInfo();
    console.log(this.data);
  }

  getBoardInfo(): void {
    this.homeService.getApiBoard(this.data).subscribe(
      result => {
        this.boardData = result;
        this.boardForm.patchValue({
          name: this.boardData.name,
          timeLength: this.boardData.timeLength,
          description: this.boardData.description,
          isPublic: this.boardData.isPublic
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  toggleEdit(): void {
    this.isEditable = !this.isEditable;
    if (this.isEditable) {
      this.boardForm.get('name')?.enable();
      this.boardForm.get('description')?.enable();
      this.boardForm.get('isPublic')?.enable();
    } else {
      this.boardForm.get('name')?.disable();
      this.boardForm.get('description')?.disable();
      this.boardForm.get('isPublic')?.disable();
    }
  }

  onSave(): void {
    this.isEditable = !this.isEditable;

    const data: BoardModel = {
      ...this.boardData,
      name: this.boardForm.get('name')?.value,
      timeLength: this.boardForm.get('timeLength')?.value,
      description: this.boardForm.get('description')?.value,
      isPublic: this.boardForm.get('isPublic')?.value
    };

    console.log('Board Data:', data);
    debugger
    this.homeService.updateApiBoard(data).subscribe(
      result => {
        this.openDialog('Board updated');
        this.dialogRef.close(true);
      },
      error => {
        this.openDialog('Error, try again');
        console.error(error);
      }
    );
  }

  openDialog(info: string): void {
    this.dialog.open(PopUpComponent, {
      data: info,
      height: '10rem',
      width: '20rem',
    });
  }
}
