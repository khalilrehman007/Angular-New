import { Component, OnInit, Output, Input, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../../service/app.service";
import { FormControl, FormGroup } from "@angular/forms";
import { Options } from '@angular-slider/ngx-slider';
// import {SearchComponent} from "../search/search.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { remove } from "@angular/fire/database";
export interface KeywordString {
  name: string;
}
@Component({
  selector: 'app-rent-search',
  templateUrl: './rent-search.component.html',
  styleUrls: ['./rent-search.component.scss']
})
export class RentSearchComponent implements OnInit {
  @Output() childToParentDataLoad: EventEmitter<any> = new EventEmitter<any>()
  @Input() totalRecord: any;
  type: any;
  PropertyCategoryId: any;
  RentTypeId: any;
  PropertyListingTypeId: any;
  PropertyAddress: any;
  PriceStart: any;
  PriceEnd: any = 50000000;
  minValue: number;
  maxValue: number;
  Monthly: any;
  MonthlyAr: any;
  Quarterly: any;
  QuarterlyAr: any;
  Yearly: any;
  YearlyAr: any;
  Bedrooms: any;
  Bathrooms: any;
  postedById: any;
  data: any = {}
  selectedBeds: any;
  selectedBaths: any;
  furnishingType: any;
  propertyListingFeatures: any;
  postedByOption: any;
  DistrictsId: any = [];
  DistrictsValue: any = [];
  residential: any;
  residentialId: any;
  commercial: any;
  commercialId: any;
  rentType: any = []
  ngOnInit(): void {
  }
  separatorKeysCodes1: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  allFruits: string[] = [];
  KeyWords: any = []
  keyWordsUrlValue: any = []
  propertyTypeCommercial: any;
  propertyTypeResdential: any;
  PropertyTypeIds: any;
  @ViewChild('fruitInput') fruitInput: any;
  routeCheck: any;
  totalPropertyRecord: any;
  maxLimit: any;
  options: any = {};
  propertyFeatureIds: any = [];
  constructor(private activeRoute: ActivatedRoute, private service: AppService, private api: AppService, private route: Router, private modalService: NgbModal, public router: Router) {
    let url = this.route.url.replace("/", "");
    url = this.route.url.split('?')[0];
    this.routeCheck = url
    this.totalPropertyRecord = localStorage.getItem('propertyListingTotalRecord');
    this.type = this.activeRoute.snapshot.queryParamMap.get('type');
    this.PropertyCategoryId = this.activeRoute.snapshot.queryParamMap.get('PropertyCategoryId');
    this.RentTypeId = this.activeRoute.snapshot.queryParamMap.get('RentTypeId');
    let PropertyTypeIds: any = this.activeRoute.snapshot.queryParamMap.get('PropertyTypeIds');
    this.PropertyListingTypeId = this.activeRoute.snapshot.queryParamMap.get('PropertyListingTypeId');
    this.PropertyAddress = this.activeRoute.snapshot.queryParamMap.get('PropertyAddress');
    this.PriceStart = this.activeRoute.snapshot.queryParamMap.get('PriceStart');
    this.PriceEnd = this.activeRoute.snapshot.queryParamMap.get('PriceEnd');
    this.Bedrooms = this.activeRoute.snapshot.queryParamMap.get('Bedrooms');
    this.selectedBeds = this.Bedrooms;
    this.Bathrooms = this.activeRoute.snapshot.queryParamMap.get('Bathrooms');
    this.selectedBaths = this.Bathrooms;
    this.PropertyTypeIds = JSON.parse(PropertyTypeIds)
    let DistrictsId: any = this.activeRoute.snapshot.queryParamMap.get('DistrictIds');
    let DistrictsValue: any = this.activeRoute.snapshot.queryParamMap.get('DistrictsValue');
    this.DistrictsId = JSON.parse(DistrictsId)
    this.DistrictsValue = JSON.parse(DistrictsValue)
    let KeyWords: any = this.activeRoute.snapshot.queryParamMap.get('KeyWords');
    let PropertyFeatureIds: any = this.activeRoute.snapshot.queryParamMap.get('PropertyFeatureIds');
    let MinCarpetArea: any = this.activeRoute.snapshot.queryParamMap.get('MinCarpetArea');
    let MaxCarpetArea: any = this.activeRoute.snapshot.queryParamMap.get('MaxCarpetArea');
    let FurnishingTypeId: any = this.activeRoute.snapshot.queryParamMap.get('FurnishingTypeId');
    this.KeyWords = JSON.parse(KeyWords)
    if (PropertyFeatureIds == null) {
      PropertyFeatureIds = []
    } else {
      PropertyFeatureIds = JSON.parse(PropertyFeatureIds)
    }
    if (this.KeyWords !== null) {
      this.KeyWords.forEach((element: any, i: any) => {
        this.keyWordsUrlValue.push({ name: element })
      })
    }
    this.propertyFeatureIds = PropertyFeatureIds
    this.minCarpet = MinCarpetArea
    this.maxCarpet = MaxCarpetArea
    this.furnishedType = FurnishingTypeId
    this.getLoaction({ "Searching": "", "CountryId": "1" });
    if (this.DistrictsValue !== null) {
      this.fruits = this.DistrictsValue
    }
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );
    this.minValue = this.PriceStart;
    this.maxValue = 50000000;
    if (this.type == null) {
      this.activeRoute.params.subscribe(params => {
        if (params['type'] == 'Buy') {
          this.PropertyListingTypeId = 2;
          this.type = 'Buy'
        } else if (params['type'] == 'Rent') {
          this.PropertyListingTypeId = 1;
          this.type = 'Rent';
        }
      });
    }
    this.api.FurnishingTypes().subscribe((result: any) => {
      this.furnishingType = result.data;
    });
    this.api.PropertyListingFeatures().subscribe((result: any) => {
      this.propertyListingFeatures = result.data;
    });
    this.api.ProfessionalTypes().subscribe((result: any) => {
      this.postedByOption = result.data;
    });
    this.SubmitForm.controls.Name.setValue(this.PropertyAddress);
    this.loadType();
    this.service.RentTypes().subscribe((data: any) => {
      this.rentType = data.data;
    });
    this.rentTypeIdCheck()
    this.CategoriesTypes();
    this.api.LoadType(2).subscribe((result) => {
      this.propertyTypeCommercial = result;
      this.propertyTypeCommercial = this.propertyTypeCommercial.data
    });
    this.api.LoadType(1).subscribe((result) => {
      this.propertyTypeResdential = result;
      this.propertyTypeResdential = this.propertyTypeResdential.data
    });
    if (this.PropertyListingTypeId == 1) {
      this.options = {
        floor: 10,
        ceil: 1000000,
        translate: (value: number): string => {
          return value + 'AED';
        }
      }
    } else {
      this.options = {
        floor: 10,
        ceil: 50000000,
        translate: (value: number): string => {
          return value + 'AED';
        }
      }
    }
  }
  locationOnSearchData: any = []
  getLoaction(data: any) {
    let tempData: any = []
    let tempCompleteData: any = []
    this.service.CompanyLocationAutoCompleteSearch(data).subscribe(data => {
      let response: any = data;
      response.data.locationAutoComplete.forEach((element: any, i: any) => {
        tempData.push(element.item2);
        tempCompleteData.push({ 'id': element.item1, 'value': element.item2 })
      })
    });
    this.allFruits = tempData
    this.locationOnSearchData = tempCompleteData
  }
  add1(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.fruits.push(value);
    }
    event.chipInput!.clear();
    this.fruitCtrl.setValue(null);
  }
  remove1(fruit: string): void {
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
    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    if (this.DistrictsId == null) {
      this.DistrictsId = []
    }
    this.locationOnSearchData.forEach((element: any, i: any) => {
      if (element.value == event.option.viewValue) {
        this.DistrictsId.push(element.id)
      }
    })
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }
  RentTypeIndexId: any;
  public rentTypeIdCheck() {
    let RentTypeIndexId: number = 0;
    if (this.RentTypeId == 2) {
      RentTypeIndexId = 1;
    } else if (this.RentTypeId == 3) {
      RentTypeIndexId = 2;
    }
    this.RentTypeIndexId = RentTypeIndexId;
  }
  rentTypes: any = []
  selectedRentType: any;
  loadType() {
    this.service.LoadPropertyListingTypes().subscribe(e => {
      let temp: any = e;
      if (temp.message == "Property Listing Type List fetched successfully") {
        for (let list of temp.data) {
          this.rentTypes.push({ name: list.name, id: list.id });
        }
      }
    });
  }
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
  propertyTypes: any = []
  selectedPropertyType: any;
  LoadPropertyCategories() {
    this.service.PropertyCategories().subscribe(e => {
      let temp: any = e;
      for (let list of temp.data) {
        if (this.selectedPropertyType == null) {
          if (list.id == this.PropertyCategoryId) {
            this.selectedPropertyType = list.id;
          }
        }
        this.propertyTypes.push({ name: list.categoryName, id: list.id });
      }
    });
  }
  changeType(event: any) {
    this.PropertyListingTypeId = event.value
    this.selectedRentType = event.value
    this.service.LoadPropertyListingTypes().subscribe(e => {
      let temp: any = e;
      if (temp.message == "Property Listing Type List fetched successfully") {
        let temp: any = e;
        for (let list of temp.data) {
          if (list.id == event.value) {
            this.type = list.name;
          }
        }
      }
    });
    if (event.value == 1) {
      this.options = {
        floor: 10,
        ceil: 1000000,
        translate: (value: number): string => {
          return value + 'AED';
        }
      }
    } else {
      this.options = {
        floor: 10,
        ceil: 50000000,
        translate: (value: number): string => {
          return value + 'AED';
        }
      }
    }
  }
  propertyType(id: any) {
    this.PropertyCategoryId = id
  }
  baths(event: any) {
    this.Bathrooms = event.value
  }
  beds(event: any) {
    this.Bedrooms = event.value
  }
  postedBy(event: any) {
    this.postedById = event.value
  }

  getRentalType(e: any) {
    for (let i = 0; i < this.rentType.length; i++) {
      if (this.rentType[i].name == e.tab.textLabel) {
        this.RentTypeId = this.rentType[i].id;
      }
    }
  }
  proceedSearch() {
    let keywordsData: any = [];
    this.Keywords.forEach((element, i) => {
      keywordsData.push(element.name)
    })
    let PropertyTypeIds: any = [];
    if (this.propertyCategory == 1) {
      PropertyTypeIds = this.PropertyTypeResidentialIds
    } else if (this.propertyCategory == 2) {
      PropertyTypeIds = this.PropertyTypeCommercialIds
    }
    let PropertyTypeIdsParams: any = JSON.stringify(PropertyTypeIds);
    let params: any = {
      type: this.type, "PropertyTypeIds": PropertyTypeIdsParams, "RentTypeId": this.RentTypeId,
      "PropertyCategoryId": this.PropertyCategoryId, PriceStart: this.SubmitForm.value.PriceStart, PriceEnd: this.SubmitForm.value.PriceEnd,
      Bedrooms: this.Bedrooms, Bathrooms: this.Bathrooms, PropertyAddress: this.SubmitForm.value.Name,
      "PropertyListingTypeId": this.PropertyListingTypeId, CurrentPage: 1, DistrictIds: JSON.stringify(this.DistrictsId),
      DistrictsValue: JSON.stringify(this.DistrictsValue), KeyWords: JSON.stringify(keywordsData), PropertyFeatureIds: JSON.stringify(this.propertyFeatureIds),
      MinCarpetArea: this.minCarpet, MaxCarpetArea: this.maxCarpet, FurnishingTypeId: this.furnishedType
    }
    let objects: any = {
      type: this.type, "PropertyTypeIds": PropertyTypeIds, "RentTypeId": this.RentTypeId,
      "PropertyCategoryId": this.PropertyCategoryId, PriceStart: this.SubmitForm.value.PriceStart, PriceEnd: this.SubmitForm.value.PriceEnd,
      Bedrooms: this.Bedrooms, Bathrooms: this.Bathrooms, PropertyAddress: this.SubmitForm.value.Name,
      "PropertyListingTypeId": this.PropertyListingTypeId, CurrentPage: 1, DistrictIds: this.DistrictsId, KeyWords: keywordsData
      , PropertyFeatureIds: this.propertyFeatureIds, FurnishingTypeId: this.furnishedType,
      MinCarpetArea: this.minCarpet, MaxCarpetArea: this.maxCarpet
    }
    this.route.navigate(['/property/search'], { queryParams: params })
    this.childToParentDataLoad.emit(objects)
  }
  clearSearch() {
    this.type = ''
    this.PropertyCategoryId = ''
    this.RentTypeId = ''
    this.PropertyListingTypeId = ''
    this.PropertyAddress = ''
    this.PriceStart = 10
    this.PriceEnd = 50000000
    this.Bedrooms = ''
    this.Bathrooms = ''
    this.selectedRentType = ''
    this.selectedBeds = ''
    this.selectedBaths = ''
    this.minCarpet = ''
    this.maxCarpet = ''
    this.furnishedType = ''
    this.propertyFeatureIds = []
    this.PropertyTypeIds = []
    this.PropertyTypeResidentialIds = []
    this.PropertyTypeCommercialIds = []
    this.keyWordsUrlValue.forEach((element: any, i: any) => {
      setTimeout(() => {
        this.remove(element)
      }, 1000);
    })
    this.SubmitForm.controls.Name.setValue('');
    this.SubmitForm.controls.PriceStart.setValue('10');
    this.SubmitForm.controls.PriceEnd.setValue('50000000');
    this.selectedPropertyType = null
    this.propertyTypes = []
    this.LoadPropertyCategories();
    let params: any = {
      type: this.type, "PropertyTypeIds": JSON.stringify([]), "RentTypeId": '',
      "PropertyCategoryId": '', PriceStart: this.PriceStart, PriceEnd: this.PriceEnd,
      Bedrooms: '', Bathrooms: '', PropertyAddress: '',
      "PropertyListingTypeId": '', CurrentPage: 1, DistrictIds: JSON.stringify([]),
      DistrictsValue: JSON.stringify([]), KeyWords: JSON.stringify([]), PropertyFeatureIds: JSON.stringify([]),
      MinCarpetArea: '', MaxCarpetArea: '', FurnishingTypeId: '', videoTourSorting: ''
    }
    let object: any = {
      type: this.type, "PropertyTypeIds": [], "RentTypeId": '',
      "PropertyCategoryId": '', PriceStart: this.PriceStart, PriceEnd: this.PriceEnd,
      Bedrooms: '', Bathrooms: '', PropertyAddress: '',
      "PropertyListingTypeId": '', CurrentPage: 1, DistrictIds: [],
      DistrictsValue: [], KeyWords: [], PropertyFeatureIds: [],
      MinCarpetArea: '', MaxCarpetArea: '', FurnishingTypeId: '', videoTourSorting: ''
    }
    if (this.routeCheck == '/property/search') {
      this.route.navigate(['/property/search'], { queryParams: params })
      this.childToParentDataLoad.emit(object)
    } else {
      this.proceedSearchViewMap()
    }
  }
  modelPropertyPictures: any = []
  openVerticallyCentered(content: any) {
    this.SubmitForm.controls.minCarpet.setValue(this.minCarpet);
    this.SubmitForm.controls.maxCarpet.setValue(this.maxCarpet);
    this.modalService.open(content, { centered: true });
  }
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  Keywords: KeywordString[] = this.keyWordsUrlValue;
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.Keywords.push({ name: value });
    }
    event.chipInput!.clear();
    this.proceedSearch()
  }
  remove(fruit: KeywordString): void {
    const index = this.Keywords.indexOf(fruit);

    if (index >= 0) {
      this.Keywords.splice(index, 1);
    }
    this.proceedSearch()
  }
  furnishedType: any = '';
  furnishedTypeChange(data: any) {
    this.furnishedType = data
    this.proceedSearch()
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
    this.proceedSearch()
  }
  minCarpet: any = ''
  minCarpetAreaChange(searchValue: any): void {
    this.minCarpet = searchValue
    this.proceedSearch()
  }
  maxCarpet: any = ''
  maxCarpetAreaChange(searchValue: any): void {
    this.maxCarpet = searchValue
    this.proceedSearch()
  }
  status1: boolean = false;
  clickEvent1() {
    this.status1 = !this.status1;
    this.status = false;
  }
  propertyCategory: any = 1;
  residentialfun(id: any) {
    this.propertyCategory = id
    document.getElementsByClassName('residential')[0].classList.add('active');
    document.getElementsByClassName('commertial')[0].classList.remove('active');
    document.getElementsByClassName('residential-tabs')[0].classList.remove('hide');
    document.getElementsByClassName('commertial-tabs')[0].classList.add('hide');
  }
  commertialfun(id: any) {
    this.propertyCategory = id
    document.getElementsByClassName('residential')[0].classList.remove('active');
    document.getElementsByClassName('commertial')[0].classList.add('active');
    document.getElementsByClassName('residential-tabs')[0].classList.add('hide');
    document.getElementsByClassName('commertial-tabs')[0].classList.remove('hide');
  }
  PropertyTypeResidentialIds: any = []
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
  PropertyTypeCommercialIds: any = []
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
  CategoriesTypes() {
    this.service.PropertyCategories().subscribe(data => {
      let response: any = data;
      this.residential = response.data[0].categoryName;
      this.residentialId = response.data[0].id;
      this.commercial = response.data[1].categoryName;
      this.commercialId = response.data[1].id;
    });
  }
  proceedSearchViewMap() {
    let keywordsData: any = [];
    this.Keywords.forEach((element, i) => {
      keywordsData.push(element.name)
    })
    let PropertyTypeIds: any = [];
    if (this.propertyCategory == 1) {
      //residential
      PropertyTypeIds = this.PropertyTypeResidentialIds
    } else if (this.propertyCategory == 2) {
      //commercial
      PropertyTypeIds = this.PropertyTypeCommercialIds
    }
    let PropertyTypeIdsParams: any = JSON.stringify(PropertyTypeIds);
    let params: any = {
      type: this.type, "PropertyTypeIds": PropertyTypeIdsParams, "RentTypeId": this.RentTypeId,
      "PropertyCategoryId": this.PropertyCategoryId, PriceStart: this.SubmitForm.value.PriceStart, PriceEnd: this.SubmitForm.value.PriceEnd,
      Bedrooms: this.Bedrooms, Bathrooms: this.Bathrooms, PropertyAddress: this.SubmitForm.value.Name,
      "PropertyListingTypeId": this.PropertyListingTypeId, CurrentPage: 1, DistrictIds: JSON.stringify(this.DistrictsId),
      DistrictsValue: JSON.stringify(this.DistrictsValue), KeyWords: JSON.stringify(keywordsData), PropertyFeatureIds: JSON.stringify(this.propertyFeatureIds),
      MinCarpetArea: this.minCarpet, MaxCarpetArea: this.maxCarpet, FurnishingTypeId: this.furnishedType
    }
    let objects: any = {
      type: this.type, "PropertyTypeIds": PropertyTypeIds, "RentTypeId": this.RentTypeId,
      "PropertyCategoryId": this.PropertyCategoryId, PriceStart: this.SubmitForm.value.PriceStart, PriceEnd: this.SubmitForm.value.PriceEnd,
      Bedrooms: this.Bedrooms, Bathrooms: this.Bathrooms, PropertyAddress: this.SubmitForm.value.Name,
      "PropertyListingTypeId": this.PropertyListingTypeId, CurrentPage: 1, DistrictIds: this.DistrictsId, KeyWords: keywordsData
      , PropertyFeatureIds: this.propertyFeatureIds, FurnishingTypeId: this.furnishedType,
      MinCarpetArea: this.minCarpet, MaxCarpetArea: this.maxCarpet
    }
    this.route.navigate(['/property/mapview'], { queryParams: params })
    this.childToParentDataLoad.emit(objects)
  }
}