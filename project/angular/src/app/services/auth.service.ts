import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(
    private http: HttpClient
  ) { }

  registerUser(user: any){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post<any>('http://localhost:8080/users/register', user, {headers: headers});
  }

  authenticateUser(user: any){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post<any>('http://localhost:8080/users/login', user, {headers: headers});
  }

  getProfile() {
    this.loadToken();
    let headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': this.authToken
    });
    console.log(headers);
    return this.http.get<any>('http://localhost:8080/users/profile', {headers: headers});
  }

  storeUserData(token: any, user: any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    this.loadToken();
    const helper = new JwtHelperService();
    return !helper.isTokenExpired(this.authToken);
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
