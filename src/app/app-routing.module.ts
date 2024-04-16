import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login/login.component';
import { RegisterComponent } from './features/login/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { ProfileComponent } from './features/profile/profile.component';
import { BoardUserComponent } from './features/home/board-user/board-user.component';
import { ManageBoardsComponent } from './features/home/manage-boards/manage-boards.component';
import { AuthGuard } from './services/auth.guard';
import { CommunityComponent } from './features/community/community.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, 
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, 
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }, 
  { path: 'boards', component: BoardUserComponent, canActivate: [AuthGuard] },
  { path: 'manage', component: ManageBoardsComponent, canActivate: [AuthGuard] },
  { path: 'community', component: CommunityComponent, canActivate: [AuthGuard] },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
