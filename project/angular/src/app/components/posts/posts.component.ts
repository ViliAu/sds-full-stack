import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  searchTerm: string | null;
  title: string;
  body: string;

  posts: any[];

  constructor(
    public authService: AuthService,
    private postService: PostService,
    private flashMessage: FlashMessagesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initPosts();
  }

  private initPosts() {
    this.searchTerm = this.route.snapshot.queryParamMap.get("filter");
    if (this.searchTerm != null) {
      this.postService.getPostsByTitle(this.searchTerm).subscribe((res: any) => {
        this.posts = res.posts;
      });
    }
    else {
      this.postService.getAllPosts().subscribe((res: any) => {
        this.posts = res.posts;
      });
    }
  }

  onPostSubmit() {
    const postData = {
      title: this.title,
      text: this.body
    }
    this.postService.postPost(postData)?.subscribe(data => {
      if (data.success) {
        this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeOut: 3000 });
        window.location.reload();
      }
      else {
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeOut: 3000 });
      }
    });
  }

}
