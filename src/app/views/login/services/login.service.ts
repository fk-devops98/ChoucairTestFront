import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ERoutes } from 'src/app/config/routes';
import { IAuthModel } from 'src/app/core/models/IAuthModel';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { IUserLogin } from '../models/IUserLogin';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    public router$: Router,
    private readonly httpService$: HttpService,
    private readonly authService$: AuthService
  ) {}

  public login(loginData: IUserLogin): void {
    const urlLogin = `${ERoutes.usuario}/login`;

    this.httpService$.post<IAuthModel>(urlLogin, loginData).subscribe(
      (user: IAuthModel) => this.sucess(user)
    );
  }

  public sucess({ id, username, email, accesToken }: IAuthModel): void {
    this.authService$.setAuth({
      id,
      username,
      email,
      accesToken,
    });

    this.authService$.setToken(accesToken);

    this.router$.navigate(['/tareas']);
  }


}
