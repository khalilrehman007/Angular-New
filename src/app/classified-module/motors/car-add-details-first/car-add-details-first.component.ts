import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select2 } from 'select2';
import { AppService } from 'src/app/service/app.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-car-add-details-first',
  templateUrl: './car-add-details-first.component.html',
  styleUrls: ['./car-add-details-first.component.scss']
})
export class CarAddDetailsFirstComponent implements OnInit {
  ads = 'assets/images/post-add.jpg';
  error: any = ""
  showError: boolean = false;
  errorResponse(data: any) {
    this.showError = false;
    this.animate();
  }
  animate() {
    let temp: any = $("." + this.currentField).offset()?.top;
    $("." + this.currentField).addClass("blink");
    $("." + this.currentField).on("click", () => {
      $("." + this.currentField).removeClass("blink");
    })
    $(window).scrollTop(temp - 100);
  }
  currentField: any;
  MakeAndModel: any = [];
  Trim: any = [];
  RegionalSpec: any = [];
  BodyCondition: any = [];

  DetailsForm = new FormGroup({
    year: new FormControl("", Validators.required),
    kilometers: new FormControl("", Validators.required),
    price: new FormControl("", Validators.required),
    number: new FormControl("", Validators.required),
  });
  constructor(private service: AppService, private router: Router) {
    this.service.GetClassifiedLookUpsByCategory("MakeAndModel").subscribe((result: any) => {
      this.MakeAndModel = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("Trim").subscribe((result: any) => {
      this.Trim = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("Regional Spec").subscribe((result: any) => {
      this.RegionalSpec = result.data;
      console.log(this.RegionalSpec);
    })
    this.service.GetClassifiedLookUpsByCategory("BodyCondition").subscribe((result: any) => {
      this.BodyCondition = result.data;
      console.log(this.BodyCondition);
    })
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    $('.select2').select2();
    $('input[type="number"]').on('input', (e) => {
      let temp: any = $(e.currentTarget).val();
      temp.replace(/[^0-9 +]+/, '');
      $(e.currentTarget).val(temp);
    });
  }
  onSubmit() {
    if($(".make-and-model-select").val() == 0) {
      this.currentField = "make-and-model-select + .select2";
      this.error = "Select Make and Model";
      this.showError = true;
      return;
    } else if($(".trim-select").val() == 0) {
      this.currentField = "trim-select + .select2";
      this.error = "Select Trim";
      this.showError = true;
      return;
    } else if($(".regional-select").val() == 0) {
      this.currentField = "regional-select + .select2";
      this.error = "Select Regional Spec";
      this.showError = true;
      return;
    } else if(this.DetailsForm.value.year == "") {
      this.currentField = "year-input";
      this.error = "Enter Year";
      this.showError = true;
      return;
    } else if($(".insured-select").val() == -1) {
      this.currentField = "insured-select + .select2";
      this.error = "Select Insurance Type";
      this.showError = true;
      return;
    } else if(this.DetailsForm.value.kilometers == "") {
      this.currentField = "kilometers-input";
      this.error = "Enter Kilometers";
      this.showError = true;
      return;
    } else if(this.DetailsForm.value.price == "") {
      this.currentField = "price-input";
      this.error = "Enter Price";
      this.showError = true;
      return;
    } else if(this.DetailsForm.value.number == "") {
      this.currentField = "number-input";
      this.error = "Enter Phone Number";
      this.showError = true;
      return;
    }
    let temp:any = localStorage.getItem("classifiedData");
    temp = JSON.parse(temp);
    temp.MakeAndModelId = $(".make-and-model-select").val();
    temp.TrimId = $(".trim-select").val();
    temp.RegionalSpecId = $(".regional-select").val();
    temp.Year = this.DetailsForm.value.year;
    temp.IsInsured = $(".insured-select").val();
    temp.KiloMeters = this.DetailsForm.value.kilometers;
    temp.Price = this.DetailsForm.value.price;
    temp.PhoneNumber = this.DetailsForm.value.number;
    localStorage.setItem("classifiedData",JSON.stringify(temp));
    this.router.navigate(["/classified/car-ad-submission"]);
  }
}
