import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {
  CognitoUserPool, CognitoUser, ICognitoUserPoolData,
  IAuthenticationDetailsData, ICognitoUserData, AuthenticationDetails, CognitoUserSession
} from 'amazon-cognito-identity-js';
import {Observable} from 'rxjs/Observable';

export interface ISignInCallbacks {
  onSuccess();

  onError(err: any);

  onAttrsNeeded();

  onVerificationCode(data: any);
}

export interface IGetTokenCallbacks {
  onSuccess(token: string);

  onError();
}

export interface UserAttrs {
  password: string;
  family_name: string;
  given_name: string;
  phone_number: string;
}

@Injectable()
export class CognitoService {

  private readonly poolData: ICognitoUserPoolData = {
    UserPoolId: environment.userPoolId,
    ClientId: environment.clientId
  };

  private readonly userPool = new CognitoUserPool(this.poolData);

  private cognitoUser: CognitoUser = null;

  constructor() {

  }

  public signInUser(email: string, password: string, callback: ISignInCallbacks) {
    const authenticationData: IAuthenticationDetailsData = {
      Username: email,
      Password: password
    };

    const userData: ICognitoUserData = {
      Username: email,
      Pool: this.userPool
    };

    const authenticationDetails: AuthenticationDetails = new AuthenticationDetails(authenticationData);
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session: CognitoUserSession) => {
        console.log('user signed in', session);
        callback.onSuccess();
      },
      onFailure: err => {
        console.log('user is not signed in');
        callback.onError(err);
      },
      newPasswordRequired: () => {
        console.log('additional attrs required');
        this.cognitoUser = cognitoUser;
        callback.onAttrsNeeded();
      }
    });
  }

  public signInUserWithAttrs(email: string, userAttributes: UserAttrs, callbacks: ISignInCallbacks) {

    const cognitoUser = this.cognitoUser;

    cognitoUser.completeNewPasswordChallenge(
      userAttributes.password,
      {
        family_name: userAttributes.family_name,
        given_name: userAttributes.given_name,
        phone_number: userAttributes.phone_number
      },
      {
        onSuccess: () => {
          callbacks.onSuccess();
        },
        onFailure: callbacks.onError
      }
    );
  }

  public forgotPassword(email: string, callback: ISignInCallbacks) {
    const userData: ICognitoUserData = {
      Username: email,
      Pool: this.userPool
    };

    this.cognitoUser = new CognitoUser(userData);
    this.cognitoUser.forgotPassword({
      onSuccess: data => {
        console.log('password reset success: ', data);
        callback.onSuccess();
      },
      onFailure: err => {
        console.log('password reset fail: ', err);
        callback.onError(err);
      },
      inputVerificationCode: data => {
        console.log('verification send to', data);
        callback.onVerificationCode(data);
      }
    });
  }

  public confirmNewPassword(email: string, verificationCode: string, password: string, callback: ISignInCallbacks) {
    this.cognitoUser.confirmPassword(verificationCode, password, {
      onSuccess: () => {
        callback.onSuccess();
      },
      onFailure: (err) => {
        callback.onError(err);
      }
    });
  }

  public logout() {
    this.userPool.getCurrentUser().signOut();
  }

  public isAuthenticatedAs(allowedGroups: Array<string>): Observable<boolean> {
    const cognitoUser: CognitoUser = this.userPool.getCurrentUser();

    return Observable.create(observer => {
      if (cognitoUser != null) {
        cognitoUser.getSession((err, session: CognitoUserSession) => {
          if (err == null) {
            const payload: any = session.getIdToken().decodePayload();
            const tokenGroups: Array<string> = payload['cognito:groups'];

            let allow = false;

            tokenGroups.map(tokenGroup => {
              allowedGroups.map(allowedGroup => {
                if (allowedGroup === tokenGroup) {
                  allow = true;
                }
              });
            });

            observer.next(allow);
          } else {
            observer.next(false);
          }
        });
      } else {
        observer.next(false);
      }
    });
  }

  public isAuthenticated(): Observable<boolean> {
    const cognitoUser: CognitoUser = this.userPool.getCurrentUser();

    return Observable.create(observer => {
      if (cognitoUser != null) {
        cognitoUser.getSession((err) => {
          if (err == null) {
            observer.next(true);
          } else {
            observer.next(false);
          }
        });
      } else {
        observer.next(false);
      }
    });
  }

  public getIdToken(callbacks: IGetTokenCallbacks) {
    const cognitoUser: CognitoUser = this.userPool.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession((err, session: CognitoUserSession) => {
        if (err == null) {
          callbacks.onSuccess(session.getIdToken().getJwtToken());
        } else {
          callbacks.onError();
        }
      });
    } else {
      callbacks.onError();
    }
  }

  public getMyUUID(): string {
    const cognitoUser: CognitoUser = this.userPool.getCurrentUser();
    if (cognitoUser != null) {
      return cognitoUser.getUsername();
    }
    return null;
  }
}
