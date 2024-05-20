import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RegisterService } from './services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [MessageService],
})
export class RegisterComponent {
  username: string;
  password: string;
  password2: string;

  constructor(
    public router$: Router,
    private readonly messageService$: MessageService,
    private readonly registerService$: RegisterService
  ) {}

  public register(): void {
    if (!this.username || !this.password || !this.password2) {
      this.messageService$.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Complete los datos y por favor intente nuevamente!!',
      });
      return;
    }

    if (this.password != this.password2) {
      this.messageService$.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Las contraseñas no coinciden, valide los datos por favor!!',
      });
      return;
    }

    this.registerService$.register({
      email: this.username,
      password: this.password2,
    });
  }

  public cancelar(): void {
    this.router$.navigate(['/login']);
  }
}
