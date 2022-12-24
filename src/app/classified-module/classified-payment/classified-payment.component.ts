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
  selectedDays:any = 0;
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
  selectPackage(id:any) {
    this.selectedDays = 0;
    this.selectedPackage = id;
  }
  selectDays(id:any) {
    this.selectedDays = id;
  }
  onSubmit() {
    if(this.selectedOptions[1].name.trim() == "Used Cars for Sale") {
      this.router.navigate(["/classified/car-ad-details"]);
    } else if(this.selectedOptions[1].name.trim() == "Motorcycles") {
      this.router.navigate(["/classified/motorcycle-ad-details"]);
    } else if(this.selectedOptions[1].name.trim() == "Auto Accessories & Parts") {
      this.router.navigate(["/classified/auto-parts-ad-details"]);
    } else if(this.selectedOptions[1].name.trim() == "Heavy Vehicles") {
      this.router.navigate(["/classified/heavy-vehicles-ad-details"]);
    } else if(this.selectedOptions[1].name.trim() == "Boats") {
      this.router.navigate(["/classified/boats-ad-details"]);
    }
  }
}
