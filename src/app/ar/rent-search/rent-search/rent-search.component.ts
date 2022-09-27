import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AppService } from 'src/app/service/app.service';
import { Options } from '@angular-slider/ngx-slider';
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-rent-search',
  templateUrl: './rent-search.component.html',
  styleUrls: ['./rent-search.component.scss']
})
export class RentSearchComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  searchctrl = new FormControl('');
  searchfilter: any;
  SearchKeyword: string[] = [];
  searchList: string[] = [];

  constructor(private activeRoute: ActivatedRoute, private service: AppService, private api: AppService, private route: Router) {
    this.data.rentalTypeId = 2;
    this.api.LoadType(1).subscribe((result) => {
      this.propertyType = result;
      this.propertyType = this.propertyType.data
    });
    this.LoadPropertyCategories();
    this.getLoaction({ "Searching": "", "CountryId": "1" });
    this.service.RentTypes().subscribe((data:any) => {
      this.rentType = data.data;
    });
    this.api.LoadType(2).subscribe((result) => {
      this.propertyTypeCommercial = result;
      this.propertyTypeCommercial = this.propertyTypeCommercial.data
    });
    this.searchfilter = this.searchctrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.searchList.slice())),
    );
  }

  locationOnSearchData: any = []
  getLoaction(data: any) {
    let tempData: any = []
    let tempCompleteData: any = []
    this.service.DistrictAutoComplete(data).subscribe(data => {
      let response: any = data;
      response.data.locationAutoComplete.forEach((element: any, i: any) => {
        tempData.push(element.item2);
        tempCompleteData.push({ 'id': element.item1, 'value': element.item2 })
      })
    });
    this.searchList = tempData
    this.locationOnSearchData = tempCompleteData
  }


  ngOnInit(): void {
  }
  Monthly: any;
  MonthlyAr: any;
  Quarterly: any;
  QuarterlyAr: any;
  Yearly: any;
  YearlyAr: any;
  minValue: number = 10;
  maxValue: number = 1000000;
  step: any = 10;
  enforceStep: any = false;
  enforceRange: any = false;
  propertyType: any;
  propertyTypeCommercial: any;
  data: any = {};

  options: Options = {
    floor: 10,
    ceil: 1000000,
    translate: (value: number): string => {
      return value + 'AED';
    }
  };
  minValue1: number = 10;
  maxValue1: number = 50;
  minValue2: number = 10;
  maxValue2: number = 50;
  status: boolean = false;
  status1: boolean = false;
  residential: any;
  residentialId: any;
  commercial: any;
  commercialId: any;
  rentType:any = []

  clickEvent() {
    this.status = !this.status;
    this.status1 = false;
  }

  clickEvent1() {
    this.status1 = !this.status1;
    this.status = false;
  }

  propertyCategory: any = 1;
  // rent(){
  residentialfun(id: any) {
    this.propertyCategory = id
    document.getElementsByClassName('residential')[0].classList.add('active');
    document.getElementsByClassName('commertial')[0].classList.remove('active');
    document.getElementsByClassName('residential-tabs')[0].classList.remove('hide');
    document.getElementsByClassName('commertial-tabs')[0].classList.add('hide');
  }
  // sell(){
  commertialfun(id: any) {
    this.propertyCategory = id
    document.getElementsByClassName('residential')[0].classList.remove('active');
    document.getElementsByClassName('commertial')[0].classList.add('active');
    document.getElementsByClassName('residential-tabs')[0].classList.add('hide');
    document.getElementsByClassName('commertial-tabs')[0].classList.remove('hide');
  }


  PropertyTypeResidentialIds: any = []
  getPropertyType(e: number) {
    this.PropertyTypeResidentialIds.push(e)
    // this.data.PropertyTypeListingId = e;
  }

  PropertyTypeCommercialIds: any = []
  getPropertyCommercialType(e: number) {
    this.PropertyTypeCommercialIds.push(e)
    // this.data.PropertyTypeListingId = e;
  }

  LoadPropertyCategories() {
    this.service.PropertyCategories().subscribe(data => {
      let response: any = data;
      this.residential = response.data[0].categoryNameAr;
      this.residentialId = response.data[0].id;
      this.commercial = response.data[1].categoryNameAr;
      this.commercialId = response.data[1].id;
    });
  }

  getRentalType(e: any) {
    for(let i = 0; i < this.rentType.length; i++) {
      if(this.rentType[i].name == e.tab.textLabel) {
        this.data.rentalTypeId = this.rentType[i].id;
      }
    }
  }
  min: any;
  max: any;

  SubmitForm = new FormGroup({
    Name: new FormControl(""),
    PriceStart: new FormControl(""),
    PriceEnd: new FormControl(""),
  });

  proceedSearch() {

    let PropertyTypeIds: any = [];
    if (this.propertyCategory == 1) {
      //residential
      PropertyTypeIds = this.PropertyTypeResidentialIds
    } else if (this.propertyCategory == 2) {
      //commercial
      PropertyTypeIds = this.PropertyTypeCommercialIds
    }
    let params: any = {
      queryParams: {
        type: 'Rent', PropertyListingTypeId: 1, PropertyCategoryId: this.propertyCategory, RentTypeId: this.data.rentalTypeId,
        PropertyTypeIds: JSON.stringify(PropertyTypeIds)
        , PropertyAddress: this.SubmitForm.value.Name, PriceStart: this.SubmitForm.value.PriceStart, PriceEnd: this.SubmitForm.value.PriceEnd
        , Bedrooms: '', Bathrooms: '', CurrentPage: 1, DistrictIds: JSON.stringify(this.DistrictsId), DistrictsValue: JSON.stringify(this.SearchKeyword)
      }
    };

    this.route.navigate(['/ar/property/search'], params)
  }



  @ViewChild('SearchInput') SearchInput: any;
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
    let removeId: any;
    this.locationOnSearchData.forEach((element: any, i: any) => {
      if (element.value == fruit) {
        removeId = element.id
      }
    })

    let companyIndex: number = this.DistrictsId.indexOf(removeId);
    if (companyIndex !== -1) {
      this.DistrictsId.splice(companyIndex, 1);
    }

    const index = this.SearchKeyword.indexOf(fruit);

    if (index >= 0) {
      this.SearchKeyword.splice(index, 1);
    }
  }

  DistrictsId: any = []
  selected(event: MatAutocompleteSelectedEvent): void {
    this.locationOnSearchData.forEach((element: any, i: any) => {
      if (element.value == event.option.viewValue) {
        this.DistrictsId.push(element.id)
      }
    })

    this.SearchKeyword.push(event.option.viewValue);
    this.SearchInput.nativeElement.value = '';
    this.searchctrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.searchList.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }
}