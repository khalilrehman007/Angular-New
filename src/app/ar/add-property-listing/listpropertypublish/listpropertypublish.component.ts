import { Component, OnInit } from '@angular/core';

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
  imageInfos: any;
  priviousFormCheck: any;

  gallerythumb = '../../../../assets/images/image-gallery-thumbnail.png'
  checkmark = '../../../../assets/images/icons/checkmark-green.svg'
  constructor() {
    localStorage.removeItem("bounds");
    localStorage.removeItem("propertyData");
    localStorage.removeItem("lng");
    localStorage.removeItem("address");
    localStorage.removeItem("listingData");
    localStorage.removeItem("lat");
  }
  ngOnInit() {
    $(document).ready(function () {
    });
  }
}

