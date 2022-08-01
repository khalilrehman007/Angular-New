import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { Options } from '@angular-slider/ngx-slider';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'buy-search',
  templateUrl: './buySearch.component.html',
  styleUrls: ['./buySearch.component.scss']
})
export class BuySearchComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute,private service:AppService,private api: AppService,private route:Router) {
    // this.data.rentalTypeId = 1
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

  propertyCategory :any;
  // rent(){
  residentialfun1(id:any){
    this.propertyCategory = id
    document.getElementsByClassName('residential1')[0].classList.add('active');
    document.getElementsByClassName('commertial1')[0].classList.remove('active');
    document.getElementsByClassName('residential-tabs1')[0].classList.remove('hide');
    document.getElementsByClassName('commertial-tabs1')[0].classList.add('hide');
  }
  // sell(){
  commertialfun1(id:any){
    this.propertyCategory = id
    document.getElementsByClassName('residential1')[0].classList.remove('active');
    document.getElementsByClassName('commertial1')[0].classList.add('active');
    document.getElementsByClassName('residential-tabs1')[0].classList.add('hide');
    document.getElementsByClassName('commertial-tabs1')[0].classList.remove('hide');
  }

  getPropertyType(e: number) {
    this.data.PropertyTypeListingId = e;
  }

  getPropertyCommercialType(e: number) {
    this.data.PropertyTypeListingId = e;
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
    PriceStart1 : new FormControl(""),
    PriceStart2 : new FormControl(""),
    PriceEnd : new FormControl(""),
    PriceEnd1 : new FormControl(""),
    PriceEnd2 : new FormControl(""),
  });

  proceedSearch(){
    // this.SubmitForm.value.Name
    // this.data.rentalTypeId
    console.log(this.propertyCategory,'CategoryId')
    console.log(this.data.rentalTypeId,'rentalTypeId')
    console.log(this.data.PropertyTypeListingId,'PropertyTypeListingId')
    console.log(this.SubmitForm.value)

    this.route.navigate(['/search'],
      {queryParams:{type:'Buy',PropertyCategoryId:this.propertyCategory,RentTypeId:this.data.rentalTypeId,PropertyTypeListingId:this.data.PropertyTypeListingId
          ,PropertyAddress:this.SubmitForm.value.Name,PriceStart:this.SubmitForm.value.PriceStart,PriceStart1:this.SubmitForm.value.PriceStart1,PriceStart2:this.SubmitForm.value.PriceStart2,PriceEnd:this.SubmitForm.value.PriceEnd,PriceEnd1:this.SubmitForm.value.PriceEnd1,PriceEnd2:this.SubmitForm.value.PriceEnd2}})
  }
}
