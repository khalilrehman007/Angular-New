import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as $ from 'jquery';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {FileUploadService} from "../../../service/file-upload.service";
import {Router} from "@angular/router";
import {AppService} from "../../../service/app.service";

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
  selectedDoc?: FileList;
  selectedElec?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;
  url;
  format;
  messageclass = '';
  Customerid: any;
  editdata: any;
  submitted = false;
  responsedata: any;
  oldData :any;
  priviousFormCheck :any;
  data: any = {};
  documentBase;
  electricBase;


  uploadDocuments(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      this.uploadService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(
              (100 * event.loaded) / event.total
            );
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            this.imageInfos = this.uploadService.getFiles();
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        }
      );
    }
  }

  handleChange(files: FileList) {
    if (files && files.length) {
      this.file = files[0].name;
      this.selectedDoc = files
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (event) => {
        this.documentBase = (<FileReader>event.target).result;
      }

    }
  }

  electricityReciept(files: FileList) {
    if (files && files.length) {
      this.Receipt = files[0].name;
      this.selectedElec = files
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (event) => {
        this.electricBase = (<FileReader>event.target).result;
      }
    }
  }

  constructor(private uploadService: FileUploadService,private route:Router,private service: AppService) {
    this.priviousFormCheck = localStorage.getItem('propertyData');
    if(this.priviousFormCheck == '' || this.priviousFormCheck == null){
      this.priviousFormCheck = JSON.parse(this.priviousFormCheck);
      this.route.navigate(['listingproperty'])
    }else {
      this.data = JSON.parse(this.priviousFormCheck);
    }
  }

  ngOnInit() {
    $(document).ready(function(){
      $('.dropdown-toggle').click(function(){
      $(this).next().toggleClass('active');
      });
  });
  }

  SubmitForm = new FormGroup({
    videoLink : new FormControl("" ),
  });

  uploadFiles(): void {
    if (this.selectedDoc) {
      this.uploadDocuments(0,this.selectedDoc[0]);
    }
    if (this.selectedElec) {
      this.uploadDocuments(0,this.selectedElec[0]);
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.SubmitForm.invalid) {
      return;
    }

    if(this.selectedElec != undefined){

      let listpropertyVerify  = localStorage.getItem('listpropertyVerify');
      let verifyData;
      if(listpropertyVerify != '' && listpropertyVerify != null){
        verifyData = JSON.parse(listpropertyVerify);
      }

      let listpropertymedia  = localStorage.getItem('listpropertymedia');
      let propertymedia;
      if(listpropertymedia != '' && listpropertymedia != null){
        propertymedia = JSON.parse(listpropertymedia);
      }

      let mediaFiles  = localStorage.getItem('mediaFiles');
      let parseMediaFiles;
      if(mediaFiles != '' && mediaFiles != null){
        parseMediaFiles = JSON.parse(mediaFiles);
      }
      let files: Array<any> = [
        {
          propertyFiles: parseMediaFiles.selectedFiles,
          propertyVideo: parseMediaFiles.selectedVideo,
          documentBase : this.documentBase,
          electricBase : this.electricBase
        },
      ];

      let property_info  = localStorage.getItem('property_info');
      let propertyData;
      if(property_info != '' && property_info != null){
        propertyData = JSON.parse(property_info);
      }

      let rent_residential  = localStorage.getItem('listpropertyinfo_rent_residential');
      let rentResidentialData;
      if(rent_residential != '' && rent_residential != null){
        rentResidentialData = JSON.parse(rent_residential);
      }

      let rent_comercial  = localStorage.getItem('listpropertyinfo_rent_comercial');
      let rent_comercialData;
      if(rent_comercial != '' && rent_comercial != null){
        rent_comercialData = JSON.parse(rent_comercial);
      }

      let sell_residential  = localStorage.getItem('listpropertyinfo_sell_residential');
      let sell_residentialData;
      if(sell_residential != '' && sell_residential != null){
        sell_residentialData = JSON.parse(sell_residential);
      }

      let sell_commercial  = localStorage.getItem('listpropertyinfo_sell_commercial');
      let sell_commercialData;
      if(sell_commercial != '' && sell_commercial != null){
        sell_commercialData = JSON.parse(sell_commercial);
      }

      let inputData ;
      if(rentResidentialData != "" || rentResidentialData != null){
        inputData = rentResidentialData
      }else if(rentResidentialData != "" || rentResidentialData != null){
        inputData = rentResidentialData
      }else if(sell_residentialData != "" || sell_residentialData != null){
        inputData = sell_residentialData
      }else if(sell_commercialData != "" || sell_commercialData != null){
        inputData = sell_commercialData
      }

      let forms: Array<any> = [
        {
          property_info : propertyData,
          listing_info  : inputData,
          media         : propertymedia,
          verify        : verifyData,
        },
      ];

      this.data.documents = files[0];
      this.data.data      = forms[0];

      //submit all forms data to serve
      this.service.StoreListingPropertyForm(this.data).subscribe(e => {
        console.log(e);
      });

      //direct file upload code comment
      // this.uploadFiles();

      localStorage.setItem('listpropertyVerify',JSON.stringify(this.SubmitForm.value))
      this.route.navigate(['listpropertypublish'])
    }
  }
}

