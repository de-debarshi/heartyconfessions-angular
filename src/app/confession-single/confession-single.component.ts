import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfessionService } from '../shared/confession.service';
import { Confession } from '../shared/confession.model';
import { UserService } from '../shared/user.service';
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-confession-single',
  templateUrl: './confession-single.component.html',
  styleUrls: ['./confession-single.component.scss']
})
export class ConfessionSingleComponent implements OnInit {
  confessionID: String;
  selectedConfession: Confession = new Confession;
  userDetails: any;
  likedStatus: boolean;
  shareData: object;
  constructor(private route: ActivatedRoute, public confessionService: ConfessionService, private userService: UserService) { }

  ngOnInit() {
    this.route.queryParams.subscribe( params => {
      this.confessionID = params['c'];
    });
    this.shareData = {
      title: 'Hearty Confession',
      text: 'Check out this interesting confession!',
      url: environment.WEBSITE_URL + '?c=' + this.confessionID,
    }
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
    this.refreshConfession();
  }
  refreshConfession() {
    this.confessionService.getConfession(this.confessionID).subscribe((res) => {
      this.selectedConfession = res as Confession;
    });
  }
  
  liked(confession: Confession) {
    if(this.userDetails) {
      var ids = { userid : this.userDetails._id , confessionid : confession._id};
      if(this.userDetails.userLikes.indexOf(confession._id)>-1) {
        this.likedStatus = true;
      } else {
        this.likedStatus = false;
      }
      console.log(this.userDetails.userLikes.indexOf(confession._id));
      if(!this.likedStatus) {
        this.confessionService.putLike(confession).subscribe((res) => {
          //this.refreshConfession();
        });
        
        this.userService.saveUserLike(ids).subscribe((res) => {
          this.userDetails = res;
          this.refreshConfession();
        });
      } else {
        this.confessionService.unLike(confession).subscribe((res) => {
          //this.refreshConfession();
        });
        this.userService.deleteUserLike(ids).subscribe((res) => {
          this.userDetails = res;
          this.refreshConfession();
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
        this.refreshConfession();
      });
    }
  }
  
  // Must be triggered some kind of "user activation"
  shareConfession = async () => {
    try {
      await navigator.share(this.shareData);
      //resultPara.textContent = 'MDN shared successfully'
    } catch(err) {
      //resultPara.textContent = 'Error: ' + err
    }
  }
}
