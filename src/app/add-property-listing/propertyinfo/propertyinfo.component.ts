import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
import { NotificationService } from "../../service/notification.service";
import { AppService } from 'src/app/service/app.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter, pairwise, ReplaySubject, Subject, takeUntil } from 'rxjs';

declare const google: any;

@Component({
  selector: 'app-propertyinfo',
  templateUrl: './propertyinfo.component.html',
  styleUrls: ['./propertyinfo.component.scss']
})
export class PropertyinfoComponent implements OnInit {

  response = "";
  error: any = ""
  showError: boolean = false;
  errorResponse(data: any) {
    this.showError = false;
    this.animate();
  }
  map: any;
  @ViewChild('propertyDetails__map') mapElement: any;

  searchLocaation: any;
  @ViewChild('searchLocation') searchElement: any;

  Locate = '../../../../assets/images/icons/locate.svg'
  editListingData: any = {};
  routeId: any = 0;
  country: any = [];
  city: any = [];
  messageclass = ''
  message = ''
  Customerid: any;
  editdata: any;
  submitted = false;
  responsedata: any;
  oldData: any = "";
  countryId: number = -1;
  cityId: number = -1;
  districtId: any = -1;
  district: any = [];
  location = { lat: 25.2048, lng: 55.2708 };
  autocomplete: any;
  seachAddress: any
  data: any = {};
  marker: any;
  countryName: any;
  cityName: any;
  tempAddress: any;
  bounds: any;
  northEast: any;
  southWest: any;
  areabounds: any;
  options: any;
  locationSelected: boolean = false;
  showLoader: boolean = false;
  showMap: boolean = false;
  currentField: any;
  packagesType: any = [];
  selectedPackage: any = [];
  selectedPackageName: any = [];
  districtName: any;
  userData: any = localStorage.getItem("user");
  SubmitForm = new FormGroup({
    address: new FormControl("", Validators.required),
    countryId: new FormControl(null, Validators.required),
    cityId: new FormControl(null, Validators.required),
    districtId: new FormControl(null, Validators.required),
  });
  get validate() {
    return this.SubmitForm.controls;
  }

  public countryFilterCtrl: FormControl = new FormControl();
  public filteredCountries: any = new ReplaySubject(1);
  public cityFilterCtrl: FormControl = new FormControl();
  public filteredCities: any = new ReplaySubject(1);
  public districtFilterCtrl: FormControl = new FormControl();
  public filteredDistricts: any = new ReplaySubject(1);
  protected _onDestroy = new Subject();
  constructor(private router: ActivatedRoute, private route: Router, private notifyService: NotificationService, private service: AppService, private modalService: NgbModal, config: NgbModalConfig) {
    this.userData = JSON.parse(this.userData);
    this.route.events
      .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {

        if (events[0].urlAfterRedirects.includes('listpropertyinfo') || events[0].urlAfterRedirects.includes('listingproperty')
          || events[0].urlAfterRedirects.includes('listpropertymedia')) { }
        else {
          localStorage.removeItem("bounds");
          localStorage.removeItem("currency");
          localStorage.removeItem("arabicAddress");
          localStorage.removeItem("propertyData");
          localStorage.removeItem("lng");
          localStorage.removeItem("address");
          localStorage.removeItem("lat");
        }
      });

    this.router.params.subscribe((params: any) => {
      const isEmpty = Object.keys(params).length === 0
      if (isEmpty == false) {
        this.showLoader=true;
        this.routeId = params.id;
        this.service.DisplayPropertyListing({ "PropertyListingId": this.routeId, "LoginUserId": this.userData.id }).subscribe((result: any) => {
          if (result.data.user.id != this.userData.id) {
            this.route.navigate(["/"]);
          } else {
            this.editListingData = result.data.propertyListing;
            this.loadDataForEdit(this.editListingData);
          }
          this.showLoader=false;
        },(error:any)=>{
          this.showLoader=false;
        })
      }
    }
    );

