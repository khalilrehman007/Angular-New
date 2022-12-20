import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-property-user-alert',
  templateUrl: './property-user-alert.component.html',
  styleUrls: ['./property-user-alert.component.scss']
})
export class PropertyUserAlertComponent implements OnInit {
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

