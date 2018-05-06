import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {User} from '../model/User';
import {Lesson} from '../model/Lesson';
import {CognitoService} from './cognito.service';
import * as moment from 'moment';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient,
              private cognito: CognitoService) {
  }

  public getAllInstructors(): Observable<Array<User>> {
    return this.http.get<Array<User>>('/instructors');
  }

  public getAllStudents(): Observable<Array<User>> {
    return this.http.get<Array<User>>('/students');
  }

  public inviteNewInstructor(email: string): Observable<User> {
    const params = new HttpParams().set('email', email);

    return this.http.post<User>(
      '/instructors',
      null, {
        params: params
      });
  }

  public inviteNewStudent(email: string): Observable<User> {
    const params = new HttpParams().set('email', email);

    return this.http.post<User>(
      '/students',
      null, {
        params: params
      });
  }

  public deleteInstructor(instructorId: string): Observable<User> {
    return this.http.delete<User>(`/instructors/${instructorId}`);
  }

  public deleteStudent(studentId: string): Observable<User> {
    return this.http.delete<User>(`/students/${studentId}`);
  }

  public getLessonsByInstructor(instructorId: string): Observable<Array<Lesson>> {
    return this.http.get<Array<Lesson>>(`/instructors/${instructorId}/lessons`);
  }

  public getLessonsByInstructorUpcoming(instructorId: string): Observable<Array<Lesson>> {
    return this.http.get<Array<Lesson>>(
      `/instructors/${instructorId}/lessons`,
      {
        params: new HttpParams().set('since', moment().toISOString())
      }
    );
  }

  public getLessonsByMeUpcoming(): Observable<Array<Lesson>> {
    return this.http.get<Array<Lesson>>(
      `/students/me/lessons`,
      {
        params: new HttpParams().set('since', moment().toISOString())
      }
    );
  }

  public addLessonByMe(lesson: Lesson): Observable<Lesson> {
    const instructorId = this.cognito.getMyUUID();
    return this.http.post<Lesson>(
      `/instructors/${instructorId}/lessons/`,
      lesson
    );
  }

  public registerMeToLesson(lesson: Lesson): Observable<Lesson> {
    const startTime = lesson.startTime;
    const instructorId = lesson.instructorId;

    return this.http.post<Lesson>(
      `/instructors/${instructorId}/lessons/${startTime}/student/me`,
      null
    );
  }

  public unregisterMeFromLesson(lesson: Lesson): Observable<Lesson> {
    const startTime = lesson.startTime;
    const instructorId = lesson.instructorId;

    lesson.studentId = null;
    return this.http.delete<Lesson>(
      `/instructors/${instructorId}/lessons/${startTime}/student/me`
    );
  }

  public deleteLesson(lesson: Lesson): Observable<Lesson> {
    const startTime = lesson.startTime;
    const instructorId = lesson.instructorId;

    return this.http.delete<Lesson>(
      `/instructors/${instructorId}/lessons/${startTime}`
    );
  }

  public registerStudentToLesson(lesson: Lesson, studentId: string): Observable<Lesson> {
    const startTime = lesson.startTime;
    const instructorId = lesson.instructorId;

    return this.http.post<Lesson>(
      `/instructors/${instructorId}/lessons/${startTime}/student/${studentId}`,
      null
    );
  }

  public unregisterStudentToLesson(lesson: Lesson, studentId: string): Observable<Lesson> {
    const startTime = lesson.startTime;
    const instructorId = lesson.instructorId;

    return this.http.delete<Lesson>(
      `/instructors/${instructorId}/lessons/${startTime}/student/${studentId}`
    );
  }

}
