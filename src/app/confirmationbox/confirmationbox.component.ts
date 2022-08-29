import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmationbox',
  templateUrl: './confirmationbox.component.html',
  styleUrls: ['./confirmationbox.component.scss']
})
export class ConfirmationboxComponent implements OnInit {
  @Input() message: any;
  @Output() confirmResponse: EventEmitter<any> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  sendData(e:any){
    this.confirmResponse.emit(e)
  }

}
