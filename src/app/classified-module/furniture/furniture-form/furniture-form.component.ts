import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';

@Component({
  selector: 'app-furniture-form',
  templateUrl: './furniture-form.component.html',
  styleUrls: ['./furniture-form.component.scss']
})
export class FurnitureFormComponent implements OnInit {
  ads= 'assets/images/post-add.jpg'
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    $('.select2').select2({ placeholder: "Search..." });
    }
}

