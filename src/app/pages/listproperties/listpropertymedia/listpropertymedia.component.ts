import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from '../../../service/file-upload.service';
import { Router } from "@angular/router";
import { AppService } from 'src/app/service/app.service';


@Component({
  selector: 'app-listpropertymedia',
  templateUrl: './listpropertymedia.component.html',
  styleUrls: ['./listpropertymedia.component.scss']
})
export class ListpropertymediaComponent implements OnInit {
  trash = '../../../../assets/images/icons/Trash.svg'
  checkmark = '../../../../assets/images/icons/checkmark-circle.svg'
  upload1 = '../../../../assets/images/icons/upload-1.svg'
  error: any = ""
  showError: boolean = false;
  errorResponse(data: any) {
    this.showError = false;
  }

  uploadimg = '../../../../assets/images/icons/upload-icon.svg'
  geolocation = '../../../../assets/images/icons/geo-location.svg'
  awayproperty = '../../../../assets/images/icons/away-property.svg'
  selectedFiles: any;
  selectedVideo: any;
  selectedDoc?: FileList;
  selectedElec?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;
  url: any;
  format: any;
  file: string;
  Receipt: string;
  messageclass = '';
  Customerid: any;
  editdata: any;
  submitted = false;
  responsedata: any;
  oldData: any;
  priviousFormCheck: any;
  documentBase: any = [];
  data: any = {};
  images: any = [];
  imageData: any = [];
  videoData: any = [];
  documentData = new FormData();
  btnText: string = "Publish";
  propertyListingBuy: number;
  propertyListingRent: number;
  titledeedUploaded:boolean = false;
  showLoader: boolean = false;


  constructor(private api: AppService, private uploadService: FileUploadService, private route: Router) {
    this.priviousFormCheck = localStorage.getItem('propertyData');
    if (this.priviousFormCheck == '' || this.priviousFormCheck == null) {
      this.priviousFormCheck = JSON.parse(this.priviousFormCheck);
      this.route.navigate(['listingproperty'])
    } else {
      this.priviousFormCheck = JSON.parse(this.priviousFormCheck);
      this.data = this.priviousFormCheck;
    }
    this.api.PropertyListingRentBuy({ "Lat": this.data.PropertyLat, "Long": this.data.PropertyLong }).subscribe((result: any) => {
      this.propertyListingBuy = result.data.propertyListingBuy;
      this.propertyListingRent = result.data.propertyListingRent;
    })
  }
  ngOnInit() {
    $(document).ready(function () {
      $('.dropdown-toggle').click(function () {
        $(this).next().toggleClass('active');
      });
    });
    this.imageInfos = this.uploadService.getFiles();
  }
  upload(idx: number, file: File): void {
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
  selectFiles(event: any): void {
    if (event.target.files.length > 5) {
      alert("You can choose maximun 5 files");
      return;
    }
    let temp: number = 0;
    for (let i = 0; i < event.target.files.length; i++) {
      temp += event.target.files[i].size
    }
    temp = temp / 1048576
    if (temp > 10) {
      alert("Maximun size allowed is 10MB");
      return;
    }
    this.imageData = [];
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    for (let i = 0; i < this.selectedFiles.length; i++) {
      let extension: any = this.selectedFiles[i].name.split(".");
      extension = extension[extension.length - 1];
      this.imageData.push({ "FileName": this.selectedFiles[i].name, "Extension": extension, file: this.selectedFiles[i] });
    }

    this.previews = [];
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
  }
  onSelectFile(event: any) {
    if (event.target.files[0].size / 1048576 > 30) {
      alert("Maximun size allowed is 30MB");
      return;
    }
    this.videoData = [];
    this.selectedVideo = event.target.files;
    for (let i = 0; i < this.selectedVideo.length; i++) {
      let extension: any = this.selectedVideo[i].name.split(".");
      extension = extension[extension.length - 1];
      this.videoData.push({ "FileName": this.selectedVideo[i].name, "Extension": extension, file: this.selectedVideo[i] });
    }
    if (this.selectedVideo && this.selectedVideo[0]) {
      const numberOfFiles = this.selectedVideo.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedVideo[i]);

        if (this.selectedVideo[i].type.indexOf('image') > -1) {
          this.format = 'image';
        } else if (this.selectedVideo[i].type.indexOf('video') > -1) {
          this.format = 'video';
        }
        reader.onload = (event) => {
          this.url = (<FileReader>event.target).result;
        }
      }
    }
  }
  uploadFiles(): void {
    this.message = [];
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }
  uploadVideo(): void {
    this.message = [];
    if (this.selectedVideo) {
      for (let i = 0; i < this.selectedVideo.length; i++) {
        this.upload(i, this.selectedVideo[i]);
      }
    }
  }
  handleChange(files: any) {
    this.titledeedUploaded = true;
    this.file = files[0].name;
    if (files && files.length) {
      let extension: any = files[0].name.split(".");
      extension = extension[extension.length - 1];
      this.documentBase = { "FileName": files[0].name, "Extension": extension, file: files };
    }
  }
  SubmitForm = new FormGroup({
    videoLink: new FormControl(""),
  });
  get validate() {
    return this.SubmitForm.controls;
  }
  abc: any = {};
  tittleDeedCheck: boolean = false;
  imgCheck: boolean = false;
  videoCheck: boolean = false;
  onSubmit() {
    if (!this.titledeedUploaded) {
      this.error = "Plese Upload Title Deed Image";
      this.showError = true;
      return;
    }
    this.showLoader = true;
    this.btnText = "Please Wait...";
    this.data.VideoLink = this.SubmitForm.value.videoLink;
    let temp: any = [];
    let tempDoc: any = [];
    for (let i = 0; i < this.imageData.length; i++) {
      temp.push({ "FileId": i + 1, "ListingDocumentTypeId": "1", "FileName": this.imageData[i].FileName, "Extension": this.imageData[i].Extension });
      tempDoc.push(this.imageData[i].file);
    }
    let start: number = temp.length;
    for (let i = 0; i < this.videoData.length; i++) {
      temp.push({ "FileId": i + start + 1, "ListingDocumentTypeId": "3", "FileName": this.videoData[i].FileName, "Extension": this.videoData[i].Extension });
      tempDoc.push(this.videoData[i].file);
    }
    start = temp.length;
    temp.push({ "FileId": start + 1, "ListingDocumentTypeId": "2", "FileName": this.documentBase.FileName, "Extension": this.documentBase.Extension });
    tempDoc.push(this.documentBase.file[0]);
    let userData:any = localStorage.getItem("user");
    this.data.ProfessionalTypeId = JSON.parse(userData).professionalTypeId;
    this.data.Documents = temp;
    this.documentData.append("PropertyListingRequest", JSON.stringify(this.data));
    for (let i = 0; i < temp.length; i++) {
      this.documentData.append(i + 1 + "_" + temp[i].FileName, tempDoc[i]);
    }
    // console.log(this.data);
    let token: any = localStorage.getItem("token");
    token = JSON.parse(token);
    $.ajax({
      url: "https://beta.ovaluate.com/api/AddPropertyListing",
      method: "post",
      contentType: false,
      processData: false,
      data: this.documentData,
      headers: {
        "Authorization": 'bearer ' + token
      },
      dataType: "json",
      success: (res) => {
        if (res.message == "Property Listing request completed successfully") {
          localStorage.removeItem("propertyData");
          this.route.navigate(['listpropertypublish'])
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}