    const selectedPackageByPoints = {
      "id": 1,
      "name": "Free",
      "nameAr": "مجاني",
      "price": 0,
      "active": true,
      "deleted": false,
      "propertyListingTypeId": 1,
      "validDays": 0,
      "numberOfPhoto": 10,
      "chat": true,
      "videoInListing": true,
      "liveVideoChat": false,
      "priority": 0,
      "emailProm": true,
      "ovaluateVerified": false,
      "videoTour360": true,
      "floorPlans": false,
      "agentScore": 0,
      "customizePackage": false,
      "propertyListingPackageFeatures": [
        {
          "id": 1,
          "detail": "01 Active Property Listing",
          "detailAr": "01 عقار فعال",
          "active": true,
          "deleted": false,
          "propertyListingPackageId": 1,
          "propertyListingPackageSubFeatures": []
        },
        {
          "id": 2,
          "detail": "Up to 30 days validity",
          "detailAr": "30 يوم فعالية ",
          "active": true,
          "deleted": false,
          "propertyListingPackageId": 1,
          "propertyListingPackageSubFeatures": []
        },
        {
          "id": 3,
          "detail": "Unlimited Leads",
          "detailAr": "غير محدودين",
          "active": true,
          "deleted": false,
          "propertyListingPackageId": 1,
          "propertyListingPackageSubFeatures": [
            {
              "id": 1,
              "detail": "Leads via Email",
              "detailAr": "عبر الايميل",
              "active": true,
              "deleted": false,
              "propertyListingPackageFeatureId": 3
            },
            {
              "id": 2,
              "detail": "Leads via Email",
              "detailAr": "عبر الايميل",
              "active": true,
              "deleted": false,
              "propertyListingPackageFeatureId": 3
            },
            {
              "id": 3,
              "detail": "Leads via Email",
              "detailAr": "عبر الايميل",
              "active": true,
              "deleted": false,
              "propertyListingPackageFeatureId": 3
            }
          ]
        },
        {
          "id": 4,
          "detail": "Display 4 Photos on the Listing",
          "detailAr": "عرض 4 صور للعقار",
          "active": true,
          "deleted": false,
          "propertyListingPackageId": 1,
          "propertyListingPackageSubFeatures": []
        }
      ],
      "propertyListingType": null
    }
    localStorage.setItem("seletedPackage", JSON.stringify(selectedPackageByPoints));
    if (!localStorage.getItem("user")) {
      this.notifyService.showError("You need to register/login", "");
      this.route.navigate(["/login"]);
    }
    // this.service.PropertyListingPackages(1).subscribe((result: any) => {
    //   this.packagesType = result.data;
    // })

