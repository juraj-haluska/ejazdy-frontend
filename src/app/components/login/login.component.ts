import {Component, OnInit} from '@angular/core';
import {ISignInCallbacks, CognitoService, UserAttrs} from '../../services/cognito.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, ISignInCallbacks {

  // states
  readonly STATE_LOGIN = 0;
  readonly STATE_ATTRS = 1;
  readonly STATE_RESET = 2;
  readonly STATE_CODE = 3;

  state = this.STATE_LOGIN;

  // password hiding
  hide = true;

  // fields
  public email: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public phoneNumber: string;
  public confirmCode: string;

  public emailControl = new FormControl(
    '',
    [
      Validators.required,
      Validators.email
    ]
  );

  public passwordControl = new FormControl(
    '',
    [
      Validators.required,
      Validators.minLength(8)
    ]
  );

  constructor(private cognito: CognitoService,
              private router: Router,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  getEmailErrorMessage() {
    return this.emailControl.hasError('required') ? 'You must enter a value' :
      this.emailControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  public signIn() {
    if (this.emailControl.valid && this.passwordControl.valid) {
      this.cognito.signInUser(this.email, this.password, this);
    }
  }

  public saveAttrs() {
    const userAttrs: UserAttrs = {
      password: this.password,
      given_name: this.firstName,
      family_name: this.lastName,
      phone_number: this.phoneNumber
    };

    this.cognito.signInUserWithAttrs(this.email, userAttrs, this);
  }

  public forgotPassword() {
    this.state = this.STATE_RESET;
  }

  public sendVerificationCode() {
    if (this.emailControl.valid) {
      this.cognito.forgotPassword(this.email, this);
    }
  }

  public confirmVerificationCode() {
    this.cognito.confirmNewPassword(this.email, this.confirmCode, this.password, this);
  }

  // callbacks
  public onSuccess() {
    this.cognito.isAuthenticated().subscribe(is => {
      if (is) {
        this.snackBar.open('Welcome!', null, {
          duration: 2000
        });
        this.router.navigate(['/home']);
      } else {
        this.state = this.STATE_LOGIN;
      }
    });
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
