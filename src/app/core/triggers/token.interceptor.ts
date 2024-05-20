import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, share, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private auth$: AuthService) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        return of(this.auth$.getTokenWithoutObs()).pipe(
            switchMap((token) => {
              if (token) {
                  request = request.clone({
                      setHeaders: { Authorization: `Bearer ${token}` },
                  });
              }
              return next.handle(request).pipe(
                  share(),
                  map((event: HttpEvent<any>) => {
                      if (event instanceof HttpResponse) {
                          const token = event.headers.get('authorization');
                          if (token) {
                              this.auth$.setToken(token);
                          }
                      }
                      return event;
                  })
              );
            })
        );
    }
}
