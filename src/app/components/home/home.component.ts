import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {User} from '../../model/User';
import {CognitoService} from '../../services/cognito.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profile: User;
  userType = '';
  hours = 0;

  constructor(private api: ApiService, private cognito: CognitoService) {
  }

  ngOnInit() {

    this.cognito.isAuthenticatedAs(['admin']).subscribe(is => {
      if (is) {
        this.userType = 'Administrator';
      }
    });
    this.cognito.isAuthenticatedAs(['instructor']).subscribe(is => {
      if (is) {
        this.userType = 'Instructor';
      }
    });
    this.cognito.isAuthenticatedAs(['student']).subscribe(is => {
      if (is) {
        this.userType = 'Student';
      }
    });

    this.api.getMyProfile().subscribe(profile => {
      if (this.userType === 'Student') {
        this.api.getHoursByStudent(profile.id).subscribe(hours => {
          this.hours = Math.round(hours * 100) / 100;
        });
      }
      this.profile = profile;
    });
  }
}
