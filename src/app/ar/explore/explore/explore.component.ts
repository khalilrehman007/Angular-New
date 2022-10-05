import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AppService } from 'src/app/service/app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit, AfterViewInit {
  uaeflag = '../../../../../assets/images/flags/uae.svg'
  search = '../../../../../assets/images/search.svg'
  citylocations = [
    {
      src: '../../../../assets/images/location-img.png',
      cityname: 'Dubai',
      countryname: 'UAE',
      link: 'explore-city'
    },
    {
      src: '../../../../assets/images/location-img.png',
      cityname: 'Abu Dhabi',
      countryname: 'UAE',
      link: 'explore-city'
    },
    {
      src: '../../../../assets/images/location-img.png',
      cityname: 'Sharjah',
      countryname: 'UAE',
      link: 'explore-city'
    },
    {
      src: '../../../../assets/images/location-img.png',
      cityname: 'Ajman',
      countryname: 'UAE',
      link: 'explore-city'
    },
    {
      src: '../../../../assets/images/location-img.png',
      cityname: 'Ras Al Khaimah',
      countryname: 'UAE',
      link: 'explore-city'
    },
    {
      src: '../../../../assets/images/location-img.png',
      cityname: 'Umm Al Quwain',
      countryname: 'UAE',
      link: 'explore-city'
    },
    {
      src: '../../../../assets/images/location-img.png',
      cityname: 'Al Ain',
      countryname: 'UAE',
      link: 'explore-city'
    }
  ]
  cityData: any = [];
  country: any = [];
  selectedCountry: any;
  defaultCountry: any = "";
  separatorKeysCodesExplore: number[] = [ENTER, COMMA];
  searchctrlExplore = new FormControl('');
  searchfilterExplore: Observable<string[]>;
  SearchKeywordExplore: string[] = [];
  searchListExplore: any = [];
  countryData:any = "";

  onCountrySelect(e: any) {
    this.searchListExplore = [];
    let temp: any = this.country.filter((item: any) => {
      if (item.value == e.value) {
        return item;
      }
    })
    this.selectedCountry = temp[0];
    this.service.FindCities({ "CountryId": e.value, "Locations": [] }).subscribe((result: any) => {
      this.cityData = result.data;
      for (let i = 0; i < this.cityData.length; i++) {
        this.searchListExplore.push(this.cityData[i].nameAr)
      }
    })
  }
  constructor(private service: AppService, private cookie: CookieService) {
    $(window).scrollTop(0);
    this.searchfilterExplore = this.searchctrlExplore.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.searchListExplore.slice())),
    );
  }
  ngAfterViewInit(): void {
    let a = setInterval(() => {
      if(this.cookie.get("countryData")) {
        this.countryData = JSON.parse(this.cookie.get("countryData"));
        this.service.LoadCountries().subscribe(e => {
          let temp: any = e;
          if (temp.message == "Country list fetched successfully") {
            for (let i = 0; i < temp.data.length; i++) {
              this.country.push({ viewValue: temp.data[i].nameAr, value: temp.data[i].id, desc: temp.data[i].descriptionAr });
              if(temp.data[i].name == this.countryData.name) {
                this.defaultCountry = this.country[i].value;
                this.selectedCountry = this.country[i];
              }
            }
            this.service.FindCities({ "CountryId": this.defaultCountry, "Locations": [] }).subscribe((result: any) => {
              this.cityData = result.data;
              for (let i = 0; i < this.cityData.length; i++) {
                this.searchListExplore.push(this.cityData[i].nameAr)
              }
            })
          }
        });
        clearInterval(a);
      }
    })
  }

  ngOnInit(): void {
  }

  @ViewChild('SearchInput') SearchInput: any;
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.SearchKeywordExplore.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.searchctrlExplore.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.SearchKeywordExplore.indexOf(fruit);

    if (index >= 0) {
      this.SearchKeywordExplore.splice(index, 1);
    }
  }
  checkCity(city: any) {
    if (this.SearchKeywordExplore.length == 0) {
      return false;
    } else if (this.SearchKeywordExplore.indexOf(city) == -1) {
      return true;
    } else {
      return false;
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.SearchKeywordExplore.push(event.option.viewValue);
    this.SearchInput.nativeElement.value = '';
    this.searchctrlExplore.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.searchListExplore.filter((fruit:any) => fruit.toLowerCase().includes(filterValue));
  }
}
