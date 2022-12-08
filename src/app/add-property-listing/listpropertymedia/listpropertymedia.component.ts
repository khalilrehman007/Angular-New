import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from '../../service/file-upload.service';
import { Router } from "@angular/router";
import { AppService } from 'src/app/service/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-listpropertymedia',
  templateUrl: './listpropertymedia.component.html',
  styleUrls: ['./listpropertymedia.component.scss']
})
export class ListpropertymediaComponent implements OnInit {
  trash = '../../../assets/images/icons/Trash.svg'
  checkmark = '../../../assets/images/icons/checkmark-circle.svg'
  upload1 = '../../../assets/images/icons/upload-1.svg'
  error: any = ""
  showError: boolean = false;
  errorResponse(data: any) {
    this.showError = false;
    this.animate();
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
  file: any;
  Receipt: any;
  messageclass = '';
  Customerid: any;
  editdata: any;
  submitted = false;
  responsedata: any;
  oldData: any;
  priviousFormCheck: any;
  data: any = {};
  images: any = [];
  imageData: any = [];
  videoData: any = [];
  documentData = new FormData();
  btnText: string = "Publish";
  propertyListingBuy: any;
  propertyListingRent: any;
  titledeedUploaded: boolean = false;
  showLoader: boolean = false;
  currentField: any;
  packageData: any;
  success: any = "";
  mainImage: any = 0;
  showSuccess: boolean = false;

  constructor(private api: AppService, private uploadService: FileUploadService, private route: Router) {
    this.priviousFormCheck = localStorage.getItem('propertyData');
    this.priviousFormCheck = JSON.parse(this.priviousFormCheck);
    console.log("previous",this.priviousFormCheck)
    if (this.priviousFormCheck == null || this.priviousFormCheck == undefined) {
      console.log("previous",this.priviousFormCheck)
      this.route.navigate(['/add-property/listingproperty'])
    } else {
      this.data = this.priviousFormCheck;
      this.api.PropertyListingRentBuy({ "Lat": this.data.PropertyLat, "Long": this.data.PropertyLong }).subscribe((result: any) => {
        this.propertyListingBuy = result.data.propertyListingBuy;
        this.propertyListingRent = result.data.propertyListingRent;
      })
      this.loadPreviousData();
    }
    this.packageData = localStorage.getItem('seletedPackage');
    this.packageData = JSON.parse(this.packageData);
    console.log(this.packageData)
    
  }
  loadPreviousData(){
    console.log("media old data",this.data);
    if(this.data?.Documents?.length>0){
      this.data?.Documents.forEach((x:any)=>{
        this.previews.push(environment.apiUrl+x.FileUrl)
      })
    }
    if(this.data?.TourUrl!=null || this.data?.TourUrl!=undefined){
    this.SubmitForm.controls['videoLink'].patchValue(this.data.TourUrl)
    }
    if(this.data?.YoutubeUrl!=null || this.data?.YoutubeUrl!=undefined){
      this.SubmitForm.controls['youtubeUrl'].patchValue(this.data.YoutubeUrl)
      }
  }
  ngOnInit() {
    $(document).ready(function () {
      $('.dropdown-toggle').click(function () {
        $(this).next().toggleClass('active');
      });
    });
    this.imageInfos = this.uploadService.getFiles();
    $(".upload-files-design").on('drop', function (e) {
      e.stopPropagation();
      e.preventDefault();
      alert();
    });
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
    let check = true;
    if (event.target.files.length + this.imageData.length > this.packageData.numberOfPhoto) {
      this.error = "You can choose maximun " + this.packageData.numberOfPhoto + " files";
      this.showError = true;
      return;
    }
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
      this.message = [];
      this.progressInfos = [];
      this.selectedFiles = event.target.files;
      for (let i = 0; i < this.selectedFiles.length; i++) {
        let extension: any = this.selectedFiles[i].name.split(".");
        extension = extension[extension.length - 1];
        this.imageData.push({ "FileName": this.selectedFiles[i].name, "Extension": extension, file: this.selectedFiles[i] });
      }
      console.log(this.imageData);
      if (this.selectedFiles && this.selectedFiles[0]) {
        const numberOfFiles = this.selectedFiles.length;
        for (let i = 0; i < numberOfFiles; i++) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.previews.push(e.target.result);
          };
          console.log(this.previews);
          reader.readAsDataURL(this.selectedFiles[i]);
        }
      }
      $(".image-input").val("");
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
  SubmitForm = new FormGroup({
    videoLink: new FormControl(""),
    youtubeUrl: new FormControl(""),
  });
  get validate() {
    return this.SubmitForm.controls;
  }
  abc: any = {};
  tittleDeedCheck: boolean = false;
  imgCheck: boolean = false;
  videoCheck: boolean = false;
  onSubmit() {
    // if (this.imageData.length < this.packageData.numberOfPhoto) {
    if (this.imageData.length < 1 && this.previews.length<1) {
      this.currentField = "title-deed-image-input";
      this.error = "Plese Upload " + this.packageData.numberOfPhoto + " Photos";
      this.showError = true;
      return;
    }
    this.showLoader = true;
    this.btnText = "Please Wait...";
    this.data.TourUrl = this.SubmitForm.value.videoLink;
    this.data.YoutubeUrl = this.SubmitForm.value.youtubeUrl;
    let temp: any = [];
    let tempDoc: any = [];
    for (let i = 0; i < this.imageData.length; i++) {
      if (this.mainImage == i) {
        temp.push({ "FileId": i + 1, "ListingDocumentTypeId": "2", "FileName": this.imageData[i].FileName, "Extension": this.imageData[i].Extension, "isscreenshot": "true" });
      } else {
        temp.push({ "FileId": i + 1, "ListingDocumentTypeId": "2", "FileName": this.imageData[i].FileName, "Extension": this.imageData[i].Extension, "isscreenshot": "false" });
      }
      tempDoc.push(this.imageData[i].file);
    }
    let start: number = temp.length;
    for (let i = 0; i < this.videoData.length; i++) {
      temp.push({ "FileId": i + start + 1, "ListingDocumentTypeId": "3", "FileName": this.videoData[i].FileName, "Extension": this.videoData[i].Extension });
      tempDoc.push(this.videoData[i].file);
    }
    start = temp.length;
    let userData: any = localStorage.getItem("user");
    this.data.ProfessionalTypeId = JSON.parse(userData).professionalTypeId;
   if(this.data?.Documents?.length>0){
    this.data.Documents = this.data.Documents.concat(temp);
   }
   else{
    this.data.Documents=temp;
   }
 
    if (this.data.FittingType == "" || this.data.FittingType == undefined) {
      this.data.FittingType = 0;
    }
    if (this.data.FurnishingType == "" || this.data.FurnishingType == undefined) {
      this.data.FurnishingType = 0;
    }
    if (this.data.SecurityDeposit == "" || this.data.SecurityDeposit == undefined) {
      this.data.SecurityDeposit = false;
    }
    if (this.data.BrokerageCharge == "" || this.data.BrokerageCharge == undefined) {
      this.data.BrokerageCharge = false;
    }
    console.log("Final Object",this.data);
    this.documentData.append("PropertyListingRequest", JSON.stringify(this.data));
    for (let i = 0; i < temp.length; i++) {
      this.documentData.append(i + 1 + "_" + temp[i].FileName, tempDoc[i]);
    }
    let token: any = localStorage.getItem("token");
    token = JSON.parse(token);
    console.log(this.data);
    if(this.data?.id==null || this.data?.id==undefined){
    $.ajax({
      url: `${environment.apiUrl}api/AddPropertyListing`,
      method: "post",
      contentType: false,
      processData: false,
      data: this.documentData,
      headers: {
        "Authorization": 'bearer ' + token
      },
      dataType: "json",
      success: (res) => {
        console.log(res);
        if (res.result == 1) {
          localStorage.removeItem("propertyData");
          this.showLoader = true;
          let temp: any = localStorage.getItem("user");
          temp = JSON.parse(temp);
          this.api.PurchasePackage({ "UserId": temp.id, "PackageId": this.packageData.id }).subscribe((result: any) => {
            if (result.message == "Package has been purchased") {
              this.showLoader = false;
              this.success = "Your package has been purchsed successfully";
              this.showSuccess = true;
            } else {
              this.showLoader = false;
              this.error = "Something went wrong please try again";
              this.showError = true;
            }
          })
          this.route.navigate(['/add-property/listpropertypublish'])
        }
        else {
          this.showLoader = false;
          this.error = res.error;
          this.showError = true;
        }
      },
      error: (err) => {
      }
    });
  }
  else{
    $.ajax({
      url: `${environment.apiUrl}api/UpdatePropertyListing`,
      method: "post",
      contentType: false,
      processData: false,
      data: this.documentData,
      headers: {
        "Authorization": 'bearer ' + token
      },
      dataType: "json",
      success: (res) => {
        console.log(res);
        if (res.result==1) {
          localStorage.removeItem("propertyData");
          this.showLoader = true;
          let temp: any = localStorage.getItem("user");
          temp = JSON.parse(temp);
          this.api.PurchasePackage({ "UserId": temp.id, "PackageId": this.packageData.id }).subscribe((result: any) => {
            if (result.message == "Package has been purchased") {
              this.showLoader = false;
              this.success = "Your package has been purchsed successfully";
              this.showSuccess = true;
            } else {
              this.showLoader = false;
              this.error = "Something went wrong please try again";
              this.showError = true;
            }
          })
          this.route.navigate(['/add-property/listpropertypublish'])
        }
        else {
          this.showLoader = false;
          this.error = res.error;
          this.showError = true;
        }
      },
      error: (err) => {
      }
    });
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
  upgradePackage() {
    localStorage.setItem("listingComingFrom", "media");
    this.route.navigate(["/payment-packages"])
  }
}