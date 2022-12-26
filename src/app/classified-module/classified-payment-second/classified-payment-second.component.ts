import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classified-payment-second',
  templateUrl: './classified-payment-second.component.html',
  styleUrls: ['./classified-payment-second.component.scss']
})
export class ClassifiedPaymentSecondComponent implements OnInit {

  selectedPackage:any = localStorage.getItem("selectedPackage");
  basicPrice:any = 0;
  featuredPrice:any = 0;
  currency = localStorage.getItem("currency");
  constructor() {
    if(this.selectedPackage != null) {
      this.selectedPackage = JSON.parse(this.selectedPackage);
    }
  }

  ngOnInit(): void {
  }

  selectBasic() {
    $('input[name="selectAddon"]').prop('checked', false);
    this.featuredPrice = 0;
  }
  selectFeature(price:any) {
    $('input[name="selectexisting"]').prop('checked', false);
    this.featuredPrice = price;
  }

}
