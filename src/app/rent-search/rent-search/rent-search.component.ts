import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../../service/app.service";
import { FormControl, FormGroup } from "@angular/forms";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-rent-search',
  templateUrl: './rent-search.component.html',
  styleUrls: ['./rent-search.component.scss']
})
export class RentSearchComponent implements OnInit, AfterViewInit {
  type: any = "Rent";
  user: any;
  PropertyCategoryId: any = '';
  PropertyListingTypeId: any = 1;
  PropertyListingTypes: any = [];
  selectedRentType: any = '';
  Bedrooms: any;
  Bathrooms: any;
  postedById: any = '';
  furnishingType: any;
  propertyListingFeatures: any;
  postedByOption: any;
  DistrictsIds: any = [];
  CityIds: any = [];
  residential: any;
  residentialId: any;
  commercial: any;
  commercialId: any;
  rentType: any = []
  countryData: any;
  PropertyTypeResidentialIds: any = []
  PropertyTypeCommercialIds: any = []
  locationCtrl = new FormControl('');
  filteredLocations: Observable<any[]>;
  Locations: string[] = [];
  allLocations: any[] = [];
  KeyWords: any = []
  keyWordsUrlValue: any = []
  propertyTypeCommercial: any;
  propertyTypeResdential: any;
  PropertyTypeIds: any;
  @ViewChild('locationInput') locationInput: any;
  propertyFeatureIds: any = [];
  locationOnSearchData: any = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  SubmitForm = new FormGroup({
    Name: new FormControl(""),
    PriceStart: new FormControl(""),
    PriceEnd: new FormControl(""),
    minCarpet: new FormControl(""),
    maxCarpet: new FormControl(""),
    bedrooms: new FormControl(),
    bathrooms: new FormControl(),
  });
  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
  }
  status2: boolean = false;
  clickEvent2() {
    this.status2 = !this.status2;
  }
  constructor(private cookie: CookieService, private service: AppService, private api: AppService, private route: Router, private modalService: NgbModal, public router: Router) {

    let url = this.route.url.replace("/", "");
    url = this.route.url.split('?')[0];
    this.getUser();
    this.filteredLocations = this.locationCtrl.valueChanges.pipe(
      startWith(null),
      map((x: string | null) => (x ? this._filter(x) : this.allLocations.slice())),
    );
    //Fetch Furnishing Types
    this.api.FurnishingTypes().subscribe((result: any) => {
      this.furnishingType = result.data;
    });
    //Fetch Property Listing Features
    this.api.PropertyListingFeatures().subscribe((result: any) => {
      this.propertyListingFeatures = result.data;
    });
    //Fetch User Professional Types
    this.api.ProfessionalTypes().subscribe((result: any) => {
      this.postedByOption = result.data;
    });
    //Fetch Property Rent Types
    this.service.RentTypes().subscribe((data: any) => {
      data.data.forEach((x: any) => {
        if (x.id !== 1) {
          this.rentType.push(x);
        }
      });
    });
    //Fetch Propert Categories List
    this.CategoriesTypes();
    //Fetch Commercial Property Types
    this.api.LoadType(2).subscribe((result: any) => {
      this.propertyTypeCommercial = result.data;
    });
    //Fetch Residential Property Types
    this.api.LoadType(1).subscribe((result: any) => {
      this.propertyTypeResdential = result.data;
    });
    //Fetch Property Listing Types
    this.service.LoadPropertyListingTypes().subscribe(e => {
      let temp: any = e;
      if (temp.message == "Property Listing Type List fetched successfully") {
        for (let list of temp.data) {
          if (list.name == this.type) {
            this.PropertyListingTypes.push({ name: list.name, id: list.id });
          }
        }
      }
    });

  }
  ngOnInit(): void {
  }
  //Fetch User Object From Local Storage
  getUser() {
    this.user = localStorage.getItem('user');
    if (this.user != '') {
      this.user = JSON.parse(this.user);
    }
    return this.user;
  }
  //Fetch Country Object From Cookie
  ngAfterViewInit(): void {
    let a = setInterval(() => {
      if (this.cookie.get("countryData")) {
        this.countryData = JSON.parse(this.cookie.get("countryData"));
        clearInterval(a);
      }
      if (this.countryData !== undefined) {
        this.LoadCitiesData(this.countryData.id);
        setTimeout(() => {
          this.getLoaction({ "Searching": "", "CountryId": this.countryData?.id });
        }, 500);
      }
    }, 100);

  }
  //Fetch Districts For Search Dropdowns
  getLoaction(data: any) {
    this.service.CompanyLocationAutoCompleteSearch(data).subscribe(data => {
      let response: any = data;
      response.data.locationAutoComplete.forEach((element: any, i: any) => {
        this.allLocations.push({ 'value': element.item2, 'city': element.item3, 'type': 'area' });
        this.locationOnSearchData.push({ 'id': element.item1, 'value': element.item2, 'type': 'area' })
      })
    });
  }
  //Fetch Cities For Search DropDown
  LoadCitiesData(id: any) {
    this.service.LoadCities(id).subscribe({
      next: ((resp: any) => {
        if (resp.result == 1) {
          resp.data.forEach((x: any) => {
            this.allLocations.push({ 'value': x.name, 'type': 'city' })
            this.locationOnSearchData.push({ 'id': x.id, 'value': x.name, 'type': 'city' })
          })
        }
      })
    })
  }
  //Add KeyWords To List
  addKeywords(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.KeyWords.push(value);
    }
    event.chipInput!.clear();
  }
  //Remove KeyWords From List
  removeKeyword(keyword: string): void {
    const index = this.KeyWords.indexOf(keyword);

    if (index >= 0) {
      this.KeyWords.splice(index, 1);
    }
  }
  //Search Dropdown Value Selected Event
  selected(event: MatAutocompleteSelectedEvent): void {
    let checkExists: any = false;
    if (this.DistrictsIds == null) {
      this.DistrictsIds = []
    }
    if (this.CityIds == null) {
      this.CityIds = []
    }
    this.locationOnSearchData.forEach((element: any, i: any) => {
      if (element.value == event.option.value) {
        if (element.type == 'area') {
          this.DistrictsIds.forEach((x: any, i: any) => {
            if (x == element.id) {
              checkExists = true;
            }
          })
          if (checkExists == false) {
            this.DistrictsIds.push(element.id)
          }
        }
        else {
          this.CityIds.forEach((x: any, i: any) => {
            if (x == element.id) {
              checkExists = true;
            }
          })
          if (checkExists == false) {
            this.CityIds.push(element.id);
          }
        }
      }
    })
    if (checkExists == false) {
      this.Locations.push(event.option.value);
    }
    this.locationInput.nativeElement.value = '';
    this.locationCtrl.setValue(null);
  }
  //Add Selected Location To List
  addLocation(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.Locations.push(value);
    }
    event.chipInput!.clear();
    this.locationCtrl.setValue(null);
  }
  //Remove Location Form List
  removeLocation(loc: string): void {
    let district = this.locationOnSearchData.find((y: any) => {
      return y.value === loc
    })
    if (district.type === 'city') {
      const cityIndex = this.CityIds.indexOf(district.id);
      if (cityIndex >= 0) {
        this.CityIds.splice(cityIndex, 1);
      }
    }
    if (district.type === 'area') {
      const districtIndex = this.DistrictsIds.indexOf(district.id);
      if (districtIndex >= 0) {
        this.DistrictsIds.splice(districtIndex, 1);
      }
    }
    const index = this.Locations.indexOf(loc);
    if (index >= 0) {
      this.Locations.splice(index, 1);
    }
  }
  //Filter Location Search Dropdown Values
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allLocations.filter((x: any) => x.value.toLowerCase().includes(filterValue));
  }

  //Change Listing Type Value
  changeListingType(event: any) {
    this.PropertyListingTypeId = event.value
  }
  //Change Property Category 
  propertyType(id: any) {
    this.PropertyCategoryId = id
  }
  //Professional Type Id Change
  postedBy(event: any) {
    this.postedById = event.value
  }
  //Change Rent Type Value
  changeRentalType(e: any) {
    if(e==this.selectedRentType){
      this.selectedRentType='';
    }
    else{
      this.selectedRentType=e;
    }
  }
  //Close Property Type DropDown
  status1: boolean = false;
  clickEvent1() {
    this.status1 = !this.status1;
    this.status = false;
  }
  //Property Type Selection Change
  propertyCategory: any = 1;
  residentialfun(id: any) {
    this.propertyCategory = id
    this.PropertyTypeCommercialIds = [];
    document.getElementsByClassName('residential')[0].classList.add('active');
    document.getElementsByClassName('commertial')[0].classList.remove('active');
    document.getElementsByClassName('residential-tabs')[0].classList.remove('hide');
    document.getElementsByClassName('commertial-tabs')[0].classList.add('hide');
  }
  commertialfun(id: any) {
    this.propertyCategory = id;
    this.PropertyTypeResidentialIds = [];
    document.getElementsByClassName('residential')[0].classList.remove('active');
    document.getElementsByClassName('commertial')[0].classList.add('active');
    document.getElementsByClassName('residential-tabs')[0].classList.add('hide');
    document.getElementsByClassName('commertial-tabs')[0].classList.remove('hide');
  }
  getPropertyType(e: number) {
    let checkExists: any = true;
    this.PropertyTypeResidentialIds.forEach((element: any, i: any) => {
      if (element == e) {
        checkExists = false;
      }
    })
    if (checkExists) {
      this.PropertyTypeResidentialIds.push(e)
    } else {
      const index = this.PropertyTypeResidentialIds.indexOf(e);
      if (index >= 0) {
        this.PropertyTypeResidentialIds.splice(index, 1);
      }
    }
  }
  getPropertyCommercialType(e: number) {
    let checkExists: any = true;
    this.PropertyTypeCommercialIds.forEach((element: any, i: any) => {
      if (element == e) {
        checkExists = false;
      }
    })
    if (checkExists) {
      this.PropertyTypeCommercialIds.push(e)
    } else {
      const index = this.PropertyTypeCommercialIds.indexOf(e);
      if (index >= 0) {
        this.PropertyTypeCommercialIds.splice(index, 1);
      }
    }
  }
  minCarpet: any = ''
  minCarpetAreaChange(searchValue: any): void {
    this.minCarpet = searchValue
    // this.proceedSearch()
  }
  maxCarpet: any = ''
  maxCarpetAreaChange(searchValue: any): void {
    this.maxCarpet = searchValue
    // this.proceedSearch()
  }
  openVerticallyCentered(content: any) {
    this.SubmitForm.controls.minCarpet.setValue(this.minCarpet);
    this.SubmitForm.controls.maxCarpet.setValue(this.maxCarpet);
    this.modalService.open(content, { centered: true });
  }
  furnishedType: any = '';
  furnishedTypeChange(data: any) {
    if (data == this.furnishedType) {
      this.furnishedType = '';
    }
    else {
      this.furnishedType = data;
    }
    // this.proceedSearch()
  }
  propertyFeatureChange(data: any) {
    let checkExists: any = true;
    if (this.propertyFeatureIds == null) {
      this.propertyFeatureIds = []
    }
    this.propertyFeatureIds.forEach((element: any, i: any) => {
      if (element == data) {
        checkExists = false;
      }
    })
    if (checkExists) {
      this.propertyFeatureIds.push(data)
    } else {
      const index = this.propertyFeatureIds.indexOf(data);
      if (index >= 0) {
        this.propertyFeatureIds.splice(index, 1);
      }
    }
  }
  CategoriesTypes() {
    this.service.PropertyCategories().subscribe(data => {
      let response: any = data;
      this.residential = response.data[0].categoryName;
      this.residentialId = response.data[0].id;
      this.commercial = response.data[1].categoryName;
      this.commercialId = response.data[1].id;
    });
  }
  proceedSearch() {
    this.service.activeTab.next('rent');
    if (this.PropertyCategoryId == 1) {
      this.PropertyTypeCommercialIds = [];
    }
    else {
      this.PropertyTypeResidentialIds = [];
    }
    
    let formData: any = {};
    formData.Type = this.type;
    formData.CountryId = this.countryData.id;
    formData.PropertyListingTypeId = this.PropertyListingTypeId;
    if (this.SubmitForm.controls.bedrooms.value!==undefined && this.SubmitForm.controls.bedrooms.value?.length>0) {
      formData.Bedrooms = JSON.stringify(this.SubmitForm.controls.bedrooms.value);
    }
    if (this.SubmitForm.controls.bathrooms.value!==undefined && this.SubmitForm.controls.bathrooms.value?.length>0) {
      formData.Bathrooms = JSON.stringify(this.SubmitForm.controls.bathrooms.value);
    }
    if (this.selectedRentType !== '') {
      formData.RentTypeId = this.selectedRentType;
    }
    if (this.PropertyCategoryId !== '') {
      formData.PropertyCategoryId = this.PropertyCategoryId;
    }
    if (this.SubmitForm.controls.PriceStart.value !== '') {
      formData.PriceStart = this.SubmitForm.controls.PriceStart.value;
    }
    if (this.SubmitForm.controls.PriceEnd.value !== '') {
      formData.PriceEnd = this.SubmitForm.controls.PriceEnd.value;
    }
    if (this.postedById !== '') {
      formData.ProfessionalTypeId = this.postedById;
    }
    if (this.furnishedType !== '') {
      formData.FurnishingTypeId = this.furnishedType;
    }
    if (this.SubmitForm.controls.minCarpet.value !== '') {
      formData.MinCarpetArea = this.SubmitForm.controls.minCarpet.value;
    }
    if (this.SubmitForm.controls.maxCarpet.value !== '') {
      formData.MaxCarpetArea = this.SubmitForm.controls.maxCarpet.value;
    }
    if (this.KeyWords.length > 0) {
      formData.KeyWords = JSON.stringify(this.KeyWords);
    }
    if (this.PropertyTypeCommercialIds.length > 0) {
      formData.PropertyTypeIds = JSON.stringify(this.PropertyTypeCommercialIds);
    }
    else if(this.PropertyTypeResidentialIds.length>0) {
      formData.PropertyTypeIds = JSON.stringify(this.PropertyTypeResidentialIds);
    }
    if (this.propertyFeatureIds.length > 0) {
      formData.PropertyFeatureIds = JSON.stringify(this.propertyFeatureIds);
    }
    if (this.CityIds.length > 0) {
      formData.CityIds = JSON.stringify(this.CityIds);
    }
    if (this.DistrictsIds.length > 0) {
      formData.DistrictIds = JSON.stringify(this.DistrictsIds);
    }

    this.route.navigate(
      ['/property/search'],
      { queryParams: formData }
    );
  }
}