import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
  MatDialogModule,
  MatDatepickerModule, MatNativeDateModule, MatChipsModule, MatMenuModule, MatPaginatorModule, MatRadioModule, MatButtonToggleModule
} from '@angular/material';
import {MatMomentDateModule} from '@angular/material-moment-adapter';

import {AppComponent} from './components/app/app.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {MainComponent} from './components/main/main.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';

// routes
import {RoutingModule} from '../app.routing';

import {CognitoService} from './services/cognito.service';
import {TokenInterceptor} from './common/token-interceptor';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './common/jwt-interceptor';
import {ApiService} from './services/api.service';
import {AuthGuardService} from './services/auth-guard.service';
import {InstructorsAdminComponent} from './components/instructors-admin/instructors-admin.component';
import {InviteUserDialogComponent} from './components/dialogs/invite-user-dialog/invite-user-dialog.component';
import {RoleGuardService} from './services/role-guard.service';
import {ApiBaseUrlInterceptor} from './common/api-base-url-interceptor';
import {StudentsAdminComponent} from './components/students-admin/students-admin.component';
import {LessonsInstructorComponent} from './components/lessons-instructor/lessons-instructor.component';
import {LessonsRegStudentComponent} from './components/lessons-reg-student/lessons-reg-student.component';
import { SelectStudentDialogComponent } from './components/dialogs/select-student-dialog/select-student-dialog.component';
import { NewLessonDialogComponent } from './components/dialogs/new-lesson-dialog/new-lesson-dialog.component';
import { LessonsListStudentComponent } from './components/lessons-list-student/lessons-list-student.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    MainComponent,
    LoginComponent,
    HomeComponent,
    InstructorsAdminComponent,
    InviteUserDialogComponent,
    StudentsAdminComponent,
    LessonsInstructorComponent,
    LessonsRegStudentComponent,
    SelectStudentDialogComponent,
    NewLessonDialogComponent,
    LessonsListStudentComponent
  ],
  entryComponents: [
    InviteUserDialogComponent,
    SelectStudentDialogComponent,
    NewLessonDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatChipsModule,
    MatMenuModule,
    MatMomentDateModule,
    MatPaginatorModule,
    MatRadioModule,
    MatButtonToggleModule
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
