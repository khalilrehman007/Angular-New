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
  countryName: any;
  cityName: any;
  tempAddress: any;
  locationInformation: any = {};
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
    if(!localStorage.getItem("user")) {
      this.notifyService.showError("تحتاج إلى التسجيل / تسجيل الدخول", "");
      this.router.navigate(["/ar/login"]);
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
      console.log(this.oldData);
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
            this.city.push({ viewValue: city.nameAr, value: city.id });
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
          this.locationInformation.city = a[0].viewValue;
          this.service.LoadDistrict(this.cityId).subscribe(e => {
            let temp: any = e;
            if (temp.message == "District list fetched successfully") {
              for (let district of temp.data) {
                this.district.push({ viewValue: district.nameAr, value: district.id });
              }
              this.showLoader = false;
              let interval: any = setInterval(() => {
                if (this.country.length > 0) {
                  $(".district-item-" + this.oldData.CityId).attr("selected", "selected");
                  $(".district-select").select2();
                  clearInterval(interval);
                }
              }, 100);
            }
          });
          this.districtId = this.oldData.DistrictId;
        }
      });
      this.locationInformation.address = this.oldData.PropertyAddressArabic;
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
  confirmLocation() {
    this.locationInformation.country = this.countryName;
    this.locationInformation.city = this.cityName;
    this.locationInformation.address = localStorage.getItem("arabicAddress");
  }
  loadCountriesData() {
    this.showLoader = true;
    this.service.LoadCountries().subscribe(e => {
      let temp: any = e;
      if (temp.message == "Country list fetched successfully") {
        for (let country of temp.data) {
          this.country.push({ viewValue: country.nameAr, value: country.id, currency: country.currency, currencyAr: country.currencyAr });
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
    this.showMap = false;
    this.city = this.district = [];
    this.cityId = this.districtId = -1;
    this.showLoader = true;
    let temp = this.country.filter(function (c: any) {
      return c.value == e
    });
    console.log(temp);
    this.countryName = temp[0].viewValue;
    localStorage.setItem("currency", temp[0].currency)
    localStorage.setItem("currencyAr", temp[0].currencyAr)
    this.getLocationDetails(temp[0].viewValue, false);
    this.countryId = e;
    this.city = [];
    this.service.LoadCities(e).subscribe(e => {
      let temp: any = e;
      if (temp.message == "City list fetched successfully") {
        for (let city of temp.data) {
          this.city.push({ viewValue: city.nameAr, value: city.id });
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
      return c.value == e
    })
    this.cityName = temp[0].viewValue;
    this.getLocationDetails(temp[0].viewValue, false);
    this.cityId = e;
    this.service.LoadDistrict(e).subscribe(e => {
      let temp: any = e;
      if (temp.message == "District list fetched successfully") {
        for (let district of temp.data) {
          this.district.push({ viewValue: district.nameAr, value: district.id });
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
      return c.value == e
    })
    this.getLocationDetails(temp[0].viewValue, true);
    this.districtName = temp[0].viewValue;
    this.districtId = e;
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
      this.currentField = "";
    })
    $(window).scrollTop(temp - 100);
  }
  getData() {
    if ($(".country-select").val() == 0) {
      this.currentField = "country-select + .select2";
      this.error = "حدد الدولة";
      this.showError = true;
      return;
    } else if ($(".city-select").val() == 0) {
      this.currentField = "city-select + .select2";
      this.error = "اختر مدينة";
      this.showError = true;
      return;
    } else if ($(".district-select").val() == 0) {
      this.currentField = "district-select + .select2";
      this.error = "حدد المنطقة";
      this.showError = true;
      return;
    } else if ($("#searchLocation").val() == "" || !this.locationSelected) {
      this.currentField = "input-wrapper";
      this.changeInfo();
      this.error = "أدخل العنوان";
      this.showError = true;
      return;
    } else if (this.propertyDetails.value.titleDeed == "") {
      this.currentField = "title-deed-input";
      this.error = "أدخل رقم سند الملكية";
      this.showError = true;
      return;
    } else if (this.titleDeedType == -1) {
      this.currentField = "title-deed-type-input";
      this.error = "حدد نوع سند الملكية";
      this.showError = true;
      return;
    } else if (this.propertyDetails.value.muncipality == "") {
      this.currentField = "municipality-input";
      this.error = "أدخل البلدية / رقم العاطفة";
      this.showError = true;
      return;
    } else if (this.propertyInsured == -1) {
      this.currentField = "property-insured-input";
      this.error = "حدد نوع التأمين على الممتلكات";
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
      this.data.PropertyAddressArabic = localStorage.getItem("arabicAddress");

      if (!localStorage.getItem("valuationDetailData")) {
        this.valuationDetailData.country = this.countryName;
        this.valuationDetailData.city = this.cityName;
        this.valuationDetailData.district = this.districtName;
        this.valuationDetailData.address = $("#searchLocation").val();
        localStorage.setItem('valuationDetailData', JSON.stringify(this.valuationDetailData));
      }
      localStorage.setItem('valuationData', JSON.stringify(this.data));
      this.router.navigate(['/ar/valuation/PropertyType']);
    }
  }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.getLocation();
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