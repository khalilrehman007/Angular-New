import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';

@Component({
  selector: 'app-car-add-details-second',
  templateUrl: './car-add-details-second.component.html',
  styleUrls: ['./car-add-details-second.component.scss']
})
export class CarAddDetailsSecondComponent implements OnInit {
  advertize= 'assets/images/icons/atract.svg'
  info= 'assets/images/icons/info-icn.svg'
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
      $('.select2').select2();
    }
    status1: boolean = false;
    clickEvent1() {
      this.status1 = !this.status1;
    }
    status2: boolean = false;
    clickEvent2() {
      this.status2 = !this.status2;
    }
    
}

