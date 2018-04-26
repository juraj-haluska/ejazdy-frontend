import {Component, OnInit} from '@angular/core';
import {CognitoService} from '../../services/cognito.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private cognito: CognitoService) {
  }

  ngOnInit() {
  }

  public button() {
    this.cognito.getIdToken().subscribe(token => {
      console.log(token);
    });
  }

}
