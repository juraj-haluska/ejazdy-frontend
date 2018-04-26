import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {CognitoService} from '../services/cognito.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private cognito: CognitoService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.cognito.getIdToken({
      onSuccess: token => {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      },
      onError: () => {
        // do nothing
      }
    });

    return next.handle(request);
  }
}
