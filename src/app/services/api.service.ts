import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {User} from '../model/User';
import {Lesson} from '../model/Lesson';
import {RequestOptions} from '@angular/http';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {
  }

  public getAllInstructors(): Observable<Array<User>> {
    return this.http.get<Array<User>>('/instructor');
  }

  public getAllStudents(): Observable<Array<User>> {
    return this.http.get<Array<User>>('/student');
  }

  public inviteNewInstructor(email: string): Observable<User> {
    const params = new HttpParams().set('email', email);

    return this.http.post<User>(
      '/instructor',
      null, {
        params: params
      });
  }

  public inviteNewStudent(email: string): Observable<User> {
    const params = new HttpParams().set('email', email);

    return this.http.post<User>(
      '/student',
      null, {
        params: params
      });
  }

  public getLessonsByInstructor(instructorId: string): Observable<Array<Lesson>> {
    return this.http.get<Array<Lesson>>(`/lesson/instructor/${instructorId}`);
  }

  public addLessonByMe(lesson: Lesson): Observable<Lesson> {
    return this.http.post<Lesson>(
      '/lesson',
      lesson
    );
  }

  public registerMeToLesson(lesson: Lesson): Observable<Lesson> {
    return this.http.put<Lesson>(
      '/lesson/student/me',
      lesson
    );
  }

  public unregisterMeFromLesson(lesson: Lesson): Observable<Lesson> {
    lesson.studentId = null;
    return this.http.put<Lesson>(
      '/lesson/student/me',
      lesson
    );
  }

}
