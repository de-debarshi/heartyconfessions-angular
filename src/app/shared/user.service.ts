import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    _id: '',
    userName: '',
    email: '',
    isVerified: false,
    password: '',
    userLikes: []
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient, private router: Router) { }
  readonly baseURL = environment.API_URL + '/auth';
  //HttpMethods

  postUser(user: User){
    return this.http.post(this.baseURL+'/register',user,this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(this.baseURL + '/authenticate', authCredentials,this.noAuthHeader);
  }

  verify(token) {
    return this.http.get(this.baseURL + '/verify/' + token,this.noAuthHeader);
  }
  forgotPassword(email) {
    return this.http.post(this.baseURL + '/recover',{email: email}, this.noAuthHeader);
  }
  resetVerify(token) {
    return this.http.post(this.baseURL + '/resetverify', {token: token},this.noAuthHeader);
  }
  resetPassword(resetCredentials) {
    return this.http.post(this.baseURL + '/resetpassword', resetCredentials,this.noAuthHeader);
  }
  getUserProfile() {
    return this.http.get(this.baseURL + '/userProfile');
  }
  saveUserLike(likeDetails: Object){
    return this.http.post(this.baseURL+'/saveUserLike',likeDetails,this.noAuthHeader);
  }
  deleteUserLike(likeDetails: Object){
    return this.http.post(this.baseURL+'/deleteUserLike',likeDetails,this.noAuthHeader);
  }
  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      this.deleteToken();
      return false;
  }

  onLogout(){
    this.deleteToken();
    this.router.navigate(['/login']);
    //location.reload();
  }
}
