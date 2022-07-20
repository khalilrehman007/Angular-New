import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.scss']
})
export class HelpCenterComponent implements OnInit {
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
