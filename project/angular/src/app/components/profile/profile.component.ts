import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string;
  posts: any;

  constructor(
    public authService: AuthService,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.initPage();
  }

  initPage() {
    this.authService.getProfile().subscribe(user => {
      this.username = user.user.username;
      this.postService.getUserPosts(user.user._id).subscribe((data: any) => {
        console.log(data)
        this.posts = data.posts;
      });
    });  
  }

}
