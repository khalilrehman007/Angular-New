import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-sports-listing',
  templateUrl: './sports-listing.component.html',
  styleUrls: ['./sports-listing.component.scss']
})
export class SportsListingComponent implements OnInit {
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
