import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';
import { AppService } from 'src/app/service/app.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-heavy-vehicles',
  templateUrl: './heavy-vehicles.component.html',
  styleUrls: ['./heavy-vehicles.component.scss']
})
export class HeavyVehiclesComponent implements OnInit {
  ads = 'assets/images/post-add.jpg'
  error: any = "";
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
  FuelType: any = [];
  BodyCondition: any = [];
  MechanicalCondition: any = [];
  SellerType: any = [];
  Warranty: any = [];
  Cylinders: any = [];
  HorsePower: any = [];
  selectedFiles: any;
  imageData: any = [];
  previews: string[] = [];
  mainImage: any = 0;
  data: any = {};
  imgCheck: boolean = false;

  DetailsForm = new FormGroup({
    title: new FormControl("", Validators.required),
    Phone: new FormControl("", Validators.required),
    Price: new FormControl("", Validators.required),
    Description: new FormControl("", Validators.required),
    Kilometers: new FormControl("", Validators.required),
    Year: new FormControl("", Validators.required),
    Model: new FormControl("", Validators.required),
    Make: new FormControl("", Validators.required),
    Capacity: new FormControl("", Validators.required),
  });
  constructor(private service: AppService, private router: Router) {
    this.classifiedData = JSON.parse(this.classifiedData);
    this.service.GetClassifiedLookUpsByCategory("FuelType").subscribe((result: any) => {
      this.FuelType = result.data;
      console.log(this.FuelType);
    })
    this.service.GetClassifiedLookUpsByCategory("BodyCondition").subscribe((result: any) => {
      this.BodyCondition = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("MechanicalCondition").subscribe((result: any) => {
      this.MechanicalCondition = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("SellerType").subscribe((result: any) => {
      this.SellerType = result.data;

    })
    this.service.GetClassifiedLookUpsByCategory("Warranty ").subscribe((result: any) => {
      this.Warranty = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("Cylinders").subscribe((result: any) => {
      this.Cylinders = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("HorsePower").subscribe((result: any) => {
      this.HorsePower = result.data;
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
    } else if ($(".Fuel-type").val() == 0) {
      this.currentField = "Fuel-type + .select2";
      this.error = "Enter Fuel Type";
      this.showError = true;
      return;
    } else if (this.DetailsForm.value.Kilometers == "") {
      this.currentField = "kilometer-input";
      this.error = "Enter Kilometer";
      this.showError = true;
      return;
    } else if ($(".Body-condition").val() == 0) {
      this.currentField = "Body-condition + .select2";
      this.error = "Enter Condition";
      this.showError = true;
      return;
    } else if ($(".Mechanical-condition").val() == 0) {
      this.currentField = "Mechanical-condition + .select2";
      this.error = "Enter Mechanical Type";
      this.showError = true;
      return;
    } else if (this.DetailsForm.value.Year == "") {
      this.currentField = "year-input";
      this.error = "Enter Year";
      this.showError = true;
      return;
    } else if ($(".Seller-type").val() == 0) {
      this.currentField = "Seller-type + .select2";
      this.error = "Enter Seller Type";
      this.showError = true;
      return;
    } else if (this.DetailsForm.value.Model == "") {
      this.currentField = "model-input";
      this.error = "Enter Model";
      this.showError = true;
      return;
    } else if ($(".warranty").val() == 0) {
      this.currentField = "warranty + .select2";
      this.error = "Enter Warranty";
      this.showError = true;
      return;
    } else if (this.DetailsForm.value.Make == "") {
      this.currentField = "phone-make-input";
      this.error = "Enter Make Name";
      this.showError = true;
      return;
    } else if (this.DetailsForm.value.Capacity == "") {
      this.currentField = "capacity-input";
      this.error = "Enter Capacity/Weight";
      this.showError = true;
      return;
    } else if ($(".Cylinders").val() == 0) {
      this.currentField = "Cylinders + .select2";
      this.error = "Enter Cylinders";
      this.showError = true;
      return;
    } else if ($(".Horsepower").val() == 0) {
      this.currentField = "Horsepower + .select2";
      this.error = "Enter Horsepower";
      this.showError = true;
      return;
    }
    let tempData: any = {};
    tempData.CountryId = this.classifiedData.countryId;
    tempData.CityId = this.classifiedData.cityId;
    tempData.DistrictId = this.classifiedData.districtId;
    tempData.Latitude = this.classifiedData.Latitude;
    tempData.Longitude = this.classifiedData.Longitude;
    tempData.ClassifiedCategoryId = this.classifiedData.classifiedData[this.classifiedData.classifiedData.length - 1].value;
    tempData.Title = this.DetailsForm.value.title;
    tempData.Title = this.DetailsForm.value.title;
    tempData.Description = this.DetailsForm.value.Description;
    tempData.PhoneNumber = this.DetailsForm.value.Phone;
    tempData.Price = this.DetailsForm.value.Price;
    tempData.FuelTypeId = $(".fuel-select").val();
    tempData.KiloMeters = this.DetailsForm.value.Kilometers;
    tempData.BodyConditionId = $(".body-type-select").val();
    tempData.MechanicalConditionId = $(".mechanical-condition-select").val();
    tempData.Year = this.DetailsForm.value.Year;
    tempData.SellerTypeId = $(".seller-type-input").val();
    tempData.Model = this.DetailsForm.value.Model;
    tempData.WarrantyId = $(".warranty-input").val();
    tempData.Make = this.DetailsForm.value.Make;
    tempData.Capacity = this.DetailsForm.value.Make;
    tempData.Capacity = this.DetailsForm.value.Make;
    tempData.CylinderId = $(".cylinders-select").val();
    tempData.HorsePowerId = $(".horsepower-select").val();
    
    let tempImg:any = [];
    for (let i = 0; i < this.imageData.length; i++) {
      let temp:any = {};
      temp.FileId = i+1;
      temp.FileName = this.imageData[i].FileName;
      temp.Extension = this.imageData[i].Extension;
      temp.IsMainImage = 0;
      if(this.mainImage == i) {
        temp.IsMainImage = 1;
      }
      tempImg.push(temp);
    }
    tempData.Documents = tempImg;

    let userData:any = localStorage.getItem("user");
    userData = JSON.parse(userData)
    tempData.UserId = userData.id;
    console.log(tempData);
    localStorage.setItem("classifiedFormData",JSON.stringify(tempData));

    let formData = new FormData();
    formData.append("ClassifiedRequest",JSON.stringify(tempData));
    for (let i = 0; i < this.imageData.length; i++) {
      formData.append(i + 1 + "_" + this.imageData[i].FileName, this.imageData[i].file);
    }
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
  selectFiles(event: any): void {
    let check = true;
    let temp: number = 0;
    for (let i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i].size / 1048576 > 2) {
        this.error = "Maximun size allowed is 2MB per Image";
        this.showError = true;
        check = false;
        return;
      }
    }
    if (check) {
      temp = temp / 1048576
      if (temp > 10) {
        alert("Maximun size allowed is 10MB");
        return;
      }
      // this.message = [];
      // this.progressInfos = [];
      this.selectedFiles = event.target.files;
      for (let i = 0; i < this.selectedFiles.length; i++) {
        let extension: any = this.selectedFiles[i].name.split(".");
        extension = extension[extension.length - 1];
        this.imageData.push({ "FileName": this.selectedFiles[i].name, "Extension": extension, file: this.selectedFiles[i] });
      }
      if (this.selectedFiles && this.selectedFiles[0]) {
        const numberOfFiles = this.selectedFiles.length;
        for (let i = 0; i < numberOfFiles; i++) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.previews.push(e.target.result);
          };
          reader.readAsDataURL(this.selectedFiles[i]);
        }
      }
      $(".image-input").val("");
    }
  }
  removeImage(index: any) {
    this.mainImage = 0;
    this.previews.splice(index, 1);
    this.data?.Documents.splice(index, 1);
  }
  changeMainImg(index: any) {
    this.mainImage = index;
  }
}