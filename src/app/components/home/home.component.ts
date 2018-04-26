import {Component, OnInit} from '@angular/core';
import {CognitoService} from '../../services/cognito.service';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private cognito: CognitoService,
    private api: ApiService
  ) {
  }

  ngOnInit() {
  }

  public button() {
    this.api.getAllInstructors().subscribe(instructors => {
      console.log(instructors);
    });
  }

}
