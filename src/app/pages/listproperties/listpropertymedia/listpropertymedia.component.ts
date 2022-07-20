import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from '../../../service/file-upload.service';
import { AuthService } from "../../../service/auth.service";
import { Router } from "@angular/router";
import { NotificationService } from "../../../service/notification.service";


@Component({
  selector: 'app-listpropertymedia',
  templateUrl: './listpropertymedia.component.html',
  styleUrls: ['./listpropertymedia.component.scss']
})
export class ListpropertymediaComponent implements OnInit {
  selectedFiles: any;
  selectedVideo:any;
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
  oldData: any;
  priviousFormCheck: any;
  data: any = {};
  images:any = [];
  imageData:any = [];
  videoData:any = [];
  documentData:any = [];


  constructor(private uploadService: FileUploadService, private route: Router) {
    this.priviousFormCheck = localStorage.getItem('propertyData');
    if (this.priviousFormCheck == '' || this.priviousFormCheck == null) {
      this.priviousFormCheck = JSON.parse(this.priviousFormCheck);
      this.route.navigate(['listingproperty'])
    } else {
      this.data = JSON.parse(this.priviousFormCheck);
    }
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
    this.imageData = [];
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    // console.log(JSON.stringify(this.selectedFiles[0]));
    for (let i = 0; i < this.selectedFiles.length; i++) {
      let extension: any = this.selectedFiles[i].name.split(".");
      extension = extension[extension.length - 1];
      this.imageData.push({ "FileId": "1", "ListingDocumentTypeId": "1", "FileName": this.selectedFiles[i].name, "Extension": extension });
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFiles[i]);
      reader.onload = () => {
        this.images.push(reader.result)
        if(i < this.selectedFiles.length-1) {
          //store in local storage
        }
      };
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


  onSelectFile(event) {
    this.videoData
    this.selectedVideo = event.target.files;
    for (let i = 0; i < this.selectedVideo.length; i++) {
      let extension: any = this.selectedVideo[i].name.split(".");
      extension = extension[extension.length - 1];
      this.videoData.push({ "FileId": "1", "ListingDocumentTypeId": "1", "FileName": this.selectedVideo[i].name, "Extension": extension });
    }
    console.log(this.videoData);
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
  });

  get validate() {
    return this.SubmitForm.controls;
  }


  onSubmit() {
    this.submitted = true;
    if (this.SubmitForm.invalid) {
      return;
    }

    this.data.selectedFiles = this.previews;
    this.data.selectedVideo = this.url;

    let files = JSON.stringify(this.data)

    // localStorage.setItem('mediaFiles',files)
    // localStorage.setItem('listpropertymedia',JSON.stringify(this.SubmitForm.value))
    // this.route.navigate(['listpropertyverify'])



  }

}