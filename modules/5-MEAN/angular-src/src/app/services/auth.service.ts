import { Injectable } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators'
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

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

    return this.http.post<any>('http://localhost:3000/users/register', user, {headers: headers});/*.pipe(map( res => {
      res.json();
    } ));*/
  }

  authenticateUser(user: any){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post<any>('http://localhost:3000/users/authenticate', user, {headers: headers});
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

  /*loggedIn() {
    return tokenNotExpired('id_token');
  }*/

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
