import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-packages',
  templateUrl: './payment-packages.component.html',
  styleUrls: ['./payment-packages.component.scss']
})
export class PaymentPackagesComponent implements OnInit {
  stripe = '../../../../assets/images/stripe.svg'
  constructor() { }

  ngOnInit(): void {
  }

}
