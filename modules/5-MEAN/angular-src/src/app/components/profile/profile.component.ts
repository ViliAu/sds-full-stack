import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: {
    name: string,
    username: string,
    email: string,
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      console.log(profile)
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
