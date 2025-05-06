import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { UserService } from '../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  message: String = 'Verifying reset token';
  model = {
    token: '',
    password: ''
  }
  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe( params => {
      this.model.token = params['t'];
    });
    this.userService.resetVerify(this.model.token).subscribe(
      res => {
        this.message = 'Token Verified successfully!!';
        console.log(res);
      },
      err => { 
        console.log(err);
      }
    )
  }
  onSubmit(form : NgForm){
    this.userService.resetPassword(form.value).subscribe(
      res => {
        this.message = 'Password Reset Successfully!!';
        //this.userService.setToken(res['token']);
        //this.router.navigateByUrl('/userprofile');
        //location.reload();
      },
      err => {
        //this.serverErrorMessages = err.error.message;
      }
    );
  }
}
