import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { Options } from '@angular-slider/ngx-slider';
@Component({
  selector: 'comercial-search',
  templateUrl: './comercialSearch.component.html',
  styleUrls: ['./comercialSearch.component.scss']
})
export class ComercialSearchComponent implements OnInit {

  constructor(private service:AppService) {
  }

  ngOnInit(): void {
  }
  minValue: number = 100;
  maxValue: number = 400;
  step: 10;
  enforceStep: false;
  enforceRange: false;
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
  buy(){
    document.getElementsByClassName('buytablink')[0].classList.add('active');
    document.getElementsByClassName('rentlink')[0].classList.remove('active');
    document.getElementsByClassName('buytab')[0].classList.remove('hide');
    document.getElementsByClassName('renttab')[0].classList.add('hide');
  }
  rent(){
    document.getElementsByClassName('buytablink')[0].classList.remove('active');
    document.getElementsByClassName('rentlink')[0].classList.add('active');
    document.getElementsByClassName('buytab')[0].classList.add('hide');
    document.getElementsByClassName('renttab')[0].classList.remove('hide');
  }
}
