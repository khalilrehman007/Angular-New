import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as $ from 'jquery';
import {AuthService} from "../../../../service/auth.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../../../service/notification.service";
import { AppService } from 'src/app/service/app.service';

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
  data: any = {};
  propertyType: any;
  room:any = [1,2,3,4,5,6,7,8,9,10];
  locatedNear: any = [{ id: 1, name: "Metro" }, { id: 2, name: "Elevator" }, {id: 3, name: "Stairs"}];
  ownershipType: any = [{ id: 1, name: "Freehold" }, { id: 2, name: "Leasehold" }];
  propertyTransactionType: any;
  completionStatus: any;
  featuresData: any;
  featuresFormData: any = [];
  minDate = new Date();

  constructor(private api:AppService, private service: AuthService,private route:Router,private notifyService : NotificationService) {
    this.priviousFormCheck = localStorage.getItem('propertyData');
    if (this.priviousFormCheck == '' || this.priviousFormCheck == null) {
      this.priviousFormCheck = JSON.parse(this.priviousFormCheck);
      this.route.navigate(['listingproperty'])
    } else {
      this.priviousFormCheck = JSON.parse(this.priviousFormCheck);
      this.data = this.priviousFormCheck;
    }
    this.api.LoadType(2).subscribe((result:any)=>{
      this.propertyType=result.data;
    });
    this.api.LoadTransactionTypes().subscribe((result:any)=>{
      this.propertyTransactionType=result.data;
    });
    this.api.LoadCompletionStatus().subscribe((result:any)=>{
      this.completionStatus=result.data;
    });
    this.api.PropertyFeatures(1).subscribe((result: any) => {
      this.featuresData = result.data;
    });
    this.data.PropertyListingTypeId=2
    this.data.PropertyCategoryId=2
  }

  ngOnInit() {
    $(document).ready(function () {
      $('.dropdown-toggle').click(function () {
        $(this).next().toggleClass('active');
        $(this).parent().parent().nextAll().find('.dropdown-menu').removeClass('active');
        $(this).parent().parent().prevAll().find('.dropdown-menu').removeClass('active');
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
    room_bathroom_2    : new FormControl("" ),
    room_bathroom_3      : new FormControl("" ),
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
    this.submitted = true;
    if (this.SubmitForm.invalid) {
      return;
    }
    this.data.CarpetArea=this.SubmitForm.value.carpetArea;
    this.data.BuildupArea=this.SubmitForm.value.buildupArea;
    this.data.PropertyPrice=this.SubmitForm.value.price;
    this.data.MaintenanceCharges=this.SubmitForm.value.maintenanceCharge;
    this.data.BrokerageChargePrice = this.SubmitForm.value.brokerageAed;
    this.data.AvailableDate = $("#sellCommercialDate").val()
    this.data.PropertyDescription = this.SubmitForm.value.propertyDescription;
    this.data.PropertyOffer = this.SubmitForm.value.propertyOffers;
    this.data.HandoverOn = this.SubmitForm.value.handover;
    this.data.FurnishingType = 0;
    this.data.FittingType = 0;
    this.data.Gender = 0;
    this.data.Parkings = 0;
    this.data.Balcony = 0;
    this.data.PropertyManageId = "";
    this.data.PetPolicyId = "";
    this.data.TenantTypeId = "";
    this.data.RentTypeId = "";
    this.data.SecurityDeposit = false;
    this.data.SecurityDepositPrice = "";
    this.data.NoticePeriod = "";
    this.data.LockingPeriod = "";
    let user:any = localStorage.getItem("user");
    this.data.UserId = JSON.parse(user).id;
    this.data.UserEmail = JSON.parse(user).email;
    let temp:any = []
    for (let i = 0; i < this.featuresFormData.length; i++) {
      temp.push({PropertyFeatureId:this.featuresFormData[i]});
    }
    this.data.PropertyFeatures = temp;

    localStorage.setItem('propertyData',JSON.stringify(this.data))
    this.route.navigate(['listpropertymedia'])
  }
  getBedroom(e: any) {
    this.data.BedRooms = e.value;
  }
  getBathroom(e: any) {
    this.data.BathRooms = e.value;
  }
  getPropertyType(e: any) {
    this.data.PropertyTypeId = e.value;
  }
  getLocatedNear(e:number) {
    this.data.LocatedNear = e;
  }
  getOwnershipType(e:number){
    this.data.ownershipType = e;
  }
  getPropertyTransactionType(id:number) {
    this.data.PropertyTransactionTypeId = id;
  }
  getCompletionStatus(id:number) {
    this.data.CompletionStatus = id;
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
