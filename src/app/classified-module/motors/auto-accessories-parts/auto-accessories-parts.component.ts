import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';
import { AppService } from 'src/app/service/app.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
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
  AccessoriesUsage: any = [];
  SellerType : any = [];
  ToolCondition : any = [];
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
  });
  constructor(private service: AppService, private router: Router) {
    this.classifiedData = JSON.parse(this.classifiedData);
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
    let tempData:any = {};
    tempData.CountryId = this.classifiedData.countryId;
    tempData.CityId = this.classifiedData.cityId;
    tempData.DistrictId = this.classifiedData.districtId;
    tempData.Latitude = this.classifiedData.Latitude;
    tempData.Longitude = this.classifiedData.Longitude;
    tempData.ClassifiedCategoryId = this.classifiedData.classifiedData[this.classifiedData.classifiedData.length - 1].value;
    tempData.Title = this.DetailsForm.value.title;
    tempData.Description = this.DetailsForm.value.title;
    tempData.PhoneNumber = this.DetailsForm.value.Phone;
    tempData.Price = this.DetailsForm.value.Price;
    tempData.UsageId = $(".usage-input").val();
    tempData.BodyConditionId = $(".body-type-select").val();
    tempData.SellerTypeId = $(".seller-type-input").val();

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
