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

  error: any = ""
  showError: boolean = false;
  errorResponse(data: any) {
    this.showError = false;
  }
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
  propertyType: any = [];
  selectedPropertyType: any = {};
  furnishingType: any;
  fittingType: any;
  tenantType: any;
  genders: any;
  propertyManages: any;
  occupancy: any;
  petPolicy: any;
  petPolicyData: any = [];
  rentTypes: any;
  room: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "10+"];
  featuresData: any;
  featuresFormData: any = [];
  minDate = new Date();
  propertyListingBuy: number;
  propertyListingRent: number;
  listingTypeId: number = 0;
  categoryID: number = 0;
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
  transactionType: any = [];
  completionStatus:any = [];
  locatedNear: any = [{ id: 1, name: "Metro" }, { id: 2, name: "Elevator" }, { id: 3, name: "Stairs" }];
  ownershipType: any = [{ id: 1, name: "Freehold" }, { id: 2, name: "Leasehold" }];
  showLoader: boolean = false;

  constructor(private api: AppService, private service: AuthService, private route: Router, private notifyService: NotificationService) {
    this.getOldFormData();
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
    this.api.LoadOccupancy().subscribe((result: any) => {
      this.occupancy = result.data;
    });
  }
  ngOnInit() {
    $("#formDate").on("click", function () {
      $(".mat-datepicker-toggle").click();
    })
  }
  onListTypeSelect(id: any) {
    this.listingTypeId = id;
    if (id == 2) {
      this.api.PropertyTransactionTypes().subscribe((result: any) => {
        this.transactionType = result.data;
      })
      this.api.LoadCompletionStatus().subscribe((result: any) => {
        this.completionStatus = result.data;
      })
    }
  }
  getOldFormData() {
    this.oldData = localStorage.getItem('listpropertyinfo_rent_residential');
  }
  getCategory(id: any) {
    this.categoryID = id;
    this.api.LoadType(id).subscribe((result) => {
      this.propertyType = result;
      this.propertyType = this.propertyType.data
    });
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
    property_types: new FormControl("", [Validators.required]),
    fitting_details: new FormControl("", [Validators.required]),
    tenant_types: new FormControl("", [Validators.required]),
    gender: new FormControl("", [Validators.required]),
    property_management: new FormControl("", [Validators.required]),
    occupancy: new FormControl("", [Validators.required]),
    parking_space: new FormControl("", [Validators.required]),
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
    securoty_deposit: new FormControl("", [Validators.required]),
    AED: new FormControl("",),
    securityNegotiable: new FormControl(""),
    brokerage_value: new FormControl(""),
    brokerageAed: new FormControl(""),
    brokerageNegotiable: new FormControl(""),
    availablefrom: new FormControl("", [Validators.required]),
    noticePeriod: new FormControl("", [Validators.required]),
    lockingPeriod: new FormControl("", [Validators.required]),
    propertyDescription: new FormControl("", [Validators.required]),
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
  getBedroom(e: any) {
    this.bedroomCheck = true;
    this.data.BedRooms = e.value;
  }
  getBathroom(e: any) {
    this.bathroomCheck = true;
    this.data.BathRooms = e.value;
  }
  getPropertyType(e: any) {
    this.selectedPropertyType = this.propertyType.filter((item: any) => item.id == e.value)[0]
    console.log(this.selectedPropertyType);
    this.propertyTypeCheck = true;
    this.data.PropertyTypeId = e.value;
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
  getBalcony(id:any) {
    this.data.Balcony = id;
  }
  getParking(e: string) {
    this.data.Parkings = e;
  }
  getPetPolicy(e: any) {
    this.petPolicyData = e.value;
  }
  getRentTypes(e: number) {
    this.data.RentTypeId = e;
  }
  getTransactionType(e: number) {
    this.data.PropertyTransactionTypeId = e;
  }
  getCompletionStatus(e: number) {
    this.data.PropertyCompletionStatusId = e;
  }
  getLocatedNear(e: number) {
    this.data.LocatedNear = e;
  }
  getOwnershipType(e: number) {
    this.data.ownershipType = e;
  }
  getSecurityDeposit(e: any) {
    this.data.SecurityDeposit = e;
  }
  getBrokageDeposit(e: any) {
    this.data.BrokerageCharge = e;
  }
  getFeaturesData(id: number) {
    if (this.featuresFormData.indexOf(id) == -1) {
      this.featuresFormData.push(id);
    } else {
      this.featuresFormData = this.featuresFormData.filter((e: any) => e != id)
    }
  }
  onSubmit() {
    if (this.listingTypeId == 0) {
      this.error = "Select Listing Type";
      this.showError = true;
      return;
    } else if(this.categoryID == 0) {
      this.error = "Select Category ID";
      this.showError = true;
      return;
    } else if(!this.data.PropertyTypeId) {
      this.error = "Select Property Type";
      this.showError = true;
      return;
    } else if(this.selectedPropertyType.hasBed && !this.data.BedRooms) {
      this.error = "Select Bedrooms";
      this.showError = true;
      return;
    } else if(this.selectedPropertyType.hasBath && !this.data.BathRooms) {
      this.error = "Select BathRooms";
      this.showError = true;
      return;
    } else if(this.selectedPropertyType.hasFurnishing && !this.data.FurnishingType) {
      this.error = "Select Furnishing Type";
      this.showError = true;
      return;
    } else if(this.selectedPropertyType.hasFitting && !this.data.FittingType) {
      this.error = "Select Fitting Type";
      this.showError = true;
      return;
    } else if(this.selectedPropertyType.hasCarpetArea && this.SubmitForm.value.carpetArea == "") {
      this.error = "Enter Carpet Area";
      this.showError = true;
      return;
    } else if(this.selectedPropertyType.hasBuildUpArea && this.SubmitForm.value.buildupArea == "") {
      this.error = "Enter BuildUp Area";
      this.showError = true;
      return;
    } else if(!this.data.TenantTypeId && this.listingTypeId == 1) {
      this.error = "Select Tenant Type";
      this.showError = true;
      return;
    } else if(!this.data.Gender && this.listingTypeId == 1) {
      this.error = "Select Gender";
      this.showError = true;
      return;
    } else if(!this.data.PropertyManageId && this.listingTypeId == 1) {
      this.error = "Select Property Manager";
      this.showError = true;
      return;
    } else if(!this.data.OccupancyStatusId && this.listingTypeId == 1) {
      this.error = "Select Occupancy Status";
      this.showError = true;
      return;
    } else if(this.categoryID == 1 && !this.data.Balcony) {
      this.error = "Select Balcony";
      this.showError = true;
      return;
    } else if(this.categoryID == 1 && !this.data.Parkings) {
      this.error = "Select Parking";
      this.showError = true;
      return;
    } else if(this.listingTypeId == 2 && !this.data.PropertyTransactionTypeId) {
      this.error = "Select Transaction Type";
      this.showError = true;
      return;
    } else if(this.listingTypeId == 2 && !this.data.PropertyCompletionStatusId) {
      this.error = "Select Completetion Status";
      this.showError = true;
      return;
    } else if(this.listingTypeId == 1 && this.petPolicyData.length == 0) {
      this.error = "Select Pet Policy";
      this.showError = true;
      return;
    } else if(this.listingTypeId == 2 && $("#sell-residential-datepicker").val() == "") {
      this.error = "Enter Handover Date";
      this.showError = true;
      return;
    } else if(this.listingTypeId == 2 && this.categoryID == 2 && !this.data.LocatedNear) {
      this.error = "Select Near Location";
      this.showError = true;
      return;
    } else if(this.listingTypeId == 2 && this.categoryID == 2 && !this.data.ownershipType) {
      this.error = "Select Ownership Type";
      this.showError = true;
      return;
    } else if(this.SubmitForm.value.price == "") {
      this.error = "Enter Price";
      this.showError = true;
      return;
    } else if(this.listingTypeId == 1 && !this.data.RentTypeId) {
      this.error = "Select Rent Type";
      this.showError = true;
      return;
    } else if(this.listingTypeId == 1 && !this.data.SecurityDeposit) {
      this.error = "Select Security Deposit";
      this.showError = true;
      return;
    } else if(this.data.SecurityDeposit == "true" && this.SubmitForm.value.AED == "") {
      this.error = "Enter Security Deposit Price";
      this.showError = true;
      return;
    } else if(this.listingTypeId == 1 && !this.data.BrokerageCharge) {
      this.error = "Select Brokerage Type";
      this.showError = true;
      return;
    } else if(this.data.BrokerageCharge == "true" && this.SubmitForm.value.brokerageAed == "") {
      this.error = "Enter Brokerage Price";
      this.showError = true;
      return;
    } else if(this.listingTypeId == 1 && this.SubmitForm.value.availablefrom == "") {
      this.error = "Enter Available Date";
      this.showError = true;
      return;
    } else if(this.listingTypeId == 1 && this.SubmitForm.value.noticePeriod == "") {
      this.error = "Enter Notice Days";
      this.showError = true;
      return;
    } else if(this.listingTypeId == 1 && this.SubmitForm.value.lockingPeriod == "") {
      this.error = "Enter Locking Days";
      this.showError = true;
      return;
    } else if(this.listingTypeId == 1 && this.SubmitForm.value.propertyTitle == "") {
      this.error = "Enter Property Title";
      this.showError = true;
      return;
    } else if(this.listingTypeId == 1 && this.SubmitForm.value.propertyDescription == "") {
      this.error = "Enter Property Description";
      this.showError = true;
      return;
    } else if(this.selectedPropertyType.hasPropertyFeature && this.featuresFormData.length == 0) {
      this.error = "Select Property Features";
      this.showError = true;
      return;
    }

    // this.data.PropertyListingTypeId = 1;
    // this.data.PropertyTransactionTypeId = "";
    // this.data.PropertyCategoryId = 1;
    // this.data.PropertyTitle = this.SubmitForm.value.propertyTitle;
    // this.data.Balcony = 0;
    // this.data.PropertyStatusId = 0;
    // this.data.CarpetArea = this.SubmitForm.value.carpetArea;
    // this.data.BuildupArea = this.SubmitForm.value.buildupArea;
    // this.data.PropertyPrice = this.SubmitForm.value.price;
    // this.data.SecurityDepositPrice = this.SubmitForm.value.AED;
    // this.data.BrokerageChargePrice = this.SubmitForm.value.brokerageAed;
    // this.data.AvailableDate = $("#formDate").val()
    // this.data.NoticePeriod = this.SubmitForm.value.noticePeriod;
    // this.data.LockingPeriod = this.SubmitForm.value.lockingPeriod;
    // this.data.PropertyOffer = this.SubmitForm.value.propertyOffers;
    // this.data.PropertyDescription = this.SubmitForm.value.propertyDescription;
    // this.data.MaintenanceCharges = "";
    // this.data.HandoverOn = "";
    // this.data.PropertyCompletionStatusId = "";
    // let user: any = localStorage.getItem("user");
    // this.data.UserId = JSON.parse(user).id;
    // this.data.UserEmail = JSON.parse(user).email;
    // this.data.ProfessionalTypeId = JSON.parse(user).professionalTypeId;
    // let temp: any = []
    // for (let i = 0; i < this.petPolicyData.length; i++) {
    //   temp.push({ "PetPolicyId": this.petPolicyData[i] });
    // }
    // this.data.PetPolicies = temp;
    // temp = []
    // for (let i = 0; i < this.featuresFormData.length; i++) {
    //   temp.push({ PropertyFeatureId: this.featuresFormData[i] });
    // }
    // this.data.PropertyFeatures = temp;

    // localStorage.setItem('propertyData', JSON.stringify(this.data))
    // this.route.navigate(['listpropertymedia'])
  }
}