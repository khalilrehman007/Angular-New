import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import { FormControl, Validators } from '@angular/forms';

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
  documentlist = [
    { imgsrc: '../../../../assets/images/doc-thumbnail.svg', filetitle: 'property-deed-yu.jpg', doctitile: 'Property Tittle Deed', viewLink: '#', deleteLink: '#' },
    { imgsrc: '../../../../assets/images/doc-thumbnail.svg', filetitle: 'property-deed-yu.jpg', doctitile: 'Property Tittle Deed', viewLink: '#', deleteLink: '#' },
    { imgsrc: '../../../../assets/images/doc-thumbnail.svg', filetitle: 'property-deed-yu.jpg', doctitile: 'Property Tittle Deed', viewLink: '#', deleteLink: '#' },
    { imgsrc: '../../../../assets/images/doc-thumbnail.svg', filetitle: 'property-deed-yu.jpg', doctitile: 'Property Tittle Deed', viewLink: '#', deleteLink: '#' },
    { imgsrc: '../../../../assets/images/doc-thumbnail.svg', filetitle: 'property-deed-yu.jpg', doctitile: 'Property Tittle Deed', viewLink: '#', deleteLink: '#' },
  ];
  buildinglist = [
    { titlename: 'Studio', titlevalue: '30' },
    { titlename: 'Vacant', titlevalue: '20' },
    { titlename: 'Unit Size', titlevalue: '2,788 Sq.Ft.' },
    { titlename: 'Unit Size', titlevalue: '1,00,000 AED' },
  ];

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
  Nextshow() {
    if (this.documentcount >= 3) {
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
    this.status3 = !this.status3;
    this.status7 = !this.status7;
    this.status2 = !this.status2;
  }
  Prevshow2() {
    this.status3 = false;
    this.status7 = false;
    this.status2 = !this.status2;
  }
  SummaryReport() {
    this.status8 = !this.status8;
    this.status9 = false;
  }
  DetailReport() {
    this.status9 = !this.status9;
    this.status8 = false;
  }
  constructor() {
    this.userData = localStorage.getItem("valuationDetailData");
    this.userData = JSON.parse(this.userData);
  }

  ngOnInit(): void {
  }

}
