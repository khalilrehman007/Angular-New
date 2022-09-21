import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  uaeflag = '../../../../../assets/images/flags/uae.svg'
  search = '../../../../../assets/images/search.svg'
  country = [
    { viewValue: 'UAE', value: 'UAE', img: '../../../../../assets/images/flags/uae.svg' },
    { viewValue: 'UAE', value: 'UAE', img: '../../../../../assets/images/flags/uae.svg' },
  ];
  id: any;
  cityData: any = {};
  districtData: any = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  searchctrl = new FormControl('');
  searchfilter: Observable<string[]>;
  SearchKeyword: string[] = [];
  searchList: string[] = [];
  constructor(private route: ActivatedRoute, private service: AppService) {
    $(window).scrollTop(0);
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.searchfilter = this.searchctrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.searchList.slice())),
    );
    this.service.ExploreCity(this.id).subscribe((result:any) => {
      this.cityData = result.data;
    })
    this.service.FindDistricts({ "CityId": this.id, "Locations": [] }).subscribe((result: any) => {
      this.districtData = result.data;
      for (let i = 0; i < this.districtData.length; i++) {
        this.searchList.push(this.districtData[i].nameAr)
      }
    })
  }
  ngOnInit(): void {
  }
  checkDistrict(city: any) {
    if (this.SearchKeyword.length == 0) {
      return false;
    } else if (this.SearchKeyword.indexOf(city) == -1) {
      return true;
    } else {
      return false;
    }
  }
  @ViewChild('SearchInput') SearchInput:any;
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.SearchKeyword.push(value);
    }
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