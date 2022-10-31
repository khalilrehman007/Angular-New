import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-success-alert',
  templateUrl: './success-alert.component.html',
  styleUrls: ['./success-alert.component.scss']
})
export class SuccessAlertComponent implements OnInit {
  @Input() success: any;
  @Output() errorResponse: EventEmitter<any> = new EventEmitter()


  hideAlertNg: boolean = true;
  constructor() { }

  ngOnInit(): void {

  }
  sendData() {
    this.errorResponse.emit("clicked")
  }
  hideAlert() {
    this.hideAlertNg = !this.hideAlertNg;
  }

}
