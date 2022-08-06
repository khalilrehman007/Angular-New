import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import { AppService } from 'src/app/service/app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-property-documents',
  templateUrl: './property-documents.component.html',
  styleUrls: ['./property-documents.component.scss']
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
  termsAccepted:boolean = false;

  reportForm = new FormGroup({
    name: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email])
  })

  get name() {
    return this.reportForm.get("name");
  }
  get email() {
    return this.reportForm.get("email");
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
  emiratesfun(files: FileList, index: number) {
    if (files && files.length) {
      let found: number = -1;
      for (let i = 0; i < this.otherImages.length; i++) {
        if (this.otherImages[i].index == index) {
          found = i;
        }
      }
      if (found == -1) {
        this.otherImages.push({ index: index, file: files[0] });
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
    this.status = !this.status;
    this.status5 = !this.status5;
    this.status1 = !this.status1;
    // if (this.documentcount >= 3) {
    //   this.documentData = [];
    //   let dataUrl: any = localStorage.getItem("mapImg");
    //   this.mapImage = this.dataURLtoFile(dataUrl, "map.jpg");

    //   this.documentData.push({ "FileId": "1", "DocumentTypeId": "11", "FileName": "map.jpg", "Extension": "jpg", "IsScreenshot": "true" });
    //   let extension: any = this.titleDeedImage.name.split(".");
    //   extension = extension[extension.length - 1];
    //   this.documentData.push({ "FileId": "2", "DocumentTypeId": "1", "FileName": this.titleDeedImage.name, "Extension": extension, "IsScreenshot": "false" });
    //   extension = this.affectionImage.name.split(".");
    //   extension = extension[extension.length - 1];
    //   this.documentData.push({ "FileId": "3", "DocumentTypeId": "2", "FileName": this.affectionImage.name, "Extension": extension, "IsScreenshot": "false" });
    //   extension = this.propertyImage.name.split(".");
    //   extension = extension[extension.length - 1];
    //   this.documentData.push({ "FileId": "4", "DocumentTypeId": "3", "FileName": this.propertyImage.name, "Extension": extension, "IsScreenshot": "false" });
    //   for (let i = 0; i < this.otherImages.length; i++) {
    //     extension = this.otherImages[i].file.name.split(".");
    //     extension = extension[extension.length - 1];
    //     this.documentData.push({ "FileId": i + 5, "DocumentTypeId": "4", "FileName": this.otherImages[i].file.name, "Extension": extension, "IsScreenshot": "false" });
    //   }
    //   this.formData.Documents = this.documentData;

    //   this.status = !this.status;
    //   this.status5 = !this.status5;
    //   this.status1 = !this.status1;
    // } else {
    //   alert("Please Upload the required Documents.");
    // }
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
    this.formData.InspectionDate = $("#formDate").val();
    console.log(this.formData);
    // this.status3 = !this.status3;
    // this.status7 = !this.status7;
    // this.status2 = !this.status2;
  }
  Prevshow2() {
    this.status3 = false;
    this.status7 = false;
    this.status2 = !this.status2;
  }
  acceptTerms(e:any) {
    this.termsAccepted = e.checked;
  }
  SummaryReport(e: any, id: any) {
    if (e == 0) {
      this.status8 = true;
      this.status9 = false;
    } else {
      this.status9 = true;
      this.status8 = false;
    }
    this.formData.ReportPackageId = id;
  }
  onInspectionSelect(e: any) {
    this.formData.InspectionRequired = e.checked;
  }
  constructor(private service: AppService) {
    this.userData = localStorage.getItem("valuationDetailData");
    this.userData = JSON.parse(this.userData);
    this.formData = localStorage.getItem("valuationData");
    this.formData = JSON.parse(this.formData);
  }

  ngOnInit(): void {
    $("#formDate").on("click", function () {
      $(".mat-datepicker-toggle").click();
    })
  }

}
