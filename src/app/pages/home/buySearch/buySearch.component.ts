import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'buy-search',
  templateUrl: './buySearch.component.html',
  styleUrls: ['./buySearch.component.scss']
})
export class BuySearchComponent implements OnInit {

  constructor(private service:AppService,private api: AppService) {
    this.api.LoadType(1).subscribe((result) => {
      this.propertyType = result;
      this.propertyType = this.propertyType.data
    });
    this.api.LoadType(2).subscribe((result) => {
      this.propertyTypeCommercial = result;
      this.propertyTypeCommercial = this.propertyTypeCommercial.data
    });
  }

  ngOnInit(): void {
  }
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
  residentialfun1(){
    document.getElementsByClassName('residential1')[0].classList.add('active');
    document.getElementsByClassName('commertial1')[0].classList.remove('active');
    document.getElementsByClassName('residential1-tabs')[0].classList.remove('hide');
    document.getElementsByClassName('commertial1-tabs')[0].classList.add('hide');
  }
  commertialfun1(){
    document.getElementsByClassName('residential1')[0].classList.remove('active');
    document.getElementsByClassName('commertial1')[0].classList.add('active');
    document.getElementsByClassName('residential1-tabs')[0].classList.add('hide');
    document.getElementsByClassName('commertial1-tabs')[0].classList.remove('hide');
  }
  getPropertyType(e: number) {
    this.data.PropertyTypeId = e;
  }
  getPropertyCommercialType(e: number) {
    this.data.PropertyTypeId = e;
  }
}
