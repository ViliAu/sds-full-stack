import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

    constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  getUserPosts(id: string): any {
    let headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    return this.http.get<any>('/api/posts?user='+id, {headers: headers});
  }

  getAllPosts(): any {
    let headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    return this.http.get('/api/posts', {headers: headers});
  }

  getPostsByTitle(title: string|null) {
    let headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    return this.http.get('/api/posts/'+title, {headers: headers});
  }

  postPost(post: any) {
    if (!this.authService.loggedIn) {
      this.router.navigate(['login']);
      return;
    }
    let headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': this.authService.authToken
    });
    return this.http.post<any>('/api/posts', post, {headers: headers});
  }
}
