import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

import { Confession } from './confession.model';

@Injectable({
  providedIn: 'root'
})
export class ConfessionService {

  selectedConfession: Confession = new Confession;
  confessions: Confession[] = [];
  readonly baseURL = 'http://52.66.28.17:3000/confession';
  username: string;
  comment: string;
  
  constructor(private http: HttpClient) { }

  postConfession(emp: Confession) {
    return this.http.post(this.baseURL, emp);
  }

  getConfessionList() {
    return this.http.get(this.baseURL);
  }

  putConfession(emp: Confession) {
    return this.http.put(this.baseURL + `/${emp._id}`, emp);
  }
  putLike(emp: Confession) {
    return this.http.put(this.baseURL + `/liked&id=${emp._id}`, emp);
  }
  unLike(emp: Confession) {
    return this.http.put(this.baseURL + `/unliked&id=${emp._id}`, emp);
  }
  postComment(form: NgForm) {
    return this.http.post(this.baseURL + `/comment`, form);
  }
  deleteConfession(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}

