import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-mobile-tablet-listing',
  templateUrl: './mobile-tablet-listing.component.html',
  styleUrls: ['./mobile-tablet-listing.component.scss']
})
export class MobileTabletListingComponent implements OnInit {
  ovverified = '/assets/images/icons/ov-verified.svg'
  fb = '/assets/images/icons/fb-share.svg'
  share = '/assets/images/icons/share-1.png'
  whatsapp = '/assets/images/icons/whatsapp.svg'
  twitter = '/assets/images/icons/twiiter-share.svg'
  homelocationsvg = '/assets/images/home-location.svg'
  constructor() { }

  ngOnInit(): void {
  }

}
