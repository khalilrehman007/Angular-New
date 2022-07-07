import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../../service/notification.service";

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
  messageclass = ''
  message = ''
  Customerid: any;
  editdata: any;
  submitted = false;
  responsedata: any;
  oldData :any;

  constructor(private service: AuthService,private route:Router,private notifyService : NotificationService) {
    this.getOldFormData();
  }
  ngOnInit(): void {
  }

  getOldFormData(){
    this.oldData = localStorage.getItem('property_info');
    if(this.oldData != '' && this.oldData != null){
      this.oldData = JSON.parse(this.oldData);
      this.SubmitForm.controls.CountryId.setValue(this.oldData.CountryId);
      this.SubmitForm.controls.CityId.setValue(this.oldData.CityId);
      this.SubmitForm.controls.PropertyAge.setValue(this.oldData.PropertyAge);
      this.SubmitForm.controls.BuildingName.setValue(this.oldData.BuildingName);
      this.SubmitForm.controls.UnitNo.setValue(this.oldData.UnitNo);
      this.SubmitForm.controls.TotalFloor.setValue(this.oldData.TotalFloor);
      this.SubmitForm.controls.FloorNo.setValue(this.oldData.FloorNo);
      this.SubmitForm.controls.address.setValue(this.oldData.address);
    }
    return this.oldData;
  }
  SubmitForm = new FormGroup({
    CountryId   : new FormControl("", Validators.required),
    CityId      : new FormControl("", Validators.required),
    PropertyAge : new FormControl("", Validators.required),
    BuildingName: new FormControl("", Validators.required),
    UnitNo      : new FormControl("", Validators.required),
    TotalFloor  : new FormControl("", Validators.required),
    FloorNo     : new FormControl("", Validators.required),
    address     : new FormControl("", Validators.required),
  });


  get validate(){
    return this.SubmitForm.controls;
  }
  onSubmit() {
    // localStorage.removeItem("listpropertyinfo");
    this.submitted = true;
    if (this.SubmitForm.invalid) {
      return;
    }
    localStorage.setItem('property_info',JSON.stringify(this.SubmitForm.value))
    this.route.navigate(['listpropertyinfo'])
    // console.log(this.SubmitForm.value)
  }

}
