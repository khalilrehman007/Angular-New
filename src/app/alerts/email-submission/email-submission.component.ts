import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-email-submission',
  templateUrl: './email-submission.component.html',
  styleUrls: ['./email-submission.component.scss']
})
export class EmailSubmissionComponent implements OnInit {
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

