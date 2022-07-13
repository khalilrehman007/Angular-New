import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import {FormControl, Validators} from '@angular/forms';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-property-types',
  templateUrl: './property-types.component.html',
  styleUrls: ['./property-types.component.scss']
})
export class PropertyTypesComponent implements OnInit {
  plus= '../../../../assets/images/plus.svg';
  propertyData:any;
  typeSelected:boolean = false;
  propertyType:any = [];
  purposeOfValuation:any = [];
  statusData:number = 0;
  featuresData:any;
  propertyUnits:any;
  room = [
    {viewValue: '01',value: '01'},
    {viewValue: '02',value: '02'},
    {viewValue: '03',value: '03'},
    {viewValue: '04',value: '04'},
    {viewValue: '05',value: '05'},
    {viewValue: '06',value: '06'},
    {viewValue: '07',value: '07'},
    {viewValue: '08',value: '08'},
    {viewValue: '09',value: '09'},
    {viewValue: '10',value: '10'},
  ];
  constructor(private service: AppService,) {
  }

  ngOnInit(): void {
    this.service.PropertyUnitTypes().subscribe((result:any)=>{
      this.propertyUnits = result.data;
    })
  }

  loadType(e:number) {
    this.typeSelected = false;
    this.propertyType = [];
    this.service.LoadType(e).subscribe((result)=> {
      this.propertyType = result;
      this.propertyType = this.propertyType.data
    })
  }
  valuationPurpose(e:any) {
    this.purposeOfValuation = [];
    this.featuresData = [];
    this.propertyData = this.propertyType.filter(item => item.id == e.value)[0];
    // console.log(this.propertyData);
    this.service.ValuationPurpose().subscribe((result)=>{
      this.purposeOfValuation = result;
      this.purposeOfValuation = this.purposeOfValuation.data;
    });
    this.service.PropertyFeatures(this.propertyData.id).subscribe((result:any)=> {
      this.featuresData = result.data;
    })
    this.typeSelected = true;
  }
  propertyStatus(id:any) {
  }
  addUnits(e:any) {
    console.log(document.getElementById("unitWrapper")?.getElementsByClassName("row"));
  }
}
