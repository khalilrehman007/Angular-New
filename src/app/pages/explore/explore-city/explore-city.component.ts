import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../header/header.component';
import { FooterComponent } from '../../../footer/footer.component';
import { BreadcrumbComponent } from '../../../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-explore-city',
  templateUrl: './explore-city.component.html',
  styleUrls: ['./explore-city.component.scss']
})
export class ExploreCityComponent implements OnInit {
  uaeflag='../../../../assets/images/flags/uae.svg'
  search='../../../../assets/images/search.svg'
  citylocations = [
    {
      src:'../../../../assets/images/location-img.png',
      cityname:'Al Barsha',
      desc:'Al Barsha is a safe and quiet area that offers something for everyone: be it singles looking for wallet-friendly apartments with Metro connectivity or families looking to get away from the hustle and bustle of city life.',
      link: ''
    },
    {
      src:'../../../../assets/images/location-img.png',
      cityname:'Al Barsha',
      desc:'Al Barsha is a safe and quiet area that offers something for everyone: be it singles looking for wallet-friendly apartments with Metro connectivity or families looking to get away from the hustle and bustle of city life.',
      link: ''
    },
    {
      src:'../../../../assets/images/location-img.png',
      cityname:'Al Barsha',
      desc:'Al Barsha is a safe and quiet area that offers something for everyone: be it singles looking for wallet-friendly apartments with Metro connectivity or families looking to get away from the hustle and bustle of city life.',
      link: ''
    },
    {
      src:'../../../../assets/images/location-img.png',
      cityname:'Al Barsha',
      desc:'Al Barsha is a safe and quiet area that offers something for everyone: be it singles looking for wallet-friendly apartments with Metro connectivity or families looking to get away from the hustle and bustle of city life.',
      link: ''
    },
    {
      src:'../../../../assets/images/location-img.png',
      cityname:'Al Barsha',
      desc:'Al Barsha is a safe and quiet area that offers something for everyone: be it singles looking for wallet-friendly apartments with Metro connectivity or families looking to get away from the hustle and bustle of city life.',
      link: ''
    },
    {
      src:'../../../../assets/images/location-img.png',
      cityname:'Al Barsha',
      desc:'Al Barsha is a safe and quiet area that offers something for everyone: be it singles looking for wallet-friendly apartments with Metro connectivity or families looking to get away from the hustle and bustle of city life.',
      link: ''
    },
    {
      src:'../../../../assets/images/location-img.png',
      cityname:'Al Barsha',
      desc:'Al Barsha is a safe and quiet area that offers something for everyone: be it singles looking for wallet-friendly apartments with Metro connectivity or families looking to get away from the hustle and bustle of city life.',
      link: ''
    },
    {
      src:'../../../../assets/images/location-img.png',
      cityname:'Al Barsha',
      desc:'Al Barsha is a safe and quiet area that offers something for everyone: be it singles looking for wallet-friendly apartments with Metro connectivity or families looking to get away from the hustle and bustle of city life.',
      link: ''
    },
    {
      src:'../../../../assets/images/location-img.png',
      cityname:'Al Barsha',
      desc:'Al Barsha is a safe and quiet area that offers something for everyone: be it singles looking for wallet-friendly apartments with Metro connectivity or families looking to get away from the hustle and bustle of city life.',
      link: ''
    },
    {
      src:'../../../../assets/images/location-img.png',
      cityname:'Al Barsha',
      desc:'Al Barsha is a safe and quiet area that offers something for everyone: be it singles looking for wallet-friendly apartments with Metro connectivity or families looking to get away from the hustle and bustle of city life.',
      link: ''
    },
  ]
  country = [
    {viewValue: 'UAE',value: 'UAE',img: '../../../../assets/images/flags/uae.svg'},
    {viewValue: 'UAE',value: 'UAE',img: '../../../../assets/images/flags/uae.svg'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
