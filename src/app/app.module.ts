import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// material design components
import {
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatInputModule,
  MatCardModule,
  MatSnackBarModule,
  MatTableModule,
  MatDialogModule
} from '@angular/material';

import {AppComponent} from './components/app/app.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {MainComponent} from './components/main/main.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';

// routes
import {RoutingModule} from '../app.routing';


// services
import {CognitoService} from './services/cognito.service';
import {TokenInterceptor} from './common/token-interceptor';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './common/jwt-interceptor';
import {ApiService} from './services/api.service';
import {AuthGuardService} from './services/auth-guard.service';
import {InstructorAdminComponent} from './components/instructor-admin/instructor-admin.component';
import {InviteUserDialogComponent} from './components/dialogs/invite-user-dialog/invite-user-dialog.component';
import {RoleGuardService} from './services/role-guard.service';
import {ApiBaseUrlInterceptor} from './common/api-base-url-interceptor';
import { StudentAdminComponent } from './components/student-admin/student-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    MainComponent,
    LoginComponent,
    HomeComponent,
    InstructorAdminComponent,
    InviteUserDialogComponent,
    StudentAdminComponent
  ],
  entryComponents: [InviteUserDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [
    CognitoService,
    ApiService,
    HttpClient,
    AuthGuardService,
    RoleGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiBaseUrlInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
