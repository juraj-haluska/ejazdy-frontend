import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {User} from '../../model/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() profile: User;
  @Input() completedHours: number;
  @Input() userType: String = '';

  readonly onlyDateFormat = 'DD.MM.YYYY';

  constructor() {
  }

  ngOnInit() {}

  getCreatedAt(): string {
    return moment(this.profile.createDate).format(this.onlyDateFormat);
  }

}
