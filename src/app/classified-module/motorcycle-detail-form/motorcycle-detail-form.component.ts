import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';

@Component({
  selector: 'app-motorcycle-detail-form',
  templateUrl: './motorcycle-detail-form.component.html',
  styleUrls: ['./motorcycle-detail-form.component.scss']
})
export class MotorcycleDetailFormComponent implements OnInit {
  ads= 'assets/images/post-add.jpg'
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    $('.select2').select2({ placeholder: "Search..." });
    }
}
