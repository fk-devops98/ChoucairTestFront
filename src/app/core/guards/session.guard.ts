import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

    constructor(
        private auth$: AuthService,
        private router$: Router){
    }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.auth$.getId.subscribe((res) => {
        if (!res) {
            this.router$.navigate(['login']);
            return false;
        }
        return true;
    });

    return true;
  }

}
