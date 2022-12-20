import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { NotificationService } from "../../service/notification.service";
import { AppService } from 'src/app/service/app.service';

declare const google: any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

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

  country: any = [];
  city: any = [];
  messageclass = ''
  message = ''
  Customerid: any;
  editdata: any;
  submitted = false;
  responsedata: any;
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
  locationInformation: any = {};
  bounds: any;
  northEast: any;
  southWest: any;
  areabounds: any;
  options: any;
  locationSelected: boolean = false;
  showLoader: boolean = false;
  showMap: boolean = false;
  currentField: any;
  id: any;
  userData: any = localStorage.getItem("user");
  listingData: any = "";
  propertyData:any = {};

  constructor(private router: ActivatedRoute, private route: Router, private notifyService: NotificationService, private service: AppService) {
    this.userData = JSON.parse(this.userData);
    this.router.params.subscribe((params:any) => {
      this.id = params.id;
      this.service.id = params.id;
      this.service.DisplayPropertyListing({ "PropertyListingId": this.id, "LoginUserId": this.userData.id }).subscribe((result: any) => {
        console.log("DisplayPropertyListing",result);
        if (result.data.user.id != this.userData.id) {
          this.route.navigate(["/"]);
        } else {
          this.listingData = result.data.propertyListing;
          this.setData();
          this.createFormData();
        }
      })
      this.options = {
        bounds: [],
        strictBounds: true,
      };
    })
  }
  createFormData() {
    this.propertyData.CountryId = this.listingData.countryId;
    this.propertyData.CityId = this.listingData.cityId;
    this.propertyData.CityId = this.listingData.cityId;
    this.propertyData.DistrictId = this.listingData.districtId;
    this.propertyData.PropertyAddress = this.listingData.propertyAddress;
    this.propertyData.PropertyLat = this.listingData.propertyLat;
    this.propertyData.PropertyLong = this.listingData.propertyLong;
    this.propertyData.PropertyTypeId = this.listingData.propertyTypeId;
    this.propertyData.BedRooms = this.listingData.bedrooms;
    this.propertyData.BathRooms = this.listingData.bathrooms;
    this.propertyData.BathRooms = this.listingData.bathrooms;
    this.propertyData.FurnishingType = this.listingData.furnishingType;
    this.propertyData.TenantTypeId = this.listingData.tenantTypeId;
    this.propertyData.PropertyManageId = this.listingData.propertyManageId;
    this.propertyData.OccupancyStatusId = this.listingData.occupancyStatus?.id;
    this.propertyData.Parkings = this.listingData.parkings;
    this.propertyData.RentTypeId = this.listingData.rentTypeId;
    this.propertyData.SecurityDeposit = this.listingData.securityDeposit;
    this.propertyData.BrokerageCharge = this.listingData.brokerageCharge;
    this.propertyData.Balcony = this.listingData.balcony;
    this.propertyData.PropertyAge = this.listingData.propertyAge;
    this.propertyData.BuildingName = this.listingData.buildingName;
    this.propertyData.UnitNo = this.listingData.unitNo;
    this.propertyData.UserId = this.listingData.userId;
    this.propertyData.FloorNo = this.listingData.floorNo;
    this.propertyData.PropertyListingTypeId = this.listingData.propertyListingTypeId;
    this.propertyData.PropertyCategoryId = this.listingData.propertyCategoryId;
    this.propertyData.CarpetArea = this.listingData.carpetArea;
    this.propertyData.BuildupArea = this.listingData.buildupArea;
    this.propertyData.PetPolicies = [];
    if(this.listingData.petPolicies !=null && this.listingData.petPolicies !=undefined){
    for(let i = 0; i < this.listingData.petPolicies.length; i++) {
      this.propertyData.PetPolicies.push({"PetPolicyId": this.listingData.petPolicies[i].petPolicyId});
    }
  }
    this.propertyData.AvailableDate = this.listingData.availableDate;
    this.propertyData.NoticePeriod = this.listingData.noticePeriod;
    this.propertyData.LockingPeriod = this.listingData.lockingPeriod;
    this.propertyData.PropertyTitle = this.listingData.propertyTitle;
    this.propertyData.PropertyDescription = this.listingData.propertyDescription;
    this.propertyData.PropertyOffer = this.listingData.propertyOffer;
    if(this.listingData.propertyListingLocatedNears) {
      this.propertyData.PropertyListingLocatedNears = [];
      for(let i = 0; i < this.listingData.propertyListingLocatedNears.length; i++) {
        this.propertyData.PropertyListingLocatedNears.push({"LocatedNearId": this.listingData.propertyListingLocatedNears[i].LocatedNearId});
      }
    }
    this.propertyData.PropertyPrice = this.listingData.propertyPrice;
    this.propertyData.SecurityDepositPrice = this.listingData.securityDepositPrice;
    this.propertyData.BrokerageChargePrice = this.listingData.brokerageChargePrice;
    this.propertyData.PropertyFeatures = [];
    for(let i = 0; i < this.listingData.propertyFeatures.length; i++) {
      this.propertyData.PropertyFeatures.push({"PropertyFeatureId": this.listingData.propertyFeatures[i].propertyFeatureId});
    }

  }
  setData() {
    this.SubmitForm.patchValue({
      address: this.listingData.propertyAddress
    });
    this.showLoader = true;
    this.service.LoadCountries().subscribe(e => {
      let temp: any = e;
      if (temp.message == "Country list fetched successfully") {
        for (let country of temp.data) {
          this.country.push({ viewValue: country.name, value: country.id });
        }
        let a: any = setInterval(() => {
          if (this.country.length > 0) {
            $(".country-item-" + this.listingData.countryId).attr("selected", "selected");
            $(".country-select").select2();
            clearInterval(a);
          }
        }, 100);
        this.countryId = this.listingData.countryId;
        this.cityId = this.listingData.cityId;
        this.districtId = this.listingData.districtId;
        this.service.LoadCities(this.countryId).subscribe(e => {
          let temp: any = e;
          if (temp.message == "City list fetched successfully") {
            for (let city of temp.data) {
              this.city.push({ viewValue: city.name, value: city.id });
            }
            let interval: any = setInterval(() => {
              if (this.country.length > 0) {
                $(".city-item-" + this.cityId).attr("selected", "selected");
                $(".city-select").select2();
                clearInterval(interval);
              }
            }, 100)
            let id = this.cityId;
            let a = this.city.filter(function (c: any) {
              return c.value == id;
            });
            this.locationInformation.city = a[0].viewValue;
            this.service.LoadDistrict(this.cityId).subscribe(e => {
              let temp: any = e;
              if (temp.message == "District list fetched successfully") {
                for (let district of temp.data) {
                  this.district.push({ viewValue: district.name, value: district.id });
                }
                this.showLoader = false;
                let interval: any = setInterval(() => {
                  if (this.country.length > 0) {
                    $(".district-item-" + this.districtId).attr("selected", "selected");
                    $(".district-select").select2();
                    this.showLoader = false;
                    this.getLocation();
                    clearInterval(interval);
                  }
                }, 100);
              }
            });
          }
        });
        this.locationInformation.address = this.listingData.propertyAddress;
      }
      let id = this.countryId;
      let a = this.country.filter(function (c: any) {
        return c.value == id;
      });
      this.locationInformation.country = a[0].viewValue;
    });
  }
  changeInfo() {
    $("#searchLocation").focus();
    let temp: any = $("#searchLocation").offset();
    temp = temp.top;
    $(window).scrollTop(temp - 200);
  }
  confirmLocation() {
    this.locationInformation.country = this.countryName;
    this.locationInformation.city = this.cityName;
    this.locationInformation.address = localStorage.getItem("address");
    localStorage.removeItem("address");
  }
  onCountrySelect(e: any) {
    this.showMap = false;
    this.city = this.district = [];
    this.cityId = this.districtId = -1;
    this.showLoader = true;
    let temp = this.country.filter(function (c: any) {
      return c.value == e;
    });
    this.countryName = temp[0].viewValue;
    this.getLocationDetails(temp[0].viewValue, false);
    this.countryId = e;
    this.city = [];
    this.service.LoadCities(e).subscribe(e => {
      let temp: any = e;
      if (temp.message == "City list fetched successfully") {
        for (let city of temp.data) {
          this.city.push({ viewValue: city.name, value: city.id });
        }
        this.showLoader = false;
      }
    });
  }
  onCitySelect(e: any) {
    this.showMap = false;
    this.district = [];
    this.districtId = -1;
    let temp = this.city.filter(function (c: any) {
      return c.value == e;
    })
    this.cityName = temp[0].viewValue;
    this.getLocationDetails(temp[0].viewValue, false);
    this.cityId = e;
    this.service.LoadDistrict(e).subscribe(e => {
      let temp: any = e;
      if (temp.message == "District list fetched successfully") {
        for (let district of temp.data) {
          this.district.push({ viewValue: district.name, value: district.id });
        }
        this.showLoader = false;
      }
    });
  }
  onDistrictSelect(e: any) {
    this.showMap = true;
    this.locationSelected = false;
    $("#searchLocation").val("");
    let temp = this.district.filter(function (c: any) {
      return c.value == e;
    })
    this.getLocationDetails(temp[0].viewValue, true);
    this.districtId = e;
  }
  SubmitForm = new FormGroup({
    address: new FormControl("", Validators.required),
  });
  get validate() {
    return this.SubmitForm.controls;
  }
  onSubmit() {
    if ($(".country-select").val() == 0) {
      this.currentField = "country-select + .select2";
      this.error = "Select Country";
      this.showError = true;
      return;
    } else if ($(".city-select").val() == 0) {
      this.currentField = "city-select + .select2";
      this.error = "Select City";
      this.showError = true;
      return;
    } else if ($(".district-select").val() == 0) {
      this.currentField = "district-select + .select2";
      this.error = "Select District";
      this.showError = true;
      return;
    } else if (this.SubmitForm.value.address == "") {
      this.currentField = "add-adrees-sec";
      this.error = "Select Address";
      this.showError = true;
      return;
    }

    this.propertyData.CountryId = this.countryId;
    this.propertyData.CityId = this.cityId;
    this.propertyData.DistrictId = this.districtId;
    let temp: any = document.getElementById("searchLocation");
    this.propertyData.PropertyAddress = temp.value;
    this.propertyData.PropertyLat = localStorage.getItem("lat");
    this.propertyData.PropertyLong = localStorage.getItem("lng");
    localStorage.setItem('propertyData', JSON.stringify(this.propertyData));
    localStorage.setItem('listingData', JSON.stringify(this.propertyData));
    this.route.navigate(['/add-property/edit/' + this.id + '/listpropertyinfo'])
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
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    $(".country-select").on("change", () => {
      this.onCountrySelect($(".country-select").val());
    });
    $(".city-select").on("change", () => {
      this.onCitySelect($(".city-select").val());
    });
    $(".district-select").on("change", () => {
      this.onDistrictSelect($(".district-select").val());
    });
  }
  onPlaceChanged() {
    let temp: any = document.getElementById("searchLocation");
    let address: any = temp.value;
    localStorage.setItem("address", address);
    $.ajax({
      url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyBPSEz52-AfPEVbmV_3yuGUGol_KiLb3GU",
      method: "get",
      success: (res) => {
        let area = res.results[0].geometry.location;
        localStorage.setItem("lat", area.lat);
        localStorage.setItem("lng", area.lng);
        this.locationSelected = true;
        this.map = new google.maps.Map($(".property-details__map")[0], {
          center: area,
          zoom: 15,
        })
        this.marker = new google.maps.Marker({
          position: area,
          map: this.map
        })
      }
    });
  }
  getLocationDetails(e: any, status: boolean) {
    $(".pac-container.pac-logo").remove();
    $.ajax({
      url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + e + "&key=AIzaSyBPSEz52-AfPEVbmV_3yuGUGol_KiLb3GU",
      method: "get",
      success: (res) => {
        let temp = res.results[0].geometry.bounds;
        this.bounds = { east: temp.northeast.lng, west: temp.southwest.lng, north: temp.northeast.lat, south: temp.southwest.lat };
        localStorage.setItem("bounds", JSON.stringify(this.bounds));
        let northEast = new google.maps.LatLng(temp.northeast.lat, temp.northeast.lng);
        let southWest = new google.maps.LatLng(temp.southwest.lat, temp.southwest.lng);
        let areabounds = new google.maps.LatLngBounds(southWest, northEast);
        this.options.bounds = areabounds;
        let area = res.results[0].geometry.location;
        this.map = new google.maps.Map($(".property-details__map")[0], {
          center: area,
          zoom: 6,
          disableDefaultUI: true,
          restriction: {
            latLngBounds: this.bounds,
            strictBounds: true,
          },
        })
        this.marker = new google.maps.Marker({
          position: area,
          map: this.map
        });
        this.autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, this.options);
        this.autocomplete.addListener('place_changed', this.onPlaceChanged);
        this.autocomplete.setBounds(this.bounds);
        this.locationSelected = status;
      }
    });
  }
  getLocation() {
    let temp: any = document.getElementById("searchLocation");
    let address: any = temp.value;
    localStorage.setItem("address", address);
    $.ajax({
      url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + this.listingData.propertyAddress + "&key=AIzaSyBPSEz52-AfPEVbmV_3yuGUGol_KiLb3GU",
      method: "get",
      success: (res) => {
        let area = res.results[0].geometry.location;
        localStorage.setItem("lat", area.lat);
        localStorage.setItem("lng", area.lng);
        this.locationSelected = true;
        this.map = new google.maps.Map($(".property-details__map")[0], {
          center: area,
          zoom: 15,
        })
        this.marker = new google.maps.Marker({
          position: area,
          map: this.map
        });
        this.showMap = true;
      }
    });
  }
}