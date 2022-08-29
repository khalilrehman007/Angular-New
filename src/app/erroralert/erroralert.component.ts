import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-erroralert',
  templateUrl: './erroralert.component.html',
  styleUrls: ['./erroralert.component.scss']
})
export class ErroralertComponent implements OnInit {
  @Input() error: any;
  @Output() errorResponse: EventEmitter<any> = new EventEmitter()


  hideAlertNg: boolean = true;
  constructor() { }

  ngOnInit(): void {
    
  }
  sendData(){
    this.errorResponse.emit("clicked")
  }
  hideAlert() {
    this.hideAlertNg = !this.hideAlertNg;
  }

}
