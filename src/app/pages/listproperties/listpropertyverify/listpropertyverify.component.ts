import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as $ from 'jquery';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {FileUploadService} from "../../../service/file-upload.service";
import {Router} from "@angular/router";

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

    }
  }
  electricityReciept(files: FileList) {
    if (files && files.length) {
      this.Receipt = files[0].name;
      this.selectedElec = files
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
    }
  }

  constructor(private uploadService: FileUploadService,private route:Router) {
    this.getOldFormData();
    this.priviousFormCheck = localStorage.getItem('property_info');
    if(this.priviousFormCheck == '' || this.priviousFormCheck == null){
      this.priviousFormCheck = JSON.parse(this.priviousFormCheck);
      this.route.navigate(['listingproperty'])
    }else {
      this.priviousFormCheck = JSON.parse(this.priviousFormCheck);
    }
  }

  getOldFormData(){
    this.oldData = localStorage.getItem('listpropertyVerify');
    if(this.oldData != '' && this.oldData != null){
      this.oldData = JSON.parse(this.oldData);
      this.SubmitForm.controls.videoLink.setValue(this.oldData.videoLink);
    }
    return this.oldData;
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
      console.log(this.SubmitForm.value)
      this.uploadFiles();
      localStorage.setItem('listpropertyVerify',JSON.stringify(this.SubmitForm.value))
      this.route.navigate(['listpropertypublish'])
    }
  }
}

