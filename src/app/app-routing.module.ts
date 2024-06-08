import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login/login.component';
import { RegisterComponent } from './features/login/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { ProfileComponent } from './features/profile/profile.component';
import { ManageBoardsComponent } from './features/home/manage-boards/manage-boards.component';
import { AuthGuard } from './services/auth.guard';
import { SocialComponent } from './features/community/social/social.component';
import { FavoriteComponent } from './features/community/favorites/favorite.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, 
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, 
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }, 
  { path: 'manage', component: ManageBoardsComponent, canActivate: [AuthGuard] },
  { path: 'community', component: SocialComponent, canActivate: [AuthGuard] },
  { path: 'favorites', component: FavoriteComponent, canActivate: [AuthGuard] },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
