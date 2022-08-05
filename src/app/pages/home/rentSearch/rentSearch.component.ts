import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { AppService } from 'src/app/service/app.service';
import { Options } from '@angular-slider/ngx-slider';
import { ActivatedRoute,Router } from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'rent-search',
  templateUrl: './rentSearch.component.html',
  styleUrls: ['./rentSearch.component.scss']
})
export class RentSearchComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute,private service:AppService,private api: AppService,private route:Router) {
    this.data.rentalTypeId = 1
    this.api.LoadType(1).subscribe((result) => {
      this.propertyType = result;
      this.propertyType = this.propertyType.data
    });
    this.LoadPropertyCategories();
    this.service.RentTypes().subscribe(data=>{
      let response: any = data;
      this.Monthly    = response.data[0].name;
      // this.MonthlyAr  = response.data[0].nameAr;
      this.Quarterly    = response.data[1].name;
      // this.QuarterlyAr  = response.data[1].nameAr;
      this.Yearly    = response.data[2].name;
      // this.YearlyAr  = response.data[3].nameAr;
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

  ngOnInit(): void {
  }
  Monthly: any;
  MonthlyAr: any;
  Quarterly: any;
  QuarterlyAr: any;
  Yearly: any;
  YearlyAr: any;
  minValue: number = 10;
  maxValue: number = 50;
  step: 10;
  enforceStep: false;
  enforceRange: false;
  propertyType: any;
  propertyTypeCommercial: any;
  data: any = {};

  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number): string => {
      return value +  'AED';
    }
  };
  minValue1: number = 10;
  maxValue1: number = 50;
  minValue2: number = 10;
  maxValue2: number = 50;
  status: boolean = false;
  status1: boolean = false;
  residential:any;
  residentialId:any;
  commercial:any;
  commercialId:any;

  clickEvent(){
      this.status = !this.status;
      this.status1 = false;
  }

  clickEvent1(){
      this.status1 = !this.status1;
      this.status = false;
  }

  propertyCategory :any = 1;
  // rent(){
  residentialfun(id:any){
    this.propertyCategory = id
    document.getElementsByClassName('residential')[0].classList.add('active');
    document.getElementsByClassName('commertial')[0].classList.remove('active');
    document.getElementsByClassName('residential-tabs')[0].classList.remove('hide');
    document.getElementsByClassName('commertial-tabs')[0].classList.add('hide');
  }
  // sell(){
  commertialfun(id:any){
    this.propertyCategory = id
    document.getElementsByClassName('residential')[0].classList.remove('active');
    document.getElementsByClassName('commertial')[0].classList.add('active');
    document.getElementsByClassName('residential-tabs')[0].classList.add('hide');
    document.getElementsByClassName('commertial-tabs')[0].classList.remove('hide');
  }


  PropertyTypeResidentialIds :any = []
  getPropertyType(e: number) {
    this.PropertyTypeResidentialIds.push(e)
    // this.data.PropertyTypeListingId = e;
  }

  PropertyTypeCommercialIds :any = []
  getPropertyCommercialType(e: number) {
    this.PropertyTypeCommercialIds.push(e)
    // this.data.PropertyTypeListingId = e;
  }

  LoadPropertyCategories(){
    this.service.PropertyCategories().subscribe(data=>{
      let response:any = data;
      this.residential = response.data[0].categoryName;
      this.residentialId = response.data[0].id;
      this.commercial = response.data[1].categoryName;
      this.commercialId = response.data[1].id;
    });
  }

  getRentalType(e:any){
    if(e.tab.textLabel == "Monthly"){
      this.data.rentalTypeId = 1;
    }else if(e.tab.textLabel == "Quarterly"){
      this.data.rentalTypeId = 2;
    }else if(e.tab.textLabel == "Yearly"){
      this.data.rentalTypeId = 3;
    }
  }

  min :number;
  max :number;

  SubmitForm = new FormGroup({
    Name : new FormControl(""),
    PriceStart : new FormControl(""),
    PriceEnd : new FormControl(""),
  });

  proceedSearch(){
    // this.SubmitForm.value.Name
    // this.data.rentalTypeId

    let PropertyTypeIds :any = [];
    if(this.propertyCategory == 1){
      //residential
      PropertyTypeIds = this.PropertyTypeResidentialIds
    }else if(this.propertyCategory == 2){
      //commercial
      PropertyTypeIds = this.PropertyTypeCommercialIds
    }

    // console.log(PropertyTypeIds,'PropertyTypeIds')
    // console.log(this.propertyCategory,'CategoryId')
    // console.log(this.data.rentalTypeId,'rentalTypeId')
    // console.log(this.SubmitForm.value)

    let params :any = {queryParams:{type:'Rent',PropertyListingTypeId:1,PropertyCategoryId:this.propertyCategory,RentTypeId:this.data.rentalTypeId,PropertyTypeIds:PropertyTypeIds
        ,PropertyAddress:this.SubmitForm.value.Name,PriceStart:this.SubmitForm.value.PriceStart,PriceEnd:this.SubmitForm.value.PriceEnd
        ,Bedrooms:'',Bathrooms:'',CurrentPage:1
      }};

    this.route.navigate(['/search'],params)
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


