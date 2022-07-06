import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as $ from 'jquery';
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../../service/notification.service";

@Component({
  selector: 'app-listpropertyinfo',
  templateUrl: './listpropertyinfo.component.html',
  styleUrls: ['./listpropertyinfo.component.scss']
})
export class ListpropertyinfoComponent implements OnInit {
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
  messageclass = ''
  message = ''
  Customerid: any;
  editdata: any;
  submitted = false;
  responsedata: any;

  constructor(private service: AuthService,private route:Router,private notifyService : NotificationService) {
  }
  ngOnInit() {
    $(document).ready(function(){
      $('.dropdown-toggle').click(function(){
      $(this).next().toggleClass('active');
      });
  });
  }


  SubmitForm = new FormGroup({
    property_studio     : new FormControl(""),
    property_apartment     : new FormControl(""),
    property_villa         : new FormControl(""),
    property_townHouse     : new FormControl("" ),
    property_penthouse     : new FormControl("" ),
    property_compound      : new FormControl("" ),
    property_duplex        : new FormControl("" ),
    property_fullFloor     : new FormControl("" ),
    property_wholeBuilding : new FormControl("" ),
    property_bulkRentUnit  : new FormControl("" ),
    property_bungalow      : new FormControl("", ),
    property_hotelApartment: new FormControl("" ),
    bedroom_BHK_1     : new FormControl("" ),
    bedroom_BHK_2     : new FormControl("" ),
    bedroom_BHK_3     : new FormControl("" ),
    bedroom_BHK_4     : new FormControl("", ),
    bedroom_BHK_5     : new FormControl("" ),
    bedroom_BHK_6     : new FormControl("" ),
    bedroom_BHK_7     : new FormControl("" ),
    bedroom_BHK_8     : new FormControl("" ),
    room_privateBathroom     : new FormControl("" ),
    room_attachedBathroom    : new FormControl("" ),
    room_sharedBathroom      : new FormControl("" ),
    property_types      : new FormControl("" ),
    fitting_details     : new FormControl("" ),
    tenant_types        : new FormControl("" ),
    gender              : new FormControl("" ),
    property_management : new FormControl("" ),
    occupancy     : new FormControl("" ),
    parking_space : new FormControl("" ),
    pets          : new FormControl("" ),
    pet_cats_allowed          : new FormControl("" ),
    pet_small_dogs_allowed          : new FormControl("" ),
    pet_big_dogs_allowed          : new FormControl("" ),
    carpetArea    : new FormControl("" ),
    buildupArea   : new FormControl("" ),
    price         : new FormControl("" ),
    building_type_monthly : new FormControl("" ),
    building_type_quaterly : new FormControl("" ),
    building_type_yearly : new FormControl("" ),
    securoty_deposit  : new FormControl("" ),
    AED               : new FormControl("" ),
    securityNegotiable : new FormControl("" ),
    brokerage_value    : new FormControl("" ),
    brokerageAed    : new FormControl("" ),
    brokerageNegotiable: new FormControl("" ),
    availablefrom       : new FormControl("" ),
    noticePeriod        : new FormControl(""),
    lockingPeriod       : new FormControl("" ),
    propertyDescription : new FormControl("" ),
    propertyOffers      : new FormControl("" ),
    highlights_exclusive     : new FormControl("" ),
    highlights_golfView      : new FormControl("" ),
    highlights_canalView     : new FormControl("" ),
    highlights_affordable    : new FormControl("" ),
    highlights_vastuComplaint     : new FormControl("" ),
    highlights_primeLocation      : new FormControl("" ),
    highlights_metro              : new FormControl("" ),
    amenitites_ac               : new FormControl("" ),
    amenitites_deckspace          : new FormControl("" ),
    amenitites_petFriendly        : new FormControl("" ),
    amenitites_parkingspace       : new FormControl("" ),
    amenitites_poolspace          : new FormControl("" ),
    amenitites_yardspace          : new FormControl("" ),
    amenitites_freeWiFi           : new FormControl("" ),
    amenitites_gymspace           : new FormControl("" ),
    amenitites_hardwoodFloorspace : new FormControl("" ),
    amenitites_jacuzzi           : new FormControl("" ),
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

    localStorage.setItem('listpropertyinfo_rent_residential',JSON.stringify(this.SubmitForm.value))
    this.route.navigate(['listpropertymedia'])
    // console.log(this.SubmitForm.value)
  }


}
