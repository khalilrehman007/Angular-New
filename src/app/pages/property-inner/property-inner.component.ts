import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-property-inner',
  templateUrl: './property-inner.component.html',
  styleUrls: ['./property-inner.component.scss']
})
export class PropertyInnerComponent implements OnInit {
  homelocationsvg = 'assets/images/home-location.svg'
  bedsvg = 'assets/images/icons/Bed.svg'
  bathsvg = 'assets/images/home-location.svg'
  squaremetersvg = 'assets/images/icons/Square Meters.svg'
  brandimg = 'assets/images/better-home.svg'
  listingsliderimg = 'assets/images/property-listing-slider-img.png'
  prodetails = 'assets/images/Property-detail-page.png'
  dynamicSlides1 = [
    {
      id: 'slide1',
      src:'assets/images/property/1.png',
      alt:'Side 1',
      title:'Side 1',
      price:"250,000AED"
    },
    {
      id: 'slide2',
      src:'assets/images/property/1.png',
      alt:'Side 2',
      title:'Side 2',
      price:"250,000AED"
    },
    {
      id: 'slide3',
      src:'assets/images/property/1.png',
      alt:'Side 3',
      title:'Side 3',
      price:"250,000AED"
    },
    {
      id: 'slide4',
      src:'assets/images/property/1.png',
      alt:'Side 4',
      title:'Side 4',
      price:"250,000AED"
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
