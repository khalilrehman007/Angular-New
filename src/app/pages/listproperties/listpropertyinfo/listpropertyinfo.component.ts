import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { AuthService } from "../../../service/auth.service";
import { Router } from "@angular/router";
import { NotificationService } from "../../../service/notification.service";
import { disableDebugTools } from "@angular/platform-browser";
import { AppService } from 'src/app/service/app.service';
import { F } from '@angular/cdk/keycodes';

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
  locatedNearData: any = [];
  rentTypes: any;
  room: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
  completionStatus: any = [];
  locatedNear: any = [];
  ownershipType: any = [{ id: 1, name: "Freehold" }, { id: 2, name: "Leasehold" }];
  showLoader: boolean = false;
  SubmitForm = new FormGroup({
    TotalFloor: new FormControl("", [Validators.required]),
    FloorNo: new FormControl("", [Validators.required]),
    propertyTitle: new FormControl("", [Validators.required]),
    carpetArea: new FormControl("", [Validators.required]),
    buildupArea: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required]),
    AED: new FormControl("",),
    brokerageAed: new FormControl("",),
    availablefrom: new FormControl("", [Validators.required]),
    noticePeriod: new FormControl("", [Validators.required]),
    lockingPeriod: new FormControl("", [Validators.required]),
    propertyDescription: new FormControl("", [Validators.required]),
    propertyOffers: new FormControl(""),
  });
  get validate() {
    return this.SubmitForm.controls;
  }
  constructor(private api: AppService, private service: AuthService, private route: Router, private notifyService: NotificationService) {
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
    this.api.LocatedNear().subscribe((result: any) => {
      this.locatedNear = result.data;
    })
    this.data.BedRooms = 0;
    this.data.BathRooms = 0;
    this.data.FurnishingType = 0;
    this.data.FittingType = 0;
    this.data.BuildupArea = 0;
    this.data.CarpetArea = 0;
    this.loadOldData();
  }
  ngOnInit() {
    $("#formDate").on("click", function () {
      $(".mat-datepicker-toggle").click();
    })
  }
  loadOldData() {
    if (localStorage.getItem("propertyData")) {
      let temp: any = localStorage.getItem("propertyData");
      this.data = JSON.parse(temp);

      if (localStorage.getItem("listingData")) {
        temp = localStorage.getItem("listingData");
        this.data = JSON.parse(temp);

        this.listingTypeId = this.data.PropertyListingTypeId;
        
        for (let i = 0; i < this.data.PetPolicies.length; i++) {
          this.petPolicyData.push(this.data.PetPolicies[i].PetPolicyId)
        }
        for (let i = 0; i < this.data.PropertyListingLocatedNears.length; i++) {
          this.locatedNearData.push(this.data.PropertyListingLocatedNears[i].LocatedNearId)
        }
        for (let i = 0; i < this.data.PropertyFeatures.length; i++) {
          this.featuresFormData.push(this.data.PropertyFeatures[i].PropertyFeatureId)
        }

        this.showLoader = true;
        this.categoryID = this.data.PropertyCategoryId;
        this.api.LoadType(this.data.PropertyCategoryId).subscribe((result) => {
          this.propertyType = result;
          this.propertyType = this.propertyType.data
          this.showLoader = false;
          this.selectedPropertyType = this.propertyType.filter((item: any) => item.id == this.data.PropertyTypeId)[0];
          this.propertyTypeCheck = true;
          if(this.selectedPropertyType.hasTotalFloor) {
            this.SubmitForm.patchValue({
              TotalFloor: this.data.TotalFloor
            })
          }
          if(this.selectedPropertyType.hasFloorNo) {
            this.SubmitForm.patchValue({
              FloorNo: this.data.FloorNo
            })
          }
          if(this.selectedPropertyType.hasCarpetArea) {
            this.SubmitForm.patchValue({
              carpetArea: this.data.CarpetArea
            })
          }
          if(this.selectedPropertyType.hasBuildUpArea) {
            this.SubmitForm.patchValue({
              buildupArea: this.data.BuildupArea
            })
          }
          if(this.data.SecurityDeposit == "true") {
            this.SubmitForm.patchValue({
              AED: this.data.SecurityDepositPrice
            })
          }
          if(this.data.BrokerageCharge == "true") {
            this.SubmitForm.patchValue({
              brokerageAed: this.data.BrokerageChargePrice
            })
          }
          if(this.data.AvailableDate) {
            let temp:any = new Date(this.data.AvailableDate);
            this.SubmitForm.patchValue({
              availablefrom: temp
            })
          }
          if(this.data.NoticePeriod) {
            this.SubmitForm.patchValue({
              noticePeriod: this.data.NoticePeriod
            })
          }
          if(this.data.LockingPeriod) {
            this.SubmitForm.patchValue({
              lockingPeriod: this.data.LockingPeriod
            })
          }
          if(this.data.PropertyTitle) {
            this.SubmitForm.patchValue({
              propertyTitle: this.data.PropertyTitle
            })
          }
          if(this.data.PropertyDescription) {
            this.SubmitForm.patchValue({
              propertyDescription: this.data.PropertyDescription
            })
          }
          if(this.data.PropertyOffer) {
            this.SubmitForm.patchValue({
              propertyOffers: this.data.PropertyOffer
            })
          }
          this.SubmitForm.patchValue({
            price: this.data.PropertyPrice
          })
        });
        
        console.log(this.data);
      }
    } else {
      this.route.navigate(['listingproperty'])
    }
  }
  onListTypeSelect(id: any) {
    this.listingTypeId = 0;
    setTimeout(() => {
      this.listingTypeId = id;
    }, 100)
    if (id == 2) {
      this.api.PropertyTransactionTypes().subscribe((result: any) => {
        this.transactionType = result.data;
      })
      this.api.LoadCompletionStatus().subscribe((result: any) => {
        this.completionStatus = result.data;
      })
    }
    this.clearData();
  }
  clearData() {
    let temp: any = localStorage.getItem('propertyData');
    this.data = JSON.parse(temp);
    this.propertyTypeCheck = false;
    this.featuresFormData = [];
    this.SubmitForm.patchValue({
      propertyTitle: "",
      carpetArea: "",
      buildupArea: "",
      price: "",
      AED: "",
      brokerageAed: "",
      availablefrom: "",
      noticePeriod: "",
      lockingPeriod: "",
      propertyDescription: "",
      propertyOffers: "",
    });
  }
  getCategory(id: any) {
    this.showLoader = true;
    this.categoryID = id;
    this.api.LoadType(id).subscribe((result) => {
      this.propertyType = result;
      this.propertyType = this.propertyType.data
      this.showLoader = false;
    });
    this.clearData();
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
    this.selectedPropertyType = this.propertyType.filter((item: any) => item.id == e.value)[0];
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
  getBalcony(id: any) {
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
  getLocatedNear(e: any) {
    this.locatedNearData = e.value;
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
  checkLength(type: number) {
    if (type == 1) {
      let temp: any = this.SubmitForm.value.TotalFloor;
      if (temp > 200) {
        this.error = "Max floors allowes is 200";
        this.showError = true;
        this.SubmitForm.patchValue({
          TotalFloor: "200"
        })
      }
    } else if (type == 2) {
      let temp: any = this.SubmitForm.value.FloorNo;
      let total: any = this.SubmitForm.value.TotalFloor;
      if (temp > total) {
        this.error = "Floor number cannot be greater than Total Floors";
        this.showError = true;
        this.SubmitForm.patchValue({
          FloorNo: this.SubmitForm.value.TotalFloor
        })
      }
    }
  }
  onSubmit() {
    if (this.listingTypeId == 0) {
      this.error = "Select Listing Type";
      this.showError = true;
      return;
    } else if (this.categoryID == 0) {
      this.error = "Select Category ID";
      this.showError = true;
      return;
    } else if (!this.data.PropertyTypeId) {
      this.error = "Select Property Type";
      this.showError = true;
      return;
    } else if (this.SubmitForm.value.TotalFloor == "" && this.selectedPropertyType.hasTotalFloor) {
      this.error = "Enter Total Floors";
      this.showError = true;
      return;
    } else if (this.SubmitForm.value.FloorNo == "" && this.selectedPropertyType.hasFloorNo) {
      this.error = "Enter Floors No.";
      this.showError = true;
      return;
    } else if (this.selectedPropertyType.hasBed && !this.data.BedRooms) {
      this.error = "Select Bedrooms";
      this.showError = true;
      return;
    } else if (this.selectedPropertyType.hasBath && !this.data.BathRooms) {
      this.error = "Select BathRooms";
      this.showError = true;
      return;
    } else if (this.selectedPropertyType.hasFurnishing && !this.data.FurnishingType) {
      this.error = "Select Furnishing Type";
      this.showError = true;
      return;
    } else if (this.selectedPropertyType.hasFitting && !this.data.FittingType) {
      this.error = "Select Fitting Type";
      this.showError = true;
      return;
    } else if (this.selectedPropertyType.hasCarpetArea && this.SubmitForm.value.carpetArea == "") {
      this.error = "Enter Carpet Area";
      this.showError = true;
      return;
    } else if (this.selectedPropertyType.hasBuildUpArea && this.SubmitForm.value.buildupArea == "") {
      this.error = "Enter BuildUp Area";
      this.showError = true;
      return;
    } else if (!this.data.TenantTypeId && this.listingTypeId == 1) {
      this.error = "Select Tenant Type";
      this.showError = true;
      return;
    } else if (!this.data.Gender && this.listingTypeId == 1) {
      this.error = "Select Gender";
      this.showError = true;
      return;
    } else if (!this.data.PropertyManageId && this.listingTypeId == 1) {
      this.error = "Select Property Manager";
      this.showError = true;
      return;
    } else if (!this.data.OccupancyStatusId && this.listingTypeId == 1) {
      this.error = "Select Occupancy Status";
      this.showError = true;
      return;
    } else if (this.categoryID == 1 && !this.data.Balcony) {
      this.error = "Select Balcony";
      this.showError = true;
      return;
    } else if (this.categoryID == 1 && !this.data.Parkings) {
      this.error = "Select Parking";
      this.showError = true;
      return;
    } else if (this.listingTypeId == 2 && !this.data.PropertyTransactionTypeId) {
      this.error = "Select Transaction Type";
      this.showError = true;
      return;
    } else if (this.listingTypeId == 2 && !this.data.PropertyCompletionStatusId) {
      this.error = "Select Completetion Status";
      this.showError = true;
      return;
    } else if (this.listingTypeId == 1 && this.petPolicyData.length == 0) {
      this.error = "Select Pet Policy";
      this.showError = true;
      return;
    } else if (this.listingTypeId == 2 && $("#sell-residential-datepicker").val() == "") {
      this.error = "Enter Handover Date";
      this.showError = true;
      return;
    } else if (this.locatedNearData.length == 0) {
      this.error = "Select Near Location";
      this.showError = true;
      return;
    } else if (this.listingTypeId == 2 && this.categoryID == 2 && !this.data.ownershipType) {
      this.error = "Select Ownership Type";
      this.showError = true;
      return;
    } else if (this.SubmitForm.value.price == "") {
      this.error = "Enter Price";
      this.showError = true;
      return;
    } else if (this.listingTypeId == 1 && !this.data.RentTypeId) {
      this.error = "Select Rent Type";
      this.showError = true;
      return;
    } else if (this.listingTypeId == 1 && !this.data.SecurityDeposit) {
      this.error = "Select Security Deposit";
      this.showError = true;
      return;
    } else if (this.data.SecurityDeposit == "true" && this.SubmitForm.value.AED == "") {
      this.error = "Enter Security Deposit Price";
      this.showError = true;
      return;
    } else if (this.listingTypeId == 1 && !this.data.BrokerageCharge) {
      this.error = "Select Brokerage Type";
      this.showError = true;
      return;
    } else if (this.data.BrokerageCharge == "true" && this.SubmitForm.value.brokerageAed == "") {
      this.error = "Enter Brokerage Price";
      this.showError = true;
      return;
    } else if (this.listingTypeId == 1 && this.SubmitForm.value.availablefrom == "") {
      this.error = "Enter Available Date";
      this.showError = true;
      return;
    } else if (this.listingTypeId == 1 && this.SubmitForm.value.noticePeriod == "") {
      this.error = "Enter Notice Days";
      this.showError = true;
      return;
    } else if (this.listingTypeId == 1 && this.SubmitForm.value.lockingPeriod == "") {
      this.error = "Enter Locking Days";
      this.showError = true;
      return;
    } else if (this.listingTypeId == 1 && this.SubmitForm.value.propertyTitle == "") {
      this.error = "Enter Property Title";
      this.showError = true;
      return;
    } else if (this.listingTypeId == 1 && this.SubmitForm.value.propertyDescription == "") {
      this.error = "Enter Property Description";
      this.showError = true;
      return;
    } else if (this.selectedPropertyType.hasPropertyFeature && this.featuresFormData.length == 0) {
      this.error = "Select Property Features";
      this.showError = true;
      return;
    }

    let userData: any = localStorage.getItem("user");
    userData = JSON.parse(userData);
    this.data.UserId = userData.id;
    if (userData.professionalTypeId) {
      this.data.ProfessionalTypeId = userData.professionalTypeId;
    }
    if (this.selectedPropertyType.hasTotalFloor) {
      this.data.TotalFloor = this.SubmitForm.value.TotalFloor;
    }
    if (this.selectedPropertyType.hasFloorNo) {
      this.data.FloorNo = this.SubmitForm.value.FloorNo;
    }
    this.data.PropertyListingTypeId = this.listingTypeId;
    this.data.PropertyCategoryId = this.categoryID;
    if (this.selectedPropertyType.hasCarpetArea) {
      this.data.CarpetArea = this.SubmitForm.value.carpetArea;
    } else {
      this.data.CarpetArea = 0;
    }
    if (this.selectedPropertyType.hasBuildUpArea) {
      this.data.BuildupArea = this.SubmitForm.value.buildupArea;
    } else {
      this.data.BuildupArea = 0;
    }
    let temp: any = [];
    if (this.listingTypeId == 1) {
      for (let i = 0; i < this.petPolicyData.length; i++) {
        temp.push({ "PetPolicyId": this.petPolicyData[i] });
      }
      this.data.PetPolicies = temp;
      this.data.AvailableDate = $("#formDate").val();
      this.data.NoticePeriod = this.SubmitForm.value.noticePeriod;
      this.data.LockingPeriod = this.SubmitForm.value.lockingPeriod;
      this.data.PropertyTitle = this.SubmitForm.value.propertyTitle;
      this.data.PropertyDescription = this.SubmitForm.value.propertyDescription;
      this.data.PropertyOffer = this.SubmitForm.value.propertyOffers;
    }
    temp = [];
    for (let i = 0; i < this.locatedNearData.length; i++) {
      temp.push({ "LocatedNearId": this.locatedNearData[i] });
    }
    this.data.PropertyListingLocatedNears = temp;
    if (this.listingTypeId == 2) {
      this.data.HandoverOn = $("#sell-residential-datepicker").val();
    }
    this.data.PropertyPrice = this.SubmitForm.value.price;
    if (this.data.SecurityDeposit == "true") {
      this.data.SecurityDepositPrice = this.SubmitForm.value.AED;
    } else {
      this.data.SecurityDepositPrice = 0;
    }
    if (this.data.BrokerageCharge == "true") {
      this.data.BrokerageChargePrice = this.SubmitForm.value.brokerageAed;
    } else {
      this.data.BrokerageChargePrice = 0;
    }
    temp = [];
    for (let i = 0; i < this.featuresFormData.length; i++) {
      temp.push({ PropertyFeatureId: this.featuresFormData[i] });
    }
    this.data.PropertyFeatures = temp;
    localStorage.setItem('propertyData', JSON.stringify(this.data));
    localStorage.setItem('listingData', JSON.stringify(this.data));
    // this.route.navigate(['listpropertymedia'])
    console.log(this.data);
  }
}