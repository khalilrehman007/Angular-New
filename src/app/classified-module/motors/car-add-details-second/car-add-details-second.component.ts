import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';
import { AppService } from 'src/app/service/app.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-car-add-details-second',
  templateUrl: './car-add-details-second.component.html',
  styleUrls: ['./car-add-details-second.component.scss']
})
export class CarAddDetailsSecondComponent implements OnInit {
  advertize = 'assets/images/icons/atract.svg';
  info = 'assets/images/icons/info-icn.svg';
  error: any = ""
  showError: boolean = false;
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
  classifiedData: any = localStorage.getItem("classifiedData");
  currency: any = localStorage.getItem("currency");
  FuelType: any = [];
  BodyCondition: any = [];
  MechanicalCondition: any = [];
  Color: any = [];
  Warranty: any = [];
  Doors: any = [];
  Cylinders: any = [];
  TransmissionType: any = [];
  BodyType: any = [];
  HorsePower: any = [];
  SteeringSide: any = [];
  CarExtraFeature: any = [];
  selectedFiles: any;
  imageData: any = [];
  previews: string[] = [];
  mainImage: any = 0;
  data: any = {};
  imgCheck: boolean = false;

  DetailForm = new FormGroup({
    title: new FormControl("", Validators.required),
    tour: new FormControl("", Validators.required),
    desc: new FormControl("", Validators.required),
  });
  constructor(private service: AppService, private router: Router) {
    this.classifiedData = JSON.parse(this.classifiedData);
    this.service.GetClassifiedLookUpsByCategory("FuelType").subscribe((result: any) => {
      this.FuelType = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("BodyCondition").subscribe((result: any) => {
      this.BodyCondition = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("MechanicalCondition").subscribe((result: any) => {
      this.MechanicalCondition = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("Color").subscribe((result: any) => {
      this.Color = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("Warranty").subscribe((result: any) => {
      this.Warranty = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("Doors").subscribe((result: any) => {
      this.Doors = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("Cylinders").subscribe((result: any) => {
      this.Cylinders = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("TransmissionType").subscribe((result: any) => {
      this.TransmissionType = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("BodyType").subscribe((result: any) => {
      this.BodyType = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("HorsePower").subscribe((result: any) => {
      this.HorsePower = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("SteeringSide").subscribe((result: any) => {
      this.SteeringSide = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("CarExtraFeature").subscribe((result: any) => {
      this.CarExtraFeature = result.data;
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
  status1: boolean = false;
  clickEvent1() {
    this.status1 = !this.status1;
  }
  status2: boolean = false;
  clickEvent2() {
    this.status2 = !this.status2;
  }
  onSubmit() {
    let extrasLength:any = $(".extras-select").val();
    if(this.imageData.length == 0) {
      this.currentField = "propery-pictures-sec";
      this.error = "Upload Images";
      this.showError = true;
      return;
    } else if(this.DetailForm.value.title == "") {
      this.currentField = "title-input";
      this.error = "Enter Title";
      this.showError = true;
      return;
    } else if(this.DetailForm.value.desc == "") {
      this.currentField = "desc-input";
      this.error = "Enter Desc";
      this.showError = true;
      return;
    } else if($(".fuel-select").val() == 0) {
      this.currentField = "fuel-select + .select2";
      this.error = "Select Fuel Type";
      this.showError = true;
      return;
    } else if($(".body-condition-select").val() == 0) {
      this.currentField = "body-condition-select + .select2";
      this.error = "Select Body Condition";
      this.showError = true;
      return;
    } else if($(".mechanical-condition-select").val() == 0) {
      this.currentField = "mechanical-condition-select + .select2";
      this.error = "Select Mechanical Condition";
      this.showError = true;
      return;
    } else if($(".color-select").val() == 0) {
      this.currentField = "color-select + .select2";
      this.error = "Select Color";
      this.showError = true;
      return;
    } else if($(".warranty-select").val() == 0) {
      this.currentField = "warranty-select + .select2";
      this.error = "Select Warranty";
      this.showError = true;
      return;
    } else if($(".doors-select").val() == 0) {
      this.currentField = "doors-select + .select2";
      this.error = "Select Doors";
      this.showError = true;
      return;
    } else if($(".cylinders-select").val() == 0) {
      this.currentField = "cylinders-select + .select2";
      this.error = "Select No. Of Cylinders";
      this.showError = true;
      return;
    } else if($(".transmission-select").val() == 0) {
      this.currentField = "transmission-select + .select2";
      this.error = "Transmission Type";
      this.showError = true;
      return;
    } else if($(".body-type-select").val() == 0) {
      this.currentField = "body-type-select + .select2";
      this.error = "Select Body Type";
      this.showError = true;
      return;
    } else if($(".horsepower-select").val() == 0) {
      this.currentField = "horsepower-select + .select2";
      this.error = "Select Horsepower";
      this.showError = true;
      return;
    } else if($(".steering-side-select").val() == 0) {
      this.currentField = "steering-side-select + .select2";
      this.error = "Steering Side";
      this.showError = true;
      return;
    } else if(extrasLength.length == 0) {
      this.currentField = "extras-select + .select2";
      this.error = "Select Extras";
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
    tempData.Title = this.DetailForm.value.title;
    tempData.Description = this.DetailForm.value.desc;
    tempData.FuelTypeId = $(".fuel-select").val();
    tempData.BodyConditionId = $(".body-type-select").val();
    tempData.MechanicalConditionId = $(".mechanical-condition-select").val();
    tempData.ColorId = $(".color-select").val();
    tempData.WarrantyId = $(".warranty-select").val();
    tempData.DoorId = $(".doors-select").val();
    tempData.CylinderId = $(".cylinders-select").val();
    tempData.TransmissionTypeId = $(".transmission-select").val();
    tempData.BodyTypeId = $(".body-type-select").val();
    tempData.HorsePowerId = $(".horsepower-select").val();
    tempData.SteeringSideId = $(".steering-side-select").val();
    let temp = [];
    for(let item of extrasLength) {
      temp.push({"ClassifiedFeatureLookUpId": item});
    }
    tempData.ClassifiedFeatures = temp;
    
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
