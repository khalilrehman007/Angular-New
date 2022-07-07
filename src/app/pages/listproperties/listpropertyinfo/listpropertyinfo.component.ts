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
  oldData :any;

  constructor(private service: AuthService,private route:Router,private notifyService : NotificationService) {
    this.getOldFormData();
  }
  ngOnInit() {
    $(document).ready(function(){
      $('.dropdown-toggle').click(function(){
      $(this).next().toggleClass('active');
      });
  });
  }
  getOldFormData(){
    this.oldData = localStorage.getItem('listpropertyinfo_rent_residential');
    if(this.oldData != '' && this.oldData != null){
      this.oldData = JSON.parse(this.oldData);
      this.SubmitForm.controls.property_studio.setValue(this.oldData.property_studio);
      this.SubmitForm.controls.property_apartment.setValue(this.oldData.property_apartment);
      this.SubmitForm.controls.property_villa.setValue(this.oldData.property_villa);
      this.SubmitForm.controls.property_townHouse.setValue(this.oldData.property_townHouse);
      this.SubmitForm.controls.property_penthouse.setValue(this.oldData.property_penthouse);
      this.SubmitForm.controls.property_compound.setValue(this.oldData.property_compound);
      this.SubmitForm.controls.property_duplex.setValue(this.oldData.property_duplex);
      this.SubmitForm.controls.property_fullFloor.setValue(this.oldData.property_fullFloor);
      this.SubmitForm.controls.property_wholeBuilding.setValue(this.oldData.property_wholeBuilding);
      this.SubmitForm.controls.property_bulkRentUnit.setValue(this.oldData.property_bulkRentUnit);
      this.SubmitForm.controls.property_bungalow.setValue(this.oldData.property_bungalow);
      this.SubmitForm.controls.property_hotelApartment.setValue(this.oldData.property_hotelApartment);
      this.SubmitForm.controls.bedroom_BHK_1.setValue(this.oldData.bedroom_BHK_1);
      this.SubmitForm.controls.bedroom_BHK_2.setValue(this.oldData.bedroom_BHK_2);
      this.SubmitForm.controls.bedroom_BHK_3.setValue(this.oldData.bedroom_BHK_3);
      this.SubmitForm.controls.bedroom_BHK_4.setValue(this.oldData.bedroom_BHK_4);
      this.SubmitForm.controls.bedroom_BHK_5.setValue(this.oldData.bedroom_BHK_5);
      this.SubmitForm.controls.bedroom_BHK_6.setValue(this.oldData.bedroom_BHK_6);
      this.SubmitForm.controls.bedroom_BHK_7.setValue(this.oldData.bedroom_BHK_7);
      this.SubmitForm.controls.bedroom_BHK_8.setValue(this.oldData.bedroom_BHK_8);
      this.SubmitForm.controls.room_privateBathroom.setValue(this.oldData.room_privateBathroom);
      this.SubmitForm.controls.room_attachedBathroom.setValue(this.oldData.room_attachedBathroom);
      this.SubmitForm.controls.room_sharedBathroom.setValue(this.oldData.room_sharedBathroom);
      this.SubmitForm.controls.property_types.setValue(this.oldData.property_types);
      this.SubmitForm.controls.fitting_details.setValue(this.oldData.fitting_details);
      this.SubmitForm.controls.tenant_types.setValue(this.oldData.tenant_types);
      this.SubmitForm.controls.gender.setValue(this.oldData.gender);
      this.SubmitForm.controls.property_management.setValue(this.oldData.property_management);
      this.SubmitForm.controls.occupancy.setValue(this.oldData.occupancy);
      this.SubmitForm.controls.parking_space.setValue(this.oldData.parking_space);
      this.SubmitForm.controls.pets.setValue(this.oldData.pets);
      this.SubmitForm.controls.pet_cats_allowed.setValue(this.oldData.pet_cats_allowed);
      this.SubmitForm.controls.pet_small_dogs_allowed.setValue(this.oldData.pet_small_dogs_allowed);
      this.SubmitForm.controls.pet_big_dogs_allowed.setValue(this.oldData.pet_big_dogs_allowed);
      this.SubmitForm.controls.carpetArea.setValue(this.oldData.carpetArea);
      this.SubmitForm.controls.buildupArea.setValue(this.oldData.buildupArea);
      this.SubmitForm.controls.price.setValue(this.oldData.price);
      this.SubmitForm.controls.building_type_monthly.setValue(this.oldData.building_type_monthly);
      this.SubmitForm.controls.building_type_quaterly.setValue(this.oldData.building_type_quaterly);
      this.SubmitForm.controls.building_type_yearly.setValue(this.oldData.building_type_yearly);
      this.SubmitForm.controls.securoty_deposit.setValue(this.oldData.securoty_deposit);
      this.SubmitForm.controls.AED.setValue(this.oldData.AED);
      this.SubmitForm.controls.securityNegotiable.setValue(this.oldData.securityNegotiable);
      this.SubmitForm.controls.brokerage_value.setValue(this.oldData.brokerage_value);
      this.SubmitForm.controls.brokerageAed.setValue(this.oldData.brokerageAed);
      this.SubmitForm.controls.brokerageNegotiable.setValue(this.oldData.brokerageNegotiable);
      this.SubmitForm.controls.availablefrom.setValue(this.oldData.availablefrom);
      this.SubmitForm.controls.noticePeriod.setValue(this.oldData.noticePeriod);
      this.SubmitForm.controls.lockingPeriod.setValue(this.oldData.lockingPeriod);
      this.SubmitForm.controls.propertyDescription.setValue(this.oldData.propertyDescription);
      this.SubmitForm.controls.propertyOffers.setValue(this.oldData.propertyOffers);
      this.SubmitForm.controls.highlights_exclusive.setValue(this.oldData.highlights_exclusive);
      this.SubmitForm.controls.highlights_golfView.setValue(this.oldData.highlights_golfView);
      this.SubmitForm.controls.highlights_canalView.setValue(this.oldData.highlights_canalView);
      this.SubmitForm.controls.highlights_affordable.setValue(this.oldData.highlights_affordable);
      this.SubmitForm.controls.highlights_primeLocation.setValue(this.oldData.highlights_primeLocation);
      this.SubmitForm.controls.highlights_metro.setValue(this.oldData.highlights_metro);
      this.SubmitForm.controls.amenitites_ac.setValue(this.oldData.amenitites_ac);
      this.SubmitForm.controls.amenitites_deckspace.setValue(this.oldData.amenitites_deckspace);
      this.SubmitForm.controls.amenitites_petFriendly.setValue(this.oldData.amenitites_petFriendly);
      this.SubmitForm.controls.amenitites_parkingspace.setValue(this.oldData.amenitites_parkingspace);
      this.SubmitForm.controls.amenitites_poolspace.setValue(this.oldData.amenitites_poolspace);
      this.SubmitForm.controls.amenitites_yardspace.setValue(this.oldData.amenitites_yardspace);
      this.SubmitForm.controls.amenitites_freeWiFi.setValue(this.oldData.amenitites_freeWiFi);
      this.SubmitForm.controls.amenitites_gymspace.setValue(this.oldData.amenitites_gymspace);
      this.SubmitForm.controls.amenitites_hardwoodFloorspace.setValue(this.oldData.amenitites_hardwoodFloorspace);
      this.SubmitForm.controls.amenitites_jacuzzi.setValue(this.oldData.amenitites_jacuzzi);
    }
    return this.oldData;
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
