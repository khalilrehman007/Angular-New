import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../../service/auth.service";
import { Router } from "@angular/router";
import { NotificationService } from "../../../service/notification.service";
import { AppService } from 'src/app/service/app.service';

declare const google: any;

@Component({
  selector: 'app-propertyinfo',
  templateUrl: './propertyinfo.component.html',
  styleUrls: ['./propertyinfo.component.scss']
})
export class PropertyinfoComponent implements OnInit {

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
  oldData: any;
  countryId: number = -1;
  cityId: number = -1;
  district: any = [];
  location = { lat: 25.2048, lng: 55.2708 };
  autocomplete: any;
  seachAddress: any
  data: any = {};
  marker: any;
  countryName:any;
  cityName:any;
  tempAddress:any;
  locationInformation:any = {};




  constructor(private route: Router, private notifyService: NotificationService, private service: AppService) {
    this.loadOldData();
    this.loadCountriesData();
  }
  changeInfo() {
    $("#searchLocation").focus();
    let temp:any = $("#searchLocation").offset();
    temp = temp.top;
    $(window).scrollTop(temp-200);
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
  countryCheck: boolean = false;
  cityCheck: boolean = false;
  onCountrySelect(e: any) {
    let temp = this.country.filter(function (c: any) {
      return c.value == e.value
    });
    this.countryName = temp[0].viewValue;
    this.getLocationDetails(temp[0].viewValue);
    this.countryCheck = true;
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
    this.cityName = temp[0].viewValue;
    this.getLocationDetails(temp[0].viewValue);
    this.cityCheck = true;
    this.cityId = e.value;
  }

  loadOldData() {
  }
  SubmitForm = new FormGroup({
    CountryId: new FormControl(""),
    CityId: new FormControl(""),
    PropertyAge: new FormControl("", Validators.required),
    BuildingName: new FormControl("", Validators.required),
    UnitNo: new FormControl("", Validators.required),
    TotalFloor: new FormControl("", Validators.required),
    FloorNo: new FormControl("", Validators.required),
    address: new FormControl("", Validators.required),
  });


  get validate() {
    return this.SubmitForm.controls;
  }

  onSubmit() {
    localStorage.removeItem("propertyData");

    this.submitted = true;
    const controls = this.SubmitForm.controls;
    if (this.SubmitForm.invalid) {
      console.log(this.countryCheck);
      if (controls["PropertyAge"].invalid) {
        alert('PropertyAge is required please fill it');
      } else if (this.countryCheck == false) {
        alert('Country is required please fill it');
      } else if (this.cityCheck == false) {
        alert('City is required please fill it');
      } else if (controls["BuildingName"].invalid) {
        alert('BuildingName  is required please fill it');
      } else if (controls["UnitNo"].invalid) {
        alert('UnitNo  is required please fill it');
      } else if (controls["TotalFloor"].invalid) {
        alert('TotalFloor  is required please fill it');
      } else if (controls["FloorNo"].invalid) {
        alert('FloorNo  is required please fill it');
      } else if (controls["address"].invalid) {
        alert('address  is required please fill it');
      }

      return;
    }
    let temp: any = document.getElementById("searchLocation");

    this.data.PropertyAddress = temp.value;

    this.data.CountryId = this.countryId;
    this.data.CityId = this.cityId;
    this.data.PropertyLat = localStorage.getItem("lat");
    this.data.PropertyLong = localStorage.getItem("lng");
    this.data.PropertyAge = this.SubmitForm.value.PropertyAge;
    this.data.BuildingName = this.SubmitForm.value.BuildingName;
    this.data.UnitNo = this.SubmitForm.value.UnitNo;
    this.data.TotalFloor = this.SubmitForm.value.TotalFloor;
    this.data.FloorNo = this.SubmitForm.value.FloorNo;
    localStorage.removeItem("lat");
    localStorage.removeItem("lng");
    localStorage.setItem('propertyData', JSON.stringify(this.data))
    this.route.navigate(['listpropertyinfo'])
  }
  checkLength(type:number) {
    if(type == 1) {
      let temp:any = this.SubmitForm.value.TotalFloor;
      if(temp > 200) {
        alert("Max floors allowes is 200");
        this.SubmitForm.patchValue({
          TotalFloor: temp.toString().slice(0,-1)
        })
      }
    }
    else {
      let temp:any = this.SubmitForm.value.FloorNo;
      let total:any = this.SubmitForm.value.TotalFloor;
      if(temp > total) {
        alert("Floor number cannot be greater than Total Floors");
        this.SubmitForm.patchValue({
          FloorNo: temp.toString().slice(0,-1)
        })
      }
      if(temp > 200) {
        alert("Max floors allowes is 200");
        this.SubmitForm.patchValue({
          FloorNo: temp.toString().slice(0,-1)
        })
      }
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
    localStorage.setItem("address",address);
    $.ajax({
      url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyBPSEz52-AfPEVbmV_3yuGUGol_KiLb3GU",
      method: "get",
      success: (res) => {
        let area = res.results[0].geometry.location;
        localStorage.setItem("lat",area.lat);
        localStorage.setItem("lng",area.lng);
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