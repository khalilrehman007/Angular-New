import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';

@Component({
  selector: 'app-commertials-form',
  templateUrl: './commertials-form.component.html',
  styleUrls: ['./commertials-form.component.scss']
})
export class CommertialsFormComponent implements OnInit {
  ads= 'assets/images/post-add.jpg'
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    $('.select2').select2({ placeholder: "Search..." });
    }
}

