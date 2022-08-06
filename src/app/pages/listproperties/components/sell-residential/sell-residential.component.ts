import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../../second-header/second-header.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { AuthService } from "../../../../service/auth.service";
import { Router } from "@angular/router";
import { NotificationService } from "../../../../service/notification.service";
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-sell-residential',
  templateUrl: './sell-residential.component.html',
  styleUrls: ['./sell-residential.component.scss']
})
export class SellResidentialComponent implements OnInit {
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
  room: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  furnishingType: any;
  fittingType: any;
  transactionType: any = [{ id: 1, name: "New Booking" }, { id: 2, name: "Re-sale" }]
  completionStatus: any;
  featuresData: any;
  featuresFormData: any = [];
  minDate = new Date();
  propertyListingBuy: number;
  propertyListingRent: number;




  constructor(private api: AppService, private service: AuthService, private route: Router, private notifyService: NotificationService) {
    this.priviousFormCheck = localStorage.getItem('propertyData');
    if (this.priviousFormCheck == '' || this.priviousFormCheck == null) {
      this.priviousFormCheck = JSON.parse(this.priviousFormCheck);
      this.route.navigate(['listingproperty'])
    } else {
      this.priviousFormCheck = JSON.parse(this.priviousFormCheck);
      this.data = this.priviousFormCheck;
    }
    this.api.PropertyListingRentBuy({ "Lat": this.data.PropertyLat, "Long": this.data.PropertyLong }).subscribe((result: any) => {
      this.propertyListingBuy = result.data.propertyListingBuy;
      this.propertyListingRent = result.data.propertyListingRent;
    })
    this.api.LoadType(1).subscribe((result: any) => {
      this.propertyType = result.data;
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
    this.data.PropertyListingTypeId = 2;
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
    PropertyTitle: new FormControl("", [Validators.required]),
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
    room_bathroom_1: new FormControl(""),
    room_bathroom_2: new FormControl(""),
    room_bathroom_3: new FormControl(""),
    balcony_0: new FormControl(""),
    balcony_1: new FormControl(""),
    balcony_2: new FormControl(""),
    balcony_3: new FormControl(""),
    balcony_4: new FormControl(""),
    balcony_4_plus: new FormControl(""),
    parking_space_0: new FormControl(""),
    parking_space_1: new FormControl(""),
    parking_space_2: new FormControl(""),
    parking_space_3: new FormControl(""),
    parking_space_4: new FormControl(""),
    parking_space_4_plus: new FormControl(""),
    property_types: new FormControl("", [Validators.required]),
    fitting_details: new FormControl("", [Validators.required]),
    carpetArea: new FormControl("", [Validators.required]),
    buildupArea: new FormControl("", [Validators.required]),
    transactionType: new FormControl("", [Validators.required]),
    completionDetails: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required]),
    maintenanceCharge: new FormControl("", [Validators.required]),
    brokerageAed: new FormControl(""),
    brokerageNegotiable: new FormControl(""),
    brokerage: new FormControl("", [Validators.required]),
    handover: new FormControl("", [Validators.required]),
    propertyDescription: new FormControl("", [Validators.required]),
    propertyOffers: new FormControl("", [Validators.required]),
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
  typeOfPropertyCheck: boolean = false;
  bedroomCheck: boolean = false;
  bathroomCheck: boolean = false;
  balconyCheck: boolean = false;
  parkingCheck: boolean = false;
  furnishTypeCheck: boolean = false;
  fittingCheck: boolean = false;
  transactionCheck: boolean = false;
  completionCheck: boolean = false;
  propertyTypeCheck: boolean = false;
  badroomCheck: boolean = false;
  managedByCheck: boolean = false;
  occupancyCheck: boolean = false;
  rentTypeCheck: boolean = false;
  genderCheck: boolean = false;
  tenantCheck: boolean = false;
  managedCheck: boolean = false;
  petPolicyCheck: boolean = false;
  brokreageCheck: boolean = false;
  securityCheck: boolean = false;
  onSubmit() {
    console.log(this.typeOfPropertyCheck);
    console.log(this.bedroomCheck);
    console.log(this.bathroomCheck);
    console.log(this.balconyCheck);
    console.log(this.parkingCheck);
    console.log(this.furnishTypeCheck);
    console.log(this.fittingCheck);
    const controls = this.SubmitForm.controls;
    // localStorage.removeItem("listpropertyinfo");
    this.submitted = true;
    if (this.typeOfPropertyCheck == false) {
      alert("Please select your property type");
      return;
    } else if (this.bedroomCheck == false) {
      alert('Please select bedroom');
      return;
    } else if (this.bathroomCheck == false) {
      alert('Please select bathroom');
      return;
    } else if (this.balconyCheck == false) {
      alert('Please select balcony');
      return;
    } else if (this.parkingCheck == false) {
      alert('Please select available parking');
      return;
    } else if (this.furnishTypeCheck == false) {
      alert('Please select furnish type');
      return;
    } else if (this.fittingCheck == false) {
      alert('Please select fitting type');
      return;
    } else if (this.SubmitForm.value.carpetArea == "") {
      alert("Please select carpet area");
      return;
    } else if (this.SubmitForm.value.buildupArea == "") {
      alert("Please select build area");
      return;
    } else if (this.transactionCheck == false) {
      alert('Please select transaction type');
      return;
    } else if (this.completionCheck == false) {
      alert('Please select completion status');
      return;
    } else if (this.SubmitForm.value.price == "") {
      alert("Please select price");
      return;
    } else if (this.SubmitForm.value.maintenanceCharge == "") {
      alert("Please select maintenance charges");
      return;
    } else if (this.brokreageCheck == false) {
      alert("Please select charge brokerage");
      return;
    } else if ($("#sell-residential-datepicker").val() == "") {
      alert('Please select handover date');
      return;
    } else if (this.SubmitForm.value.PropertyTitle == "") {
      alert("Please write property title");
      return;
    } else if (this.SubmitForm.value.propertyDescription == "") {
      alert("Please write property type");
      return;
    } else if (this.featuresFormData.length == 0) {
      alert("Please select features");
      return;
    }


    this.data.PropertyTitle = this.SubmitForm.value.PropertyTitle;
    this.data.CarpetArea = this.SubmitForm.value.carpetArea;
    this.data.BuildupArea = this.SubmitForm.value.buildupArea;
    this.data.PropertyPrice = this.SubmitForm.value.price;
    this.data.MaintenanceCharges = this.SubmitForm.value.maintenanceCharge;
    this.data.HandoverOn = $("#sell-residential-datepicker").val();
    this.data.propertyDescription = this.SubmitForm.value.propertyDescription;
    this.data.PropertyOffer = this.SubmitForm.value.propertyOffers;
    this.data.BrokerageChargePrice = this.SubmitForm.value.brokerageAed;
    this.data.TenantTypeId = "";
    this.data.PetPolicies = "";
    this.data.PropertyManageId = "";
    this.data.RentTypeId = "";
    this.data.SecurityDeposit = false;
    this.data.SecurityDepositPrice = "";
    this.data.AvailableDate = "";
    this.data.NoticePeriod = "";
    this.data.LockingPeriod = "";
    this.data.Gender = 0;
    let user: any = localStorage.getItem("user");
    this.data.UserId = JSON.parse(user).id;
    this.data.UserEmail = JSON.parse(user).email;
    let temp: any = []
    for (let i = 0; i < this.featuresFormData.length; i++) {
      temp.push({ PropertyFeatureId: this.featuresFormData[i] });
    }
    this.data.PropertyFeatures = temp;

    localStorage.setItem('propertyData', JSON.stringify(this.data))
    this.route.navigate(['listpropertymedia'])

  }
  getBedroom(e: any) {
    this.bedroomCheck = true;
    this.data.BedRooms = e.value;
  }
  getBathroom(e: any) {
    this.bathroomCheck = true;
    this.data.BathRooms = e.value;
  }
  getPropertyType(e: any) {
    this.typeOfPropertyCheck = true;
    this.data.PropertyTypeId = e.value;
  }
  getBalcony(e: string) {
    this.balconyCheck = true;
    this.data.Balcony = e;
  }
  getParking(e: string) {
    this.parkingCheck = true;
    this.data.Parkings = e;
  }
  getFurnishingType(e: number) {
    this.furnishTypeCheck = true;
    this.data.FurnishingType = e;
  }
  getFittingType(e: number) {
    this.fittingCheck = true;
    this.data.FittingType = e;
  }
  getTransactionType(e: number) {
    this.transactionCheck = true;
    this.data.PropertyTransactionTypeId = e;
  }
  getCompletionStatus(e: number) {
    this.completionCheck = true;
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
