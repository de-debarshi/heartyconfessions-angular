import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ConfessionService } from '../shared/confession.service';
import { Confession } from '../shared/confession.model';
import { UserService } from '../shared/user.service';
declare var $ : any;
@Component({
  selector: 'app-confession-list',
  templateUrl: './confession-list.component.html',
  styleUrls: ['./confession-list.component.scss'],
  providers: [ConfessionService]
})
export class ConfessionListComponent implements OnInit {
  userDetails: any;
  likedStatus: boolean;
  pageCounter: number = 1;
  totalPages: number;
  category: string = 'All';
  constructor(public confessionService: ConfessionService, private userService: UserService ) {
    //this.confessionService.likedStatus = true;
  }
  
  ngOnInit() {
    this.refreshConfessionList();
    if(this.userService.isLoggedIn()) {
      this.userService.getUserProfile().subscribe(
        res => {
          this.userDetails = res['user'];
          console.log(this.userDetails);
        },
        err => { 
          console.log(err);
          
        }
      );
    }
    $('.selectpicker').selectpicker();
  }

  refreshConfessionList() {
    this.confessionService.getConfessionList(this.pageCounter, this.category).subscribe((res) => {
      this.confessionService.confessions = res['confessionList'] as Confession[];
      this.totalPages = res['totalPage'];
    });
  }
  nextPage() {
    if(this.pageCounter < this.totalPages) {
      this.pageCounter++;
      this.refreshConfessionList();
    }
  }

  prevPage() {
    if(this.pageCounter > 0) {
      this.pageCounter--;
      this.refreshConfessionList();
    }
  }

  liked(confession: Confession, userId: String) {
    if(this.userDetails) {
      var ids = { userid : userId , confessionid : confession._id};
      if(this.userDetails.userLikes.indexOf(confession._id)>-1) {
        this.likedStatus = true;
      } else {
        this.likedStatus = false;
      }
      console.log(this.userDetails.userLikes.indexOf(confession._id));
      if(!this.likedStatus) {
        this.confessionService.putLike(confession).subscribe((res) => {
          //this.refreshConfessionList();
        });
        
        this.userService.saveUserLike(ids).subscribe((res) => {
          this.userDetails = res;
          this.refreshConfessionList();
        });
      } else {
        this.confessionService.unLike(confession).subscribe((res) => {
          //this.refreshConfessionList();
        });
        this.userService.deleteUserLike(ids).subscribe((res) => {
          this.userDetails = res;
          this.refreshConfessionList();
        });
      }
    } else {
      return false;
    }
  }

  commentSubmit(form: NgForm) {
    if (form.value._id == "") {
      console.log('id not available');
    }
    else {
      console.log(form.value);
      this.confessionService.postComment(form.value).subscribe((res) => {
        this.refreshConfessionList();
      });
    }
  }
}
