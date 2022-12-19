import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../service/auth.service";
import { Router } from "@angular/router";
import { NotificationService } from "../../service/notification.service";
import { AppService } from 'src/app/service/app.service';
import { Select2 } from 'select2';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OwlOptions } from 'ngx-owl-carousel-o';

declare const google: any;

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  ads = 'assets/images/post-add.jpg'
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
  classifiedCategories: any = [];

  constructor(private route: Router, private notifyService: NotificationService, private service: AppService, private modalService: NgbModal, config: NgbModalConfig) {
    if (!localStorage.getItem("user")) {
      this.notifyService.showError("You need to register/login", "");
      this.route.navigate(["/login"]);
    }
    this.service.PropertyListingPackages(1).subscribe((result: any) => {
      this.packagesType = result.data;
    })
    this.service.ClassifiedCategories().subscribe((result: any) => {
      this.classifiedCategories = result.data;
    })
    this.service.PointTransaction(335).subscribe((result: any) => {
      if (result.message == "Points Transaction has been fetched successfully") {
        for (let i = 0; i < result.data.length; i++) {
          this.selectedPackageName.push(result.data[i].point.id);
        }
      }
    })
    this.loadCountriesData();
    this.options = {
      bounds: [],
      strictBounds: true,
    };
    this.loadOldData();
    config.backdrop = 'static';
    config.keyboard = false;
  }
  checkPackage(e: any) {
    if (this.selectedPackageName.indexOf(e) != -1) {
      return true;
    } else {
      return false
    }
  }
  loadOldData() {
    if (localStorage.getItem("propertyData")) {
      this.showMap = true;
      this.oldData = localStorage.getItem("propertyData");
      this.oldData = JSON.parse(this.oldData);
      this.SubmitForm.patchValue({
        address: this.oldData.PropertyAddress
      })
      let a: any = setInterval(() => {
        if (this.country.length > 0) {
          $(".country-item-" + this.oldData.CountryId).attr("selected", "selected");
          $(".country-select").select2();
          clearInterval(a);
        }
      }, 100)
      this.countryId = this.oldData.CountryId;
      this.cityId = this.oldData.CityId;
      this.districtId = this.oldData.DistrictId
      this.service.LoadCities(this.countryId).subscribe(e => {
        let temp: any = e;
        if (temp.message == "City list fetched successfully") {
          for (let city of temp.data) {
            this.city.push({ viewValue: city.name, value: city.id });
          }
          let interval: any = setInterval(() => {
            if (this.country.length > 0) {
              $(".city-item-" + this.oldData.CityId).attr("selected", "selected");
              $(".city-select").select2();
              clearInterval(interval);
            }
          }, 100)
          let id = this.cityId;
          let a = this.city.filter(function (c: any) {
            return c.value == id;
          });
          this.service.LoadDistrict(this.cityId).subscribe(e => {
            let temp: any = e;
            if (temp.message == "District list fetched successfully") {
              for (let district of temp.data) {
                this.district.push({ viewValue: district.name, value: district.id });
              }
              this.showLoader = false;
              let interval: any = setInterval(() => {
                if (this.country.length > 0) {
                  $(".district-item-" + this.oldData.CityId).attr("selected", "selected");
                  $(".district-select").select2();
                  $(".country-select").on("change", () => {
                    this.onCountrySelect($(".country-select").val());
                  });
                  $(".city-select").on("change", () => {
                    this.onCitySelect($(".city-select").val());
                  });
                  $(".district-select").on("change", () => {
                    this.onDistrictSelect($(".district-select").val());
                  });
                  clearInterval(interval);
                }
              }, 100);
            }
          });
        }
      });
    }
  }
  changeInfo() {
    $("#searchLocation").focus();
    let temp: any = $("#searchLocation").offset();
    temp = temp.top;
    $(window).scrollTop(temp - 200);
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
      }
    });
  }
  onCountrySelect(e: any) {
    if (e != 0) {
      this.city = [];
      this.district = [];
      this.cityId = this.districtId = -1;
      this.showLoader = true;
      let temp = this.country.filter(function (c: any) {
        return c.value == e
      });
      this.countryName = temp[0].viewValue;
      localStorage.setItem("currency", temp[0].currency)
      // this.getLocationDetails(temp[0].viewValue, false);
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
      // this.getLocationDetails(temp[0].viewValue, false);
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
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    $('.select2').select2();
    this.getLocation();
    if (this.oldData == "") {
      $('.select2').select2();
    }
    $(".country-select").on("change", () => {
      this.onCountrySelect($(".country-select").val());
    });
    $(".category-select").on("change", () => {
      this.onCountrySelect($(".category-select").val());
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
          map: this.map,
          draggable: true,
        });
        google.maps.event.addListener(this.marker, 'dragend', (e:any) => {
          this.geocodePosition(this.marker.getPosition());
        });
        this.autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, this.options);
        this.autocomplete.addListener('place_changed', this.onPlaceChanged);
        this.autocomplete.setBounds(this.bounds);
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