import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';

@Component({
  selector: 'app-motors-ad-details',
  templateUrl: './motors-ad-details.component.html',
  styleUrls: ['./motors-ad-details.component.scss']
})
export class MotorsAdDetailsComponent implements OnInit {
  ads= 'assets/images/post-add.jpg'
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
      $('.select2').select2();
    }
}
