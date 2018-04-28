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
          new MenuItem('Students', 'students')
        ];
      }
    });

    this.cognito.isAuthenticatedAs(['instructor', 'student']).subscribe(is => {
      if (is) {
        this.items = [
          new MenuItem('Home', ''),
          new MenuItem('My lessons', 'calendar/instructor'),
        ];
      }
    });

  }

  public logout() {
    this.router.navigate(['/login']);
    this.cognito.logout();
  }

}
