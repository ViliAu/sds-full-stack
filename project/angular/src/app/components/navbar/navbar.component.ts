import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchTerm: string = "";

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogoutClick() {
    this.authService.logout();
  }

  onSearch() {
    if (this.searchTerm.length > 0)
      window.location.href = 'posts?filter=' + this.searchTerm;
  }
}
