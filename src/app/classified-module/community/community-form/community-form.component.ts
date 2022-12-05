import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';

@Component({
  selector: 'app-community-form',
  templateUrl: './community-form.component.html',
  styleUrls: ['./community-form.component.scss']
})
export class CommunityFormComponent implements OnInit {
  ads= 'assets/images/post-add.jpg'
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    $('.select2').select2({ placeholder: "Search..." });
    }
}

