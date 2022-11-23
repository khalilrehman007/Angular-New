import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';

@Component({
  selector: 'app-auto-accessories-parts',
  templateUrl: './auto-accessories-parts.component.html',
  styleUrls: ['./auto-accessories-parts.component.scss']
})
export class AutoAccessoriesPartsComponent implements OnInit {
  ads= 'assets/images/post-add.jpg'
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    $('.select2').select2({ placeholder: "Search..." });
    }
}
