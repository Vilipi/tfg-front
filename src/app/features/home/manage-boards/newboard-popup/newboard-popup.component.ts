import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HomeService } from '../../services/home.service';
import { BoardModel } from '../../models/board-model';
import { PopUpComponent } from 'src/app/shared/components/popup/popup.component';
import { LoginFacade } from 'src/app/features/login/service/login.facade';

@Component({
  selector: 'newboard-popup',
  templateUrl: './newboard-popup.component.html',
  styleUrls: ['./newboard-popup.component.scss']
})
export class NewBoardPopUpComponent implements OnInit {
  boardData: BoardModel;
  boardForm: FormGroup;
  isProUser = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<NewBoardPopUpComponent>,
    private fb: FormBuilder,
    private loginFacade: LoginFacade,
    private homeService: HomeService) {

    this.boardData = data;

    this.boardForm = this.fb.group({
      name: new FormControl({ value: this.boardData.name, disabled: false},[Validators.maxLength(30)]),
      timeLength: new FormControl({ value: this.boardData.timeLength || 0, disabled: false }),
      description: new FormControl({ value: this.boardData.description, disabled: false },[Validators.maxLength(130)]),
      type: new FormControl({ value: this.boardData.type || false, disabled: false }),
    });
  }

  ngOnInit(): void {
    this.loginFacade.getLoginFacade().subscribe((data) => {
      this.isProUser = data.userType === 'pro' ? true : false;
    });
    console.log(this.isProUser);
  }

  onSave(): void {
    const data: BoardModel = {
      id: 0,
      name: this.boardForm.get('name')?.value,
      creationDate: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      isTimeOver: false,
      creatorUserId: 0,
      timeLength: this.boardForm.get('timeLength')?.value,
      userId: 0,
      isPublic: this.boardForm.get('type')?.value,
      isAvailable: false,
      points: 0,
      type: "",
      creatorUser: "",
      description: this.boardForm.get('description')?.value,
      originalBoardId: 0,
    };

    console.log('Board Data:', data);
    this.homeService.createApiBoard(data).subscribe(
      result => {
        this.dialogRef.close(true); 
      },
      error => {
        this.openErrorDialog();
        console.error(error);
      });
  }

  openErrorDialog() {
    const dialogRef = this.dialog.open(PopUpComponent, {
      data: 'Error, try again',
      height: '10rem',
      width: '20rem',
    });
  }

}
