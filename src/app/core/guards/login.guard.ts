import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class LoginGuard implements CanActivate {
    constructor(private auth$: AuthService, private router$: Router) {}

    canActivate():
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        this.auth$.getId.subscribe((res) => {
          console.log(res);

            if (res) {
                this.router$.navigate(['/tareas']);
            }
        });

        return true;
    }
}
