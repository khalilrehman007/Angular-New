import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { Options } from '@angular-slider/ngx-slider';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'rent-search',
  templateUrl: './rentSearch.component.html',
  styleUrls: ['./rentSearch.component.scss']
})
export class RentSearchComponent implements OnInit {

  constructor(private service:AppService,private api: AppService,private route:Router) {
    this.api.LoadType(1).subscribe((result) => {
      this.propertyType = result;
      this.propertyType = this.propertyType.data
    });

    this.service.RentTypes().subscribe(data=>{
      let response: any = data;
      this.Monthly    = response.data[0].name;
      this.MonthlyAr  = response.data[0].nameAr;
      this.Quarterly    = response.data[1].name;
      this.QuarterlyAr  = response.data[1].nameAr;
      this.Yearly    = response.data[2].name;
      this.YearlyAr  = response.data[3].nameAr;
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
  minValue: number = 100;
  maxValue: number = 400;
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
  minValue1: number = 100;
  maxValue1: number = 400;
  status: boolean = false;
  clickEvent(){
      this.status = !this.status;

  }
  status1: boolean = false;
  clickEvent1(){
      this.status1 = !this.status1;
  }
  // rent(){
  residentialfun1(){
    document.getElementsByClassName('residential')[0].classList.add('active');
    document.getElementsByClassName('commertial')[0].classList.remove('active');
    document.getElementsByClassName('residential-tabs')[0].classList.remove('hide');
    document.getElementsByClassName('commertial-tabs')[0].classList.add('hide');
  }
  // sell(){
  commertialfun1(){
    document.getElementsByClassName('residential')[0].classList.remove('active');
    document.getElementsByClassName('commertial')[0].classList.add('active');
    document.getElementsByClassName('residential-tabs')[0].classList.add('hide');
    document.getElementsByClassName('commertial-tabs')[0].classList.remove('hide');
  }

  getPropertyType(e: number) {
    this.data.PropertyTypeId = e;
  }

  getPropertyCommercialType(e: number) {
    this.data.PropertyTypeId = e;
  }

  getRentalType(e:any){
    if(e.tab.textLabel == "Rent"){
      this.data.rentalTypeId = 1;
    }else{
      this.data.rentalTypeId = 2;
    }
  }

  min :number;
  max :number;

  SubmitForm = new FormGroup({
    projectName : new FormControl(""),
    name : new FormControl(""),
  });

  proceedSearch(){
    this.route.navigate(['/search/rent'])
  }
}


