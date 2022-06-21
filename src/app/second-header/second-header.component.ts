import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-second-header',
  templateUrl: './second-header.component.html',
  styleUrls: ['./second-header.component.scss']
})
export class SecondHeaderComponent implements OnInit {
  logo = '../assets/images/logo.svg'
  constructor() { }

  ngOnInit(): void {
  }

}
