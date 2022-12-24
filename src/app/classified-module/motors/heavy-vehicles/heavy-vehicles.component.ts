import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';
import { AppService } from 'src/app/service/app.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-heavy-vehicles',
  templateUrl: './heavy-vehicles.component.html',
  styleUrls: ['./heavy-vehicles.component.scss']
})
export class HeavyVehiclesComponent implements OnInit {
  ads= 'assets/images/post-add.jpg'
  error: any = "";
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
  FuelType : any =[];
  BodyCondition : any =[];
  MechanicalCondition : any =[];
  SellerType : any =[];
  Warranty : any =[];
  Cylinders : any =[];
  HorsePower : any =[];
  DetailsForm = new FormGroup({
    title: new FormControl("", Validators.required),
    Phone: new FormControl("", Validators.required),
    Price: new FormControl("", Validators.required),
    Description: new FormControl("", Validators.required),
    Kilometers : new FormControl("", Validators.required),
    Year: new FormControl("", Validators.required),
    Model : new FormControl("", Validators.required),
    Make: new FormControl("", Validators.required),
    Capacity: new FormControl("", Validators.required),
  });
  constructor( private service : AppService,  private router: Router) { 
    this.service.GetClassifiedLookUpsByCategory( "FuelType").subscribe((result:any) => {
      this.FuelType = result.data;
      console.log(this.FuelType);
    })
    this.service.GetClassifiedLookUpsByCategory("BodyCondition").subscribe((result:any) => {
      this.BodyCondition= result.data;
    })
    this.service.GetClassifiedLookUpsByCategory( "MechanicalCondition").subscribe((result:any) => {
      this.MechanicalCondition= result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("SellerType").subscribe((result:any) => {
      this.SellerType= result.data;
      
    })
    this.service.GetClassifiedLookUpsByCategory("Warranty ").subscribe((result:any) => {
      this.Warranty= result.data; 
    })
    this.service.GetClassifiedLookUpsByCategory("Cylinders").subscribe((result:any) => {
      this.Cylinders = result.data; 
    })
    this.service.GetClassifiedLookUpsByCategory("HorsePower").subscribe((result:any) => {
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
        this.error = "Enter Age";
        this.showError = true;
        return;
      } else if (this.DetailsForm.value.Kilometers == "") {
        this.currentField = "kilometer-input";
        this.error = "Enter Kilometer";
        this.showError = true;
        return;
      }  else if ($(".Body-condition").val() == 0) {
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
      }  else if ($(".Seller-type").val() == 0) {
        this.currentField = "Seller-type + .select2";
        this.error = "Enter Seller Type";
        this.showError = true;
        return;
      } else if (this.DetailsForm.value.Model == "") {
        this.currentField = "model-input";
        this.error = "Enter Model";
        this.showError = true;
        return;
      }  else if ($(".warranty").val() == 0) {
        this.currentField = "warranty + .select2";
        this.error = "Enter Warranty";
        this.showError = true;
        return;
      } else if (this.DetailsForm.value.Make == "") {
        this.currentField = "phone-make-input";
        this.error = "Enter Make Name";
        this.showError = true;
        return;
      }  else if (this.DetailsForm.value.Capacity == "") {
        this.currentField = "capacity-input";
        this.error = "Enter Capacity/Weight";
        this.showError = true;
        return;
      }  else if ($(".Cylinders").val() == 0) {
        this.currentField = "Cylinders + .select2";
        this.error = "Enter Cylinders";
        this.showError = true;
        return;
      }  else if ($(".Horsepower").val() == 0) {
        this.currentField = "Horsepower + .select2";
        this.error = "Enter Horsepower";
        this.showError = true;
        return;
      }
    }
  }

