import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {User} from '../model/User';

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

}
