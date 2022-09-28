import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.scss']
})
export class Header2Component implements OnInit {

  constructor(private location: Location) { }

  goBack() {
    this.location.back();
  }
  ngOnInit(): void {
  }

}
