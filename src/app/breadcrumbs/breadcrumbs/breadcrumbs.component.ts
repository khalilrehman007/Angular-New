import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  currentURL = '';

  constructor(private router: Router, private _location: Location) {
    let url = this.router.url.replace("/", "");
    url = url.split('?')[0];
    this.currentURL = url
  }

  ngOnInit(): void {
  }

}
