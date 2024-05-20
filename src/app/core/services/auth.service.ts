import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { PersistenceService } from './persistence.service';
import { IAuthModel } from '../models/IAuthModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ComponentStore<IAuthModel> {
  constructor(
    private persistence$: PersistenceService,
    private router$: Router
  ) {
    super({
      id: '',
      username: '',
      email: '',
      accesToken: '',
    });

    const isAuth = persistence$.get('auth') as IAuthModel;
    if (isAuth) {
      this.setAuth(isAuth);
    }
  }

  readonly setAuth = this.updater((state, payload: IAuthModel) => {
    const localAuth: IAuthModel = {
      ...state,
      username: payload.username! ?? state.username,
      email: payload.email! ?? state.email,
      accesToken: payload.accesToken! ?? state.accesToken,
      id: payload.id! ?? state.id,
    };
    this.persistence$.save('auth', localAuth);
    return localAuth;
  });

  readonly getId: Observable<string> = this.select((state) => state.id);

  readonly setToken = (token: string) => {
    this.persistence$.save('tkn', token);
  };

  getTokenWithoutObs(): string {
    const tkn = this.persistence$.get('tkn');
    return tkn;
  }

  logOut(): void {
    this.setAuth({
      id: '',
      username: '',
      email: '',
      accesToken: '',
    });

    this.persistence$.delete('tkn');
    this.persistence$.delete('auth');

    this.router$.navigate(['login']);
  }
}
