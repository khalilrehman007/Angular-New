import { Component, OnInit } from '@angular/core';
import { NotificationService } from "../../service/notification.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-form-screen',
  templateUrl: './payment-form-screen.component.html',
  styleUrls: ['./payment-form-screen.component.scss']
})
export class PaymentFormScreenComponent implements OnInit {
  stripe = 'assets/images/stripe.svg'
  constructor() { }

  ngOnInit(): void {
  }
  paymentForm = new FormGroup({
    cardNumber: new FormControl("", Validators.required),
    expiryDate: new FormControl("", Validators.required),
    cvv: new FormControl("", Validators.required),
    cardName: new FormControl("", Validators.required)
  })
}
