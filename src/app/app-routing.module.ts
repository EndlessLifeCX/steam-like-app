import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { MainPageComponent } from './features/main-page/main-page.component';
import { SignupComponent } from './features/signup/signup.component';
import { AuthGuard } from './core/services/auth.guard';
import { ProfileComponent } from './features/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent,
  canActivate: [AuthGuard] },
  { path: 'signUp', component: SignupComponent},
  { path: 'mainPage', component: MainPageComponent,
  canActivate: [AuthGuard]},
  { path: 'signup', component: SignupComponent},
  { path: 'profile', component: ProfileComponent},

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
