import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import {FormControl, Validators} from '@angular/forms';
import * as $ from 'jquery';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-listpropertyverify',
    templateUrl: './listpropertyverify.component.html',
    styleUrls: ['./listpropertyverify.component.scss']
})
export class ListpropertyverifyComponent implements OnInit {
  upload= '../../../../assets/images/icons/upload-icon.svg'
  geolocation= '../../../../assets/images/icons/geo-location.svg'
  awayproperty= '../../../../assets/images/icons/away-property.svg'
  file: string;
  Receipt: string;
  handleChange(files: FileList) {
    if (files && files.length) {
      this.file = files[0].name;
    }
  }
  electricityReciept(files: FileList) {
    if (files && files.length) {
      this.Receipt = files[0].name;
    }
  }
  constructor() { }
  ngOnInit() {
    $(document).ready(function(){
      $('.dropdown-toggle').click(function(){
      $(this).next().toggleClass('active');
      });
  });
  }
}

