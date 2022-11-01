import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-comparepage',
  templateUrl: './comparepage.component.html',
  styleUrls: ['./comparepage.component.scss']
})
export class ComparepageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  popularComparisonOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 2
      },
      992: {
        items: 3
      },
      1200: {
        items: 3
      }
    },
    nav: true
  }
  featuredOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 2
      },
      992: {
        items: 3
      },
      1200: {
        items: 4
      }
    },
    nav: true
  }

  PopularComparisonList = [
    {
      src1: '/assets/images/property/1.png',
      src2: '/assets/images/property/3.png',
      price1: '58,657',
      price2: '68,657',
      PropertyName1: 'Sultan Building',
      PropertyName2: 'Sultan New Building',
      link: '/ar/compare/view',
      address1: 'Etihad Tower 4, Etihad Towers,',
      address2: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src1: '/assets/images/property/1.png',
      src2: '/assets/images/property/3.png',
      price1: '58,657',
      price2: '68,657',
      PropertyName1: 'Sultan Building',
      PropertyName2: 'Sultan New Building',
      link: '/ar/compare/view',
      address1: 'Etihad Tower 4, Etihad Towers,',
      address2: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src1: '/assets/images/property/1.png',
      src2: '/assets/images/property/3.png',
      price1: '58,657',
      price2: '68,657',
      PropertyName1: 'Sultan Building',
      PropertyName2: 'Sultan New Building',
      link: '/ar/compare/view',
      address1: 'Etihad Tower 4, Etihad Towers,',
      address2: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src1: '/assets/images/property/1.png',
      src2: '/assets/images/property/3.png',
      price1: '58,657',
      price2: '68,657',
      PropertyName1: 'Sultan Building',
      PropertyName2: 'Sultan New Building',
      link: '/ar/compare/view',
      address1: 'Etihad Tower 4, Etihad Towers,',
      address2: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src1: '/assets/images/property/1.png',
      src2: '/assets/images/property/3.png',
      price1: '58,657',
      price2: '68,657',
      PropertyName1: 'Sultan Building',
      PropertyName2: 'Sultan New Building',
      link: '/ar/compare/view',
      address1: 'Etihad Tower 4, Etihad Towers,',
      address2: 'Etihad Tower 4, Etihad Towers,',
    },
  ]
  trash = '/assets/images/icons/Trash-dotted.svg'
  swimm = '/assets/images/icons/swimming.svg'
  Featuredproperties = [
    {img: '/assets/images/pro-comparison.png',price: '350,000',title: 'Blue Wave Tower',address: 'Etihad Tower 4, Etihad Towers, Corniche Road, Abu Dhabi',city: 'Dubai',carpetArea: '1200',bedrooms: '2',bathrooms: '1',parkings: 'لا',propertyAge:'10 ويراس',floorNo: '10',totalFloor: '25',towerBlock: 'نعم',unitNo: '123',furnishingType:'مفروشة'},
    {img: '/assets/images/pro-comparison.png',price: '350,000',title: 'Blue Wave Tower',address: 'Etihad Tower 4, Etihad Towers, Corniche Road, Abu Dhabi',city: 'Dubai',carpetArea: '1200',bedrooms: '2',bathrooms: '1',parkings: 'لا',propertyAge:'10 ويراس',floorNo: '10',totalFloor: '25',towerBlock: 'نعم',unitNo: '123',furnishingType:'مفروشة'},
    {img: '/assets/images/pro-comparison.png',price: '350,000',title: 'Blue Wave Tower',address: 'Etihad Tower 4, Etihad Towers, Corniche Road, Abu Dhabi',city: 'Dubai',carpetArea: '1200',bedrooms: '2',bathrooms: '1',parkings: 'لا',propertyAge:'10 ويراس',floorNo: '10',totalFloor: '25',towerBlock: 'نعم',unitNo: '123',furnishingType:'مفروشة'},
    {img: '/assets/images/pro-comparison.png',price: '350,000',title: 'Blue Wave Tower',address: 'Etihad Tower 4, Etihad Towers, Corniche Road, Abu Dhabi',city: 'Dubai',carpetArea: '1200',bedrooms: '2',bathrooms: '1',parkings: 'لا',propertyAge:'10 ويراس',floorNo: '10',totalFloor: '25',towerBlock: 'نعم',unitNo: '123',furnishingType:'مفروشة'},
    {img: '/assets/images/pro-comparison.png',price: '350,000',title: 'Blue Wave Tower',address: 'Etihad Tower 4, Etihad Towers, Corniche Road, Abu Dhabi',city: 'Dubai',carpetArea: '1200',bedrooms: '2',bathrooms: '1',parkings: 'لا',propertyAge:'10 ويراس',floorNo: '10',totalFloor: '25',towerBlock: 'نعم',unitNo: '123',furnishingType:'مفروشة'},
    {img: '/assets/images/pro-comparison.png',price: '350,000',title: 'Blue Wave Tower',address: 'Etihad Tower 4, Etihad Towers, Corniche Road, Abu Dhabi',city: 'Dubai',carpetArea: '1200',bedrooms: '2',bathrooms: '1',parkings: 'لا',propertyAge:'10 ويراس',floorNo: '10',totalFloor: '25',towerBlock: 'نعم',unitNo: '123',furnishingType:'مفروشة'}
  ];
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
}
