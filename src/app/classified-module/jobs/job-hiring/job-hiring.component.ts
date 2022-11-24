import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-hiring',
  templateUrl: './job-hiring.component.html',
  styleUrls: ['./job-hiring.component.scss']
})
export class JobHiringComponent implements OnInit {
  hirepersonal= 'assets/images/hire-personal.png'
  hirecompany= 'assets/images/hire-cpmapny.png'
  constructor() { }

  ngOnInit(): void {
  }

}
