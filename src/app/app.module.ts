import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login/login.component';
import { RegisterComponent } from './features/login/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { ProfileComponent } from './features/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PopUpComponent } from './shared/components/popup/popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { ManageBoardsComponent } from './features/home/manage-boards/manage-boards.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from './features/login/service/login.service';
import { TaskPopUpComponent } from './features/home/task-popup/task-popup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommunityComponent } from './features/community/community.component';
import { CardComponent } from './features/community/card/card.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatCardModule } from '@angular/material/card';
import { NewBoardPopUpComponent } from './features/home/manage-boards/newboard-popup/newboard-popup.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { BoardInfoPopUpComponent } from './features/home/manage-boards/board-info-popup/board-info-popup.component';
import { NewTaskPopUpComponent } from './features/home/new-task-popup/new-task-popup.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    ManageBoardsComponent,
    SidebarComponent,
    PopUpComponent,
    TaskPopUpComponent,
    CommunityComponent,
    CardComponent,
    NewBoardPopUpComponent,
    BoardInfoPopUpComponent,
    NewTaskPopUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatDialogModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule, 
    MatInputModule,
    MatFormFieldModule,
    MatTreeModule,
    MatCardModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSliderModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
