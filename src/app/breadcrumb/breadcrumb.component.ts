import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd  } from '@angular/router';
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  currentURL='';

  constructor(private router: Router) {
    this.currentURL = this.router.url.replace("/", "");
  }

  ngOnInit(): void {
  }

}
