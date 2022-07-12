import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../../second-header/second-header.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as $ from 'jquery';
import {AuthService} from "../../../../service/auth.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../../../service/notification.service";

@Component({
  selector: 'app-sell-commertial',
  templateUrl: './sell-commertial.component.html',
  styleUrls: ['./sell-commertial.component.scss']
})
export class SellCommertialComponent implements OnInit {
  plus= '../../../../../assets/images/plus.svg'

  messageclass = ''
  message = ''
  Customerid: any;
  editdata: any;
  submitted = false;
  responsedata: any;
  oldData :any;
  priviousFormCheck :any;


  constructor(private service: AuthService,private route:Router,private notifyService : NotificationService) {
    this.getOldFormData();
    this.priviousFormCheck = localStorage.getItem('property_info');
    if(this.priviousFormCheck == '' || this.priviousFormCheck == null){
      this.route.navigate(['listingproperty'])
    }
  }
  getOldFormData(){
    this.oldData = localStorage.getItem('listpropertyinfo_sell_commercial');
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
      this.SubmitForm.controls.carpetArea.setValue(this.oldData.carpetArea);
      this.SubmitForm.controls.buildupArea.setValue(this.oldData.buildupArea);
      this.SubmitForm.controls.price.setValue(this.oldData.price);
      this.SubmitForm.controls.brokerageAed.setValue(this.oldData.brokerageAed);
      this.SubmitForm.controls.brokerageNegotiable.setValue(this.oldData.brokerageNegotiable);
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


  ngOnInit() {
    $(document).ready(function(){
      $('.dropdown-toggle').click(function(){
      $(this).next().toggleClass('active');
      });
  });
  }


  SubmitForm = new FormGroup({
    property_studio        : new FormControl(""),
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
    suitable_1     : new FormControl("" ),
    suitable_2     : new FormControl("" ),
    suitable_3     : new FormControl("" ),
    location_1     : new FormControl("" ),
    location_2     : new FormControl("" ),
    location_3     : new FormControl("" ),
    locatedNear    : new FormControl("" ),
    ownershipType  : new FormControl("" ),
    carpetArea          : new FormControl("" ),
    buildupArea         : new FormControl("" ),
    transactionType     : new FormControl("" ),
    completionStatus     : new FormControl("" ),
    price               : new FormControl("" ),
    maintenanceCharge   : new FormControl("" ),
    brokerageAed        : new FormControl("" ),
    brokerageNegotiable : new FormControl("" ),
    brokerage           : new FormControl("" ),
    handover            : new FormControl("" ),
    propertyDescription : new FormControl("" ),
    propertyOffers      : new FormControl("" ),
    highlights_exclusive     : new FormControl("" ),
    highlights_golfView      : new FormControl("" ),
    highlights_canalView     : new FormControl("" ),
    highlights_affordable    : new FormControl("" ),
    highlights_vastuComplaint     : new FormControl("" ),
    highlights_primeLocation      : new FormControl("" ),
    highlights_metro              : new FormControl("" ),
    amenitites_ac                 : new FormControl("" ),
    amenitites_deckspace          : new FormControl("" ),
    amenitites_petFriendly        : new FormControl("" ),
    amenitites_parkingspace       : new FormControl("" ),
    amenitites_poolspace          : new FormControl("" ),
    amenitites_yardspace          : new FormControl("" ),
    amenitites_freeWiFi           : new FormControl("" ),
    amenitites_gymspace           : new FormControl("" ),
    amenitites_hardwoodFloorspace : new FormControl("" ),
    amenitites_jacuzzi            : new FormControl("" ),

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
    // console.log(this.SubmitForm.value)
    localStorage.setItem('listpropertyinfo_sell_commercial',JSON.stringify(this.SubmitForm.value))
    this.route.navigate(['listpropertymedia'])
    // console.log(this.SubmitForm.value)
  }

}
