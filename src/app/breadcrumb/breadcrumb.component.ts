import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd  } from '@angular/router';
import {Location} from "@angular/common";
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  currentURL='';

  constructor(private router: Router,private _location: Location) {
    let url = this.router.url.replace("/", "");
    url = url.split('?')[0];
    this.currentURL = url
  }

  ngOnInit(): void {
  }

}
