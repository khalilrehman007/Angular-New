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
  data: any = {};


  constructor(private service: AuthService,private route:Router,private notifyService : NotificationService) {
    this.priviousFormCheck = localStorage.getItem('propertyData');
    if(this.priviousFormCheck == '' || this.priviousFormCheck == null){
      this.route.navigate(['listingproperty'])
    }else {
      this.data = JSON.parse(this.priviousFormCheck);
    }
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

    let balcony: Array<any> = [
      {
        balcony_0: this.SubmitForm.value.balcony_0,
        balcony_1: this.SubmitForm.value.balcony_1,
        balcony_2: this.SubmitForm.value.balcony_2,
        balcony_3: this.SubmitForm.value.balcony_3,
        balcony_4: this.SubmitForm.value.balcony_4,
        balcony_4_plus: this.SubmitForm.value.balcony_4_plus,
      },
    ];

    let parkingSpace: Array<any> = [
      {
        parking_space_0: this.SubmitForm.value.parking_space_0,
        parking_space_1: this.SubmitForm.value.parking_space_1,
        parking_space_2: this.SubmitForm.value.parking_space_2,
        parking_space_3: this.SubmitForm.value.parking_space_3,
        parking_space_4: this.SubmitForm.value.parking_space_4,
        parking_space_4_plus: this.SubmitForm.value.parking_space_4_plus,
      },
    ];

    this.data.highlights = highlights[0];
    this.data.PropertyFeatures = PropertyFeatures[0];
    this.data.propertyType = propertyType[0];
    this.data.bedrooms = bedrooms[0];
    this.data.bathrooms= bathrooms[0];
    this.data.balcony = balcony[0];
    this.data.balcony = balcony[0];
    this.data.parkingSpace = parkingSpace[0];
    // this.data.property_types = this.SubmitForm.value.property_types;
    this.data.fitting_details = this.SubmitForm.value.fitting_details;
    this.data.carpetArea = this.SubmitForm.value.carpetArea;
    this.data.buildupArea = this.SubmitForm.value.buildupArea;
    this.data.price = this.SubmitForm.value.price;
    this.data.brokerageAed = this.SubmitForm.value.brokerageAed;
    this.data.brokerageNegotiable = this.SubmitForm.value.brokerageNegotiable;
    this.data.brokerageAed = this.SubmitForm.value.brokerageAed;
    this.data.brokerageNegotiable = this.SubmitForm.value.brokerageNegotiable;
    this.data.propertyDescription = this.SubmitForm.value.propertyDescription;
    this.data.highlights_exclusive = this.SubmitForm.value.highlights_exclusive;


    localStorage.setItem('listpropertyinfo_sell_residential',JSON.stringify(this.data))
    this.route.navigate(['listpropertymedia'])

  }

}
