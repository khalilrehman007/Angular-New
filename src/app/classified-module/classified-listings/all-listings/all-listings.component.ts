import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-listings',
  templateUrl: './all-listings.component.html',
  styleUrls: ['./all-listings.component.scss']
})
export class AllListingsComponent implements OnInit {
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
