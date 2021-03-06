import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string;
  email: string;
  username: string;
  password: string

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Form validation
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show("Please fill in all fields", { cssClass: 'alert-danger', timeOut: 3000 });
      return false;
    }
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show("Please use a valid email", { cssClass: 'alert-danger', timeOut: 3000 });
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show("You are now registered and can log in", { cssClass: 'alert-success', timeOut: 3000 });
        this.router.navigate(['/login']);
      }
      else {
        this.flashMessage.show("Something went wrong", { cssClass: 'alert-danger', timeOut: 3000 });
        this.router.navigate(['/register']);
      }
    });
    return true
  }
}
