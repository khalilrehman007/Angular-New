import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../service/auth.service";
import { Router } from "@angular/router";
import { NotificationService } from "../../service/notification.service";
import { AppService } from 'src/app/service/app.service';

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
  locationInformation: any = {};
  bounds: any;
  northEast: any;
  southWest: any;
  areabounds: any;
  options: any;
  locationSelected: boolean = false;
  showLoader: boolean = false;
  showMap: boolean = false;

  constructor(private route: Router, private notifyService: NotificationService, private service: AppService) {
    this.loadCountriesData();
    this.options = {
      bounds: [],
      strictBounds: true,
    };
    this.loadOldData();
  }
  loadOldData() {
    if (localStorage.getItem("propertyData")) {
      this.showMap = true;
      this.oldData = localStorage.getItem("propertyData");
      this.oldData = JSON.parse(this.oldData);
      this.SubmitForm.patchValue({
        PropertyAge: this.oldData.PropertyAge,
        BuildingName: this.oldData.BuildingName,
        UnitNo: this.oldData.UnitNo,
        address: this.oldData.PropertyAddress
      })
      this.countryId = this.oldData.CountryId;
      this.cityId = this.oldData.CityId;
      this.districtId = this.oldData.DistrictId
      this.service.LoadCities(this.countryId).subscribe(e => {
        let temp: any = e;
        if (temp.message == "City list fetched successfully") {
          for (let city of temp.data) {
            this.city.push({ viewValue: city.name, value: city.id });
          }
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
            }
          });
        }
      });
      this.locationInformation.address = this.oldData.PropertyAddress;
    }
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
  loadCountriesData() {
    this.showLoader = true;
    this.service.LoadCountries().subscribe(e => {
      let temp: any = e;
      if (temp.message == "Country list fetched successfully") {
        for (let country of temp.data) {
          this.country.push({ viewValue: country.name, value: country.id });
        }
        this.showLoader = false;
      }
      if (this.oldData != "") {
        let id = this.countryId;
        let a = this.country.filter(function (c: any) {
          return c.value == id;
        });
        this.locationInformation.country = a[0].viewValue;
      }
    });
  }
  onCountrySelect(e: any) {
    this.showMap = false;
    this.city = this.district = [];
    this.cityId = this.districtId = -1;
    this.showLoader = true;
    let temp = this.country.filter(function (c: any) {
      return c.value == e.value
    });
    this.countryName = temp[0].viewValue;
    this.getLocationDetails(temp[0].viewValue, false);
    this.countryId = e.value;
    this.city = [];
    this.service.LoadCities(e.value).subscribe(e => {
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
      return c.value == e.value
    })
    this.cityName = temp[0].viewValue;
    this.getLocationDetails(temp[0].viewValue, false);
    this.cityId = e.value;
    this.service.LoadDistrict(e.value).subscribe(e => {
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
      return c.value == e.value
    })
    this.getLocationDetails(temp[0].viewValue, true);
    this.districtId = e.value;
  }
  SubmitForm = new FormGroup({
    PropertyAge: new FormControl("", Validators.required),
    BuildingName: new FormControl("", Validators.required),
    UnitNo: new FormControl("", Validators.required),
    // TotalFloor: new FormControl("", Validators.required),
    // FloorNo: new FormControl("", Validators.required),
    address: new FormControl("", Validators.required),
  });
  get validate() {
    return this.SubmitForm.controls;
  }
  onSubmit() {
    if (this.countryId == -1) {
      this.error = "Select Country";
      this.showError = true;
      return;
    } else if (this.cityId == -1) {
      this.error = "Select City";
      this.showError = true;
      return;
    } else if (this.districtId == -1) {
      this.error = "Select District";
      this.showError = true;
      return;
    } else if (this.SubmitForm.value.address == "") {
      this.error = "Select Address";
      this.showError = true;
      return;
    } else if (this.SubmitForm.value.PropertyAge == "") {
      this.error = "Enter Property Age";
      this.showError = true;
      return;
    } else if (this.SubmitForm.value.BuildingName == "") {
      this.error = "Enter Building Name";
      this.showError = true;
      return;
    } else if (this.SubmitForm.value.UnitNo == "") {
      this.error = "Enter Unit No";
      this.showError = true;
      return;
    }

    this.data.CountryId = this.countryId;
    this.data.CityId = this.cityId;
    this.data.DistrictId = this.districtId;
    let temp: any = document.getElementById("searchLocation");
    this.data.PropertyAddress = temp.value;
    this.data.PropertyLat = localStorage.getItem("lat");
    this.data.PropertyLong = localStorage.getItem("lng");
    this.data.PropertyAge = this.SubmitForm.value.PropertyAge;
    this.data.BuildingName = this.SubmitForm.value.BuildingName;
    this.data.UnitNo = this.SubmitForm.value.UnitNo;
    localStorage.setItem('propertyData', JSON.stringify(this.data))
    this.route.navigate(['/add-property/listpropertyinfo'])
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
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.getLocation();
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
      let lng: any = localStorage.getItem("lng")
      this.map = new google.maps.Map($(".property-details__map")[0], {
        center: { "lat": parseFloat(lat), "lng": parseFloat(lng) },
        zoom: 6,
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
}