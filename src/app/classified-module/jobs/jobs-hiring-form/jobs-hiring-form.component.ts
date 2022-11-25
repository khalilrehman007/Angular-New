import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';

@Component({
  selector: 'app-jobs-hiring-form',
  templateUrl: './jobs-hiring-form.component.html',
  styleUrls: ['./jobs-hiring-form.component.scss']
})
export class JobsHiringFormComponent implements OnInit {
  ads= 'assets/images/post-add.jpg'
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    $('.select2').select2({ placeholder: "Search..." });
    }
}

