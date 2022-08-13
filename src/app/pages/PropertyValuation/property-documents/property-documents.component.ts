import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import { AppService } from 'src/app/service/app.service';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  file: string;
  affecton: string;
  propertys: string;
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
  publishText:any = "Publish";
  showLoader: boolean = false;

  reportForm = new FormGroup({
    name: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required)
  })

  paymentForm = new FormGroup({
    cardNumber: new FormControl("", Validators.required),
    expiryDate: new FormControl("", Validators.required),
    cvv: new FormControl("", Validators.required)
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
        this.uploadedDocuments.push({ index: index, documentName: "Other Documents", fileName: files[0].name, imgsrc: reader.result });
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
        this.uploadedDocuments.push({ index: index, documentName: "Other Documents", fileName: files[0].name, imgsrc: reader.result });
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
        this.uploadedDocuments.push({ index: index, documentName: "Other Documents", fileName: files[0].name, imgsrc: reader.result });
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

  dataURLtoFile(dataurl: any, filename: any) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  Nextshow() {
    if (this.documentcount >= 3) {
      this.documentData = [];
      let dataUrl: any = localStorage.getItem("mapImg");
      this.mapImage = this.dataURLtoFile(dataUrl, "map.jpg");
      this.documentData.push({ "FileId": "1", "DocumentTypeId": this.documentType[this.documentType.length-1].id, "FileName": "map.jpg", "Extension": "jpg", "IsScreenshot": "true" });
      let extension: any = this.titleDeedImage.name.split(".");
      extension = extension[extension.length - 1];
      this.documentData.push({ "FileId": "2", "DocumentTypeId": 1, "FileName": this.titleDeedImage.name, "Extension": extension, "IsScreenshot": "false" });
      extension = this.affectionImage.name.split(".");
      extension = extension[extension.length - 1];
      this.documentData.push({ "FileId": "3", "DocumentTypeId": 2, "FileName": this.affectionImage.name, "Extension": extension, "IsScreenshot": "false" });
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
      alert("Please Upload the required Documents.");
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
    this.service.ValuationPrices(temp.PropertyTypeId).subscribe((result: any) => {
      this.valuationPrices = result.data;
    })
    this.service.PropertyPackageType().subscribe((result: any) => {
      this.certificateData = result.data;
    });
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
    if(!this.formData.ReportPackageId) {
      alert("Select Package Type");
      return;
    } else if(!this.formData.ReportLanguage) {
      alert("Select Report Language");
      return;
    } else if(this.reportForm.value.name == "") {
      alert("Please Enter Owner Name");
      return;
    } else if(this.reportForm.value.phone == "") {
      alert("Please Enter Owner Email");
      return;
    } else if(!this.termsAccepted) {
      alert("Please Accept Terms and Conditions");
      return;
    } else if(this.formData.InspectionRequired && $("#formDate").val()  == "") {
      alert("Please Enter Inspection Date");
      return;
    }
    this.publishText = "Please Wait...";
    this.formData.CustomerName = this.reportForm.value.name;
    this.formData.PhoneNumber = this.reportForm.value.phone;
    this.formData.InspectionDate = $("#formDate").val();

    let userData:any = localStorage.getItem("user");
    userData = JSON.parse(userData);
    this.formData.UserId = userData.id;
    this.formData.EmailAddress = userData.email;

    if(this.formData.InspectionRequired) {
      this.formData.ValuationPayment = {"Email":userData.email, "CustomerName":this.reportForm.value.name, "TotalAmount":this.reportPrice+1000,"InspectionAmount":1000,"ReportAmount":this.reportPrice};
    } else {
      this.formData.ValuationPayment = {"Email":userData.email, "CustomerName":this.reportForm.value.name, "TotalAmount":this.reportPrice,"InspectionAmount":0,"ReportAmount":this.reportPrice};
    }

    let valuationData = new FormData();
    valuationData.append("ValuationRequest", JSON.stringify(this.formData));
    valuationData.append("1_map.jpg", this.mapImage);
    valuationData.append("2_"+this.titleDeedImage.name, this.titleDeedImage);
    valuationData.append("3_"+this.affectionImage.name, this.affectionImage);
    valuationData.append("4_"+this.propertyImage.name, this.propertyImage);
    for(let i = 0; i < this.otherImages.length; i++) {
      valuationData.append(i+5+"_"+this.otherImages[i].file.name, this.otherImages[i].file);
    }
    let token:any = localStorage.getItem("token");
    token = JSON.parse(token);
    $.ajax({
      url: "https://beta.ovaluate.com/api/AddValuation",
      method: "post",
      contentType: false,
      processData: false,
      data: valuationData,
      headers: {
        "Authorization": 'bearer '+token
      },
      dataType: "json",
      success: (res) => {
        if(res.message == "valuation request completed successfully") {
          this.valuationResponse = res.data;
          localStorage.setItem("valuationResponse", JSON.stringify(res.data));
          this.showPayment = true;
          this.status3 = !this.status3;
          this.status7 = !this.status7;
          this.status2 = !this.status2;
        } else {
          alert("Something went wrong");
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
  getPaymentData() {
    let number:any = this.paymentForm.value.cardNumber;
    let date:any = this.paymentForm.value.expiryDate;
    let cvv:any = this.paymentForm.value.cvv;
    let currentDate:any = this.datePipe.transform(this.minDate, 'yyyy-MM-dd')?.split("-");
    if(this.paymentForm.value.cardNumber == "") {
      alert("Please Enter Card Number");
      return;
    } else if(number.toString().length < 16) {
      alert("Please Enter a Valid Card Number");
      return;
    } else if(this.paymentForm.value.expiryDate == "") {
      alert("Please Enter Card Expiry");
      return;
    } else if(date.toString().length < 5 ) {
      alert("Please Enter a Valid Card Expiry");
      return;
    } else if(this.paymentForm.value.cvv == "") {
      alert("Please Enter CVV");
      return;
    } else if(cvv.toString().length < 3) {
      alert("Please Enter a valid CVV");
      return;
    } else if("20"+date.toString().split("/")[1] < currentDate[0]) {
      alert("Please Enter a Valid Card Expiry");
      return;
    } else if("20" + date.toString().split("/")[1] == currentDate[0] && date.toString().split("/")[0] < currentDate[1] || date.toString().split("/")[0] > 12) {
      alert("Please Enter a Valid Card Expiry");
      return;
    }
    this.showLoader = true;
    let data: any = { "CardNumder":number,"reportNumberCode": this.valuationResponse.reportNumberCode, "Month":date.toString().split("/")[0],"Year":"20" + date.toString().split("/")[1],"CVC":cvv,"Amount":this.valuationResponse.valuationPayment.totalAmount,"Email":this.valuationResponse.emailAddress,"CustomerName": this.valuationResponse.customerName, "DescriptionPayment": this.valuationResponse.reportPackage.name };
    this.service.ValuationPayment(data).subscribe((result:any) => {
      if(result.message == "Valuation transaction completed successfully") {
        this.showLoader = false;
      } else {
        alert(result.error)
      }
    })
  }
  constructor(private service: AppService, private datePipe: DatePipe) {
    this.userData = localStorage.getItem("valuationDetailData");
    this.userData = JSON.parse(this.userData);
    this.formData = localStorage.getItem("valuationData");
    this.formData = JSON.parse(this.formData);
    this.formData.InspectionRequired = false;
    this.service.ValuationDocumentTypes().subscribe((result: any) => {
      this.documentType = result.data;
    })
    this.valuationResponse = localStorage.getItem("valuationResponse");
    this.valuationResponse = JSON.parse(this.valuationResponse);
    this.showPayment = true;
    this.status = !this.status;
    this.status3 = true;
  }

  ngOnInit(): void {
    $("#formDate").on("click", function () {
      $(".mat-datepicker-toggle").click();
    })
  }

}
