import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-classified-payment',
  templateUrl: './classified-payment.component.html',
  styleUrls: ['./classified-payment.component.scss']
})
export class ClassifiedPaymentComponent implements OnInit {

  packageData:any = "";
  selectedPackage: any = 0;
  selectedOptions:any = localStorage.getItem("classifiedData");
  constructor(private service: AppService, private router: Router) {
    this.selectedOptions = JSON.parse(this.selectedOptions);
    this.selectedOptions = this.selectedOptions.classifiedData;
    this.service.ClassifiedPackageByCategory(1).subscribe((result:any) => {
      this.packageData = result.data;
    })
  }
  
  ngOnInit(): void {
  }
  selectPackage(selectedPackage:any) {
    localStorage.setItem("selectedPackage", JSON.stringify(selectedPackage));
    this.router.navigate(["/classified/classified-payment-second"]);
  }
}
