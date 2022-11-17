import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../service/auth.service";
import { Router } from "@angular/router";
import { NotificationService } from "../../service/notification.service";
import { disableDebugTools } from "@angular/platform-browser";
import { AppService } from 'src/app/service/app.service';
import { F } from '@angular/cdk/keycodes';
import { Select2 } from 'select2';
@Component({
  selector: 'app-listpropertyinfo',
  templateUrl: './listpropertyinfo.component.html',
  styleUrls: ['./listpropertyinfo.component.scss']
})
export class ListpropertyinfoComponent implements OnInit, AfterViewInit {

  error: any = ""
  showError: boolean = false;
  errorResponse(data: any) {
    this.showError = false;
    this.animate();
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
  developerData: any = [];
  locatedNearData: any = [];
  rentTypes: any;
  room: any = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  featuresData: any = [];
  featuresFormData: any = [];
  minDate = new Date();
  propertyListingBuy: any;
  propertyListingRent: any;
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
  developer: any = [];
  locatedNear: any = [];
  ownershipType: any = [{ id: 1, name: "Freehold" }, { id: 2, name: "Leasehold" }];
  currentField: any;
  showLoader: boolean = false;
  SubmitForm = new FormGroup({
    PropertyAge: new FormControl("", [Validators.required]),
    BuildingName: new FormControl("", [Validators.required]),
    UnitNo: new FormControl("", [Validators.required]),
    TotalFloor: new FormControl("", [Validators.required]),
    FloorNo: new FormControl("", [Validators.required]),
    propertyTitle: new FormControl("", [Validators.required]),
    carpetArea: new FormControl("", [Validators.required]),
    buildupArea: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required]),
    maintenance: new FormControl("", [Validators.required]),
    AED: new FormControl(""),
    brokerageAed: new FormControl("",),
    availablefrom: new FormControl("", [Validators.required]),
    handOverOn: new FormControl("", [Validators.required]),
    noticePeriod: new FormControl("", [Validators.required]),
    lockingPeriod: new FormControl("", [Validators.required]),
    propertyDescription: new FormControl("", [Validators.required]),
    propertyOffers: new FormControl(""),
  });
  get validate() {
    return this.SubmitForm.controls;
  }
  disabled: any = [];
  constructor(private api: AppService, private service: AuthService, private route: Router, private notifyService: NotificationService) {
    this.api.PropertyListingRentBuy({ "Lat": this.data.PropertyLat, "Long": this.data.PropertyLong }).subscribe((result: any) => {
      this.propertyListingBuy = result.data.propertyListingBuy;
      this.propertyListingRent = result.data.propertyListingRent;
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
  loadFurnishingType() {
    this.api.FurnishingTypes().subscribe((result: any) => {
      this.furnishingType = result.data;
      if (this.data.PropertyTypeId != 29) {
        let temp: any = [];
        for (let i = 0; i < this.furnishingType.length; i++) {
          if (this.furnishingType[i].name != "ShellAndCore") {
            temp.push(this.furnishingType[i]);
          }
        }
        this.furnishingType = temp;
      }
    })
  }
  ngAfterViewInit(): void {
  }
  ngOnInit() {
    $(".start-date-input").on("click", function () {
      $(this).find(".mat-datepicker-toggle").click();
    })
  }
  loadOldData() {
    if (localStorage.getItem("propertyData")) {
      let temp: any = localStorage.getItem("propertyData");
      this.data = JSON.parse(temp);
      this.api.DeveloperbyCountry(this.data.CountryId).subscribe((result: any) => {
        this.developer = result.data;
      })
      
      if (localStorage.getItem("listingData")) {
        temp = localStorage.getItem("listingData");
        this.data = JSON.parse(temp);
        this.developerData = this.data.PropertyDeveloperId;
        console.log(this.data);
        this.listingTypeId = this.data.PropertyListingTypeId;
        if (this.listingTypeId == 2) {
          this.api.PropertyTransactionTypes().subscribe((result: any) => {
            this.transactionType = result.data;
          })
          this.api.LoadCompletionStatus().subscribe((result: any) => {
            this.completionStatus = result.data;
          })
        }
        this.clearData();

        if (this.data.PetPolicies) {
          for (let i = 0; i < this.data.PetPolicies.length; i++) {
            this.petPolicyData.push(this.data.PetPolicies[i].PetPolicyId)
          }
        }
        if (this.data.PropertyListingLocatedNears) {
          for (let i = 0; i < this.data.PropertyListingLocatedNears.length; i++) {
            this.locatedNearData.push(this.data.PropertyListingLocatedNears[i].LocatedNearId)
          }
        }
        if (this.data.PropertyFeatures) {
          for (let i = 0; i < this.data.PropertyFeatures.length; i++) {
            this.featuresFormData.push(this.data.PropertyFeatures[i].PropertyFeatureId)
          }
        }

        this.showLoader = true;
        this.categoryID = this.data.PropertyCategoryId;
        this.api.LoadType(this.data.PropertyCategoryId).subscribe((result) => {
          this.propertyType = result;
          this.propertyType = this.propertyType.data
          this.showLoader = false;
          this.selectedPropertyType = this.propertyType.filter((item: any) => item.id == this.data.PropertyTypeId)[0];
          this.propertyTypeCheck = true;
          this.api.PropertyFeatures(this.selectedPropertyType.id).subscribe((result: any) => {
            this.featuresData = result.data;
            this.showLoader = false;
            let interval: any = setInterval(() => {
              if (this.featuresData.length > 0) {
                for (let i = 0; i < this.data.PropertyFeatures.length; i++) {
                  $(".features-item-" + this.data.PropertyFeatures[i].PropertyFeatureId).attr("selected", "selected");
                }
                $('.select2').select2({ placeholder: "Click here to add more" });
                clearInterval(interval);
              }
            }, 100);
          });
          this.SubmitForm.patchValue({
            PropertyAge: this.data.PropertyAge,
            BuildingName: this.data.BuildingName,
            UnitNo: this.data.UnitNo
          })
          if (this.selectedPropertyType.hasTotalFloor) {
            this.SubmitForm.patchValue({
              TotalFloor: this.data.TotalFloor
            })
          }
          if (this.selectedPropertyType.hasTotalFloor) {
            this.SubmitForm.patchValue({
              TotalFloor: this.data.TotalFloor
            })
          }
          if (this.selectedPropertyType.hasFloorNo) {
            this.SubmitForm.patchValue({
              FloorNo: this.data.FloorNo
            })
          }
          if (this.selectedPropertyType.hasCarpetArea) {
            this.SubmitForm.patchValue({
              carpetArea: this.data.CarpetArea
            })
          }
          if (this.selectedPropertyType.hasBuildUpArea) {
            this.SubmitForm.patchValue({
              buildupArea: this.data.BuildupArea
            })
          }
          if (this.data.SecurityDeposit == "true") {
            this.SubmitForm.patchValue({
              AED: this.data.SecurityDepositPrice
            })
          }
          if (this.data.BrokerageCharge == "true") {
            this.SubmitForm.patchValue({
              brokerageAed: this.data.BrokerageChargePrice
            })
          }
          if (this.data.AvailableDate) {
            let temp: any = new Date(this.data.AvailableDate);
            this.SubmitForm.patchValue({
              availablefrom: temp
            })
          }
          if (this.data.HandoverOn) {
            let temp: any = new Date(this.data.HandoverOn);
            this.SubmitForm.patchValue({
              handOverOn: temp
            })
          }
          if (this.data.NoticePeriod) {
            this.SubmitForm.patchValue({
              noticePeriod: this.data.NoticePeriod
            })
          }
          if (this.data.LockingPeriod) {
            this.SubmitForm.patchValue({
              lockingPeriod: this.data.LockingPeriod
            })
          }
          if (this.data.PropertyTitle) {
            this.SubmitForm.patchValue({
              propertyTitle: this.data.PropertyTitle
            })
          }
          if (this.data.PropertyDescription) {
            this.SubmitForm.patchValue({
              propertyDescription: this.data.PropertyDescription
            })
          }
          if (this.data.PropertyOffer) {
            this.SubmitForm.patchValue({
              propertyOffers: this.data.PropertyOffer
            })
          }
          this.SubmitForm.patchValue({
            price: this.data.PropertyPrice
          })
        });
      }
    } else {
      this.route.navigate(['/add-property/listingproperty'])
    }
  }
  validateInput(e: any) {
    // if (e.key.charCodeAt(0) >= 48 && e.key.charCodeAt(0) <= 57 || e.key.charCodeAt(0) >= 65 && e.key.charCodeAt(0) <= 90 || e.key.charCodeAt(0) >= 97 && e.key.charCodeAt(0) <= 122) {
    if (e.key.charCodeAt(0) >= 48 && e.key.charCodeAt(0) <= 57 || e.key.charCodeAt(0) == 44 || e.key.charCodeAt(0) == 46) {
      setTimeout(() => {
        this.getInput(e.key, true);
      }, 100);
    }
  }
  getInput(e: any, type: boolean) {
    if (!type) {
      let temp: any = this.SubmitForm.value.UnitNo
      this.SubmitForm.patchValue({
        UnitNo: temp.toString().slice(0, -1)
      })
    } else {
      let temp: any = this.SubmitForm.value.UnitNo
      this.SubmitForm.patchValue({
        UnitNo: temp.toString() + e
      })
    }
  }
  validateLength(type: any) {
    if (type == 1) {
      let temp: any = this.SubmitForm.value.PropertyAge;
      if (temp.toString().length > 10) {
        this.SubmitForm.patchValue({
          PropertyAge: temp.toString().slice(0, -1)
        })
      }
    } else if (type == 2) {
      let temp: any = this.SubmitForm.value.UnitNo;
      if (temp.toString().length > 10) {
        this.SubmitForm.patchValue({
          UnitNo: temp.toString().slice(0, -1)
        })
      }
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
        let a = setInterval(() => {
        }, 50);
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
      this.propertyType = this.propertyType.data;
      this.showLoader = false;
    });
    this.clearData();
  }
  getBedroom(e: any) {
    this.bedroomCheck = true;
    this.data.BedRooms = e.value;
  }
  animate() {
    let temp: any = $("." + this.currentField).offset()?.top;
    $("." + this.currentField).addClass("blink");
    $("." + this.currentField).on("click", () => {
      $("." + this.currentField).removeClass("blink");
      this.currentField = "";
    })
    $(window).scrollTop(temp - 100);
  }
  getBathroom(e: any) {
    this.bathroomCheck = true;
    this.data.BathRooms = e.value;
  }
  getPropertyType(e: any) {
    this.selectedPropertyType = this.propertyType.filter((item: any) => item.id == e.value)[0];
    console.log(this.selectedPropertyType);
    this.propertyTypeCheck = true;
    this.data.PropertyTypeId = e.value;
    this.loadFurnishingType();
    this.api.PropertyFeatures(this.selectedPropertyType.id).subscribe((result: any) => {
      this.featuresData = result.data;
      let a = setInterval(() => {
        if (this.featuresData.length > 0) {
          $('.select2').select2();
          $('.features-select').select2({
            placeholder: "Select Features"
          });
          clearInterval(a);
        }
      }, 50);
    });
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
  getPolicyOption(e: any) {
    if (e == 0 && this.disabled.length == 0) {
      this.petPolicyData = ["1"];
      this.disabled = [1, 2, 3];
    } else {
      this.disabled = [];
    }
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
  getDeveloper(e: any) {
    this.data.PropertyDeveloperId = e.value;
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
  validateAgeInput(e: any) {
    if (e.key.charCodeAt(0) >= 48 && e.key.charCodeAt(0) <= 57) {
      setTimeout(() => {
        this.getValue(e.key, true);
      }, 100);
    }
  }
  getValue(e: any, type: boolean) {
    if (!type) {
      let temp: any = this.SubmitForm.value.PropertyAge
      this.SubmitForm.patchValue({
        PropertyAge: temp.toString().slice(0, -1)
      })
    } else {
      let temp: any = this.SubmitForm.value.PropertyAge
      this.SubmitForm.patchValue({
        PropertyAge: temp.toString() + e
      })
    }
  }
  validatePriceInput(e: any) {
    if (e.key.charCodeAt(0) >= 48 && e.key.charCodeAt(0) <= 57) {
      setTimeout(() => {
        console.log(e.key);
        this.getPriceValue(e.key, true);
      }, 100);
    }
  }
  getPriceValue(e: any, type: boolean) {
    if (!type) {
      let temp: any = this.SubmitForm.value.price
      this.SubmitForm.patchValue({
        price: temp.toString().slice(0, -1)
      })
    } else {
      let temp: any = this.SubmitForm.value.price
      this.SubmitForm.patchValue({
        price: temp.toString() + e
      })
    }
  }
  validateNoticeInput(e: any) {
    if (e.key.charCodeAt(0) >= 48 && e.key.charCodeAt(0) <= 57) {
      setTimeout(() => {
        console.log(e.key);
        this.getNoticeValue(e.key, true);
      }, 100);
    }
  }
  getNoticeValue(e: any, type: boolean) {
    if (!type) {
      let temp: any = this.SubmitForm.value.noticePeriod
      this.SubmitForm.patchValue({
        noticePeriod: temp.toString().slice(0, -1)
      })
    } else {
      let temp: any = this.SubmitForm.value.noticePeriod
      this.SubmitForm.patchValue({
        noticePeriod: temp.toString() + e
      })
    }
  }
  validateLockingInput(e: any) {
    if (e.key.charCodeAt(0) >= 48 && e.key.charCodeAt(0) <= 57) {
      setTimeout(() => {
        console.log(e.key);
        this.getLockingValue(e.key, true);
      }, 100);
    }
  }
  getLockingValue(e: any, type: boolean) {
    if (!type) {
      let temp: any = this.SubmitForm.value.lockingPeriod
      this.SubmitForm.patchValue({
        lockingPeriod: temp.toString().slice(0, -1)
      })
    } else {
      let temp: any = this.SubmitForm.value.lockingPeriod
      this.SubmitForm.patchValue({
        lockingPeriod: temp.toString() + e
      })
    }
  }
  onSubmit() {
    if ($(".features-select").length > 0 && this.selectedPropertyType.hasPropertyFeature && this.featuresData.length > 0 ) {
      this.featuresFormData = $(".features-select").val();
    }
    if (this.listingTypeId == 0) {
      this.currentField = "listing-type-input";
      this.error = "Select Listing Type";
      this.showError = true;
      return;
    } else if (this.categoryID == 0) {
      this.currentField = "category-input";
      this.error = "Select Category ID";
      this.showError = true;
      return;
    } else if (!this.data.PropertyTypeId) {
      this.currentField = "type-input";
      this.error = "Select Property Type";
      this.showError = true;
      return;
    } else if (this.selectedPropertyType.hasPropertyAge && this.SubmitForm.value.PropertyAge == "") {
      this.currentField = "property-age-input";
      this.error = "Enter Property Age";
      this.showError = true;
      return;
    } else if (this.selectedPropertyType.hasBuilding && this.SubmitForm.value.BuildingName == "") {
      this.currentField = "building-name-input";
      this.error = "Enter Building Name";
      this.showError = true;
      return;
    } else if (this.SubmitForm.value.UnitNo == "") {
      this.currentField = "unit-no-input";
      this.error = "Enter Unit No";
      this.showError = true;
      return;
    } else if (this.SubmitForm.value.TotalFloor == "" && this.selectedPropertyType.hasTotalFloor) {
      this.currentField = "total-floors-input";
      this.error = "Enter Total Floors";
      this.showError = true;
      return;
    } else if (this.SubmitForm.value.FloorNo == "" && this.selectedPropertyType.hasFloorNo) {
      this.currentField = "floor-no-input";
      this.error = "Enter Floors No.";
      this.showError = true;
      return;
    } else if (this.selectedPropertyType.hasBed && !this.data.BedRooms) {
      this.currentField = "bedroom-input";
      this.error = "Select Bedrooms";
      this.showError = true;
      return;
    } else if (this.selectedPropertyType.hasBath && !this.data.BathRooms) {
      this.currentField = "bathroom-input";
      this.error = "Select BathRooms";
      this.showError = true;
      return;
    } else if (this.selectedPropertyType.hasFurnishing && !this.data.FurnishingType) {
      this.currentField = "furnishing-input";
      this.error = "Select Furnishing Type";
      this.showError = true;
      return;
    } else if (this.selectedPropertyType.hasFitting && !this.data.FittingType) {
      this.currentField = "fitting-input";
      this.error = "Select Fitting Type";
      this.showError = true;
      return;
    } else if (this.selectedPropertyType.hasCarpetArea && this.SubmitForm.value.carpetArea == "") {
      this.currentField = "carpet-input";
      this.error = "Enter Carpet Area";
      this.showError = true;
      return;
    } else if (this.selectedPropertyType.hasBuildUpArea && this.SubmitForm.value.buildupArea == "") {
      this.currentField = "buildup-input";
      this.error = "Enter BuildUp Area";
      this.showError = true;
      return;
    } else if (!this.data.TenantTypeId && this.listingTypeId == 1) {
      this.currentField = "tenant-input";
      this.error = "Select Tenant Type";
      this.showError = true;
      return;
    } else if (!this.data.Gender && this.listingTypeId == 1 && this.data.TenantTypeId == 2) {
      this.currentField = "gender-input";
      this.error = "Select Gender";
      this.showError = true;
      return;
    } else if (!this.data.PropertyManageId && this.listingTypeId == 1) {
      this.currentField = "property-manage-input";
      this.error = "Select Property Manager";
      this.showError = true;
      return;
    } else if (this.listingTypeId == 1 && !this.data.OccupancyStatusId) {
      this.currentField = "occupanycy-input";
      this.error = "Select Occupancy Status";
      this.showError = true;
      return;
    } else if (this.categoryID == 1 && !this.data.Balcony) {
      this.currentField = "balcony-input";
      this.error = "Select Balcony";
      this.showError = true;
      return;
    } else if (this.categoryID == 1 && !this.data.Parkings) {
      this.currentField = "parking-input";
      this.error = "Select Parking";
      this.showError = true;
      return;
    } else if (this.listingTypeId == 2 && !this.data.PropertyTransactionTypeId) {
      this.currentField = "transaction-type-input";
      this.error = "Select Transaction Type";
      this.showError = true;
      return;
    } else if (this.listingTypeId == 2 && !this.data.PropertyCompletionStatusId) {
      this.currentField = "completion-status-input";
      this.error = "Select Completetion Status";
      this.showError = true;
      return;
    } else if (this.listingTypeId == 1 && this.petPolicyData.length == 0) {
      this.currentField = "pet-policy-input";
      this.error = "Select Pet Policy";
      this.showError = true;
      return;
    } else if (this.listingTypeId == 2 && $("#sell-residential-datepicker").val() == "") {
      this.currentField = "handover-on-input";
      this.error = "Enter Handover Date";
      this.showError = true;
      return;
    } else if (this.listingTypeId == 2 && this.categoryID == 2 && !this.data.ownershipType) {
      this.currentField = "ownership-input";
      this.error = "Select Ownership Type";
      this.showError = true;
      return;
    } else if (this.SubmitForm.value.price == "") {
      this.currentField = "price-input";
      this.error = "Enter Price";
      this.showError = true;
      return;
    } else if (this.selectedPropertyType.hasMaintenanceCharges && this.SubmitForm.value.maintenance == "") {
      this.currentField = "maintenance-input";
      this.error = "Enter Maintenance Price";
      this.showError = true;
      return;
    } else if (this.listingTypeId == 1 && !this.data.RentTypeId) {
      this.currentField = "rent-type-input";
      this.error = "Select Rent Type";
      this.showError = true;
      return;
    } else if (this.listingTypeId == 1 && !this.data.SecurityDeposit) {
      this.currentField = "security-deposit-input";
      this.error = "Select Security Deposit";
      this.showError = true;
      return;
    } else if (this.data.SecurityDeposit == "true" && this.SubmitForm.value.AED == "") {
      this.currentField = "security-price-input";
      this.error = "Enter Security Deposit Price";
      this.showError = true;
      return;
    } else if (this.listingTypeId == 1 && !this.data.BrokerageCharge) {
      this.currentField = "brokage-type-input";
      this.error = "Select Brokerage Type";
      this.showError = true;
      return;
    } else if (this.data.BrokerageCharge == "true" && this.SubmitForm.value.brokerageAed == "") {
      this.currentField = "brokage-price-input";
      this.error = "Enter Brokerage Price";
      this.showError = true;
      return;
    } else if (this.listingTypeId == 1 && this.SubmitForm.value.availablefrom == "") {
      this.currentField = "available-input";
      this.error = "Enter Available Date";
      this.showError = true;
      return;
    } else if (this.listingTypeId == 1 && this.SubmitForm.value.noticePeriod == "") {
      this.currentField = "notice-input";
      this.error = "Enter Notice Days";
      this.showError = true;
      return;
    } else if (this.listingTypeId == 1 && this.SubmitForm.value.lockingPeriod == "") {
      this.currentField = "locking-input";
      this.error = "Enter Locking Days";
      this.showError = true;
      return;
    } else if (this.locatedNearData.length == 0) {
      this.currentField = "located-near-input";
      this.error = "Select Near Location";
      this.showError = true;
      return;
    } else if (this.listingTypeId == 1 && this.SubmitForm.value.propertyTitle == "") {
      this.currentField = "title-input";
      this.error = "Enter Property Title";
      this.showError = true;
      return;
    } else if (this.listingTypeId == 1 && this.SubmitForm.value.propertyDescription == "") {
      this.error = "Enter Property Description";
      this.showError = true;
      return;
    } else if (this.selectedPropertyType.hasPropertyFeature && this.featuresFormData.length == 0) {
      this.currentField = "features-select-wrapper";
      this.error = "Select Property Features";
      this.showError = true;
      return;
    }
    this.data.PropertyAge = this.SubmitForm.value.PropertyAge;
    this.data.BuildingName = this.SubmitForm.value.BuildingName;
    this.data.UnitNo = this.SubmitForm.value.UnitNo;
    let userData: any = localStorage.getItem("user");
    userData = JSON.parse(userData);
    if (this.data.RentTypeId == 1) {
      this.data.StartDate = $("#startDate").val();
      this.data.EndDate = $("#endDate").val();
    }
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
    if (this.selectedPropertyType.hasMaintenanceCharges) {
      this.data.MaintenanceCharges = this.SubmitForm.value.maintenance;
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
    this.route.navigate(['/add-property/listpropertymedia'])
  }
}