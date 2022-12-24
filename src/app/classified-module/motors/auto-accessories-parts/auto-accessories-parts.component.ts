import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';
import { AppService } from 'src/app/service/app.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auto-accessories-parts',
  templateUrl: './auto-accessories-parts.component.html',
  styleUrls: ['./auto-accessories-parts.component.scss']
})
export class AutoAccessoriesPartsComponent implements OnInit {
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
  AccessoriesUsage: any = [];
  SellerType : any = [];
  ToolCondition : any = [];
  DetailsForm = new FormGroup({
    title: new FormControl("", Validators.required),
    Phone: new FormControl("", Validators.required),
    Price: new FormControl("", Validators.required),
    Description: new FormControl("", Validators.required),
  });
  constructor(private service: AppService, private router: Router) {
    this.service.GetClassifiedLookUpsByCategory("AccessoriesUsage").subscribe((result:any) => {
      this.AccessoriesUsage = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("ToolCondition").subscribe((result:any) => {
      this.ToolCondition = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("SellerType ").subscribe((result:any) => {
      this.SellerType  = result.data;
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
      this.currentField = "discription-input";
      this.error = "Enter Description";
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
    }
  }
}
