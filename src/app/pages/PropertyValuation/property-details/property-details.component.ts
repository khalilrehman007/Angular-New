import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AppService } from 'src/app/service/app.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

declare const google: any;
@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit, AfterViewInit {
  selected = 'option1';
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

  location = { lat: 31.5204, lng: 74.3587 };

  propertyDetails = new FormGroup({
    titleDeed: new FormControl("", Validators.required),
    muncipality: new FormControl("", Validators.required),
  })
  get titleDeed() {
    return this.propertyDetails.get("titleDeed")
  }
  get muncipality() {
    return this.propertyDetails.get("muncipality")
  }
  
  constructor(private http: HttpClient, private service: AppService, private router: Router) {
    this.loadCountriesData();
    this.loadOldData();
    this.options = {
      bounds: [],
      strictBounds: true,
    };
  }
  loadOldData() {
    if (localStorage.getItem("valuationData")) {
      this.oldData = localStorage.getItem("valuationData");
      this.oldData = JSON.parse(this.oldData);
      this.propertyDetails.patchValue({
        titleDeed: this.oldData.TitleDeedNo,
        muncipality: this.oldData.MunicipalityNo
      });
      this.countryId = this.oldData.CountryId;
      this.service.LoadCities(this.countryId).subscribe(e => {
        let temp: any = e;
        if (temp.message == "City list fetched successfully") {
          for (let city of temp.data) {
            this.city.push({ viewValue: city.name, value: city.id });
          }
          this.showLoader = false;
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
                this.district.push({ viewValue: district.name, value: district.id });
              }
              this.showLoader = false;
            }
          });
          this.districtId = this.oldData.DistrictId;
        }
      });
      this.locationInformation.address = this.oldData.PropertyAddress;
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
    this.locationInformation.address = localStorage.getItem("address");
    localStorage.removeItem("address");
  }
  loadCountriesData() {
    this.showLoader = true;
    this.service.LoadCountries().subscribe(e => {
      let temp: any = e;
      if (temp.message == "Country list fetched successfully") {
        for (let country of temp.data) {
          this.country.push({ viewValue: country.name, value: country.id, currency: country.currency});
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
    this.showLoader = true;
    let temp = this.country.filter(function (c: any) {
      return c.value == e.value
    });
    localStorage.setItem("currency" , temp[0].currency);
    this.formDetailData.country = temp[0].viewValue;
    this.countryName = temp[0].viewValue;
    this.getLocationDetails(temp[0].viewValue, false);
    this.countryId = e.value;
    this.city = [];
    this.service.LoadCities(e.value).subscribe(e => {
      let temp: any = e;
      if (temp.message == "City list fetched successfully") {
        for (let city of temp.data) {
          this.city.push({ viewValue: city.name, value: city.id, inspectionFee: city.inspectionFee });
        }
        this.showLoader = false;
      }
    });
  }
  onCitySelect(e: any) {
    this.showLoader = true;
    let temp = this.city.filter(function (c: any) {
      return c.value == e.value
    })
    localStorage.setItem("inspectionFee", temp[0].inspectionFee);
    this.formDetailData.city = temp[0].viewValue;
    this.cityName = temp[0].viewValue;
    this.getLocationDetails(temp[0].viewValue, false);
    this.cityId = e.value;
    this.district = [];
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
    this.locationSelected = false;
    $("#searchLocation").val("");
    let temp = this.district.filter(function (c: any) {
      return c.value == e.value
    })
    this.formDetailData.district = temp[0].viewValue;
    this.getLocationDetails(temp[0].viewValue, true);
    this.districtId = e.value;
  }
  getMapImage() {
    let staticMapUrl: any = "https://maps.googleapis.com/maps/api/staticmap";
    staticMapUrl += "?key=AIzaSyBPSEz52-AfPEVbmV_3yuGUGol_KiLb3GU&center=" + localStorage.getItem("lat") + "," + localStorage.getItem("lng");
    staticMapUrl += "&size=640x360&scale=2";
    staticMapUrl += "&zoom=13";
    staticMapUrl += "&maptype=" + this.map.mapTypeId;
    staticMapUrl += "&markers=color:red|" + localStorage.getItem("lat") + "," + localStorage.getItem("lng");

    const toDataURL = url => fetch(url)
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
  getData() {
    if (this.propertyDetails.value.titleDeed == "") {
      this.error = "Enter Title Deed No";
      this.showError = true;
    } else if (this.titleDeedType == -1) {
      this.error = "Select Title Deed Type";
      this.showError = true;
    } else if (this.propertyDetails.value.muncipality == "") {
      this.error = "Enter Muncipality/Affection No";
      this.showError = true;
    } else if (this.propertyInsured == -1) {
      this.error = "Select Property Insurance Type";
      this.showError = true;
    } else if (this.countryId == -1) {
      this.error = "Select Country";
      this.showError = true;
    } else if (this.cityId == -1) {
      this.error = "Select City";
      this.showError = true;
    } else if (this.districtId == -1) {
      this.error = "Select District";
      this.showError = true;
    } else if ($("#searchLocation").val() == "" || !this.locationSelected) {
      this.error = "Enter Address";
      this.showError = true;
    } else {

      this.getMapImage();
      this.formDetailData.TitleDeedNo = this.propertyDetails.value.titleDeed;
      this.formDetailData.MunicipalityNo = this.propertyDetails.value.muncipality;
      this.formDetailData.address = $("#searchLocation").val();
      localStorage.setItem('valuationDetailData', JSON.stringify(this.formDetailData));

      this.data.TitleDeedNo = this.propertyDetails.value.titleDeed;
      this.data.TitleDeedType = this.titleDeedType;
      this.data.MunicipalityNo = this.propertyDetails.value.muncipality;
      this.data.CountryId = this.countryId;
      this.data.CityId = this.cityId;
      this.data.DistrictId = this.districtId;
      this.data.PropertyInsured = this.propertyInsured;
      this.data.PropertyLat = localStorage.getItem("lat");
      this.data.PropertyLong = localStorage.getItem("lng");
      localStorage.removeItem("lat");
      localStorage.removeItem("lng");
      this.data.PropertyAddress = $("#searchLocation").val();
      localStorage.setItem('valuationData', JSON.stringify(this.data));
      this.router.navigate(['/PropertyType']);
    }
  }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.getLocation();
  }
  initMap(e: any, zoom: any) {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: e,
      zoom: zoom,
      disableDefaultUI: true,
    })
    this.marker = new google.maps.Marker({
      position: e,
      map: this.map
    })
    this.autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement);
    this.autocomplete.addListener('place_changed', this.onPlaceChanged);
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
      this.initMap(null, 8);
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
      this.map = new google.maps.Map($(".property-details__map")[0], {
        center: { "lat": parseInt(this.oldData.PropertyLat), "lng": parseInt(this.oldData.PropertyLong) },
        zoom: 10,
        disableDefaultUI: true,
        restriction: {
          latLngBounds: bounds,
          strictBounds: true,
        },
      });
      this.marker = new google.maps.Marker({
        position: { "lat": parseInt(this.oldData.PropertyLat), "lng": parseInt(this.oldData.PropertyLong) },
        map: this.map
      });
      this.autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, this.options);
      this.autocomplete.addListener('place_changed', this.onPlaceChanged);
      this.autocomplete.setBounds(this.bounds);
      $("#searchLocation").val(this.oldData.PropertyAddress);
    }
  }
}
