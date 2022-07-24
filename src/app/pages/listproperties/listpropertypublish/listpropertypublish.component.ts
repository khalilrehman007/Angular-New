import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Observable } from 'rxjs';
import { FileUploadService } from '../../../service/file-upload.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-listpropertypublish',
  templateUrl: './listpropertypublish.component.html',
  styleUrls: ['./listpropertypublish.component.scss']
})
export class ListpropertypublishComponent implements OnInit {
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;
  priviousFormCheck: any;

  gallerythumb = '../../../../assets/images/image-gallery-thumbnail.png'
  checkmark = '../../../../assets/images/icons/checkmark-green.svg'
  constructor() {
  }
  ngOnInit() {
    $(document).ready(function () {
    });
  }
}

