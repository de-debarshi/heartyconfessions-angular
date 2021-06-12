import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  token: String;
  message: String = 'Verifying user....';
  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe( params => {
      this.token = params['t'];
    });
    this.userService.verify(this.token).subscribe(
      res => {
        this.message = 'User Verified successfully!!';
        console.log(res);
      },
      err => { 
        console.log(err);
      }
    )
  }

}
