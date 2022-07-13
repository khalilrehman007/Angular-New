import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../../second-header/second-header.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as $ from 'jquery';
import {AuthService} from "../../../../service/auth.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../../../service/notification.service";

@Component({
  selector: 'app-rent-commertial',
  templateUrl: './rent-commertial.component.html',
  styleUrls: ['./rent-commertial.component.scss']
})
export class RentCommertialComponent implements OnInit {
  plus= '../../../../../assets/images/plus.svg'

  messageclass = ''
  message = ''
  Customerid: any;
  editdata: any;
  submitted = false;
  responsedata: any;
  oldData :any;
  priviousFormCheck :any;
  data: any = {};

  constructor(private service: AuthService,private route:Router,private notifyService : NotificationService) {
    this.getOldFormData();
    this.priviousFormCheck = localStorage.getItem('property_info');
    if(this.priviousFormCheck == '' || this.priviousFormCheck == null){
      this.priviousFormCheck = JSON.parse(this.priviousFormCheck);
      this.route.navigate(['listingproperty'])
    }else{
      this.priviousFormCheck = JSON.parse(this.priviousFormCheck);
    }
  }

  getOldFormData(){
    this.oldData = localStorage.getItem('listpropertyinfo_rent_comercial');
    if(this.oldData != '' && this.oldData != null){
      this.oldData = JSON.parse(this.oldData);
      this.SubmitForm.controls.property_studio.setValue(this.oldData.propertyType.property_studio);
      this.SubmitForm.controls.property_apartment.setValue(this.oldData.propertyType.property_apartment);
      this.SubmitForm.controls.property_villa.setValue(this.oldData.propertyType.property_villa);
      this.SubmitForm.controls.property_townHouse.setValue(this.oldData.propertyType.property_townHouse);
      this.SubmitForm.controls.property_penthouse.setValue(this.oldData.propertyType.property_penthouse);
      this.SubmitForm.controls.property_compound.setValue(this.oldData.propertyType.property_compound);
      this.SubmitForm.controls.property_duplex.setValue(this.oldData.propertyType.property_duplex);
      this.SubmitForm.controls.property_fullFloor.setValue(this.oldData.propertyType.property_fullFloor);
      this.SubmitForm.controls.property_wholeBuilding.setValue(this.oldData.propertyType.property_wholeBuilding);
      this.SubmitForm.controls.property_bulkRentUnit.setValue(this.oldData.propertyType.property_bulkRentUnit);
      this.SubmitForm.controls.property_bungalow.setValue(this.oldData.propertyType.property_bungalow);
      this.SubmitForm.controls.property_hotelApartment.setValue(this.oldData.propertyType.property_hotelApartment);
      this.SubmitForm.controls.fitting_details.setValue(this.oldData.fitting_details);
      this.SubmitForm.controls.tenant_types.setValue(this.oldData.tenant_types);
      this.SubmitForm.controls.gender.setValue(this.oldData.gender);
      this.SubmitForm.controls.property_management.setValue(this.oldData.property_management);
      this.SubmitForm.controls.occupancy.setValue(this.oldData.occupancy);
      this.SubmitForm.controls.parking_space.setValue(this.oldData.parking_space);
      this.SubmitForm.controls.pets.setValue(this.oldData.petPolicy.pets);
      this.SubmitForm.controls.pet_cats_allowed.setValue(this.oldData.petPolicy.pet_cats_allowed);
      this.SubmitForm.controls.pet_small_dogs_allowed.setValue(this.oldData.petPolicy.pet_small_dogs_allowed);
      this.SubmitForm.controls.pet_big_dogs_allowed.setValue(this.oldData.petPolicy.pet_big_dogs_allowed);
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
      this.SubmitForm.controls.highlights_exclusive.setValue(this.oldData.highlights.highlights_exclusive);
      this.SubmitForm.controls.highlights_golfView.setValue(this.oldData.highlights.highlights_golfView);
      this.SubmitForm.controls.highlights_canalView.setValue(this.oldData.highlights.highlights_canalView);
      this.SubmitForm.controls.highlights_affordable.setValue(this.oldData.highlights.highlights_affordable);
      this.SubmitForm.controls.highlights_primeLocation.setValue(this.oldData.highlights.highlights_primeLocation);
      this.SubmitForm.controls.highlights_metro.setValue(this.oldData.highlights.highlights_metro);
      this.SubmitForm.controls.amenitites_ac.setValue(this.oldData.PropertyFeatures.amenitites_ac);
      this.SubmitForm.controls.amenitites_deckspace.setValue(this.oldData.PropertyFeatures.amenitites_deckspace);
      this.SubmitForm.controls.amenitites_petFriendly.setValue(this.oldData.PropertyFeatures.amenitites_petFriendly);
      this.SubmitForm.controls.amenitites_parkingspace.setValue(this.oldData.PropertyFeatures.amenitites_parkingspace);
      this.SubmitForm.controls.amenitites_poolspace.setValue(this.oldData.PropertyFeatures.amenitites_poolspace);
      this.SubmitForm.controls.amenitites_yardspace.setValue(this.oldData.PropertyFeatures.amenitites_yardspace);
      this.SubmitForm.controls.amenitites_freeWiFi.setValue(this.oldData.PropertyFeatures.amenitites_freeWiFi);
      this.SubmitForm.controls.amenitites_gymspace.setValue(this.oldData.PropertyFeatures.amenitites_gymspace);
      this.SubmitForm.controls.amenitites_hardwoodFloorspace.setValue(this.oldData.PropertyFeatures.amenitites_hardwoodFloorspace);
      this.SubmitForm.controls.amenitites_jacuzzi.setValue(this.oldData.PropertyFeatures.amenitites_jacuzzi);
      this.SubmitForm.controls.bedroom_1.setValue(this.oldData.bedrooms.bedroom_1);
      this.SubmitForm.controls.bedroom_2.setValue(this.oldData.bedrooms.bedroom_2);
      this.SubmitForm.controls.bedroom_3.setValue(this.oldData.bedrooms.bedroom_3);
      this.SubmitForm.controls.bedroom_4.setValue(this.oldData.bedrooms.bedroom_4);
      this.SubmitForm.controls.bedroom_5.setValue(this.oldData.bedrooms.bedroom_5);
      this.SubmitForm.controls.bedroom_6.setValue(this.oldData.bedrooms.bedroom_6);
      this.SubmitForm.controls.room_bathroom_1.setValue(this.oldData.bathrooms.room_bathroom_1);
      this.SubmitForm.controls.room_bathroom_2.setValue(this.oldData.bathrooms.room_bathroom_2);
      this.SubmitForm.controls.room_bathroom_3.setValue(this.oldData.bathrooms.room_bathroom_3);
    }
    return this.oldData;
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
    bedroom_1     : new FormControl("" ),
    bedroom_2     : new FormControl("" ),
    bedroom_3     : new FormControl("" ),
    bedroom_4     : new FormControl("", ),
    bedroom_5     : new FormControl("" ),
    bedroom_6     : new FormControl("" ),
    room_bathroom_1     : new FormControl("" ),
    room_bathroom_2    : new FormControl("" ),
    room_bathroom_3      : new FormControl("" ),
    // property_types      : new FormControl("" ),
    propertyManagement      : new FormControl("" ),
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
    rentType         : new FormControl("" ),
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

    let bathrooms: Array<any> = [
      {
        room_bathroom_1: this.SubmitForm.value.room_bathroom_1,
        room_bathroom_2: this.SubmitForm.value.room_bathroom_2,
        room_bathroom_3: this.SubmitForm.value.room_bathroom_3,
      },
    ];

    let bedrooms: Array<any> = [
      {
        bedroom_1: this.SubmitForm.value.bedroom_1,
        bedroom_2: this.SubmitForm.value.bedroom_2,
        bedroom_3: this.SubmitForm.value.bedroom_3,
        bedroom_4: this.SubmitForm.value.bedroom_4,
        bedroom_5: this.SubmitForm.value.bedroom_5,
        bedroom_6: this.SubmitForm.value.bedroom_6,
      },
    ];

    let propertyType: Array<any> = [
      {
        property_studio: this.SubmitForm.value.property_studio,
        property_apartment: this.SubmitForm.value.property_apartment,
        property_villa: this.SubmitForm.value.property_villa,
        property_townHouse: this.SubmitForm.value.property_townHouse,
        property_penthouse: this.SubmitForm.value.property_penthouse,
        property_compound: this.SubmitForm.value.property_compound,
        property_duplex: this.SubmitForm.value.property_duplex,
        property_fullFloor: this.SubmitForm.value.property_fullFloor,
        property_wholeBuilding: this.SubmitForm.value.property_wholeBuilding,
        property_bulkRentUnit: this.SubmitForm.value.property_bulkRentUnit,
        property_bungalow: this.SubmitForm.value.property_bungalow,
        property_hotelApartment: this.SubmitForm.value.property_hotelApartment,
      },
    ];

    let PropertyFeatures: Array<any> = [
      {
        amenitites_ac: this.SubmitForm.value.amenitites_ac,
        amenitites_deckspace: this.SubmitForm.value.amenitites_deckspace,
        amenitites_petFriendly: this.SubmitForm.value.amenitites_petFriendly,
        amenitites_parkingspace: this.SubmitForm.value.amenitites_parkingspace,
        amenitites_poolspace: this.SubmitForm.value.amenitites_poolspace,
        amenitites_freeWiFi: this.SubmitForm.value.amenitites_freeWiFi,
        amenitites_gymspace: this.SubmitForm.value.amenitites_gymspace,
        amenitites_hardwoodFloorspace: this.SubmitForm.value.amenitites_hardwoodFloorspace,
        amenitites_jacuzzi: this.SubmitForm.value.amenitites_jacuzzi,
      },
    ];

    let highlights: Array<any> = [
      {
        highlights_exclusive: this.SubmitForm.value.highlights_exclusive,
        highlights_golfView: this.SubmitForm.value.highlights_golfView,
        highlights_canalView: this.SubmitForm.value.highlights_canalView,
        highlights_affordable: this.SubmitForm.value.highlights_affordable,
        highlights_vastuComplaint: this.SubmitForm.value.highlights_vastuComplaint,
        highlights_primeLocation: this.SubmitForm.value.highlights_primeLocation,
        highlights_metro: this.SubmitForm.value.highlights_metro
      },
    ];

    let petPolicy: Array<any> = [
      {
        pets: this.SubmitForm.value.pets,
        pet_cats_allowed: this.SubmitForm.value.pet_cats_allowed,
        pet_small_dogs_allowed: this.SubmitForm.value.pet_small_dogs_allowed,
      },
    ];

    this.data.highlights = highlights[0];
    this.data.PropertyFeatures = PropertyFeatures[0];
    this.data.propertyType = propertyType[0];
    this.data.bedrooms = bedrooms[0];
    this.data.bathrooms = bathrooms[0];
    // this.data.property_types = this.SubmitForm.value.property_types;
    this.data.fitting_details = this.SubmitForm.value.fitting_details;
    this.data.tenant_types = this.SubmitForm.value.tenant_types;
    this.data.gender = this.SubmitForm.value.gender;
    this.data.property_management = this.SubmitForm.value.property_management;
    this.data.occupancy = this.SubmitForm.value.occupancy;
    this.data.parking_space = this.SubmitForm.value.parking_space;
    this.data.parking_space = this.SubmitForm.value.parking_space;
    this.data.parking_space = this.SubmitForm.value.parking_space;
    this.data.parking_space = this.SubmitForm.value.parking_space;
    this.data.petPolicy = petPolicy[0];
    this.data.carpetArea = this.SubmitForm.value.carpetArea;
    this.data.buildupArea = this.SubmitForm.value.buildupArea;
    this.data.price = this.SubmitForm.value.price;
    this.data.building_type_monthly = this.SubmitForm.value.building_type_monthly;
    this.data.building_type_yearly = this.SubmitForm.value.building_type_yearly;
    this.data.securoty_deposit = this.SubmitForm.value.securoty_deposit;
    this.data.securoty_deposit = this.SubmitForm.value.securoty_deposit;
    this.data.AED = this.SubmitForm.value.AED;
    this.data.securityNegotiable = this.SubmitForm.value.securityNegotiable;
    this.data.brokerage_value = this.SubmitForm.value.brokerage_value;
    this.data.brokerageAed = this.SubmitForm.value.brokerageAed;
    this.data.brokerageNegotiable = this.SubmitForm.value.brokerageNegotiable;
    this.data.brokerageAed = this.SubmitForm.value.brokerageAed;
    this.data.brokerageNegotiable = this.SubmitForm.value.brokerageNegotiable;
    this.data.availablefrom = this.SubmitForm.value.availablefrom;
    this.data.noticePeriod = this.SubmitForm.value.noticePeriod;
    this.data.propertyDescription = this.SubmitForm.value.propertyDescription;
    this.data.highlights_exclusive = this.SubmitForm.value.highlights_exclusive;



    localStorage.setItem('listpropertyinfo_rent_comercial',JSON.stringify(this.data))
    this.route.navigate(['listpropertymedia'])
    // console.log(this.SubmitForm.value)
  }

}
