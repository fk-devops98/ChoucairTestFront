import { IUserLogin } from './models/IUserLogin';
import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent {

  username: string;
  password: string;

  constructor(
    public router$: Router,
    private readonly loginService$: LoginService,
    private readonly messageService$: MessageService
  )
  {}

  public login(): void {

    if (!this.username || !this.password) {

      this.messageService$.add({
          severity: 'error',
          summary: 'Error',
          detail: "Complete los datos y por favor intente nuevamente!!",
      });

      return;

    }

    const loginData : IUserLogin = {
      email: this.username,
      password: this.password,
    };

    this.loginService$.login(loginData);
  }

  public register() : void{
    this.router$.navigate(['/register']);
  }
}
