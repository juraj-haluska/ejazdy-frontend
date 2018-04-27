import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {CognitoService} from './cognito.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private cognito: CognitoService, private router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this.cognito.isAuthenticated().do(is => {
      if (!is) {
        this.router.navigate(['/login']);
      }
    });
  }
}
