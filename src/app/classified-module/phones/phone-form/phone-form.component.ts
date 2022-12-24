import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';
import { AppService } from 'src/app/service/app.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phone-form',
  templateUrl: './phone-form.component.html',
  styleUrls: ['./phone-form.component.scss']
})
export class PhoneFormComponent implements OnInit {
  ads= 'assets/images/post-add.jpg'
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
    price: new FormControl("", Validators.required),
    Description : new FormControl("", Validators.required),
  });
  constructor( private service : AppService, private router: Router) {
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
      } else if($(".Model").val() == 0) {
        this.currentField = "Model + .select2";
        this.error = "Select Model";
        this.showError = true;
        return;
      } else if($(".Color").val() == 0) {
        this.currentField = "Color + .select2";
        this.error = "Select Color";
        this.showError = true;
        return;
      } else if($(".Warranty").val() == 0) {
        this.currentField = "Warranty + .select2";
        this.error = "Select Warranty";
        this.showError = true;
        return;
      } else if($(".Damage-on-Device").val() == 0) {
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
      } else if($(".carrier-Lock").val() == 0) {
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
      } else if(this.DetailsForm.value.price == "") {
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
      let temp:any = localStorage.getItem("classifiedData");
      temp = JSON.parse(temp);
      temp.age = {};
      temp.age.id = $(".Age-select").val();
      temp.Age.text = $(".Age-select").find(":selected").text();
      temp.TrimId = {};
      temp.TrimId.id = $(".trim-select").val();
      temp.TrimId.text = $(".trim-select").find(":selected").text();
      temp.RegionalSpecId = {};
      temp.RegionalSpecId.id = $(".regional-select").val();
      temp.RegionalSpecId.text = $(".regional-select").find(":selected").text();
      temp.Year = this.DetailsForm.value.Title;
      temp.IsInsured = {};
      temp.IsInsured.id = $(".insured-select").val();
      temp.IsInsured.text = $(".insured-select").find(":selected").text();
      temp.title = this.DetailsForm.value.Title;
      temp.price = this.DetailsForm.value.price;
      temp.description = this.DetailsForm.value.Description;
      temp.phoneNumber = this.DetailsForm.value.Phone;
      localStorage.setItem("classifiedData",JSON.stringify(temp));      
      // this.router.navigate(["/classified/car-ad-submission"]);
    }
}

