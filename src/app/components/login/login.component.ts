import {Component, OnInit} from '@angular/core';
import {ISignInCallbacks, CognitoService, UserAttrs} from '../../services/cognito.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, ISignInCallbacks {

  readonly STATE_LOGIN = 0;
  readonly STATE_ATTRS = 1;
  readonly STATE_RESET = 2;
  readonly STATE_CODE = 3;

  state = this.STATE_LOGIN;
  hide = true;
  public email: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public phoneNumber: string;
  public confirmCode: string;

  constructor(private cognito: CognitoService,
              private router: Router,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  public signIn() {
    this.cognito.signInUser(this.email, this.password, this);
  }

  public saveAttrs() {
    const userAttrs: UserAttrs = {
      password: this.password,
      family_name: this.firstName,
      given_name: this.lastName,
      phone_number: this.phoneNumber
    };

    this.cognito.signInUserWithAttrs(this.email, userAttrs, this);
  }

  public forgotPassword() {
    this.state = this.STATE_RESET;
  }

  public sendVerificationCode() {
    this.cognito.forgotPassword(this.email, this);
  }

  public confirmVerificationCode() {
    this.cognito.confirmNewPassword(this.email, this.confirmCode, this.password, this);
  }

  // callbacks
  public onSuccess() {
    this.snackBar.open('Welcome!', null, {
      duration: 2000
    });
    this.router.navigate(['/home']);
  }

  public onError(err: any) {
    console.log(err);
  }

  public onAttrsNeeded() {
    this.password = '';
    this.state = this.STATE_ATTRS;
  }

  public onVerificationCode() {
    this.password = '';
    this.state = this.STATE_CODE;
  }
}
