import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private showingModal: boolean = false;

    /**
     *
     */
    constructor(
        private auth$: AuthService,
        private messageService$: MessageService
    ) {}
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                // Aquí puedes realizar el manejo del error según tus necesidades
                if (error.status == 401 || error.status == 403) {
                    if (!this.showingModal) {
                        this.showingModal = true;
                        this.messageService$.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: "Su sesión se ha vencido, por favor ingresar nuevamente",
                        });
                        this.auth$.logOut();
                        this.showingModal = false;
                    }
                } else {
                    if (Array.isArray(error.error.message)) {
                        error.error.message.map((msg: string) => {
                          console.log(msg);
                          this.messageService$.add({
                              severity: 'error',
                              summary: 'Error',
                              detail: msg,
                          });
                        });
                    } else {
                      this.messageService$.add({
                          severity: 'error',
                          summary: 'Error',
                          detail: error.error.message,
                      });
                    }
                }

                // Puedes relanzar el error para que el componente que realizó la petición también lo maneje
                return throwError(() => {
                    return error;
                });
            })
        );
    }
}
