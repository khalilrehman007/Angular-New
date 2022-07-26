import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { AuthService } from "../../../service/auth.service";
import { Router } from "@angular/router";
import { NotificationService } from "../../../service/notification.service";
import { disableDebugTools } from "@angular/platform-browser";
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-listpropertyinfo',
  templateUrl: './listpropertyinfo.component.html',
  styleUrls: ['./listpropertyinfo.component.scss']
})
export class ListpropertyinfoComponent implements OnInit {
  plus = '../../../../assets/images/plus.svg'
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
  furnishingType: any;
  fittingType: any;
  tenantType: any;
  genders: any;
  propertyManages: any;
  occupancy: any;
  petPolicy: any;
  petPolicyData:any = [];
  rentTypes: any;
  room: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  featuresData: any;
  featuresFormData: any = [];
  minDate = new Date();

  constructor(private api: AppService, private service: AuthService, private route: Router, private notifyService: NotificationService) {
    this.getOldFormData();
    this.priviousFormCheck = localStorage.getItem('propertyData');
    if (this.priviousFormCheck == '' || this.priviousFormCheck == null) {
      this.priviousFormCheck = JSON.parse(this.priviousFormCheck);
      this.route.navigate(['listingproperty'])
    } else {
      this.priviousFormCheck = JSON.parse(this.priviousFormCheck);
    }

    this.api.LoadType(1).subscribe((result) => {
      this.propertyType = result;
      this.propertyType = this.propertyType.data
    });
    this.api.FurnishingTypes().subscribe((result: any) => {
      this.furnishingType = result.data;
    });
    this.api.FittingTypes().subscribe((result: any) => {
      this.fittingType = result.data;
    });
    this.api.LoadTenantTypes().subscribe((result: any) => {
      this.tenantType = result.data;
    });
    this.api.LoadGenders().subscribe((result: any) => {
      this.genders = result.data;
    });
    this.api.LoadPropertyManages().subscribe((result: any) => {
      this.propertyManages = result.data;
    });
    this.api.LoadPetPolicy().subscribe((result: any) => {
      this.petPolicy = result.data;
    });
    this.api.LoadRentTypes().subscribe((result: any) => {
      this.rentTypes = result.data;
    });
    this.api.PropertyFeatures(1).subscribe((result: any) => {
      this.featuresData = result.data;
    });
    this.api.LoadOccupancy().subscribe((result:any)=> {
      this.occupancy = result.data;
    });
    this.data = this.priviousFormCheck;
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
  getOldFormData() {
    this.oldData = localStorage.getItem('listpropertyinfo_rent_residential');
  }

  SubmitForm = new FormGroup({
    propertyTitle: new FormControl("", [Validators.required]),
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
    bedroom_BHK_1: new FormControl(""),
    bedroom_BHK_2: new FormControl(""),
    bedroom_BHK_3: new FormControl(""),
    bedroom_BHK_4: new FormControl("",),
    bedroom_BHK_5: new FormControl(""),
    bedroom_BHK_6: new FormControl(""),
    bedroom_BHK_7: new FormControl(""),
    bedroom_BHK_8: new FormControl(""),
    room_privateBathroom: new FormControl(""),
    room_attachedBathroom: new FormControl(""),
    room_sharedBathroom: new FormControl(""),
    property_types: new FormControl(""),
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
    carpetArea: new FormControl("", [Validators.required]),
    buildupArea: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required]),
    building_type_monthly: new FormControl(""),
    building_type_quaterly: new FormControl(""),
    building_type_yearly: new FormControl(""),
    securoty_deposit: new FormControl(""),
    AED: new FormControl("", ),
    securityNegotiable: new FormControl("" ),
    brokerage_value: new FormControl(""),
    brokerageAed: new FormControl(""),
    brokerageNegotiable: new FormControl(""),
    availablefrom: new FormControl("", [Validators.required]),
    noticePeriod: new FormControl("", [Validators.required]),
    lockingPeriod: new FormControl("", [Validators.required]),
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
  genderCheck: boolean = false;
  tenantCheck: boolean = false;
  fittingCheck: boolean = false;
  furnishTypeCheck: boolean = false;
  managedCheck: boolean = false;
  occupancyCheck: boolean = false;
  rentTypeCheck: boolean = false;
  petPolicyCheck: boolean = false;
  parkingCheck: boolean = false;
  propertyTypeCheck: boolean = false;
  bedroomCheck: boolean = false;
  bathroomCheck: boolean = false;
  brokreageCheck: boolean = false;
  securityCheck: boolean = false;
  onSubmit() {
    this.submitted = true;
    const controls = this.SubmitForm.controls;
    if(this.genderCheck == false || this.tenantCheck == false|| this.fittingCheck == false|| this.furnishTypeCheck == false|| this.managedCheck == false|| this.occupancyCheck == false|| this.rentTypeCheck == false|| this.petPolicyCheck == false|| this.parkingCheck == false|| this.propertyTypeCheck == false|| this.bedroomCheck == false|| this.bathroomCheck == false|| this.brokreageCheck == false|| this.securityCheck == false || this.SubmitForm.invalid) {
      alert("Please fill all the required fields");
      return;
    }
    // if () {
    //   alert("Please fill all the required fields");
    //   return;
    // }

    this.data.PropertyListingTypeId = 1;
    this.data.PropertyTransactionTypeId = "";
    this.data.PropertyCategoryId = 1;
    this.data.PropertyTitle = this.SubmitForm.value.propertyTitle;
    this.data.Balcony = 0;
    this.data.PropertyStatusId = 0;
    this.data.CarpetArea = this.SubmitForm.value.carpetArea;
    this.data.BuildupArea = this.SubmitForm.value.buildupArea;
    this.data.PropertyPrice = this.SubmitForm.value.price;
    this.data.SecurityDepositPrice = this.SubmitForm.value.AED;
    this.data.BrokerageChargePrice = this.SubmitForm.value.brokerageAed;
    this.data.AvailableDate = $("#formDate").val()
    this.data.NoticePeriod = this.SubmitForm.value.noticePeriod;
    this.data.LockingPeriod = this.SubmitForm.value.lockingPeriod;
    this.data.PropertyOffer = this.SubmitForm.value.propertyOffers;
    this.data.PropertyDescription = this.SubmitForm.value.propertyDescription;
    this.data.MaintenanceCharges = "";
    this.data.HandoverOn = "";
    this.data.PropertyCompletionStatusId = "";
    let user:any = localStorage.getItem("user");
    this.data.UserId = JSON.parse(user).id;
    this.data.UserEmail = JSON.parse(user).email;
    let temp:any = []
    for (let i = 0; i < this.petPolicyData.length; i++) {
      temp.push({"PetPolicyId":this.petPolicyData[i]});
    }
    this.data.PetPolicies = temp;
    temp = []
    for (let i = 0; i < this.featuresFormData.length; i++) {
      temp.push({PropertyFeatureId:this.featuresFormData[i]});
    }
    this.data.PropertyFeatures = temp;

    localStorage.setItem('propertyData',JSON.stringify(this.data))
    this.route.navigate(['listpropertymedia'])
  }
  getBedroom(e: number) {
    this.data.BedRooms = e;
  }
  getBathroom(e: number) {
    this.data.BathRooms = e;
  }
  getPropertyType(e: number) {
    this.data.PropertyTypeId = e;
  }
  getFurnishingType(e: number) {
    this.data.FurnishingType = e;
  }
  getFittingType(e: number) {
    this.data.FittingType = e;
  }
  getTenantType(e: number) {
    this.data.TenantTypeId = e;
  }
  getGender(e: number) {
    this.data.Gender = e;
  }
  getPropertyManages(e: number) {
    this.data.PropertyManageId = e;
  }
  getOccupancy(e: number) {
    this.data.OccupancyStatusId = e;
  }
  getParking(e: string) {
    this.data.Parkings = e;
  }
  getPetPolicy(e: number) {
    if (this.petPolicyData.indexOf(e) == -1) {
      this.petPolicyData.push(e);
    } else {
      this.petPolicyData = this.petPolicyData.filter((id: any) => e != id);
    }
  }
  getRentTypes(e: number) {
    this.data.RentTypeId = e;
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