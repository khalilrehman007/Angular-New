import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {
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
  district = [
    {viewValue: 'India',value: 'india'},
    {viewValue: 'UAE',value: 'UAE'},
    {viewValue: 'America',value: 'America'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
