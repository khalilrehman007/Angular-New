import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-documents',
  templateUrl: './property-documents.component.html',
  styleUrls: ['./property-documents.component.scss'],
  providers: [DatePipe]
})
export class PropertyDocumentsComponent implements OnInit {
  upload = '../../../../assets/images/icons/upload-1.svg'
  trash = '../../../../assets/images/icons/Trash.svg'
  edit = '../../../../assets/images/icons/edit.svg'
  checkmark = '../../../../assets/images/icons/checkmark-circle.svg'
  stripe = '../../../../assets/images/stripe.svg'
  reportimg = '../../../../assets/images/report-icon.png'
  countriesList = new FormControl('+971');
  file: string = "";
  affecton: any;
  propertys: any;
  emirate: any = [];
  titleDeedImage: any = "";
  affectionImage: any = "";
  propertyImage: any = "";
  otherImages: any = [];
  uploadedDocuments: any = [];
  documentcount: number = 0;
  userData: any;
  unitCount: number = 0;
  certificateData: any = [];
  valuationPrices: any = [];
  minDate = new Date();
  formData: any = {};
  documentData: any = [];
  mapImage: any;
  termsAccepted: boolean = false;
  reportPrice: any = 0;
  documentType: any = [];
  valuationResponse: any = {};
  showPayment: boolean = false;
  publishText: any = "Submit";
  showLoader: boolean = false;
  error: any = ""
  showError: boolean = false;
  requiredDocs: number = 3;
  currentField: any;
  currency: any = localStorage.getItem("currency");
  errorResponse(data: any) {
    this.showError = false;
    this.animate();
  }

