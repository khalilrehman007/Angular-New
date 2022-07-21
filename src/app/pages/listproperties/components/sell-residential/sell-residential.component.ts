import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../../second-header/second-header.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as $ from 'jquery';
import {AuthService} from "../../../../service/auth.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../../../service/notification.service";
import { AppService } from 'src/app/service/app.service';

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
  propertyType: any;
  room: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  furnishingType: any;
  fittingType: any;
  transactionType: any = [{ id: 1, name: "New Booking" }, { id: 2, name: "Re-sale" }]
  completionStatus: any;
  featuresData: any;
  featuresFormData: any = [];




  constructor(private api: AppService,private service: AuthService,private route:Router,private notifyService : NotificationService) {
    this.priviousFormCheck = localStorage.getItem('propertyData');
    if(this.priviousFormCheck == '' || this.priviousFormCheck == null){
      this.route.navigate(['listingproperty'])
    }else {
      this.data = JSON.parse(this.priviousFormCheck);
    }
    this.api.LoadType(1).subscribe((result: any)=>{
      this.propertyType=result.data;
    });
    this.api.FurnishingTypes().subscribe((result: any) => {
      this.furnishingType = result.data;
    });
    this.api.FittingTypes().subscribe((result: any) => {
      this.fittingType = result.data;
    });
    this.api.LoadCompletionStatus().subscribe((result: any) => {
      this.completionStatus = result.data;
    });
    this.api.PropertyFeatures(1).subscribe((result: any) => {
      this.featuresData = result.data;
    })
    this.data.PropertyTransactionTypeId = 2;
    this.data.PropertyCategoryId = 1;
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
    this.data.CarpetArea = this.SubmitForm.value.carpetArea;
    this.data.BuildupArea = this.SubmitForm.value.buildupArea;
    this.data.PropertyPrice = this.SubmitForm.value.price;
    this.data.MaintenanceCharges = this.SubmitForm.value.maintenanceCharge;
    this.data.HandoverOn = $("#sell-residential-datepicker").val();
    this.data.propertyDescription = this.SubmitForm.value.propertyDescription;
    this.data.PropertyOffer = this.SubmitForm.value.propertyOffers;
    let temp:any = []
    for (let i = 0; i < this.featuresFormData.length; i++) {
      temp.push({PropertyFeatureId:this.featuresFormData[i]});
    }
    this.data.PropertyFeatures = temp;
    console.log(this.data);


    localStorage.setItem('propertyData',JSON.stringify(this.data))
    this.route.navigate(['listpropertymedia'])

  }
  getPropertyType(id:number){
    this.data.PropertyTypeId = id;
  }
  getBedRoom(e:number){
    this.data.BedRoom = e;
  }
  getBathRoom(e:number){
    this.data.BathRoom = e;
  }
  getBalcony(e:string){
    this.data = e;    
  }
  getParking(e:string){
    this.data = e;
  }
  getFurnishingType(e: number) {
    this.data.FurnishingType = e;
  }
  getFittingType(e: number) {
    this.data.FittingType = e;
  }
  getTransactionType(e: number) {
    this.data.TransactionType = e;
  }
  getCompletionStatus(e: number) {
    this.data.PropertyCompletionStatusId = e;
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
