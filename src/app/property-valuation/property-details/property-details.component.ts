import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AppService } from 'src/app/service/app.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { Select2 } from 'select2';
import { NotificationService } from 'src/app/service/notification.service';

declare const google: any;

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {
  selected = 'option1';
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

  Locate = '../../../../assets/images/icons/locate.svg';
  oldData: any = "";
  country: any = [];
  city: any = [];
  district: any = [];
  countryId: number = -1;
  cityId: number = -1;
  districtId: number = -1;
  data: any = {};
  titleDeedType: number = -1;
  propertyInsured: number = -1;
  autocomplete: any;
  marker: any;
  countryName: any = "";
  cityName: any;
  tempAddress: any;
  // locationInformation: any = {};
  formDetailData: any = {};
  showLoader: boolean = false;
  bounds: any;
  northEast: any;
  southWest: any;
  areabounds: any;
  options: any;
  locationSelected: boolean = false;
  showMap: boolean = false;
  valuationDetailData: any = {};
  location = { lat: 31.5204, lng: 74.3587 };
  districtName: any;
  currentField: any;

  propertyDetails = new FormGroup({
    titleDeed: new FormControl("", Validators.required),
    muncipality: new FormControl("", Validators.required),
    address: new FormControl("", Validators.required)
  })
  get titleDeed() {
    return this.propertyDetails.get("titleDeed")
  }
  get muncipality() {
    return this.propertyDetails.get("muncipality")
  }

  constructor(private http: HttpClient, private notifyService: NotificationService, private service: AppService, private router: Router) {
    if (!localStorage.getItem("user")) {
      this.notifyService.showError("You need to register/login", "");
      this.router.navigate(["/login"]);
    }
    this.loadCountriesData();
    this.options = {
      bounds: [],
      strictBounds: true,
    };
    this.loadOldData();
  }
  loadOldData() {
    if (localStorage.getItem("valuationData")) {
      this.showMap = true;
      this.oldData = localStorage.getItem("valuationData");
      this.oldData = JSON.parse(this.oldData);
      this.propertyDetails.patchValue({
        titleDeed: this.oldData.TitleDeedNo,
        muncipality: this.oldData.MunicipalityNo,
        address: this.oldData.PropertyAddress
      });
      let a: any = setInterval(() => {
        if (this.country.length > 0) {
          $(".country-item-" + this.oldData.CountryId).attr("selected", "selected");
          $(".country-select").select2();
          clearInterval(a);
        }
      }, 100)
      this.countryId = this.oldData.CountryId;
      this.service.LoadCities(this.countryId).subscribe(e => {
        let temp: any = e;
        if (temp.message == "City list fetched successfully") {
          for (let city of temp.data) {
            this.city.push({ viewValue: city.name, value: city.id });
          }
          this.showLoader = false;
          let interval: any = setInterval(() => {
            if (this.country.length > 0) {
              $(".city-item-" + this.oldData.CityId).attr("selected", "selected");
              $(".city-select").select2();
              clearInterval(interval);
            }
          }, 100);
          this.cityId = this.oldData.CityId;
          let id = this.cityId;
          let a = this.city.filter(function (c: any) {
            return c.value == id;
          });
          // this.locationInformation.city = a[0].viewValue;
          this.service.LoadDistrict(this.cityId).subscribe(e => {
            let temp: any = e;
            if (temp.message == "District list fetched successfully") {
              for (let district of temp.data) {
                this.district.push({ viewValue: district.name, value: district.id });
              }
              this.showLoader = false;
              let interval: any = setInterval(() => {
                if (this.country.length > 0) {
                  $(".district-item-" + this.oldData.DistrictId).attr("selected", "selected");
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
          this.districtId = this.oldData.DistrictId;
        }
      });
      // this.locationInformation.address = this.oldData.PropertyAddress;
      this.titleDeedType = this.oldData.TitleDeedType;
      this.propertyInsured = this.oldData.PropertyInsured;
      this.locationSelected = true;
      localStorage.setItem("lat", this.oldData.PropertyLat);
      localStorage.setItem("lng", this.oldData.PropertyLong);
    }
  }
  changeInfo() {
    $("#searchLocation").focus();
    let temp: any = $("#searchLocation").offset();
    temp = temp.top;
    $(window).scrollTop(temp - 200);
  }
  // confirmLocation() {
  //   this.locationInformation.country = this.countryName;
  //   this.locationInformation.city = this.cityName;
  //   this.locationInformation.address = localStorage.getItem("address");
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
      }
      if (this.oldData != "") {
        let id = this.countryId;
        let a = this.country.filter(function (c: any) {
          return c.value == id;
        });
        // this.locationInformation.country = a[0].viewValue;
      }
    });
  }
  toggleType(e: number) {
    if (e == 1) {
      this.formDetailData.titleDeedType = "Leasehold";
    } else {
      this.formDetailData.titleDeedType = "Freehold";
    }
    this.titleDeedType = e;
  }
  toggleInsured(e: number) {
    if (e == 1) {
      this.formDetailData.insured = "Yes";
    } else {
      this.formDetailData.insured = "No";
    }
    this.propertyInsured = e;
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
      // this.countryName = temp[0].viewValue;
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
      // this.countryName = "";
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
    } else {
      this.district = [];
      this.cityId = -1;
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
  getMapImage() {
    let staticMapUrl: any = "https://maps.googleapis.com/maps/api/staticmap";
    staticMapUrl += "?key=AIzaSyBPSEz52-AfPEVbmV_3yuGUGol_KiLb3GU&center=" + localStorage.getItem("lat") + "," + localStorage.getItem("lng");
    staticMapUrl += "&size=640x360&scale=2";
    staticMapUrl += "&zoom=13";
    staticMapUrl += "&maptype=" + this.map.mapTypeId;
    staticMapUrl += "&markers=color:red|" + localStorage.getItem("lat") + "," + localStorage.getItem("lng");

    const toDataURL = (url: any) => fetch(url)
      .then(response => response.blob())
      .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
      }))
    toDataURL(staticMapUrl)
      .then(dataUrl => {
        let a: any = dataUrl;
        localStorage.setItem("mapImg", a);
      })
  }
  animate() {
    let temp: any = $("." + this.currentField).offset()?.top;
    $("." + this.currentField).addClass("blink");
    $("." + this.currentField).on("click", () => {
      $("." + this.currentField).removeClass("blink");
      this.currentField = "temp";
    })
    $(window).scrollTop(temp - 100);
  }
  getData() {
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
    } else if ($("#searchLocation").val() == "" || !this.locationSelected) {
      this.currentField = "input-wrapper";
      this.changeInfo();
      this.error = "Enter Address";
      this.showError = true;
      return;
    } else if (this.propertyDetails.value.titleDeed == "") {
      this.currentField = "title-deed-input";
      this.error = "Enter Title Deed No";
      this.showError = true;
      return;
    } else if (this.titleDeedType == -1) {
      this.currentField = "title-deed-type-input";
      this.error = "Select Title Deed Type";
      this.showError = true;
      return;
    } else if (this.propertyDetails.value.muncipality == "") {
      this.currentField = "municipality-input";
      this.error = "Enter Muncipality/Affection No";
      this.showError = true;
      return;
    } else if (this.propertyInsured == -1) {
      this.currentField = "property-insured-input";
      this.error = "Select Property Insurance Type";
      this.showError = true;
      return;
    } else {

      this.getMapImage();
      this.formDetailData.TitleDeedNo = this.propertyDetails.value.titleDeed;
      this.formDetailData.MunicipalityNo = this.propertyDetails.value.muncipality;
      this.formDetailData.address = $("#searchLocation").val();

      this.data.TitleDeedNo = this.propertyDetails.value.titleDeed;
      this.data.TitleDeedType = this.titleDeedType;
      this.data.MunicipalityNo = this.propertyDetails.value.muncipality;
      this.data.CountryId = this.countryId;
      this.data.CityId = this.cityId;
      this.data.DistrictId = this.districtId;
      this.data.PropertyInsured = this.propertyInsured;
      this.data.PropertyLat = localStorage.getItem("lat");
      this.data.PropertyLong = localStorage.getItem("lng");
      this.data.PropertyAddress = $("#searchLocation").val();

      if (!localStorage.getItem("valuationDetailData")) {
        this.valuationDetailData.country = this.countryName;
        this.valuationDetailData.city = this.cityName;
        this.valuationDetailData.district = this.districtName;
        this.valuationDetailData.address = $("#searchLocation").val();
        localStorage.setItem('valuationDetailData', JSON.stringify(this.valuationDetailData));
      }
      localStorage.setItem('valuationData', JSON.stringify(this.data));
      if(localStorage.getItem("propertyTypeData")) {
        let temp:any = localStorage.getItem("propertyTypeData");
        temp = JSON.parse(temp);
        temp.MunicipalityNo = this.propertyDetails.value.muncipality;
        temp.TitleDeedNo = this.propertyDetails.value.titleDeed;
        localStorage.setItem("propertyTypeData", JSON.stringify(temp));
      }
      this.router.navigate(['/valuation/PropertyType']);
    }
  }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    if (this.oldData == "") {
      $('.select2').select2();
    }
    $(".country-select").on("change", () => {
      this.onCountrySelect($(".country-select").val());
    });
    $(".city-select").on("change", () => {
      this.onCitySelect($(".city-select").val());
    });
    $(".district-select").on("change", () => {
      this.onDistrictSelect($(".district-select").val());
    });
    if(this.oldData != "") {
      this.getLocation();
    }
  }
  onPlaceChanged() {
    let temp: any = document.getElementById("searchLocation");
    let address: any = temp.value;
    localStorage.setItem("address", address);
    console.log(address);
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
          map: this.map,
          draggable: true,
        });
        google.maps.event.addListener(this.marker, 'dragend', (e:any) => {
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
        let temp:any = "";
        if(res.results[0].geometry.bounds) {
          temp = res.results[0].geometry.bounds;
        } else {
          temp = res.results[0].geometry.viewport;
        }
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
          // draggable: true,
        });
        // google.maps.event.addListener(this.marker, 'dragend', (e:any) => {
        //   this.geocodePosition(this.marker.getPosition());
        // });
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