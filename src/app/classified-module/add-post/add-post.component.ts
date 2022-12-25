import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  selectedCategory: any = "";
  selectedOptions: any = [];
  startBinding:boolean = false;
  isDisabled: boolean = true;

  showSubCategories: boolean = false;
  classifiedSubCategories: any = [];

  constructor(private route: Router, private notifyService: NotificationService, private service: AppService, private modalService: NgbModal, config: NgbModalConfig) {
    if (!localStorage.getItem("user")) {
      this.notifyService.showError("You need to register/login", "");
      this.route.navigate(["/login"]);
    }
    this.service.PropertyListingPackages(1).subscribe((result: any) => {
      this.packagesType = result.data;
    })
    this.showLoader = true;
    this.service.ClassifiedCategories().subscribe((result: any) => {
      this.classifiedCategories = result.data;
      this.showLoader = false;
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
  loadCountriesData() {
    this.showLoader = true;
    this.service.LoadCountries().subscribe(e => {
      let temp: any = e;
      if (temp.message == "Country list fetched successfully") {
        for (let country of temp.data) {
          this.country.push({ viewValue: country.name, value: country.id, currency: country.currency });
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
    let temp:any = {};
    temp.countryId = $(".country-select").val();
    temp.cityId = $(".city-select").val();
    temp.districtId = $(".district-select").val();
    temp.address = this.SubmitForm.value.address;
    temp.Latitude = localStorage.getItem("lat");
    temp.Longitude = localStorage.getItem("lng");
    temp.classifiedData = this.selectedOptions;
    localStorage.setItem("classifiedData",JSON.stringify(temp));
    if(this.selectedOptions[1].name.trim() == "Used Cars for Sale") {
      this.route.navigate(["/classified/car-ad-details"]);
    } else if(this.selectedOptions[1].name.trim() == "Motorcycles") {
      this.route.navigate(["/classified/motorcycle-ad-details"]);
    } else if(this.selectedOptions[1].name.trim() == "Auto Accessories & Parts") {
      this.route.navigate(["/classified/auto-parts-ad-details"]);
    } else if(this.selectedOptions[1].name.trim() == "Heavy Vehicles") {
      this.route.navigate(["/classified/heavy-vehicles-ad-details"]);
    } else if(this.selectedOptions[1].name.trim() == "Boats") {
      this.route.navigate(["/classified/boats-ad-details"]);
    } else if(this.selectedOptions[1].name.trim() == "Number Plates") {
      this.route.navigate(["/classified/number-plates-ad-details"]);
    } else if(this.selectedOptions[1].name.trim() == "I'm hiring") {
      this.route.navigate(["/classified/job-type-selection"]);
    } else if(this.selectedOptions[1].name.trim() == "Jobs Wanted") {
      this.route.navigate(["/classified/job-requirement"]);
    } else if(this.selectedOptions[1].name.trim() == "Auto Services") {
      this.route.navigate(["/classified/services-form"]);
    }
    
  }
  animate() {
    let temp: any = $("." + this.currentField).offset()?.top;
    $("." + this.currentField).addClass("blink");
    $("." + this.currentField).on("click", () => {
      $("." + this.currentField).removeClass("blink");
    })
    $(window).scrollTop(temp - 100);
  }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    $('.select2').select2({
      tags: true
    });
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
        google.maps.event.addListener(this.marker, 'dragend', (e: any) => {
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
  categorySelect(index: any, id: any, name: any) {
    if(index == 0) {
      this.selectedOptions = this.selectedOptions.slice(0, index + 1)
      $(".select-boxes-wrapper").html("");
    }
    this.showLoader = true;
    let found: boolean = false;
    for (let item of this.selectedOptions) {
      if (item.index == index) {
        item.value = id;
        item.name = name;
        found = true;
        break;
      }
    }
    if (!found) {
      this.selectedOptions.push({ "index": this.selectedOptions.length + 0, "value": id, "name": name });
      found = false;
    }
    this.addSelect(index, id);
  }
  addSelect(index: any, id: any) {
    let temp: any = "";
    this.service.ClassifiedSubCategories(id).subscribe((result: any) => {
      this.showLoader = false;
      if (result.data.length > 0) {
        this.isDisabled = true;

        let length: any = $(".select-boxes-wrapper .select-boxes").length;
        let label: any = "";
        for (let item of this.selectedOptions) {
          label += item.name + " - ";
        }
        label = label.slice(0, -2);
        if (index == -1 || $(".select-boxes-" + index).length == 0) {
          $(".select-boxes-wrapper").append($(".sample-select").html());
          $(".select-boxes-wrapper .select-boxes:last-child").addClass("select-boxes-" + length).attr("data-index", length);;
          $(".select-boxes-" + length + " select").addClass("select-index-" + length).addClass("select2").attr("data-index", length);
          $(".select-boxes-" + length + " .select-boxes-label").text("Choose " + label + " Category");
          this.bindEvents();
          $('.select2').select2({
            tags: true
          });
          this.startBinding = true;
          for (let item of result.data) {
            var newState = new Option(item.name, item.id, false, false);
            $(".select-boxes-" + length + " .select-index-" + length).append(newState).trigger('change');
          }
          this.startBinding = false;
        } else {
          $(".select-boxes-" + index + " .select-index-" + index).html(temp);
          for (let item of result.data) {
            var newState = new Option(item.name, item.id, false, false);
            $(".select-boxes-" + index + " .select-index-" + index).append(newState).trigger('change');
          }
          $(".select-boxes-" + index + " .select-boxes-label").text("Choose " + label + " Category");
        }
      } else {
        this.isDisabled = false;
        this.startBinding = true;
        this.selectedOptions = this.selectedOptions.slice(0, index + 1)
        $(".select-boxes-wrapper .select-boxes").each(function() {
          if($(this).data("index") > index - 1 && index != -1) {
            $(this).html("");
            $(this).html("").remove();
          }
        })
        this.startBinding = false;
      }
    })
  }
  bindEvents() {
    $(".category-select").off();
    $(".category-select").on("change", (e) => {
      if(!this.startBinding) {
        let index = $(e.currentTarget).data("index") + 1;
        let value = $(e.currentTarget).val();
        let name = $(e.currentTarget).find("option:selected").text();
        if(value == "-1") {
          this.selectedOptions = this.selectedOptions.slice(0, index)
          $(".select-boxes-wrapper .select-boxes").each(function() {
            if($(this).data("index") > index - 1) {
              $(this).html("").remove();
            }
          })
        } else {
          this.categorySelect(index, value, name)
        }
      }
    });
  }
}