import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfessionListComponent } from './confession-list/confession-list.component';
import { SubmitConfessionComponent } from './submit-confession/submit-confession.component';

import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ConfessionSingleComponent } from './confession-single/confession-single.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'home', component: ConfessionListComponent },
  { path: 'submit', component: SubmitConfessionComponent },
  { path: 'confession', component: ConfessionSingleComponent },
  {
      path: 'signup', component: UserComponent,
      children: [{ path: '', component: SignUpComponent }]
  },
  {
      path: 'login', component: UserComponent,
      children: [{ path: '', component: SignInComponent }]
  },
  {
      path: 'userprofile', component: UserProfileComponent,canActivate:[AuthGuard]
  },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  //{ path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
