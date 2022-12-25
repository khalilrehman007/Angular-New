import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-services-form',
  templateUrl: './services-form.component.html',
  styleUrls: ['./services-form.component.scss']
})
export class ServicesFormComponent implements OnInit {
  ads= 'assets/images/post-add.jpg'
  error: any = ""
  showError: boolean = false;
  classifiedData: any = localStorage.getItem("classifiedData");
  showLoader: boolean = false;


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
    Title : new FormControl("", Validators.required),
    Phone : new FormControl("", Validators.required),
    Description : new FormControl("", Validators.required),
  });
  constructor(private router: Router) { 
    this.classifiedData = JSON.parse(this.classifiedData);

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
     if(this.DetailsForm.value.Title == "") {
      this.currentField = "title-input";
      this.error = "Enter Title";
      this.showError = true;
      return;
    }  else if(this.DetailsForm.value.Phone == "") {
      this.currentField = "phone-input";
      this.error = "Enter Phone Number";
      this.showError = true;
      return;
    } if($(".Show-Phone-Numer").val() == 0) {
      this.currentField = "Show-Phone-Numer + .select2";
      this.error = "Do you want to Show Phone Number";
      this.showError = true;
      return;
    } else if(this.DetailsForm.value.Description == "") {
      this.currentField = "description-input";
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
    tempData.Title = this.DetailsForm.value.Title;
    tempData.Phone = this.DetailsForm.value.Phone;
    tempData.showPhone = $(".Show-Phone-Numer").val();
    tempData.Description = this.DetailsForm.value.Description;

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

