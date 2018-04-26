import {Component, OnInit} from '@angular/core';

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

  public items: Array<MenuItem> = [
    new MenuItem('item 1', 'item1'),
    new MenuItem('item 2', 'item2')
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
