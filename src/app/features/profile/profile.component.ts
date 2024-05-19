import { Component, OnInit } from '@angular/core';
import { ProfileService } from './services/profile.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserModel } from '../login/models/user-model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    name: new FormControl({ value: '', disabled: true }),
    email: new FormControl({ value: '', disabled: true }, Validators.required),
    password: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
  });

  user: UserModel;
  formEditable = false;

  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.profileService.getLocalStorage();
    this.user = this.profileService.user;
    this.profileForm.get('id')?.setValue(this.user.id);
    this.profileForm.get('name')?.setValue(this.user.name);
    this.profileForm.get('email')?.setValue(this.user.email);
    this.profileForm.get('password')?.setValue(this.user.password);
  }

  onSave() {
    this.formEditable = !this.formEditable;
    this.profileForm.get('name')?.disable();
    this.profileForm.get('password')?.disable();

    const userData = localStorage.getItem('userData');
    if (userData) {
      this.user = JSON.parse(userData) as UserModel;
    }
    this.user.name = this.profileForm.get('name')?.value;
    this.user.password = this.profileForm.get('password')?.value;

    this.profileService.updateApiProfile(this.user).subscribe((result) => {
      if(result.message == "User modified"){
        console.log(123)
      };
    });

    localStorage.setItem('userData', JSON.stringify(this.user));
  }

  toggleEditable(): void {
    this.formEditable = !this.formEditable;
    this.profileForm.get('name')?.enable();
    this.profileForm.get('password')?.enable();
  }
}
