import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-number-plates',
  templateUrl: './number-plates.component.html',
  styleUrls: ['./number-plates.component.scss']
})
export class NumberPlatesComponent implements OnInit {
  ads= 'assets/images/post-add.jpg';
  plateclassic= 'assets/images/plates/dubai-classic-plate.png';
  platenew= 'assets/images/plates/dubai-new-plate.png';
  error: any = ""
  showError: boolean = false;
  showLoader: boolean = false;
  classifiedData: any = localStorage.getItem("classifiedData");
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

  DetailsForm = new FormGroup({
    title: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required),
    plateNumber: new FormControl("", Validators.required),
    price: new FormControl("", Validators.required),
    desc: new FormControl("", Validators.required),
  });
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    $('.select2').select2({ placeholder: "Search..." });
    }
    status: boolean = true;
    clickEvent() {
      this.status = true;
      this.status1 = false;
    }
    status1: boolean = false;
    clickEvent1() {
      this.status1 = true;
      this.status = false;
    }
    onSubmit() {
      if(this.DetailsForm.value.title == "") {
        this.currentField = "title-input";
        this.error = "Enter Title";
        this.showError = true;
        return;
      } else if(this.DetailsForm.value.phone == "") {
        this.currentField = "phone-input";
        this.error = "Enter Phone Number";
        this.showError = true;
        return;
      } else if($(".show-phone-input").val() == -1) {
        this.currentField = "show-phone-input";
        this.error = "Do you want to show phone number";
        this.showError = true;
        return;
      } else if(this.DetailsForm.value.plateNumber == "") {
        this.currentField = "plate-number-input";
        this.error = "Enter Plate Number";
        this.showError = true;
        return;
      } else if(this.DetailsForm.value.price == "") {
        this.currentField = "price-input";
        this.error = "Enter Price";
        this.showError = true;
        return;
      } else if(this.DetailsForm.value.desc == "") {
        this.currentField = "desc-input";
        this.error = "Enter Description";
        this.showError = true;
        return;
      }
      let tempData:any = {};
      tempData.CountryId = this.classifiedData.countryId;
      tempData.CityId = this.classifiedData.cityId;
      tempData.DistrictId = this.classifiedData.districtId;
      tempData.Latitude = this.classifiedData.Latitude;
      tempData.Longitude = this.classifiedData.Longitude;
      tempData.ClassifiedCategoryId = this.classifiedData.classifiedData[this.classifiedData.classifiedData.length - 1].value;
      tempData.Title = this.DetailsForm.value.title;
      tempData.PhoneNumber = this.DetailsForm.value.phone;
      tempData.PlateNumber = this.DetailsForm.value.plateNumber;
      tempData.Price = this.DetailsForm.value.price;
      tempData.Description = this.DetailsForm.value.desc;
      
    let userData:any = localStorage.getItem("user");
    userData = JSON.parse(userData)
    tempData.UserId = userData.id;
    console.log(tempData);
    localStorage.setItem("classifiedFormData",JSON.stringify(tempData));
    let formData = new FormData();
    formData.append("ClassifiedRequest",JSON.stringify(tempData));
    let token: any = localStorage.getItem("token");
    token = JSON.parse(token);
    this.showLoader = true;
    $.ajax({
      url: `${environment.apiUrl}api/AddUpdateClassified`,
      method: "post",
      contentType: false,
      processData: false,
      data: formData,
      headers: {
        "Authorization": 'bearer ' + token
      },
      dataType: "json",
      success: (res) => {
        console.log(res);
        if (res.result == 1) {
          this.showLoader = false;
          tempData.id = res.data.id;
          localStorage.setItem("classifiedFormData", JSON.stringify(tempData));
          if(this.classifiedData.classifiedData[0].value == 1) {
            this.router.navigate(["/classified/classified-payment"]);
          } else {
            this.router.navigate(["/classified/classified-payment-second"]);
          }
        }
        else {
          this.showLoader = false;
          this.error = res.error;
          this.showError = true;
        }
      },
      error: (err) => {
        this.showLoader = false;
      }
    });
    }
}