import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';
import { AppService } from 'src/app/service/app.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-phone-form',
  templateUrl: './phone-form.component.html',
  styleUrls: ['./phone-form.component.scss']
})
export class PhoneFormComponent implements OnInit {
  ads= 'assets/images/post-add.jpg'
  error: any = ""
  showError: boolean = false;
  selectedFiles: any;
  imageData: any = [];
  previews: string[] = [];
  mainImage: any = 0;
  data: any = {};
  imgCheck: boolean = false;
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

  MobilePhoneAge : any=[];
  MobilePhoneCondition: any=[];
  Color: any=[];
  Warranty : any=[];
  DeviceDamageType: any=[];
  DeviceBatteryHealth: any=[];
  DeviceVersionType: any=[];
  DeviceAccompaniments: any=[];
  DeviceStorageType : any=[];
  DeviceMemoryType: any=[];

  DetailsForm = new FormGroup({
    Title : new FormControl("", Validators.required),
    Phone : new FormControl("", Validators.required),
    Price: new FormControl("", Validators.required),
    Description : new FormControl("", Validators.required),
  });
  constructor( private service : AppService, private router: Router) {
    this.classifiedData = JSON.parse(this.classifiedData);

    this.service.GetClassifiedLookUpsByCategory("MobilePhoneAge ").subscribe((result:any) => {
      this.MobilePhoneAge = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("MobilePhoneCondition ").subscribe((result:any) => {
      this.MobilePhoneCondition= result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("Color").subscribe((result:any) => {
      this.Color = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("Warranty ").subscribe((result:any) => {
      this.Warranty = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("DeviceDamageType ").subscribe((result:any) => {
      this.DeviceDamageType= result.data;   
    })
    this.service.GetClassifiedLookUpsByCategory("DeviceBatteryHealth ").subscribe((result:any) => {
      this.DeviceBatteryHealth= result.data;   
    })
    this.service.GetClassifiedLookUpsByCategory("DeviceVersionType").subscribe((result:any) => {
      this.DeviceVersionType= result.data;   
    })
    this.service.GetClassifiedLookUpsByCategory("DeviceAccompaniments").subscribe((result:any) => {
      this.DeviceAccompaniments= result.data;   
    })
    this.service.GetClassifiedLookUpsByCategory("DeviceStorageType ").subscribe((result:any) => {
      this.DeviceStorageType = result.data;
      })
    this.service.GetClassifiedLookUpsByCategory("DeviceMemoryType  ").subscribe((result:any) => {
      this.DeviceMemoryType = result.data;
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
      if($(".Show-phone-Input").val() == 0) {
        this.currentField = "Show-phone-Input + .select2";
        this.error = "Do you want to show Phone Number";
        this.showError = true;
        return;
      } else if($(".Age").val() == 0) {
        this.currentField = "Age + .select2";
        this.error = "Select Age";
        this.showError = true;
        return;
      } else if($(".Condition").val() == 0) {
        this.currentField = "Condition + .select2";
        this.error = "Select Condition";
        this.showError = true;
        return;
      } 
      // else if($(".Model").val() == 0) {
      //   this.currentField = "Model + .select2";
      //   this.error = "Select Model";
      //   this.showError = true;
      //   return;
      // } 
      else if($(".Color").val() == 0) {
        this.currentField = "Color + .select2";
        this.error = "Select Color";
        this.showError = true;
        return;
      } else if($(".Warranty").val() == 0) {
        this.currentField = "Warranty + .select2";
        this.error = "Select Warranty";
        this.showError = true;
        return;
      } else if($(".Damage-on-Device").val() == -1) {
        this.currentField = "Damage-on-Device + .select2";
        this.error = "Select Demage";
        this.showError = true;
        return;
      } else if($(".Demage-Details").val() == 0) {
        this.currentField = "Demage-Details + .select2";
        this.error = "Select Demage Details";
        this.showError = true;
        return;
      } else if($(".Battery-Health").val() == 0) {
        this.currentField = "Battery-Health + .select2";
        this.error = "Select Battery Health";
        this.showError = true;
        return;
      } else if($(".Version").val() == 0) {
        this.currentField = "Version + .select2";
        this.error = "Select Version";
        this.showError = true;
        return;
      } else if($(".Accompaniments").val() == 0) {
        this.currentField = "Accompaniments + .select2";
        this.error = "Select Accompaniments";
        this.showError = true;
        return;
      } else if($(".carrier-Lock").val() == -1) {
        this.currentField = "carrier-Lock + .select2";
        this.error = "Select Carries Lock";
        this.showError = true;
        return;
      } else if($(".Storage-Capacity").val() == 0) {
        this.currentField = "Storage-Capacity + .select2";
        this.error = "Select Capacity";
        this.showError = true;
        return;
      } else if($(".Memory").val() == 0) {
        this.currentField = "Memory + .select2";
        this.error = "Select Memory";
        this.showError = true;
        return;
      } else if(this.DetailsForm.value.Title == "") {
        this.currentField = "Title-input";
        this.error = "Enter Title";
        this.showError = true;
        return;
      }  else if(this.DetailsForm.value.Phone == "") {
        this.currentField = "Phone-Number-input";
        this.error = "Enter Phone Number";
        this.showError = true;
        return;
      } else if(this.DetailsForm.value.Price == "") {
        this.currentField = "Price-input";
        this.error = "Enter Price";
        this.showError = true;
        return;
      } else if(this.DetailsForm.value.Description == "") {
        this.currentField = "Description-input";
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
      tempData.title = this.DetailsForm.value.Title;
      tempData.phoneNumber = this.DetailsForm.value.Phone;
      tempData.price = this.DetailsForm.value.Price;
      tempData.showPhone = $(".Show-phone-Input").val();
      tempData.description = this.DetailsForm.value.Description;
      tempData.ageId = $(".Age-select").val();
      tempData.BodyConditionId = $(".Condition").val();
      tempData.ColorId = $(".Color").val();
      tempData.WarrantyId = $(".Warranty").val();
      tempData.isDeviceDamaged = $(".Damage-on-Device").val();
      tempData.damageDetails= $(".Demage-Details").val();
      tempData.BatteryHealthId= $(".Battery-Health").val();
      tempData.DeviceVersionId= $(".Version").val();
      tempData.accompaniments= $(".Accompaniments").val();
      tempData.isCarrierLocked= $(".carrier-Lock").val();
      tempData.Capacity= $(".Storage-Capacity").val();
      tempData.MemoryId= $(".Memory").val();
      // temp.model = $(".Model").val();
          
      // this.router.navigate(["/classified/car-ad-submission"]);

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

