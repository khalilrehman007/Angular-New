import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';
import { AppService } from 'src/app/service/app.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-motorcycle-detail-form',
  templateUrl: './motorcycle-detail-form.component.html',
  styleUrls: ['./motorcycle-detail-form.component.scss']
})
export class MotorcycleDetailFormComponent implements OnInit {
  ads = 'assets/images/post-add.jpg';
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
  SportsBikeUsage: any = [];
  SellerType: any = [];
  Warranty: any = [];
  FinalDriveSystem: any = [];
  Wheels: any = [];
  BikeManufacturer: any = [];
  BikeEngineSize: any = [];
  selectedFiles: any;
  imageData: any = [];
  previews: string[] = [];
  mainImage: any = 0;
  data: any = {};
  imgCheck: boolean = false;


  DetailsForm = new FormGroup({
    title: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required),
    price: new FormControl("", Validators.required),
    desc: new FormControl("", Validators.required),
    kilometers: new FormControl("", Validators.required),
    year: new FormControl("", Validators.required),
  });
  constructor(private service: AppService, private router: Router) {
    this.classifiedData = JSON.parse(this.classifiedData);
    this.service.GetClassifiedLookUpsByCategory("SportsBikeUsage").subscribe((result: any) => {
      this.SportsBikeUsage = result.data;

    })
    this.service.GetClassifiedLookUpsByCategory("SellerType ").subscribe((result: any) => {
      this.SellerType = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("Warranty  ").subscribe((result: any) => {
      this.Warranty = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("FinalDriveSystem  ").subscribe((result: any) => {
      this.FinalDriveSystem = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory( "BikeWheel").subscribe((result: any) => {
      this.Wheels = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("BikeManufacturer").subscribe((result: any) => {
      this.BikeManufacturer = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("BikeEngineSize ").subscribe((result: any) => {
      this.BikeEngineSize = result.data;
    })
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    $('.select2').select2({ placeholder: "Search..." });
    $('input[type="number"]').on('input', (e) => {
      let temp: any = $(e.currentTarget).val();
      temp.replace(/[^0-9 +]+/, '');
      $(e.currentTarget).val(temp);
    });
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
    } else if(this.DetailsForm.value.price == "") {
      this.currentField = "price-input";
      this.error = "Enter Phone Number";
      this.showError = true;
      return;
    } else if($(".show-phone-input").val() == -1) {
      this.currentField = "show-phone-input";
      this.error = "Do you want to show phone number";
      this.showError = true;
      return;
    } else if(this.DetailsForm.value.desc == "") {
      this.currentField = "desc-input";
      this.error = "Enter Description";
      this.showError = true;
      return;
    } else if(this.DetailsForm.value.kilometers == "") {
      this.currentField = "kilometers-input";
      this.error = "Enter Kilometers";
      this.showError = true;
      return;
    } else if($(".usage-input").val() == 0) {
      this.currentField = "usage-input";
      this.error = "Select Usage";
      this.showError = true;
      return;
    } else if(this.DetailsForm.value.year == "") {
      this.currentField = "year-input";
      this.error = "Enter Year";
      this.showError = true;
      return;
    } else if($(".seller-type-input").val() == 0) {
      this.currentField = "seller-type-input";
      this.error = "Select Seller Type";
      this.showError = true;
      return;
    } else if($(".warranty-input").val() == 0) {
      this.currentField = "warranty-input";
      this.error = "Select Warranty";
      this.showError = true;
      return;
    } else if($(".final-drive-input").val() == 0) {
      this.currentField = "final-drive-input";
      this.error = "Select Final Drive";
      this.showError = true;
      return;
    } else if($(".wheels-input").val() == 0) {
      this.currentField = "wheels-input";
      this.error = "Select Wheels";
      this.showError = true;
      return;
    } else if($(".manufacturer-input").val() == 0) {
      this.currentField = "manufacturer-input";
      this.error = "Select Manufacturer";
      this.showError = true;
      return;
    } else if($(".engine-size").val() == 0) {
      this.currentField = "engine-size";
      this.error = "Select Engine Size";
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
    tempData.Description = this.DetailsForm.value.title;
    tempData.UsageId = $(".usage-input").val();
    tempData.Year = this.DetailsForm.value.year;
    tempData.KiloMeters = this.DetailsForm.value.kilometers;
    tempData.PhoneNumber = this.DetailsForm.value.phone;
    tempData.SellerTypeId = $(".seller-type-input").val();
    tempData.WarrantyId = $(".warranty-input").val();
    tempData.FinalDriveSystemId = $(".final-drive-input").val();
    tempData.WheelId = $(".wheels-input").val();
    tempData.ManufacturerId = $(".manufacturer-input").val();
    tempData.EngineSizeId = $(".engine-size").val();
    
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
          this.router.navigate(["/classified/classified-payment"]);
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