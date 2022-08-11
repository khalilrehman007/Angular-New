import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { HeaderComponent } from '../../../header/header.component';
import { FooterComponent } from '../../../footer/footer.component';
import { BreadcrumbComponent } from '../../../breadcrumb/breadcrumb.component';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
  constructor() {
    this.searchfilter = this.searchctrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.searchList.slice())),
    );
   }

  ngOnInit(): void {
  }
  // Search Code
  separatorKeysCodes: number[] = [ENTER, COMMA];
  searchctrl = new FormControl('');
  searchfilter: Observable<string[]>;
  SearchKeyword: string[] = [];
  searchList: string[] = ['Dubai', 'UAE', 'Dubai', 'UAE', 'Dubai'];

  @ViewChild('SearchInput') SearchInput: ElementRef<HTMLInputElement>;
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.SearchKeyword.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.searchctrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.SearchKeyword.indexOf(fruit);

    if (index >= 0) {
      this.SearchKeyword.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.SearchKeyword.push(event.option.viewValue);
    this.SearchInput.nativeElement.value = '';
    this.searchctrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.searchList.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }
}