  reportForm = new FormGroup({
    name: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required)
  })

  checkPhone() {
    let temp: any = this.reportForm.value.phone;
    if (temp.toString().length > 10) {
      this.error = "Max length allows is 10";
      this.showError = true;
      this.reportForm.patchValue({
        phone: temp.toString().slice(0, -1)
      })
    }
  }
  paymentForm = new FormGroup({
    cardNumber: new FormControl("", Validators.required),
    expiryDate: new FormControl("", Validators.required),
    cvv: new FormControl("", Validators.required),
    cardName: new FormControl("", Validators.required)
  })

  get name() {
    return this.reportForm.get("name");
  }
  get email() {
    return this.reportForm.get("email");
  }
  get cardNumber() {
    return this.paymentForm.get("cardNumber");
  }
  get expiryDate() {
    return this.paymentForm.get("expiryDate");
  }
  get cvv() {
    return this.paymentForm.get("cvv");
  }
  get cardName() {
    return this.paymentForm.get("cardName");
  }
  deleteImage(index: any) {
    this.uploadedDocuments = this.uploadedDocuments.filter((e: any) => e.index != index);
    if (index == 10) {
      this.titleDeedImage = "";
      this.file = "";
      this.documentcount--;
      $(".title-deed-image").val("");
    } else if (index == 11) {
      this.affectionImage = "";
      this.affecton = "";
      this.documentcount--;
      $(".affection-image").val("");
    } else if (index == 12) {
      this.propertyImage = "";
      this.propertys = "";
      this.documentcount--;
      $(".front-view-image").val("");
    } else {
      this.otherImages = this.otherImages.filter((e: any) => e.index != index);
      this.emirate[index] = "";
      $(".emirateInput" + index).val("");
    }
  }
  handleChange(files: FileList, index: number) {
    if (files && files.length) {
      this.titleDeedImage = files[0];
      this.file = files[0].name;
    }
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      let found = -1;
      for (let i = 0; i < this.uploadedDocuments.length; i++) {
        if (this.uploadedDocuments[i].index == index) {
          found = i;
        }
      }
      if (found == -1) {
        this.uploadedDocuments.push({ index: index, documentName: "Title Deed", fileName: files[0].name, imgsrc: reader.result });
      } else {
        this.uploadedDocuments[found].fileName = files[0].name;
        this.uploadedDocuments[found].imgsrc = reader.result;
      }
    };
    this.documentcount++;
  }
  affection(files: FileList, index: number) {
    if (files && files.length) {
      this.affectionImage = files[0];
      this.affecton = files[0].name;
    }
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      let found = -1;
      for (let i = 0; i < this.uploadedDocuments.length; i++) {
        if (this.uploadedDocuments[i].index == index) {
          found = i;
        }
      }
      if (found == -1) {
        this.uploadedDocuments.push({ index: index, documentName: "Affection Plan", fileName: files[0].name, imgsrc: reader.result });
      } else {
        this.uploadedDocuments[found].fileName = files[0].name;
        this.uploadedDocuments[found].imgsrc = reader.result;
      }
    };
    this.documentcount++;
  }
  property(files: FileList, index: number) {
    if (files && files.length) {
      this.propertyImage = files[0];
      this.propertys = files[0].name;
    }
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      let found = -1;
      for (let i = 0; i < this.uploadedDocuments.length; i++) {
        if (this.uploadedDocuments[i].index == index) {
          found = i;
        }
      }
      if (found == -1) {
        this.uploadedDocuments.push({ index: index, documentName: "Picture: Front View", fileName: files[0].name, imgsrc: reader.result });
      } else {
        this.uploadedDocuments[found].fileName = files[0].name;
        this.uploadedDocuments[found].imgsrc = reader.result;
      }
    };
    this.documentcount++;
  }
  emiratesfun(files: FileList, index: number, id: any) {
    if (files && files.length) {
      let found: number = -1;
      for (let i = 0; i < this.otherImages.length; i++) {
        if (this.otherImages[i].index == index) {
          found = i;
        }
      }
      if (found == -1) {
        this.otherImages.push({ index: index, file: files[0], id: id });
      } else {
        this.otherImages[found].file = files[0];
      }
      this.emirate[index] = files[0].name;
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        found = -1;
        for (let i = 0; i < this.uploadedDocuments.length; i++) {
          if (this.uploadedDocuments[i].index == index) {
            found = i;
          }
        }
        if (found == -1) {
          this.uploadedDocuments.push({ index: index, documentName: "Other Documents", fileName: files[0].name, imgsrc: reader.result });
        } else {
          this.uploadedDocuments[found].fileName = files[0].name;
          this.uploadedDocuments[found].imgsrc = reader.result;
        }
      };
    }
  }

  status: boolean = false;
  status1: boolean = false;
  status2: boolean = false;
  status3: boolean = false;
  status4: boolean = false;
  status5: boolean = false;
  status6: boolean = false;
  status7: boolean = false;
  status8: boolean = false;
  status9: boolean = false;
  data: any = [];
  selectedData: any = [];

  dataURLtoFile(dataurl: any, filename: any) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  selectData(e: any, index: any) {
    let temp: any = this.data[index].filter((item: any) => item.id == e);
    if (temp.length > 0) {
      this.selectedData = temp[0];
      return true;
    } else {
      return false;
    }
  }
  animate() {
    let temp: any = $("." + this.currentField).offset()?.top;
    $("." + this.currentField).addClass("blink");
    $("." + this.currentField).on("click", () => {
      $("." + this.currentField).removeClass("blink");
      this.currentField = "";
    })
    $(window).scrollTop(temp - 100);
  }
  checkPackage() {
    this.service.PropertyPackageType().subscribe((result: any) => {
      this.certificateData = result.data;
      let temp: any = [];
      let a: any = [];
      for (let i = 0; i < this.certificateData.packageCategories.length; i++) {
        temp = this.certificateData.packageTypes[0].packageContent.filter((e: any) => {
          return e.packageCategoryId == this.certificateData.packageCategories[i].id;
        })
        a.push(temp);
      }
      this.data.push(a);
      a = temp = [];
      for (let i = 0; i < this.certificateData.packageCategories.length; i++) {
        temp = this.certificateData.packageTypes[1].packageContent.filter((e: any) => {
          return e.packageCategoryId == this.certificateData.packageCategories[i].id;
        })
        a.push(temp);
      }
      this.data.push(a);
    });
  }
  Nextshow() {
    if (this.documentcount >= this.requiredDocs) {
      this.documentData = [];
      let dataUrl: any = localStorage.getItem("mapImg");
      this.mapImage = this.dataURLtoFile(dataUrl, "map.jpg");
      this.documentData.push({ "FileId": "1", "DocumentTypeId": this.documentType[this.documentType.length - 1].id, "FileName": "map.jpg", "Extension": "jpg", "IsScreenshot": "true" });
      let extension: any;
      if(this.formData.TitleDeedNo != 0) {
        extension = this.titleDeedImage.name.split(".");
        extension = extension[extension.length - 1];
        this.documentData.push({ "FileId": "2", "DocumentTypeId": 1, "FileName": this.titleDeedImage.name, "Extension": extension, "IsScreenshot": "false" });
      }
      if(this.formData.MunicipalityNo != 0) {
        extension = this.affectionImage.name.split(".");
        extension = extension[extension.length - 1];
        this.documentData.push({ "FileId": "3", "DocumentTypeId": 2, "FileName": this.affectionImage.name, "Extension": extension, "IsScreenshot": "false" });
      }
      extension = this.propertyImage.name.split(".");
      extension = extension[extension.length - 1];
      this.documentData.push({ "FileId": "4", "DocumentTypeId": 3, "FileName": this.propertyImage.name, "Extension": extension, "IsScreenshot": "false" });
      for (let i = 0; i < this.otherImages.length; i++) {
        extension = this.otherImages[i].file.name.split(".");
        extension = extension[extension.length - 1];
        this.documentData.push({ "FileId": i + 5, "DocumentTypeId": this.otherImages[i].id, "FileName": this.otherImages[i].file.name, "Extension": extension, "IsScreenshot": "false" });
      }
      this.formData.Documents = this.documentData;

      this.status = !this.status;
      this.status5 = !this.status5;
      this.status1 = !this.status1;
    } else {
      this.currentField = "required-docs";
      this.error = "Please Upload the required Documents.";
      this.showError = true;
    }
  }
  Prevshow() {
    this.status1 = false;
    this.status5 = false;
    this.status = !this.status;
  }
  Nextshow1() {
    let temp: any = localStorage.getItem("valuationData");
    temp = JSON.parse(temp);
    this.service.ValuationPrices({ "PropertyTypeId": temp.PropertyTypeId, "CountryId": temp.CountryId }).subscribe((result: any) => {
      this.valuationPrices = result.data;
    })
    this.status2 = !this.status2;
    this.status6 = !this.status6;
    this.status1 = !this.status1;
  }
  Prevshow1() {
    this.status2 = false;
    this.status6 = false;
    this.status1 = !this.status1;
  }
  Nextshow2() {
    if (!this.formData.ReportPackageId) {
      this.currentField = "package-type-input";
      this.error = "Select Package Type";
      this.showError = true;
      return;
    } else if (!this.formData.ReportLanguage) {
      this.currentField = "language-input";
      this.error = "Select Report Language";
      this.showError = true;
      return;
    } else if (this.reportForm.value.name == "") {
      this.currentField = "name-input";
      this.error = "Please Enter Owner Name";
      this.showError = true;
      return;
    } else if (this.reportForm.value.phone == "") {
      this.currentField = "phone-input";
      this.error = "Please Enter Owner Phone Number";
      this.showError = true;
      return;
    } else if (!this.termsAccepted) {
      this.currentField = "accept-terms-input";
      this.error = "Please Accept Terms and Conditions";
      this.showError = true;
      return;
    } else if (this.formData.InspectionRequired && $("#formDate").val() == "") {
      this.error = "Please Enter Inspection Date";
      this.showError = true;
      return;
    }
    this.showLoader = true;
    this.publishText = "Please Wait...";
    this.formData.CustomerName = this.reportForm.value.name;
    let temp:any = this.countriesList.value
    this.formData.PhoneNumber = temp + this.reportForm.value.phone;
    this.formData.InspectionDate = $("#formDate").val();

    let userData: any = localStorage.getItem("user");
    userData = JSON.parse(userData);
    this.formData.UserId = userData.id;
    this.formData.EmailAddress = userData.email;

    if (this.formData.InspectionRequired) {
      let a: any = localStorage.getItem("inspectionFee");
      this.formData.ValuationPayment = { "Email": userData.email, "CustomerName": this.reportForm.value.name, "TotalAmount": parseInt(this.reportPrice) + parseInt(a), "InspectionAmount": localStorage.getItem("inspectionFee"), "ReportAmount": this.reportPrice };
    } else {
      this.formData.ValuationPayment = { "Email": userData.email, "CustomerName": this.reportForm.value.name, "TotalAmount": this.reportPrice, "InspectionAmount": 0, "ReportAmount": this.reportPrice };
    }
    let valuationData = new FormData();
    valuationData.append("ValuationRequest", JSON.stringify(this.formData));
    valuationData.append("1_map.jpg", this.mapImage);
    valuationData.append("2_" + this.titleDeedImage.name, this.titleDeedImage);
    valuationData.append("3_" + this.affectionImage.name, this.affectionImage);
    valuationData.append("4_" + this.propertyImage.name, this.propertyImage);
    for (let i = 0; i < this.otherImages.length; i++) {
      valuationData.append(i + 5 + "_" + this.otherImages[i].file.name, this.otherImages[i].file);
    }
    let token: any = localStorage.getItem("token");
    token = JSON.parse(token);
    $.ajax({
      url: "https://beta.ovaluate.com/api/AddValuation",
      method: "post",
      contentType: false,
      processData: false,
      data: valuationData,
      headers: {
        "Authorization": 'bearer ' + token
      },
      dataType: "json",
      success: (res) => {
        if (res.message == "valuation request completed successfully") {
          this.valuationResponse = res.data;
          localStorage.setItem("valuationResponse", JSON.stringify(res.data));
          this.showPayment = true;
          this.status3 = !this.status3;
          this.status7 = !this.status7;
          this.status2 = !this.status2;
          this.showLoader = false;
        } else {
          console.log(res);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  Prevshow2() {
    this.status3 = false;
    this.status7 = false;
    this.status2 = !this.status2;
  }
  reportLanguage(e: any) {
    this.formData.ReportLanguage = e;
    this.reportForm.patchValue({
      name: ""
    })
  }
  acceptTerms(e: any) {
    this.termsAccepted = e.checked;
  }
  SummaryReport(e: any, id: any, price: any) {
    if (e == 0) {
      this.status8 = true;
      this.status9 = false;
    } else {
      this.status9 = true;
      this.status8 = false;
    }
    this.reportPrice = price;
    this.formData.ReportPackageId = id;
  }
  onInspectionSelect(e: any) {
    this.formData.InspectionRequired = e.checked;
  }
  onKeypressEvent(e: any) {
    this.checkLength(3, false)
  }
  viewImage(e: any) {
    let w: any = window.open("");
    w.document.write("<div style='width:100vw; height:100vh; margin:-8px; display:flex; justify-content:center; align-items:center;background-color:#000;'><img style='width:100%; max-width:1200px;' src='" + e + "'></div>");
  }
  checkLength(e: any, type: boolean) {
    if (e == 1) {
      let temp: any = this.paymentForm.value.cardNumber;
      if (temp.toString().length > 16) {
        this.paymentForm.patchValue({
          cardNumber: temp.toString().slice(0, -1)
        })
      }
    } else if (e == 2) {
      let temp: any = this.paymentForm.value.cvv;
      if (temp.toString().length > 4) {
        this.paymentForm.patchValue({
          cvv: temp.toString().slice(0, -1)
        })
      }
    } else if (e == 3) {
      let temp: any = this.paymentForm.value.expiryDate;
      if (temp.replace("/", "") >= 0) {
        if (temp.toString().length == 2 && !type) {
          this.paymentForm.patchValue({
            expiryDate: temp.toString() + "/"
          })
        } else if (temp.toString().length == 3 && type) {
          this.paymentForm.patchValue({
            expiryDate: temp.toString().slice(0, -1)
          })
        } else if (temp.toString().length > 5) {
          this.paymentForm.patchValue({
            expiryDate: temp.toString().slice(0, -1)
          })
        }
      } else {
        this.paymentForm.patchValue({
          expiryDate: temp.toString().slice(0, -1)
        })
      }
    }
  }
  validateName(e: any) {
    let temp: any = this.reportForm.value.name;
    let charCode: any = e.key.charCodeAt(0)
    if (this.formData.ReportLanguage == 1) {
      if (charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122) {
        this.reportForm.patchValue({
          name: temp.toString() + e.key
        })
      }
    } else if (this.formData.ReportLanguage == 2) {
      if (!(charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122)) {
        this.reportForm.patchValue({
          name: temp.toString() + e.key
        })
      }
    } else {
      this.error = "Select Report Language";
      this.showError = true;
      return;
    }
  }
  removeChar() {
    let temp: any = this.reportForm.value.name;
    this.reportForm.patchValue({
      name: temp.toString().slice(0, -1)
    })
  }
  getPaymentData() {
    let number: any = this.paymentForm.value.cardNumber;
    let date: any = this.paymentForm.value.expiryDate;
    let cvv: any = this.paymentForm.value.cvv;
    let currentDate: any = this.datePipe.transform(this.minDate, 'yyyy-MM-dd')?.split("-");
    if (this.paymentForm.value.cardNumber == "") {
      this.currentField = "card-number-input";
      this.error = "Please Enter Card Number";
      this.showError = true;
      return;
    } else if (number.toString().length < 16) {
      this.currentField = "card-number-input";
      this.error = "Please Enter a Valid Card Number";
      this.showError = true;
      return;
    } else if (this.paymentForm.value.expiryDate == "") {
      this.currentField = "expiry-input";
      this.error = "Please Enter Card Expiry";
      this.showError = true;
      return;
    } else if (date.toString().length < 5) {
      this.currentField = "expiry-input";
      this.error = "Please Enter a Valid Card Expiry";
      this.showError = true;
      return;
    } else if (this.paymentForm.value.cvv == "") {
      this.currentField = "cvv-input";
      this.error = "Please Enter CVV";
      this.showError = true;
      return;
    } else if (cvv.toString().length < 3) {
      this.currentField = "cvv-input";
      this.error = "Please Enter a valid CVV";
      this.showError = true;
      return;
    } else if ("20" + date.toString().split("/")[1] < currentDate[0]) {
      this.currentField = "expiry-input";
      this.error = "Please Enter a Valid Card Expiry";
      this.showError = true;
      return;
    } else if ("20" + date.toString().split("/")[1] == currentDate[0] && date.toString().split("/")[0] < currentDate[1] || date.toString().split("/")[0] > 12) {
      this.currentField = "expiry-input";
      this.error = "Please Enter a Valid Card Expiry";
      this.showError = true;
      return;
    } else if (this.paymentForm.value.cardName = "") {
      this.currentField = "card-name-input";
      this.error = "Please Enter a Card Holder Name";
      this.showError = true;
      return;
    }
    this.showLoader = true;
    let data: any = { "CardNumder": number, "Currency": this.currency, "reportNumberCode": this.valuationResponse.reportNumberCode, "Month": date.toString().split("/")[0], "Year": "20" + date.toString().split("/")[1], "CVC": cvv, "Amount": this.valuationResponse.valuationPayment.totalAmount, "Email": this.valuationResponse.emailAddress, "CustomerName": this.paymentForm.value.cardName, "DescriptionPayment": this.userData.propertyCategory + " " + this.userData.propertyType + " " + this.valuationResponse.reportPackage.name };
    this.service.ValuationPayment(data).subscribe((result: any) => {
      if (result.message == "Valuation transaction completed successfully") {
        localStorage.removeItem("bounds");
        localStorage.removeItem("valuationDetailData");
        localStorage.removeItem("propertyTypeData");
        localStorage.removeItem("valuationData");
        localStorage.removeItem("mapImg");
        this.showLoader = false;
        this.router.navigate(['//valuation/PropertyDownloadReport']);
      } else {
        this.showLoader = false;
        this.error = result.error;
        this.showError = true;
      }
    })
  }
  constructor(private service: AppService, private datePipe: DatePipe, private router: Router) {
    this.userData = localStorage.getItem("valuationDetailData");
    this.userData = JSON.parse(this.userData);
    this.formData = localStorage.getItem("valuationData");
    this.formData = JSON.parse(this.formData);
    this.formData.InspectionRequired = false;
    this.service.ValuationDocumentTypes().subscribe((result: any) => {
      this.documentType = result.data;
    })
    this.checkPackage();
    if (this.formData.TitleDeedNo == 0) {
      this.requiredDocs--;
    }
    if (this.formData.MunicipalityNo == 0) {
      this.requiredDocs--;
    }
  }
  ngOnInit(): void {
    $("#formDate").on("click", function () {
      $(".mat-datepicker-toggle").click();
    })
  }
}