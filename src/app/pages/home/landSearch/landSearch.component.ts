import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'land-search',
  templateUrl: './landSearch.component.html',
  styleUrls: ['./landSearch.component.scss']
})
export class LandSearchComponent implements OnInit {

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
}
