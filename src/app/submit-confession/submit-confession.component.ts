import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ConfessionService } from '../shared/confession.service';
import { Confession } from '../shared/confession.model';
declare var $ : any;

@Component({
  selector: 'app-submit-confession',
  templateUrl: './submit-confession.component.html',
  styleUrls: ['./submit-confession.component.scss'],
  providers: [ConfessionService]
})

export class SubmitConfessionComponent implements OnInit {

  constructor(public confessionService: ConfessionService) { }

  ngOnInit() {
    this.resetForm();
    //this.refreshConfessionList();
    $('.selectpicker').selectpicker();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.confessionService.selectedConfession = {
      _id: "",
      age: null,
      sex: "",
      content: "",
      status: "",
      categories: null,
      likes: null,
      comments : null
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.confessionService.postConfession(form.value).subscribe((res) => {
        location.reload();
        //this.resetForm(form);
        //this.refreshConfessionList();
      });
    }
    else {
      this.confessionService.putConfession(form.value).subscribe((res) => {
        this.resetForm(form);
        //this.refreshConfessionList();
      });
    }
  }

  /* refreshConfessionList() {
    this.confessionService.getConfessionList().subscribe((res) => {
      this.confessionService.confessions = res as Confession[];
    });
  } */

  onEdit(emp: Confession) {
    this.confessionService.selectedConfession = emp;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.confessionService.deleteConfession(_id).subscribe((res) => {
        //this.refreshConfessionList();
        this.resetForm(form);
      });
    }
  }


}
