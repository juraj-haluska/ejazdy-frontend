import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {
  CognitoUserPool, CognitoUser, ICognitoUserPoolData,
  IAuthenticationDetailsData, ICognitoUserData, AuthenticationDetails, CognitoUserSession
} from 'amazon-cognito-identity-js';

export interface ISignInCallbacks {
  onSuccess();

  onError();

  onAttrsNeeded();

  onVerificationCode(data: any);
}

export interface UserAttrs {
  password: string;
  family_name: string;
  given_name: string;
  phone_number: string;
}

@Injectable()
export class CognitoService {

  readonly poolData: ICognitoUserPoolData = {
    UserPoolId: environment.userPoolId,
    ClientId: environment.clientId
  };

  readonly userPool = new CognitoUserPool(this.poolData);

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
    this.cognitoUser = new CognitoUser(userData);

    this.cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session: CognitoUserSession, userConfirmationNecessary?: boolean) => {
        console.log('user signed in', session);
        callback.onSuccess();
      },
      onFailure: err => {
        console.log('user is not signed in');
        callback.onError();
      },
      newPasswordRequired: (userAttributes: any, requiredAttributes: any) => {
        console.log('additional attrs required');
        callback.onAttrsNeeded();
      }
    });
  }

  public signInUserWithAttrs(userAttributes: UserAttrs, callbacks: ISignInCallbacks) {
    if (this.cognitoUser != null) {
      this.cognitoUser.completeNewPasswordChallenge(
        userAttributes.password,
        {
          family_name: userAttributes.family_name,
          given_name: userAttributes.given_name,
          phone_number: userAttributes.phone_number
        },
        {
          onSuccess: (session: CognitoUserSession) => {
            callbacks.onSuccess();
          },
          onFailure: callbacks.onError
        }
      );
    }
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
        callback.onError();
      },
      inputVerificationCode: data => {
        console.log('verification send to', data);
        callback.onVerificationCode(data);
      }
    });
  }

  public confirmNewPassword(verificationCode: string, password: string, callback: ISignInCallbacks) {
    this.cognitoUser.confirmPassword(verificationCode, password, {
      onSuccess: () => {
        callback.onSuccess();
      },
      onFailure: () => {
        callback.onError();
      }
    });
  }
}
