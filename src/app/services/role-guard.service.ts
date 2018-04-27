import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import {CognitoService} from './cognito.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(private cognito: CognitoService) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.cognito.isAuthenticatedAs(route.data.allowedGroups);
  }
}
