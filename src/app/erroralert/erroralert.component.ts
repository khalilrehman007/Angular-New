import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-erroralert',
  templateUrl: './erroralert.component.html',
  styleUrls: ['./erroralert.component.scss']
})
export class ErroralertComponent implements OnInit {
  @Input() error: any;
  

  hideAlertNg:boolean=true;
  constructor() { }

  ngOnInit(): void {
  }
  hideAlert(){
    this.hideAlertNg=!this.hideAlertNg;
}

}
