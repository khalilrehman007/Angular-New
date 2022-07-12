import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as $ from 'jquery';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from '../../../service/file-upload.service';
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../../service/notification.service";


@Component({
  selector: 'app-listpropertymedia',
  templateUrl: './listpropertymedia.component.html',
  styleUrls: ['./listpropertymedia.component.scss']
})
export class ListpropertymediaComponent implements OnInit {
  selectedFiles?: FileList;
  selectedVideo?: FileList;
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

  constructor(private uploadService: FileUploadService,private route:Router) {
    this.getOldFormData();
  }

  getOldFormData(){
    this.priviousFormCheck = localStorage.getItem('property_info');
    if(this.priviousFormCheck == '' || this.priviousFormCheck == null){
      this.route.navigate(['listingproperty'])
    }
    this.oldData = localStorage.getItem('listpropertymedia');
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
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;

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


  onSelectFile(event) {
    this.selectedVideo = event.target.files;
    if (this.selectedVideo && this.selectedVideo[0]) {
      const numberOfFiles = this.selectedVideo.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedVideo[i]);

        if(this.selectedVideo[i].type.indexOf('image')> -1){
          this.format = 'image';
        } else if(this.selectedVideo[i].type.indexOf('video')> -1){
          this.format = 'video';
        }
        reader.onload = (event) => {
          this.url = (<FileReader>event.target).result;
        }
      }
    }
  }
  // onSelectFile(event) {
  //     const file = event.target.files && event.target.files[0];
  //     this.selectedVideo = file;
  //     if (file) {
  //       var reader = new FileReader();
  //       reader.readAsDataURL(file);
  //       if(file.type.indexOf('image')> -1){
  //         this.format = 'image';
  //       } else if(file.type.indexOf('video')> -1){
  //         this.format = 'video';
  //       }
  //       reader.onload = (event) => {
  //         this.url = (<FileReader>event.target).result;
  //       }
  //     }
  // }

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
    videoLink : new FormControl("" ),
  });

  get validate(){
    return this.SubmitForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.SubmitForm.invalid) {
      return;
    }
    // console.log(this.selectedFiles)
    // console.log(this.selectedVideo)

    this.uploadVideo();
    this.uploadFiles();

    localStorage.setItem('listpropertymedia',JSON.stringify(this.SubmitForm.value))
    this.route.navigate(['listpropertyverify'])

    // var data = {propertyPictures: this.selectedFiles, propertyVideo: this.selectedVideo,videoLink:this.SubmitForm.value};
    // localStorage.setItem('listpropertymedia',JSON.stringify(data))
    // this.route.navigate(['listpropertyverify'])
    // console.log(this.SubmitForm.value)
  }

}

