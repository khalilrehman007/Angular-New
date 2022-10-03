import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AppService } from 'src/app/service/app.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent implements OnInit {
  uaeflag = '../../../../assets/images/flags/uae.svg'
  homelocationsvg = '../../../assets/images/home-location.svg'
  viewsvg = '../../../assets/images/view.svg'
  search = '../../../../assets/images/search.svg'
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
  separatorKeysCodesExplore: number[] = [ENTER, COMMA];
  searchctrlExplore = new FormControl('');
  searchfilterExplore: Observable<string[]>;
  SearchKeywordExplore: string[] = [];
  searchListExplore: any = [];


  onCountrySelect(e: any) {
    this.searchListExplore = [];
    this.selectedCountry = this.country.filter((item: any) => {
      if (item.value == e.value) {
        return item;
      }
    })
    this.selectedCountry = this.selectedCountry[0];
    this.service.FindCities({ "CountryId": e.value, "Locations": [] }).subscribe((result: any) => {
      this.cityData = result.data;
      for (let i = 0; i < this.cityData.length; i++) {
        this.searchListExplore.push(this.cityData[i].name)
      }
    })
  }
  constructor(private service: AppService, private modalService: NgbModal) {
    $(window).scrollTop(0);
    this.service.LoadCountries().subscribe(e => {
      let temp: any = e;
      if (temp.message == "Country list fetched successfully") {
        for (let country of temp.data) {
          this.country.push({ viewValue: country.name, value: country.id, desc: country.description });
        }
        this.selectedCountry = this.country[0];
        this.service.FindCities({ "CountryId": this.country[0].value, "Locations": [] }).subscribe((result: any) => {
          this.cityData = result.data;
          for (let i = 0; i < this.cityData.length; i++) {
            this.searchListExplore.push(this.cityData[i].nameAr)
          }
        })
      }
    });
    this.searchfilterExplore = this.searchctrlExplore.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.searchListExplore.slice())),
    );
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
