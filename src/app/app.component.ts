import { Component } from '@angular/core';
import { UserService } from './shared/user.service';
import * as jquery from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'confessions-client';
  userDetails;
  constructor(private userService: UserService) { 
    if(this.userService.isLoggedIn()) {
      this.userService.getUserProfile().subscribe(
        res => {
          this.userDetails = res['user'];
        },
        err => { 
          console.log(err);
          
        }
      );
    }
  }
}
