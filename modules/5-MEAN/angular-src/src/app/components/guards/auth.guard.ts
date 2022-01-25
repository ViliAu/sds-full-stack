import { Injectable, NgModule } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private authService: AuthService,
        private router: Router
    ){}

    canActivate(): boolean {
        if(this.authService.loggedIn()) {
            return true;
        }
        else {
            this.router.navigate(['login']);
            return false;
        }
    }
}