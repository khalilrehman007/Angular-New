import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../../second-header/second-header.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { AuthService } from "../../../../service/auth.service";
import { Router } from "@angular/router";
import { NotificationService } from "../../../../service/notification.service";
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-rent-commertial',
  templateUrl: './rent-commertial.component.html',
  styleUrls: ['./rent-commertial.component.scss']
})
export class RentCommertialComponent implements OnInit {
  plus = '../../../../../assets/images/plus.svg'

  messageclass = ''
  message = ''
  Customerid: any;
  editdata: any;
  submitted = false;
  responsedata: any;
  oldData: any;
  priviousFormCheck: any;
  data: any = {};
  propertyType: any;
  propertyManages: any;
  rentTypes: any;
  occupancy: any = [{ id: 1, name: "Vaccant" }, { id: 2, name: "Occupied" }]
  room:any = [1,2,3,4,5,6,7,8,9,10];
  featuresData: any;
  featuresFormData: any = [];

  constructor(private api: AppService, private service: AuthService, private route: Router, private notifyService: NotificationService) {
    this.priviousFormCheck = localStorage.getItem('propertyData');
    if (this.priviousFormCheck == '' || this.priviousFormCheck == null) {
      this.route.navigate(['listingproperty'])
    } else {
      this.data = JSON.parse(this.priviousFormCheck);
    }
    this.api.LoadType(2).subscribe((result:any) => {
      this.propertyType = result.data;
    });
    
    this.api.LoadPropertyManages().subscribe((result: any) => {
      this.propertyManages = result.data;
    });
    this.api.LoadRentTypes().subscribe((result: any) => {
      this.rentTypes = result.data;
    });
    this.api.PropertyFeatures(1).subscribe((result: any) => {
      this.featuresData = result.data;
    });
    this.data.PropertyTransactionTypeId = 1;
    this.data.PropertyCategoryId = 2;
  }

  ngOnInit() {
    $(document).ready(function () {
      $('.dropdown-toggle').click(function () {
        $(this).next().toggleClass('active');
      });
    });
  }


  SubmitForm = new FormGroup({
    property_studio: new FormControl(""),
    property_apartment: new FormControl(""),
    property_villa: new FormControl(""),
    property_townHouse: new FormControl(""),
    property_penthouse: new FormControl(""),
    property_compound: new FormControl(""),
    property_duplex: new FormControl(""),
    property_fullFloor: new FormControl(""),
    property_wholeBuilding: new FormControl(""),
    property_bulkRentUnit: new FormControl(""),
    property_bungalow: new FormControl("",),
    property_hotelApartment: new FormControl(""),
    bedroom_1: new FormControl(""),
    bedroom_2: new FormControl(""),
    bedroom_3: new FormControl(""),
    bedroom_4: new FormControl("",),
    bedroom_5: new FormControl(""),
    bedroom_6: new FormControl(""),
    room_bathroom_1: new FormControl(""),
    room_bathroom_2: new FormControl(""),
    room_bathroom_3: new FormControl(""),
    // property_types      : new FormControl("" ),
    propertyManagement: new FormControl(""),
    fitting_details: new FormControl(""),
    tenant_types: new FormControl(""),
    gender: new FormControl(""),
    property_management: new FormControl(""),
    occupancy: new FormControl(""),
    parking_space: new FormControl(""),
    pets: new FormControl(""),
    pet_cats_allowed: new FormControl(""),
    pet_small_dogs_allowed: new FormControl(""),
    pet_big_dogs_allowed: new FormControl(""),
    carpetArea: new FormControl(""),
    buildupArea: new FormControl(""),
    price: new FormControl(""),
    rentType: new FormControl(""),
    building_type_monthly: new FormControl(""),
    building_type_quaterly: new FormControl(""),
    building_type_yearly: new FormControl(""),
    securoty_deposit: new FormControl(""),
    AED: new FormControl(""),
    securityNegotiable: new FormControl(""),
    brokerage_value: new FormControl(""),
    brokerageAed: new FormControl(""),
    brokerageNegotiable: new FormControl(""),
    availablefrom: new FormControl(""),
    noticePeriod: new FormControl(""),
    lockingPeriod: new FormControl(""),
    propertyDescription: new FormControl(""),
    propertyOffers: new FormControl(""),
    highlights_exclusive: new FormControl(""),
    highlights_golfView: new FormControl(""),
    highlights_canalView: new FormControl(""),
    highlights_affordable: new FormControl(""),
    highlights_vastuComplaint: new FormControl(""),
    highlights_primeLocation: new FormControl(""),
    highlights_metro: new FormControl(""),
    amenitites_ac: new FormControl(""),
    amenitites_deckspace: new FormControl(""),
    amenitites_petFriendly: new FormControl(""),
    amenitites_parkingspace: new FormControl(""),
    amenitites_poolspace: new FormControl(""),
    amenitites_yardspace: new FormControl(""),
    amenitites_freeWiFi: new FormControl(""),
    amenitites_gymspace: new FormControl(""),
    amenitites_hardwoodFloorspace: new FormControl(""),
    amenitites_jacuzzi: new FormControl(""),
  });

  get validate() {
    return this.SubmitForm.controls;
  }
  onSubmit() {
    // localStorage.removeItem("listpropertyinfo");

    this.data.CarpetArea = this.SubmitForm.value.carpetArea;
    this.data.BuildupArea = this.SubmitForm.value.buildupArea;
    this.data.PropertyPrice = this.SubmitForm.value.price;
    this.data.SecurityDepositPrice = this.SubmitForm.value.AED;
    this.data.BrokerageChargePrice = this.SubmitForm.value.brokerageAed;
    this.data.AvailableDate = $("#rent-commertial-date").val()
    this.data.NoticePeriod = this.SubmitForm.value.noticePeriod;
    this.data.LockingPeriod = this.SubmitForm.value.lockingPeriod;
    this.data.PropertyDescription = this.SubmitForm.value.propertyDescription;
    let temp:any = []
    for (let i = 0; i < this.featuresFormData.length; i++) {
      temp.push({PropertyFeatureId:this.featuresFormData[i]});
    }
    this.data.PropertyFeatures = temp;
    localStorage.setItem('propertyData', JSON.stringify(this.data))
    this.route.navigate(['listpropertymedia'])
  }

  getPropertyType(id:number) {
    this.data.PropertyTypeId = id;
  }
  getBedroom(e:number) {
    this.data.Bedroom = e;
  }
  getBathroom(e:number) {
    this.data.Bathroom = e;
  }
  getPropertyManages(id:number) {
    this.data.PropertyManageId = id;
  }
  getPropertyStatus(id:number) {
    this.data.PropertyManageId = id;
  }
  getOccupancy(e: number) {
    this.data.Occupancy = e;
    console.log(this.data);
  }
  getRentTypes(e: number) {
    this.data.RentTypes = e;
  }
  getSecurityDeposit(e: boolean) {
    this.data.SecurityDeposit = e;
  }
  getBrokageDeposit(e: boolean) {
    this.data.BrokerageCharge = e;
  }
  getFeaturesData(id: number) {
    if (this.featuresFormData.indexOf(id) == -1) {
      this.featuresFormData.push(id);
    } else {
      this.featuresFormData = this.featuresFormData.filter((e: any) => e != id)
    }
  }
}
