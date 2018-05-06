import {Component, OnInit} from '@angular/core';
import {CognitoService} from '../../services/cognito.service';
import {Router} from '@angular/router';

class MenuItem {
  public name: string;
  public link: string;

  constructor(name: string, link: string) {
    this.name = name;
    this.link = link;
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public items: Array<MenuItem>;

  public userType: string;

  constructor(private cognito: CognitoService,
              private router: Router) {
  }

  ngOnInit() {
    // populate menu - based on user type
    this.cognito.isAuthenticatedAs(['admin']).subscribe(is => {
      if (is) {
        this.items = [
          new MenuItem('Home', ''),
          new MenuItem('Instructors', 'instructors'),
          new MenuItem('Students', 'students'),
          new MenuItem('Lessons', 'lessons')
        ];
        this.userType = 'Admin';
      }
    });

    this.cognito.isAuthenticatedAs(['instructor']).subscribe(is => {
      if (is) {
        this.items = [
          new MenuItem('Home', ''),
          new MenuItem('My lessons', 'calendar/instructor'),
        ];
        this.userType = 'Instructor';
      }
    });

    this.cognito.isAuthenticatedAs(['student']).subscribe(is => {
      if (is) {
        this.items = [
          new MenuItem('Home', ''),
          new MenuItem('Register to lesson', 'registration/student'),
          new MenuItem('My lessons', 'student/lessons')
        ];
        this.userType = 'Student';
      }
    });

  }

  public logout() {
    this.router.navigate(['/login']);
    this.cognito.logout();
  }

}
