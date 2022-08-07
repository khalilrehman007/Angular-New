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

  map: any;
  @ViewChild('propertyDetails__map') mapElement: any;

  searchLocaation: any;
  @ViewChild('searchLocation') searchElement: any;

  Locate = '../../../../assets/images/icons/locate.svg'
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

  location = { lat: 31.5204, lng: 74.3587 };

  propertyDetails = new FormGroup({
    titleDeed: new FormControl("", Validators.required),
    muncipality: new FormControl("", Validators.required),
    PhoneNumber: new FormControl("", Validators.required), 
    propertyOwner: new FormControl(""),
    ownerPhone: new FormControl("", Validators.required),
  })
  get titleDeed() {
    return this.propertyDetails.get("titleDeed")
  }
  get muncipality() {
    return this.propertyDetails.get("muncipality")
  }
  get propertyOwner() {
    return this.propertyDetails.get("propertyOwner")
  }
  get ownerPhone() {
    return this.propertyDetails.get("ownerPhone")
  }

  constructor(private http: HttpClient, private service: AppService, private router: Router) {
    this.loadCountriesData();
  }
  changeInfo() {
    $("#searchLocation").focus();
    let temp: any = $("#searchLocation").offset();
    temp = temp.top;
    $(window).scrollTop(temp - 200);
  }
  
  checkLength() {
    let temp:any = this.propertyDetails.value.ownerPhone;
    if(temp.toString().length > 12) {
      alert("Max length allowes is 12");
      this.propertyDetails.patchValue({
        ownerPhone: temp.toString().slice(0,-1)
      })
    }
  }

  confirmLocation() {
    this.locationInformation.country = this.countryName;
    this.locationInformation.city = this.cityName;
    this.locationInformation.address = localStorage.getItem("address");
    localStorage.removeItem("address");
  }
  
  loadCountriesData() {
    this.service.LoadCountries().subscribe(e => {
      let temp: any = e;
      if (temp.message == "Country list fetched successfully") {
        for (let country of temp.data) {
          this.country.push({ viewValue: country.name, value: country.id });
        }
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
    let temp = this.country.filter(function (c: any) {
      return c.value == e.value
    });
    this.formDetailData.country = temp[0].viewValue;
    this.countryName = temp[0].viewValue;
    this.getLocationDetails(temp[0].viewValue);
    this.countryId = e.value;
    this.city = [];
    this.service.LoadCities(e.value).subscribe(e => {
      let temp: any = e;
      if (temp.message == "City list fetched successfully") {
        for (let city of temp.data) {
          this.city.push({ viewValue: city.name, value: city.id });
        }
      }
    });
  }
  onCitySelect(e: any) {
    let temp = this.city.filter(function (c: any) {
      return c.value == e.value
    })
    this.formDetailData.city = temp[0].viewValue;
    this.cityName = temp[0].viewValue;
    this.getLocationDetails(temp[0].viewValue);
    this.cityId = e.value;
    this.district = [];
    this.service.LoadDistrict(e.value).subscribe(e => {
      let temp: any = e;
      if (temp.message == "District list fetched successfully") {
        for (let district of temp.data) {
          this.district.push({ viewValue: district.name, value: district.id });
        }
      }
    });
  }
  onDistrictSelect(e: any) {
    let temp = this.district.filter(function (c: any) {
      return c.value == e.value
    })
    this.formDetailData.district = temp[0].viewValue;
    this.getLocationDetails(temp[0].viewValue);
    this.districtId = e.value;
  }
  getMapImage() {
    let staticMapUrl: any = "https://maps.googleapis.com/maps/api/staticmap";
    staticMapUrl += "?key=AIzaSyBPSEz52-AfPEVbmV_3yuGUGol_KiLb3GU&center=" + localStorage.getItem("lat") + "," + localStorage.getItem("lng");
    staticMapUrl += "&size=1920x1080";
    staticMapUrl += "&zoom=15";
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
    if (this.titleDeedType == -1) {
      alert("Select Title Deed Type");
    } else if (this.propertyInsured == -1) {
      alert("Select Property Insurance Type")
    } else if (this.countryId == -1) {
      alert("Select Country");
    } else if (this.cityId == -1) {
      alert("Select City");
    } else if (this.districtId == -1) {
      alert("Select District");
    } else if ($("#searchLocation").val() == "") {
      alert("Enter Address");
    } else {

      this.getMapImage();
      this.formDetailData.TitleDeedNo = this.propertyDetails.value.titleDeed;
      this.formDetailData.MunicipalityNo = this.propertyDetails.value.muncipality;
      this.formDetailData.ownerName = this.propertyDetails.value.propertyOwner;
      this.formDetailData.PhoneNumber = this.propertyDetails.value.ownerPhone;
      this.formDetailData.address = $("#searchLocation").val();
      localStorage.setItem('valuationDetailData', JSON.stringify(this.formDetailData));

      this.data.TitleDeedNo = this.propertyDetails.value.titleDeed;
      this.data.TitleDeedType = this.titleDeedType;
      this.data.MunicipalityNo = this.propertyDetails.value.muncipality;
      this.data.CountryId = this.countryId;
      this.data.CityId = this.cityId;
      this.data.DistrictId = this.districtId;
      this.data.PropertyInsured = this.propertyInsured;
      this.data.CustomerName = this.propertyDetails.value.propertyOwner;
      this.data.PhoneNumber = this.propertyDetails.value.ownerPhone;
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
  initMap(e: any) {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: e,
      zoom: 8,
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
  getLocationDetails(e: any) {
    $.ajax({
      url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + e + "&key=AIzaSyBPSEz52-AfPEVbmV_3yuGUGol_KiLb3GU",
      method: "get",
      success: (res) => {
        let temp = res.results[0].geometry.bounds;
        let bounds = { east: temp.northeast.lng, west: temp.southwest.lng, north: temp.northeast.lat, south: temp.southwest.lat };
        let area = res.results[0].geometry.location;
        this.map = new google.maps.Map($(".property-details__map")[0], {
          center: area,
          zoom: 6,
          disableDefaultUI: true,
          restriction: {
            latLngBounds: bounds,
            strictBounds: false,
          },
        })
        this.marker = new google.maps.Marker({
          position: area,
          map: this.map
        })
      }
    });
  }
  getLocation() {
    this.initMap(null);
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
  }
}
