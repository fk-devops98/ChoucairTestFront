import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { ERoutes } from 'src/app/config/routes';
import { HttpService } from 'src/app/core/services/http.service';
import { IUserRegister } from '../models/IUserRegister';
import { IUserRegistered } from '../models/IUserRegistered';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(
    private router$: Router,
    private readonly httpService$: HttpService,
    private readonly messageService$: MessageService,
  ) {}

  public register(registerData: IUserRegister): void {
    const urlNewRegister = `${ERoutes.usuario}`;

    this.httpService$
      .post<IUserRegistered>(urlNewRegister, registerData)
      .subscribe((user: IUserRegistered) => this.sucess(user));
  }

  private sucess(_: IUserRegistered): void {
    this.messageService$.add({
      severity: 'info',
      summary: 'Exito',
      detail: 'Usuario creado correctamente!!',
    });

    this.router$.navigate(['/login']);
  }
}
