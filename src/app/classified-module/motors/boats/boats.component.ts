import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { Select2 } from 'select2';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-boats',
  templateUrl: './boats.component.html',
  styleUrls: ['./boats.component.scss']
})
export class BoatsComponent implements OnInit {
  ads = 'assets/images/post-add.jpg'
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
  Age: any = [];
  BoatUsage: any = [];
  BoatCondition: any = [];
  SellerType: any = [];
  Warranty: any = [];
  Length: any = [];
  DetailsForm = new FormGroup({
    title: new FormControl("", Validators.required),
    Phone: new FormControl("", Validators.required),
    Price: new FormControl("", Validators.required),
    Description: new FormControl("", Validators.required),
  });
  constructor(private service: AppService, private router: Router) {
    this.service.GetClassifiedLookUpsByCategory("Age").subscribe((result: any) => {
      this.Age = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("BoatUsage").subscribe((result: any) => {
      this.BoatUsage = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("BoatCondition").subscribe((result: any) => {
      this.BoatCondition = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("SellerType").subscribe((result: any) => {
      this.SellerType = result.data;

    })
    this.service.GetClassifiedLookUpsByCategory("Warranty").subscribe((result: any) => {
      this.Warranty = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("Length").subscribe((result: any) => {
      this.Length = result.data;

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
    if (this.DetailsForm.value.title == "") {
      this.currentField = "title-input";
      this.error = "Enter Title";
      this.showError = true;
      return;
    } else if (this.DetailsForm.value.Phone == "") {
      this.currentField = "phone-input";
      this.error = "Enter Phone Number";
      this.showError = true;
      return;
    } else if (this.DetailsForm.value.Price == "") {
      this.currentField = "price-input";
      this.error = "Enter Price";
      this.showError = true;
      return;
    } else if ($(".Show-Phone-Number").val() == 0) {
      this.currentField = "Show-Phone-Number + .select2";
      this.error = "Do you want to Show Phone Number";
      this.showError = true;
      return;
    } else if (this.DetailsForm.value.Description == "") {
      this.currentField = "description-input";
      this.error = "Enter Description";
      this.showError = true;
      return;
    } else if ($(".Age").val() == 0) {
      this.currentField = "Age + .select2";
      this.error = "Enter Age";
      this.showError = true;
      return;
    } else if ($(".Usage").val() == 0) {
      this.currentField = "Usage + .select2";
      this.error = "Enter Usage";
      this.showError = true;
      return;
    } else if ($(".Condition").val() == 0) {
      this.currentField = "Condition + .select2";
      this.error = "Enter Condition";
      this.showError = true;
      return;
    } else if ($(".Seller-type").val() == 0) {
      this.currentField = "Seller-type + .select2";
      this.error = "Enter Seller Type";
      this.showError = true;
      return;
    } else if ($(".Warranty").val() == 0) {
      this.currentField = "Warranty + .select2";
      this.error = "Enter Warranty";
      this.showError = true;
      return;
    } else if ($(".length").val() == 0) {
      this.currentField = "length + .select2";
      this.error = "Enter length";
      this.showError = true;
      return;
    }
    let temp:any = localStorage.getItem("classifiedData");
    temp = JSON.parse(temp);
    temp.Title = this.DetailsForm.value.title;
    temp.PhoneNumber = this.DetailsForm.value.Phone;
    temp.price = this.DetailsForm.value.Price;
    temp.description = this.DetailsForm.value.Description;
    temp.AgeId= $(".Age").val();
    temp.UsageId= $(".Usage").val();
    temp.BoatConditionId= $(".Condition").val();
    temp.SellerTypeId= $(".Seller-type").val();
    temp.WarrantyId= $(".Warranty").val();
    temp.LengthId= $(".length").val();
    localStorage.setItem("classifiedData",JSON.stringify(temp));
    console.log(temp);
    
    // this.router.navigate(["/classified/car-ad-submission"]);
  }

}