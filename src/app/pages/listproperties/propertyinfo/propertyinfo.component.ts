import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-propertyinfo',
  templateUrl: './propertyinfo.component.html',
  styleUrls: ['./propertyinfo.component.scss']
})
export class PropertyinfoComponent implements OnInit {
  Locate = '../../../../assets/images/icons/locate.svg'
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
  constructor() { }
  ngOnInit(): void {
  }

}