    // this.service.PointTransaction(335).subscribe((result: any) => {
    //   if (result.message == "Points Transaction has been fetched successfully") {
    //     for (let i = 0; i < result.data.length; i++) {
    //       this.selectedPackageName.push(result.data[i].point.id);
    //     }
    //   }
    // })
    this.loadCountriesData();
    this.options = {
      bounds: [],
      strictBounds: true,
    };
    if (this.routeId == 0) {
      this.loadSavedData();
    }
    
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnDestroy() {
    this._onDestroy.next("");
    this._onDestroy.complete();
  }
  ngOnInit(): void {
    this.SubmitForm.controls['countryId'].valueChanges.subscribe(x => {
      this.onCountrySelect(x);
    })
    this.SubmitForm.controls['cityId'].valueChanges.subscribe(x => {
      this.onCitySelect(x);
    })
    this.SubmitForm.controls['districtId'].valueChanges.subscribe(x => {
      this.onDistrictSelect(x);
    })

    this.filteredCountries.next(this.country.slice());
    this.countryFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCountries();
      });
    this.filteredCities.next(this.city.slice());
    this.cityFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCities();
      });
    this.filteredDistricts.next(this.district.slice());
    this.districtFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterDistricts();
      });
  }
  ngAfterViewInit(): void {
   
      this.getLocation();
    
  }
  filterCountries() {
    if (!this.country) {
      return;
    }

    let search = this.countryFilterCtrl.value;
    if (!search) {
      this.filteredCountries.next(this.country.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredCountries.next(
      this.country.filter((x: any) => x.viewValue.toLowerCase().indexOf(search) > -1)
    );
  }
  filterCities() {
    if (!this.city) {
      return;
    }

    let search = this.cityFilterCtrl.value;
    if (!search) {
      this.filteredCities.next(this.city.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredCities.next(
      this.city.filter((x: any) => x.viewValue.toLowerCase().indexOf(search) > -1)
    );
  }
  filterDistricts() {
    if (!this.district) {
      return;
    }

    let search = this.districtFilterCtrl.value;
    if (!search) {
      this.filteredDistricts.next(this.district.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredDistricts.next(
      this.district.filter((x: any) => x.viewValue.toLowerCase().indexOf(search) > -1)
    );
  }
  // checkPackage(e:any) {
  //   if(this.selectedPackageName.indexOf(e) != -1) {
  //     return true;
  //   } else {
  //     return false
  //   }
  // }
  loadSavedData() {
    if (localStorage.getItem("propertyData")) {
      this.showMap = true;
      this.oldData = localStorage.getItem("propertyData");
      this.oldData = JSON.parse(this.oldData);
      this.routeId = this.oldData.id != null || this.oldData.id != undefined ? this.oldData.id : 0;
      console.log(this.oldData,this.routeId)
      this.SubmitForm.patchValue({
        address: this.oldData.PropertyAddress,
      })
      this.countryId = this.oldData.CountryId;
      this.SubmitForm.controls['countryId'].patchValue(this.oldData.CountryId, { emitEvent: false, onlySelf: true });
      this.service.LoadCities(this.countryId).subscribe(e => {
        let temp: any = e;
        if (temp.message == "City list fetched successfully") {
          for (let city of temp.data) {
            this.city.push({ viewValue: city.name, value: city.id });
          }
          this.filteredCities.next(this.city)
          this.cityId = this.oldData.CityId;
          this.SubmitForm.controls['cityId'].patchValue(this.oldData.CityId, { emitEvent: false, onlySelf: true });
          this.service.LoadDistrict(this.cityId).subscribe(e => {
            let temp: any = e;
            if (temp.result == 1) {
              for (let district of temp.data) {
                this.district.push({ viewValue: district.name, value: district.id });
              }
              this.showLoader = false;
              this.filteredDistricts.next(this.district)
            }
          });
          this.districtId = this.oldData.DistrictId;
          this.SubmitForm.controls['districtId'].patchValue(this.oldData.DistrictId, { emitEvent: false, onlySelf: true });
        }
        if(this.routeId!=0){
          this.SubmitForm.get('countryId')?.disable({emitEvent:false,onlySelf:true});
          this.SubmitForm.get('cityId')?.disable({emitEvent:false,onlySelf:true});
          this.SubmitForm.get('districtId')?.disable({emitEvent:false,onlySelf:true});
          this.SubmitForm.get('address')?.disable({emitEvent:false,onlySelf:true});
        }
      });
    }
  }
  loadDataForEdit(object: any) {
    let districtName = object.district?.name;
    let currencyType=object.country?.currency;
    let oldData: any = {}
    oldData.id = object.id;
    oldData.PackageId = object.packageId;
    oldData.CountryId = object.countryId;
    oldData.CityId = object.cityId;
    oldData.DistrictId = object.districtId;
    oldData.PropertyAddress = object.propertyAddress;
    oldData.PropertyAddressArabic = object.propertyAddressArabic;
    oldData.PropertyLat = object.propertyLat;
    oldData.PropertyLong = object.propertyLong;
    oldData.PropertyListingTypeId = object.propertyListingTypeId;
    oldData.PropertyTitle = object.propertyTitle;
    oldData.PropertyAge = object.propertyAge;
    oldData.BedRooms = object.bedrooms;
    oldData.BathRooms = object.bathrooms;
    oldData.BuildingName = object.buildingName;
    oldData.PropertyTransactionTypeId = object.propertyTransactionTypeId;
    oldData.PropertyCategoryId = object.propertyCategoryId;
    oldData.PropertyTypeId = object.propertyTypeId;
    let FurnishingTypeId = 0;
    if (object.furnishingType == "Furnished") {
      FurnishingTypeId = 1;
    }
    else if (object.furnishingType == "Unfurnished") {
      FurnishingTypeId = 2;
    }
    else if (object.furnishingType == "SemiFurnished") {
      FurnishingTypeId = 3;
    }
    else if (object.furnishingType == "ShellAndCore") {
      FurnishingTypeId = 4;
    }
    oldData.FurnishingType = FurnishingTypeId;
    let FittingTypeId = 0;
    if (object.fittingType == "None") {
      FittingTypeId = 1;
    }
    else if (object.fittingType == "Fitted") {
      FittingTypeId = 2;
    }
    oldData.FittingType = FittingTypeId;
    oldData.OccupancyStatusId = object.occupancyStatusId;
    oldData.Parkings = object.parkings;
    oldData.Balcony = object.balcony;
    oldData.CarpetArea = object.carpetArea;
    oldData.BuildupArea = object.buildupArea;
    oldData.PlotSize = object.plotSize;
    oldData.PropertyPrice = object.propertyPrice;
    oldData.RentTypeId = object.rentTypeId;
    oldData.SecurityDeposit = object.securityDeposit.toString();
    oldData.SecurityDepositPrice = object.securityDepositPrice;
    oldData.BrokerageCharge = object.brokerageCharge.toString();
    oldData.BrokerageChargePrice = object.brokerageChargePrice;
    oldData.PropertyOffer = object.propertyOffer;
    oldData.PropertyDescription = object.propertyDescription;
    oldData.MaintenanceCharges = object.maintenanceCharges;
    oldData.PropertyCompletionStatusId = object.propertyCompletionStatusId;
    oldData.UserId = object.userId;
    oldData.YoutubeUrl = object.youtubeUrl;
    oldData.TourUrl = object.tourUrl;
    oldData.ProfessionalTypeId = object.professionalTypeId;
    oldData.CompanyId = object.companyId;
    oldData.StartDate = object.startDate;
    oldData.EndDate = object.endDate;
    oldData.PropertyDeveloperId = object.propertyDeveloperId;
    oldData.PropertyListingStatusId = object.propertyListingStatusId;
    oldData.UnitNumber = object.unitNumber;
    let temp:any = [];
    object.propertyFeatures?.forEach((x: any) => {
      temp.push({
        PropertyFeatureId: x.propertyFeatureId
      })
    })
    oldData.PropertyFeatures=temp;
    temp=[];
    object.propertyListingLocatedNears?.forEach((x:any)=>{
      temp.push({
        LocatedNearId:x.locatedNearId
      })
    })
    oldData.PropertyListingLocatedNears=temp;
    temp=[];
    object.documents?.forEach((x:any)=>{
      temp.push({
        Id:x.id,
        ListingDocumentTypeId:x.listingDocumentTypeId,
        FileName:x.fileName,
        Extension:x.extension,
        FileUrl:x.fileUrl
      })
    })
    oldData.Documents=temp;

    this.SubmitForm.patchValue({
      address: oldData.PropertyAddress,
    })
    this.countryId = oldData.CountryId;
    console.log(this.countryId)
    this.SubmitForm.controls['countryId'].patchValue(oldData.CountryId, { emitEvent: false, onlySelf: true });
    this.service.LoadCities(this.countryId).subscribe(e => {
      let temp: any = e;
      if (temp.message == "City list fetched successfully") {
        for (let city of temp.data) {
          this.city.push({ viewValue: city.name, value: city.id });
        }
        this.filteredCities.next(this.city)
        this.cityId = oldData.CityId;
        this.SubmitForm.controls['cityId'].patchValue(oldData.CityId, { emitEvent: false, onlySelf: true });
        this.service.LoadDistrict(this.cityId).subscribe(e => {
          let temp: any = e;
          if (temp.result == 1) {
            for (let district of temp.data) {
              this.district.push({ viewValue: district.name, value: district.id });
            }
            this.filteredDistricts.next(this.district)
          }
        });
        this.districtId = oldData.DistrictId;
        this.SubmitForm.controls['districtId'].patchValue(oldData.DistrictId, { emitEvent: false, onlySelf: true });
        this.getLocationDetails(districtName, true);
        this.showMap = true;
        localStorage.setItem("address", oldData.PropertyAddress);
        localStorage.setItem("lat", oldData.PropertyLat);
        localStorage.setItem("lng", oldData.PropertyLong);
        localStorage.setItem("arabicAddress", oldData.PropertyAddressArabic);
        localStorage.setItem("currency", currencyType);
      }
    
        this.SubmitForm.get('countryId')?.disable({emitEvent:false,onlySelf:true});
        this.SubmitForm.get('cityId')?.disable({emitEvent:false,onlySelf:true});
        this.SubmitForm.get('districtId')?.disable({emitEvent:false,onlySelf:true});
        this.SubmitForm.get('address')?.disable({emitEvent:false,onlySelf:true});
        localStorage.setItem('propertyData', JSON.stringify(oldData))
    });
  }
  // changeInfo() {
  //   $("#searchLocation").focus();
  //   let temp: any = $("#searchLocation").offset();
  //   temp = temp.top;
  //   $(window).scrollTop(temp - 200);
  // }
  loadCountriesData() {
    this.showLoader = true;
    this.service.LoadCountries().subscribe(e => {
      let temp: any = e;
      if (temp.message == "Country list fetched successfully") {
        for (let country of temp.data) {
          this.country.push({ viewValue: country.name, value: country.id, currency: country.currency });
        }
        this.showLoader = false;
        this.filteredCountries.next(this.country);
      }
    });
  }
  onCountrySelect(e: any) {
    if (e != 0) {
      localStorage.removeItem("bounds");
      localStorage.removeItem("currency");
      localStorage.removeItem("arabicAddress");
      localStorage.removeItem("propertyData");
      localStorage.removeItem("lng");
      localStorage.removeItem("address");
      localStorage.removeItem("lat");
      this.city = [];
      this.district = [];
      this.cityId = this.districtId = -1;
      this.showLoader = true;
      let temp = this.country.filter(function (c: any) {
        return c.value == e
      });
      this.countryName = temp[0].viewValue;
      localStorage.setItem("currency", temp[0].currency)
      this.countryId = e;
      this.city = [];
      this.service.LoadCities(e).subscribe(e => {
        let temp: any = e;
        if (temp.message == "City list fetched successfully") {
          for (let city of temp.data) {
            this.city.push({ viewValue: city.name, value: city.id });
          }
          this.showLoader = false;
          this.filteredCities.next(this.city);
          this.SubmitForm.controls['cityId'].patchValue(null, { emitEvent: false, onlySelf: true });
          this.SubmitForm.controls['districtId'].patchValue(null, { emitEvent: false, onlySelf: true });
        }
      });
    } else {
      this.city = [];
      this.district = [];
      this.countryId = -1;
      this.countryName = "";
    }
    this.showMap = false;
  }
  onCitySelect(e: any) {
    if (e != 0) {
      this.district = [];
      this.districtId = -1;
      let temp = this.city.filter(function (c: any) {
        return c.value == e
      })
      this.cityName = temp[0].viewValue;
      this.cityId = e;
      this.service.LoadDistrict(e).subscribe(e => {
        let temp: any = e;
        if (temp.message == "District list fetched successfully") {
          for (let district of temp.data) {
            this.district.push({ viewValue: district.name, value: district.id });
          }
          this.filteredDistricts.next(this.district);
          this.SubmitForm.controls['districtId'].patchValue(null, { emitEvent: false, onlySelf: true });
          this.showLoader = false;
        }
      });
    } else {
      this.district = [];
      this.cityId = -1;
      this.cityName = "";
    }
    this.showMap = false;
  }
  onDistrictSelect(e: any) {
    if (e != 0) {
      this.locationSelected = false;
      $("#searchLocation").val("");
      let temp = this.district.filter(function (c: any) {
        return c.value == e
      })
      this.getLocationDetails(temp[0].viewValue, true);
      this.districtName = temp[0].viewValue;
      this.districtId = e;
      this.showMap = true;
    } else {
      this.showMap = false;
      this.districtId = -1;
      this.districtName = "";
    }
  }

  onSubmit() {

    if (this.SubmitForm.get('countryId')?.hasError('required')) {
      this.currentField = "country-select";
      this.error = "Select Country";
      this.showError = true;
      return;
    } else if (this.SubmitForm.get('cityId')?.hasError('required')) {
      this.currentField = "city-select";
      this.error = "Select City";
      this.showError = true;
      return;
    } else if (this.SubmitForm.get('districtId')?.hasError('required')) {
      this.currentField = "district-select";
      this.error = "Select District";
      this.showError = true;
      return;
    } else if (this.SubmitForm.value.address?.trim() == "") {
      this.currentField = "add-adrees-sec";
      this.error = "Select Address";
      this.showError = true;
      return;
    }
    let existingData: any = localStorage.getItem('propertyData');
    existingData = JSON.parse(existingData);
    if (existingData != null && existingData != undefined) {
      let tempPackage: any = localStorage.getItem("seletedPackage");
      tempPackage = JSON.parse(tempPackage);
      existingData.PackageId = tempPackage.id;
      existingData.CountryId = this.countryId;
      existingData.CityId = this.cityId;
      existingData.DistrictId = this.districtId;
      let temp: any = document.getElementById("searchLocation");
      existingData.PropertyAddress = temp.value;
      existingData.PropertyAddressArabic = localStorage.getItem("arabicAddress");
      existingData.PropertyLat = localStorage.getItem("lat");
      existingData.PropertyLong = localStorage.getItem("lng");

      localStorage.setItem('propertyData', JSON.stringify(existingData))
    }
    else {
      let tempPackage: any = localStorage.getItem("seletedPackage");
      tempPackage = JSON.parse(tempPackage);
      this.data.PackageId = tempPackage.id;
      this.data.CountryId = this.countryId;
      this.data.CityId = this.cityId;
      this.data.DistrictId = this.districtId;
      let temp: any = document.getElementById("searchLocation");
      this.data.PropertyAddress = temp.value;
      this.data.PropertyAddressArabic = localStorage.getItem("arabicAddress");
      this.data.PropertyLat = localStorage.getItem("lat");
      this.data.PropertyLong = localStorage.getItem("lng");
      localStorage.setItem('propertyData', JSON.stringify(this.data))
    }
    this.route.navigate(['/add-property/listpropertyinfo'])
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

  onPlaceChanged() {
    let temp: any = document.getElementById("searchLocation");
    let address: any = temp.value;
    localStorage.setItem("address", address);
    $.ajax({
      url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyBPSEz52-AfPEVbmV_3yuGUGol_KiLb3GU&language=ar",
      method: "get",
      success: (res) => {
        let area = res.results[0].geometry.location;
        localStorage.setItem("lat", area.lat);
        localStorage.setItem("lng", area.lng);
        localStorage.setItem("arabicAddress", res.results[0].formatted_address);
        this.locationSelected = true;
        this.map = new google.maps.Map($(".property-details__map")[0], {
          center: area,
          zoom: 15,
        })
        this.marker = new google.maps.Marker({
          position: area,
          map: this.map,
          draggable: true,
        });
        google.maps.event.addListener(this.marker, 'dragend', (e: any) => {
          let pos: any = this.marker.getPosition();
          let geocoder = new google.maps.Geocoder();
          geocoder.geocode
            ({
              latLng: pos
            },
              (results: any, status: any) => {
                if (status == google.maps.GeocoderStatus.OK) {
                  localStorage.setItem("lat", e.latLng.lat());
                  localStorage.setItem("lng", e.latLng.lng());
                  $(".searchLocation").val(results[0].formatted_address);
                  localStorage.setItem("address", results[0].formatted_address);
                }
                else {
                  this.error = "Cannot determine address at this location.";
                  this.showError = true;
                }
              }
            );
        });
      }
    });
  }
  getLocationDetails(e: any, status: boolean) {
    $(".pac-container.pac-logo").remove();
    e = this.ReplaceAlphabets(e);
    $.ajax({
      url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + e + "&key=AIzaSyBPSEz52-AfPEVbmV_3yuGUGol_KiLb3GU",
      method: "get",
      success: (res) => {
        let temp: any = "";
        if (res.results[0]?.geometry.bounds) {
          temp = res.results[0].geometry.bounds;
        }
        if (temp != "" && temp != undefined && temp != null) {
          this.bounds = { east: temp.northeast.lng, west: temp.southwest.lng, north: temp.northeast.lat, south: temp.southwest.lat };
          localStorage.setItem("bounds", JSON.stringify(this.bounds));
          let northEast = new google.maps.LatLng(temp.northeast.lat, temp.northeast.lng);
          let southWest = new google.maps.LatLng(temp.southwest.lat, temp.southwest.lng);
          let areabounds = new google.maps.LatLngBounds(southWest, northEast);
          this.options.bounds = areabounds;
        }
        else {
          this.options.bounds = null
        }

        let area = res.results[0]?.geometry.location;
        if (area != null && area != undefined && area != "") {
          this.map = new google.maps.Map($(".property-details__map")[0], {
            center: area,
            zoom: 10,
            disableDefaultUI: true,
            restriction: {
              latLngBounds: this.bounds,
              strictBounds: true,
            },
          })
        }
        else {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position: GeolocationPosition) => {
                const pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                };
                area = pos;
              },
            );
          }
        }

        this.marker = new google.maps.Marker({
          position: area,
          map: this.map,

        });
        this.autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, this.options);
        this.autocomplete.addListener('place_changed', this.onPlaceChanged);
        if (temp != "" && temp != undefined && temp != null) {
          this.autocomplete.setBounds(this.bounds);
        }
        this.locationSelected = status;
      }
    });
  }
  geocodePosition(pos: any) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode
      ({
        latLng: pos
      },
        (results: any, status: any) => {
          if (status == google.maps.GeocoderStatus.OK) {
            $(".searchLocation").val(results[0].formatted_address);
          }
          else {
            this.error = "Cannot determine address at this location.";
            this.showError = true;
          }
        }
      );
  }
  getLocation() {
    if (this.oldData == "") {
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: null,
        zoom: 8,
        disableDefaultUI: true,
      })
      this.marker = new google.maps.Marker({
        position: null,
        map: this.map
      })
      this.autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement);
      this.autocomplete.addListener('place_changed', this.onPlaceChanged);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            this.map.setCenter(pos);
            this.marker = new google.maps.Marker({
              position: { lat: position.coords.latitude, lng: position.coords.longitude },
              map: this.map
            })
          },
        );
      }
    } else {
      let bounds: any = localStorage.getItem("bounds");
      bounds = JSON.parse(bounds);
      let northEast = new google.maps.LatLng(bounds.north, bounds.east);
      let southWest = new google.maps.LatLng(bounds.south, bounds.west);
      let areabounds = new google.maps.LatLngBounds(southWest, northEast);
      this.options.bounds = areabounds;
      let lat: any = localStorage.getItem("lat");
      let lng: any = localStorage.getItem("lng");
      this.map = new google.maps.Map($(".property-details__map")[0], {
        center: { "lat": parseFloat(lat), "lng": parseFloat(lng) },
        zoom: 8,
        disableDefaultUI: true,
        restriction: {
          latLngBounds: bounds,
          strictBounds: true,
        },
      });
      this.onPlaceChanged();
      this.autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, this.options);
      this.autocomplete.addListener('place_changed', this.onPlaceChanged);
      this.autocomplete.setBounds(this.bounds);
    }
  }

  ReplaceAlphabets(name: string): string {
    let newName = "";
    if (name.toLowerCase().includes('first')) {
      newName = name.toLowerCase().replace('first', '1');
    }
    else if (name.toLowerCase().includes('second')) {
      newName = name.toLowerCase().replace('second', '2');
    }
    else if (name.toLowerCase().includes('third')) {
      newName = name.toLowerCase().replace('third', '3');
    }
    else if (name.toLowerCase().includes('fourth') || name.toLowerCase().includes('forth')) {
      if (name.toLowerCase().includes('fourth')) {
        newName = name.toLowerCase().replace('fourth', '4');
      } else {
        newName = name.toLowerCase().replace('forth', '4');
      }
    }
    else if (name.toLowerCase().includes('fifth')) {
      newName = name.toLowerCase().replace('fifth', '5');
    }
    else if (name.toLowerCase().includes('sixth')) {
      newName = name.toLowerCase().replace('sixth', '6');
    }
    else if (name.toLowerCase().includes('seventh')) {
      newName = name.toLowerCase().replace('seventh', '7');
    }
    else if (name.toLowerCase().includes('eighth')) {
      newName = name.toLowerCase().replace('eighth', '8');
    }
    else if (name.toLowerCase().includes('ninth')) {
      newName = name.toLowerCase().replace('ninth', '9');
    }
    else if (name.toLowerCase().includes('tenth')) {
      newName = name.toLowerCase().replace('tenth', '10');
    }
    else {
      newName = name;
    }
    return newName;
  }
}