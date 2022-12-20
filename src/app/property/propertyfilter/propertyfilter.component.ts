import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { map, Observable, startWith } from "rxjs";
import { AppService } from 'src/app/service/app.service';
export interface KeywordString {
  name: string;
}

@Component({
  selector: 'app-propertyfilter',
  templateUrl: './propertyfilter.component.html',
  styleUrls: ['./propertyfilter.component.scss']
})
export class PropertyfilterComponent implements OnInit, AfterViewInit {
  type: any = "";
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
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  @ViewChild('locationInput') locationInput: any;
  propertyFeatureIds: any = [];
  locationOnSearchData: any = [];
  SubmitForm = new FormGroup({
    Name: new FormControl(""),
    PriceStart: new FormControl(""),
    PriceEnd: new FormControl(""),
    minCarpet: new FormControl(""),
    maxCarpet: new FormControl(""),
  });
  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
  }
  status2: boolean = false;
  clickEvent2() {
    this.status2 = !this.status2;
  }
  constructor(private cookie: CookieService, private activeRoute: ActivatedRoute, private service: AppService, private api: AppService, private route: Router, private modalService: NgbModal, public router: Router) {

    let url = this.route.url.replace("/", "");
    url = this.route.url.split('?')[0];
    this.getUser();
    this.filteredLocations = this.locationCtrl.valueChanges.pipe(
      startWith(null),
      map((x: string | null) => (x ? this._filter(x) : this.allLocations.slice())),
    );
    this.activeRoute.queryParams.subscribe((params: any) => {
      if (params.Type == 'Buy') {
        this.PropertyListingTypeId = 2;
        this.type = 'Buy'
        this.LoadPropertyListingTypes();
      } else if (params.Type == 'Rent') {
        this.PropertyListingTypeId = 1;
        this.type = 'Rent';
        this.LoadPropertyListingTypes();
      }
      this.SetParamsData(params);
    });

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

  }
  ngOnInit(): void {
  }
  //Set Parameters data
  SetParamsData(params: any) {
    console.log(params)
    if (params.Bedrooms !== undefined && params.Bedrooms !== null) {
      this.Bedrooms = params.Bedrooms;
    }
    if (params.Bathrooms !== undefined && params.Bathrooms !== null) {
      this.Bathrooms = params.Bathrooms;
    }
    if(params.RentTypeId!==undefined && params.RentTypeId!==null){
      this.selectedRentType=params.RentTypeId;
    }
    if(params.PropertyCategoryId!==undefined && params.PropertyCategoryId!==null){
      this.PropertyCategoryId=params.PropertyCategoryId;
    }
    if(params.PriceStart!==undefined && params.PriceStart!==null){
      this.SubmitForm.controls.PriceStart.patchValue(params.PriceStart);
    }
    if(params.PriceEnd!==undefined && params.PriceEnd!==null){
      this.SubmitForm.controls.PriceEnd.patchValue(params.PriceEnd);
    }
    if(params.ProfessionalTypeId!==undefined && params.ProfessionalTypeId!==null){
      this.postedById=parseInt(params.ProfessionalTypeId);
      console.log(this.postedById);
    }
    if(params.FurnishingTypeId!==undefined && params.FurnishingTypeId!==null){
      this.furnishedType=params.FurnishingTypeId;
    }
    if(params.MinCarpetArea!==undefined && params.MinCarpetArea!==null){
      this.SubmitForm.controls.minCarpet.patchValue(params.MinCarpetArea);
      this.minCarpet = params.MinCarpetArea;
    }
    if(params.MaxCarpetArea!==undefined && params.MaxCarpetArea!==null){
      this.SubmitForm.controls.maxCarpet.patchValue(params.MaxCarpetArea);
      this.maxCarpet=params.MaxCarpetArea;
    }
    if(params.KeyWords!==undefined && params.KeyWords!==null){
     this.KeyWords=JSON.parse(params.KeyWords);
    }
    if(params.KeyWords!==undefined && params.KeyWords!==null){
     this.KeyWords=JSON.parse(params.KeyWords);
    }
    if(params.PropertyTypeIds!==undefined && params.PropertyTypeIds!==null){
      if(this.PropertyCategoryId==1){
        this.PropertyTypeResidentialIds=JSON.parse(params.PropertyTypeIds);
      }
      else{
        this.PropertyTypeCommercialIds=JSON.parse(params.PropertyTypeIds);
      }
    }
    if(params.PropertyFeatureIds!==undefined && params.PropertyFeatureIds!==null){
     this.propertyFeatureIds=JSON.parse(params.PropertyFeatureIds);
    }
    if(params.CityIds!==undefined && params.CityIds!==null){
     this.CityIds=JSON.parse(params.CityIds);
    
    }
    if(params.DistrictIds!==undefined && params.DistrictIds!==null){
     this.DistrictsIds=JSON.parse(params.DistrictIds);
    
    }
    console.log("Listing Type", this.PropertyListingTypeId);
    console.log("Selected Rent Type", this.selectedRentType);
    console.log("District Ids", this.DistrictsIds);
    console.log("City Ids", this.CityIds);
    console.log("Property Category", this.PropertyCategoryId);
    console.log("Property Residential Type Ids", this.PropertyTypeResidentialIds);
    console.log("Property Commercial Type Ids", this.PropertyTypeCommercialIds);
    console.log("BedRooms", this.Bedrooms);
    console.log("BathRooms", this.Bathrooms);
    console.log("PriceStart", this.SubmitForm.controls.PriceStart.value);
    console.log("PriceEnd", this.SubmitForm.controls.PriceEnd.value);
    console.log("Posted By", this.postedById);
    console.log("FurnishingType", this.furnishedType);
    console.log("Min Area", this.SubmitForm.controls.minCarpet.value);
    console.log("Max Area", this.SubmitForm.controls.maxCarpet.value);
    console.log("Property Features Ids", this.propertyFeatureIds);
    console.log("KeyWords", this.KeyWords);
  }
  LoadLocationFormParameters(type:any){
    if(type=='city'){
      this.CityIds.forEach((x:any)=>{
        console.log(x)
        let data:any = this.locationOnSearchData.find((y: any) => {
          return y.id === x && y.type===type
        })
        console.log(data)
        if(data!==undefined && data!==null){
          this.Locations.push(data.value);
        }
      })
    }
    else{
      this.DistrictsIds.forEach((x:any)=>{
        let data:any = this.locationOnSearchData.find((y: any) => {
          return y.id === x && y.type===type
        })
        if(data!==undefined && data!==null){
          this.Locations.push(data.value);
        }
      })
    }
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
        var promise = new Promise(() => {
        this.LoadCitiesData(this.countryData.id);
        setTimeout(() => {
          this.getLoaction({ "Searching": "", "CountryId": this.countryData?.id });
        }, 500);
      });
      console.log(promise)
      promise.then(()=>{
      
        if(this.CityIds.length>0){
          this.LoadLocationFormParameters('city');
        }
        if(this.DistrictsIds.length>0){
          this.LoadLocationFormParameters('area');
        }
        console.log(this.Locations)
      })
      }
    }, 100);

  }
  //Fetch Property Listing Types
  LoadPropertyListingTypes() {
    this.PropertyListingTypes = [];
    this.service.LoadPropertyListingTypes().subscribe(e => {
      console.log(this.type)
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
        console.log("cities", resp);
        if (resp.result == 1) {
          resp.data.forEach((x: any) => {
            this.allLocations.push({ 'value': x.name, 'type': 'city' })
            this.locationOnSearchData.push({ 'id': x.id, 'value': x.name, 'type': 'city' })
          })
        }
      })
    })
   
  }
  //Fetch Properties Categories From Database
  CategoriesTypes() {
    this.service.PropertyCategories().subscribe(data => {
      let response: any = data;
      this.residential = response.data[0].categoryName;
      this.residentialId = response.data[0].id;
      this.commercial = response.data[1].categoryName;
      this.commercialId = response.data[1].id;
    });
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
      this.Locations.push(event.option.viewValue);
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
    const districtIndex = this.DistrictsIds.indexOf(district.id);
    const cityIndex = this.CityIds.indexOf(district.id);
    const index = this.Locations.indexOf(loc);

    if (districtIndex >= 0) {
      this.DistrictsIds.splice(index, 1);
    }
    if (cityIndex >= 0) {
      this.CityIds.splice(index, 1);
    }
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
  //Baths Selection
  baths(event: any) {
    this.Bathrooms = event.value
  }
  //Beds Selection
  beds(event: any) {
    this.Bedrooms = event.value
  }
  //Professional Type Id Change
  postedBy(event: any) {
    this.postedById = event.value
  }
  //Change Rent Type Value
  changeRentalType(e: any) {
    if (e.tab.textLabel == 'All') {
      this.selectedRentType = ''
    }
    else {
      for (let i = 0; i < this.rentType.length; i++) {
        if (this.rentType[i].name == e.tab.textLabel) {
          this.selectedRentType = this.rentType[i].id;
        }
      }
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
  clearSearch() {

  }
  proceedSearch() {

  }
}
