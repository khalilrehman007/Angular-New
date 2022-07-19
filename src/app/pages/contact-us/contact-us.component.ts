import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  conductList = [
    {
      value: 'I would Like to Conduct'
    },
    {
      value: 'I would Like to Conduct'
    },
    {
      value: 'I would Like to Conduct'
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
