import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comingsoom',
  templateUrl: './comingsoom.component.html',
  styleUrls: ['./comingsoom.component.scss']
})
export class ComingsoomComponent implements OnInit {
  notfound= '../../../assets/images/coming-soon.png'
  constructor() { }

  ngOnInit(): void {
  }

}
