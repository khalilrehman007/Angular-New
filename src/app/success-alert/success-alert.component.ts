import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-alert',
  templateUrl: './success-alert.component.html',
  styleUrls: ['./success-alert.component.scss']
})
export class SuccessAlertComponent implements OnInit {
  hideAlertNg:boolean=true;
  constructor() { }

  ngOnInit(): void {
  }
  hideAlert(){
    this.hideAlertNg=!this.hideAlertNg;
}
}
