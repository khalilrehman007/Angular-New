import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-payment',
  templateUrl: './property-payment.component.html',
  styleUrls: ['./property-payment.component.scss']
})
export class PropertyPaymentComponent implements OnInit {
  stripe='../../../../assets/images/stripe.svg'
  constructor() { }

  ngOnInit(): void {
  }

}
