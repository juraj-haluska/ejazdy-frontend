import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MainComponent} from './app/components/main/main.component';
import {PageNotFoundComponent} from './app/components/page-not-found/page-not-found.component';
import {LoginComponent} from './app/components/login/login.component';
import {HomeComponent} from './app/components/home/home.component';

import {AuthGuardService} from './app/services/auth-guard.service';
import {InstructorsAdminComponent} from './app/components/instructors-admin/instructors-admin.component';
import {RoleGuardService} from './app/services/role-guard.service';
import {StudentsAdminComponent} from './app/components/students-admin/students-admin.component';
import {LessonsInstructorComponent} from './app/components/lessons-instructor/lessons-instructor.component';
import {LessonsRegStudentComponent} from './app/components/lessons-reg-student/lessons-reg-student.component';
import {LessonsListStudentComponent} from './app/components/lessons-list-student/lessons-list-student.component';
import {LessonsAdminComponent} from './app/components/lessons-admin/lessons-admin.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    component: MainComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'instructors',
        component: InstructorsAdminComponent,
        canActivate: [RoleGuardService],
        data: {
          allowedGroups: ['admin']
        }
      },
      {
        path: 'students',
        component: StudentsAdminComponent,
        canActivate: [RoleGuardService],
        data: {
          allowedGroups: ['admin']
        }
      },
      {
        path: 'calendar/instructor',
        component: LessonsInstructorComponent,
        canActivate: [RoleGuardService],
        data: {
          allowedGroups: ['admin', 'instructor']
        }
      },
      {
        path: 'registration/student',
        component: LessonsRegStudentComponent,
        canActivate: [RoleGuardService],
        data: {
          allowedGroups: ['student']
        }
      },
      {
        path: 'student/lessons',
        component: LessonsListStudentComponent,
        canActivate: [RoleGuardService],
        data: {
          allowedGroups: ['student']
        }
      },
      {
        path: 'lessons',
        component: LessonsAdminComponent,
        canActivate: [RoleGuardService],
        data: {
          allowedGroups: ['admin']
        }
      }
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class RoutingModule {
}
