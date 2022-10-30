import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.scss']
})
export class Header2Component implements OnInit {

  constructor(private location: Location, private router: Router) { }

  goBack() {
    if(this.router.url == "/valuation/PropertyDownloadReport") {
      this.router.navigate(["/"])
    } else if(this.router.url == "/ar/valuation/PropertyDownloadReport") {
      this.router.navigate(["/ar"])
    } else {
      this.location.back();
    }
  }
  ngOnInit(): void {
  }

}