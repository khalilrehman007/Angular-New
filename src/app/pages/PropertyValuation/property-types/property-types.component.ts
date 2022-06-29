import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-property-types',
  templateUrl: './property-types.component.html',
  styleUrls: ['./property-types.component.scss']
})
export class PropertyTypesComponent implements OnInit {
  plus= '../../../../assets/images/plus.svg'
  country = [
    {viewValue: 'India',value: 'india'},
    {viewValue: 'UAE',value: 'UAE'},
    {viewValue: 'America',value: 'America'},
  ];
  city = [
    {viewValue: 'India',value: 'india'},
    {viewValue: 'UAE',value: 'UAE'},
    {viewValue: 'America',value: 'America'},
  ];
  bedrooms = [
    {viewValue: '01',value: 'bedroom'},
    {viewValue: '02',value: 'bedroom'},
    {viewValue: '03',value: 'bedroom'},
  ];
  bathroom = [
    {viewValue: '01',value: 'bedroom'},
    {viewValue: '02',value: 'bedroom'},
    {viewValue: '03',value: 'bedroom'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
