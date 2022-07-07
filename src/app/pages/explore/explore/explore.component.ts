import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../header/header.component';
import { FooterComponent } from '../../../footer/footer.component';
import { BreadcrumbComponent } from '../../../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  uaeflag='../../../../assets/images/flags/uae.svg'
  search='../../../../assets/images/search.svg'
  citylocations = [
    {
      src:'../../../../assets/images/location-img.png',
      cityname:'Dubai',
      countryname:'UAE',
      link: 'explore-city'
    },
    {
      src:'../../../../assets/images/location-img.png',
      cityname:'Abu Dhabi',
      countryname:'UAE',
      link: 'explore-city'
    },
    {
      src:'../../../../assets/images/location-img.png',
      cityname:'Sharjah',
      countryname:'UAE',
      link: 'explore-city'
    },
    {
      src:'../../../../assets/images/location-img.png',
      cityname:'Ajman',
      countryname:'UAE',
      link: 'explore-city'
    },
    {
      src:'../../../../assets/images/location-img.png',
      cityname:'Ras Al Khaimah',
      countryname:'UAE',
      link: 'explore-city'
    },
    {
      src:'../../../../assets/images/location-img.png',
      cityname:'Umm Al Quwain',
      countryname:'UAE',
      link: 'explore-city'
    },
    {
      src:'../../../../assets/images/location-img.png',
      cityname:'Al Ain',
      countryname:'UAE',
      link: 'explore-city'
    }
  ]
  country = [
    {viewValue: 'UAE',value: 'UAE',img: '../../../../assets/images/flags/uae.svg'},
    {viewValue: 'UAE',value: 'UAE',img: '../../../../assets/images/flags/uae.svg'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
