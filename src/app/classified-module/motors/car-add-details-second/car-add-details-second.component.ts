import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';
import { AppService } from 'src/app/service/app.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  constructor(private service: AppService) {
    this.classifiedData = JSON.parse(this.classifiedData)
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
    } else if($(".extras-select").val() == 0) {
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
    tempData.Title = this.DetailForm.value.title;
    tempData.Description = this.DetailForm.value.title;
    tempData.FuelTypeId = this.DetailForm.value.title;
    tempData.BodyConditionId = this.DetailForm.value.title;
    tempData.MechanicalConditionId = this.DetailForm.value.title;
    tempData.ColorId = this.DetailForm.value.title;
    tempData.WarrantyId = this.DetailForm.value.title;
    tempData.DoorId = this.DetailForm.value.title;
    tempData.CylinderId = this.DetailForm.value.title;
    tempData.TransmissionTypeId = this.DetailForm.value.title;
    tempData.BodyTypeId = this.DetailForm.value.title;
    tempData.HorsePowerId = this.DetailForm.value.title;
    tempData.SteeringSideId = this.DetailForm.value.title;
    
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
      // temp += event.target.files[i].size
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

