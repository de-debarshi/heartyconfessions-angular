import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ConfessionService } from '../shared/confession.service';
import { Confession } from '../shared/confession.model';


@Component({
  selector: 'app-confession-list',
  templateUrl: './confession-list.component.html',
  styleUrls: ['./confession-list.component.scss'],
  providers: [ConfessionService]
})
export class ConfessionListComponent implements OnInit {

  constructor(public confessionService: ConfessionService) { }
  
  ngOnInit() {
    this.refreshConfessionList();
  }

  refreshConfessionList() {
    this.confessionService.getConfessionList().subscribe((res) => {
      this.confessionService.confessions = res as Confession[];
    });
  }

  liked(emp: Confession) {
      this.confessionService.putLike(emp).subscribe((res) => {
        this.refreshConfessionList();
      });
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
