// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
//import { RouterModule } from '@angular/router';
// components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfessionListComponent } from './confession-list/confession-list.component';
import { SubmitConfessionComponent } from './submit-confession/submit-confession.component';
import { FilterbystatusPipe } from './filterbystatus.pipe';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

//routes
//import { appRoutes } from './routes';
import { UserService } from './shared/user.service';
//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ConfessionSingleComponent } from './confession-single/confession-single.component';
import { VerifyEmailComponent } from './user/verify-email/verify-email.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfessionListComponent,
    SubmitConfessionComponent,
    FilterbystatusPipe,
    UserComponent,
    SignUpComponent,
    SignInComponent,
    UserProfileComponent,
    ConfessionSingleComponent,
    VerifyEmailComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
