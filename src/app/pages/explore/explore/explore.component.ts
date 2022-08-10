import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'

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
  country:any = [];
  constructor(private service: AppService) {
    this.service.LoadCountries().subscribe(e => {
      let temp: any = e;
      if (temp.message == "Country list fetched successfully") {
        for (let country of temp.data) {
          this.country.push({ viewValue: country.name, value: country.id });
        }
      }
    });
  }

  ngOnInit(): void {
  }

}
