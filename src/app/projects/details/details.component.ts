import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  hirepersonal= 'assets/images/hire-personal.png'
  hirecompany= 'assets/images/hire-cpmapny.png'
  constructor() { }

  ngOnInit(): void {
  }

}