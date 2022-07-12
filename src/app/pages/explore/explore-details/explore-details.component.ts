import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HeaderComponent } from '../../../header/header.component';
import { FooterComponent } from '../../../footer/footer.component';
import { BreadcrumbComponent } from '../../../breadcrumb/breadcrumb.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore-details',
  templateUrl: './explore-details.component.html',
  styleUrls: ['./explore-details.component.scss']
})
export class ExploreDetailsComponent implements OnInit {
  homelocationsvg = '../../../../assets/images/home-location.svg'
  bedsvg = '../../../../assets/images/icons/Bed.svg'
  bathsvg = '../../../../assets/images/home-location.svg'
  squaremetersvg = '../../../../assets/images/icons/Square Meters.svg'
  brandimg = '../../../../assets/images/better-home.svg'
  listingsliderimg = 'assets/images/property-listing-slider-img.png'
  exploreimg='../../../../assets/images/Blog-Tile.png'
  restaurant= '../../../../assets/images/icons/restaurant.svg'
  exploredemo= '../../../../assets/images/explore-demo.png'

dynamicSlides1 = [
      {
        id: 'slide1',
        src:'../../../../assets/images/property/1.png',
        alt:'Side 1',
        title:'Side 1',
        price:"250,000AED"
      },
      {
        id: 'slide2',
        src:'../../../../assets/images/property/1.png',
        alt:'Side 2',
        title:'Side 2',
        price:"250,000AED"
      },
      {
        id: 'slide3',
        src:'../../../../assets/images/property/1.png',
        alt:'Side 3',
        title:'Side 3',
        price:"250,000AED"
      },
      {
        id: 'slide4',
        src:'../../../../assets/images/property/1.png',
        alt:'Side 4',
        title:'Side 4',
        price:"250,000AED"
      },
      {
        id: 'slide5',
        src:'../../../../assets/images/property/1.png',
        alt:'Side 5',
        title:'Side 5',
        price:"250,000AED"
      }
    ]
 dynamicSlides2 = [
      {
        id: 'slide1',
        src:'../../../../assets/images/property/1.png',
        alt:'Side 1',
        title:'Side 56',
        price:"350,000AED"
      },
      {
        id: 'slide2',
        src:'../../../../assets/images/property/1.png',
        alt:'Side 2',
        title:'Side 2',
        price:"350,000AED"
      },
      {
        id: 'slide3',
        src:'../../../../assets/images/property/1.png',
        alt:'Side 3',
        title:'Side 3',
        price:"350,000AED"
      },
      {
        id: 'slide4',
        src:'../../../../assets/images/property/1.png',
        alt:'Side 4',
        title:'Side 4',
        price:"350,000AED"
      },
      {
        id: 'slide5',
        src:'../../../../assets/images/property/1.png',
        alt:'Side 5',
        title:'Side 5',
        price:"350,000AED"
      }
    ]
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

  constructor() {
   }

  ngOnInit(): void {
  }

}
