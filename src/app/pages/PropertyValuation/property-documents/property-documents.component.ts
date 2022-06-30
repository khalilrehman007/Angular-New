import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-property-documents',
  templateUrl: './property-documents.component.html',
  styleUrls: ['./property-documents.component.scss']
})
export class PropertyDocumentsComponent implements OnInit {
  upload ='../../../../assets/images/icons/upload-1.svg'
  trash ='../../../../assets/images/icons/Trash.svg'
  edit ='../../../../assets/images/icons/edit.svg'
  checkmark ='../../../../assets/images/icons/checkmark-circle.svg'
  file: string;
  affecton: string;
  propertys: string;
  emirate: string;
  handleChange(files: FileList) {
    if (files && files.length) {
      this.file = files[0].name;
    }
  }
  affection(files: FileList) {
    if (files && files.length) {
      this.affecton = files[0].name;
    }
  }
  property(files: FileList) {
    if (files && files.length) {
      this.propertys = files[0].name;
    }
  }
  emiratesfun(files: FileList) {
    if (files && files.length) {
      this.emirate = files[0].name;
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
