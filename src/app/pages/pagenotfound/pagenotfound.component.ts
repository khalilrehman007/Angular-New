import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.scss']
})
export class PagenotfoundComponent implements OnInit {
  notfound= '../../../assets/images/not-found.svg'
  constructor() { }

  ngOnInit(): void {
  }

}
