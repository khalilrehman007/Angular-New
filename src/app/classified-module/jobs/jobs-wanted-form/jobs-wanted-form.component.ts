import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';

@Component({
  selector: 'app-jobs-wanted-form',
  templateUrl: './jobs-wanted-form.component.html',
  styleUrls: ['./jobs-wanted-form.component.scss']
})
export class JobsWantedFormComponent implements OnInit {
  ads= 'assets/images/post-add.jpg'
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    $('.select2').select2({ placeholder: "Search..." });
    }
}
