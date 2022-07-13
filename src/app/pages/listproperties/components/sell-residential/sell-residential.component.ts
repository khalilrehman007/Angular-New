import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../../second-header/second-header.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as $ from 'jquery';
import {AuthService} from "../../../../service/auth.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../../../service/notification.service";

@Component({
  selector: 'app-sell-residential',
  templateUrl: './sell-residential.component.html',
  styleUrls: ['./sell-residential.component.scss']
})
export class SellResidentialComponent implements OnInit {
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
      this.priviousFormCheck = JSON.parse(this.priviousFormCheck);
      this.route.navigate(['listingproperty'])
    }else {
      this.priviousFormCheck = JSON.parse(this.priviousFormCheck);
    }
  }

  getOldFormData(){
    this.oldData = localStorage.getItem('listpropertyinfo_sell_residential');
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
      this.SubmitForm.controls.fitting_details.setValue(this.oldData.fitting_details);
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
      this.SubmitForm.controls.bedroom_1.setValue(this.oldData.bedroom_1);
      this.SubmitForm.controls.bedroom_2.setValue(this.oldData.bedroom_2);
      this.SubmitForm.controls.bedroom_3.setValue(this.oldData.bedroom_3);
      this.SubmitForm.controls.room_bathroom_1.setValue(this.oldData.room_bathroom_1);
      this.SubmitForm.controls.room_bathroom_2.setValue(this.oldData.room_bathroom_2);
      this.SubmitForm.controls.room_bathroom_3.setValue(this.oldData.room_bathroom_3);
      this.SubmitForm.controls.room_bathroom_3.setValue(this.oldData.room_bathroom_3);
      this.SubmitForm.controls.balcony_0.setValue(this.oldData.balcony_0);
      this.SubmitForm.controls.balcony_1.setValue(this.oldData.balcony_1);
      this.SubmitForm.controls.balcony_2.setValue(this.oldData.balcony_2);
      this.SubmitForm.controls.balcony_3.setValue(this.oldData.balcony_3);
      this.SubmitForm.controls.balcony_4.setValue(this.oldData.balcony_4);
      this.SubmitForm.controls.balcony_4_plus.setValue(this.oldData.balcony_4_plus);
      this.SubmitForm.controls.parking_space_0.setValue(this.oldData.parking_space_0);
      this.SubmitForm.controls.parking_space_1.setValue(this.oldData.parking_space_1);
      this.SubmitForm.controls.parking_space_2.setValue(this.oldData.parking_space_2);
      this.SubmitForm.controls.parking_space_3.setValue(this.oldData.parking_space_3);
      this.SubmitForm.controls.parking_space_4.setValue(this.oldData.parking_space_4);
      this.SubmitForm.controls.parking_space_4_plus.setValue(this.oldData.parking_space_4_plus);
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
    bedroom_1     : new FormControl("" ),
    bedroom_2     : new FormControl("" ),
    bedroom_3     : new FormControl("" ),
    room_bathroom_1     : new FormControl("" ),
    room_bathroom_2     : new FormControl("" ),
    room_bathroom_3     : new FormControl("" ),
    balcony_0     : new FormControl("" ),
    balcony_1     : new FormControl("" ),
    balcony_2     : new FormControl("" ),
    balcony_3     : new FormControl("" ),
    balcony_4     : new FormControl("" ),
    balcony_4_plus: new FormControl("" ),
    parking_space_0     : new FormControl("" ),
    parking_space_1     : new FormControl("" ),
    parking_space_2     : new FormControl("" ),
    parking_space_3     : new FormControl("" ),
    parking_space_4     : new FormControl("" ),
    parking_space_4_plus: new FormControl("" ),
    property_types      : new FormControl("" ),
    fitting_details     : new FormControl("" ),
    carpetArea          : new FormControl("" ),
    buildupArea         : new FormControl("" ),
    transactionType     : new FormControl("" ),
    completionDetails   : new FormControl("" ),
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
    localStorage.setItem('listpropertyinfo_sell_residential',JSON.stringify(this.SubmitForm.value))
    this.route.navigate(['listpropertymedia'])
    // console.log(this.SubmitForm.value)
  }

}
