import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/service/app.service';

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
      link: 'explore-details'
    },
    {
      src:'../../../../assets/images/location-img.png',
      cityname:'Al Barsha',
      desc:'Al Barsha is a safe and quiet area that offers something for everyone: be it singles looking for wallet-friendly apartments with Metro connectivity or families looking to get away from the hustle and bustle of city life.',
      link: 'explore-details'
    },
    {
      src:'../../../../assets/images/location-img.png',
      cityname:'Al Barsha',
      desc:'Al Barsha is a safe and quiet area that offers something for everyone: be it singles looking for wallet-friendly apartments with Metro connectivity or families looking to get away from the hustle and bustle of city life.',
      link: 'explore-details'
    },
    {
      src:'../../../../assets/images/location-img.png',
      cityname:'Al Barsha',
      desc:'Al Barsha is a safe and quiet area that offers something for everyone: be it singles looking for wallet-friendly apartments with Metro connectivity or families looking to get away from the hustle and bustle of city life.',
      link: 'explore-details'
    },
    {
      src:'../../../../assets/images/location-img.png',
      cityname:'Al Barsha',
      desc:'Al Barsha is a safe and quiet area that offers something for everyone: be it singles looking for wallet-friendly apartments with Metro connectivity or families looking to get away from the hustle and bustle of city life.',
      link: 'explore-details'
    },
    {
      src:'../../../../assets/images/location-img.png',
      cityname:'Al Barsha',
      desc:'Al Barsha is a safe and quiet area that offers something for everyone: be it singles looking for wallet-friendly apartments with Metro connectivity or families looking to get away from the hustle and bustle of city life.',
      link: 'explore-details'
    },
    {
      src:'../../../../assets/images/location-img.png',
      cityname:'Al Barsha',
      desc:'Al Barsha is a safe and quiet area that offers something for everyone: be it singles looking for wallet-friendly apartments with Metro connectivity or families looking to get away from the hustle and bustle of city life.',
      link: 'explore-details'
    },
    {
      src:'../../../../assets/images/location-img.png',
      cityname:'Al Barsha',
      desc:'Al Barsha is a safe and quiet area that offers something for everyone: be it singles looking for wallet-friendly apartments with Metro connectivity or families looking to get away from the hustle and bustle of city life.',
      link: 'explore-details'
    },
    {
      src:'../../../../assets/images/location-img.png',
      cityname:'Al Barsha',
      desc:'Al Barsha is a safe and quiet area that offers something for everyone: be it singles looking for wallet-friendly apartments with Metro connectivity or families looking to get away from the hustle and bustle of city life.',
      link: 'explore-details'
    },
    {
      src:'../../../../assets/images/location-img.png',
      cityname:'Al Barsha',
      desc:'Al Barsha is a safe and quiet area that offers something for everyone: be it singles looking for wallet-friendly apartments with Metro connectivity or families looking to get away from the hustle and bustle of city life.',
      link: 'explore-details'
    },
  ]
  country = [
    {viewValue: 'UAE',value: 'UAE',img: '../../../../assets/images/flags/uae.svg'},
    {viewValue: 'UAE',value: 'UAE',img: '../../../../assets/images/flags/uae.svg'},
  ];
  id:any;
  cityData:any = [];
  districtData:any = [];
  constructor(private route: ActivatedRoute, private service: AppService) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
  }

}
