import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';

@Component({
  selector: 'app-car-add-details-first',
  templateUrl: './car-add-details-first.component.html',
  styleUrls: ['./car-add-details-first.component.scss']
})
export class CarAddDetailsFirstComponent implements OnInit {
  ads= 'assets/images/post-add.jpg'
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
      $('.select2').select2();
    }
}
