import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { NotificationService } from "../../service/notification.service";
import { AppService } from 'src/app/service/app.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private route: Router, private notifyService: NotificationService, private service: AppService, private modalService: NgbModal, config: NgbModalConfig) {
    const selectedPackageByPoints ={
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
    this.loadSavedData();
    config.backdrop = 'static';
    config.keyboard = false;
  }
  // checkPackage(e:any) {
  //   if(this.selectedPackageName.indexOf(e) != -1) {
  //     return true;
  //   } else {
  //     return false
  //   }
  // }
  loadSavedData() {
    debugger;
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
      this.service.LoadCities(this.countryId).subscribe(e => {
        let temp: any = e;
        if (temp.message == "City list fetched successfully") {
          for (let city of temp.data) {
            this.city.push({ viewValue: city.name, value: city.id });
          }
          let interval: any = setInterval(() => {
            if (this.city.length > 0) {
              $(".city-item-" + this.oldData.CityId).attr("selected", "selected");
              $(".city-select").select2();
              clearInterval(interval);
            }
          }, 100)
          this.cityId = this.oldData.CityId;
          // let id = this.cityId;
          // let a = this.city.filter(function (c: any) {
          //   return c.value == id;
          // });
          this.service.LoadDistrict(this.cityId).subscribe(e => {
            let temp: any = e;
            if (temp.result == 1) {
              for (let district of temp.data) {
                this.district.push({ viewValue: district.name, value: district.id });
              }
              this.showLoader = false;
              let interval: any = setInterval(() => {
                if (this.district.length > 0) {
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
    }
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
          this.country.push({ viewValue: country.name, value: country.id ,currency:country.currency});
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
      console.log(temp);
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
    debugger;
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
    } else if (this.SubmitForm.value.address?.trim() == "") {
      this.currentField = "add-adrees-sec";
      this.error = "Select Address";
      this.showError = true;
      return;
    }

    let tempPackage:any = localStorage.getItem("seletedPackage");
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
    e= this.ReplaceAlphabets(e);
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
          zoom: 10,
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
        //   let pos: any = this.marker.getPosition();
        //   let geocoder = new google.maps.Geocoder();
        //   geocoder.geocode
        //     ({
        //       latLng: pos
        //     },
        //       (results: any, status: any) => {
        //         if (status == google.maps.GeocoderStatus.OK) {
        //           localStorage.setItem("lat", e.latLng.lat());
        //           localStorage.setItem("lng", e.latLng.lng());
        //           $(".searchLocation").val(results[0].formatted_address);
        //           localStorage.setItem("address", results[0].formatted_address);
        //         }
        //         else {
        //           this.error = "Cannot determine address at this location.";
        //           this.showError = true;
        //         }
        //       }
        //     );
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
    let newName="";
    if (name.toLowerCase().includes('first')) {
      newName=name.toLowerCase().replace('first', '1');
    }
    else if (name.toLowerCase().includes('second')) {
      newName=name.toLowerCase().replace('second', '2');
    }
    else if (name.toLowerCase().includes('third')) {
      newName=name.toLowerCase().replace('third', '3');
    }
    else if (name.toLowerCase().includes('fourth') || name.toLowerCase().includes('forth')) {
      if(name.toLowerCase().includes('fourth')){
        newName=name.toLowerCase().replace('fourth', '4');
      }else{
        newName=name.toLowerCase().replace('forth', '4');
      }
    }
    else if (name.toLowerCase().includes('fifth')) {
      newName=name.toLowerCase().replace('fifth', '5');
    }
    else if (name.toLowerCase().includes('sixth')) {
      newName=name.toLowerCase().replace('sixth', '6');
    }
    else if (name.toLowerCase().includes('seventh')) {
      newName=name.toLowerCase().replace('seventh', '7');
    }
    else if (name.toLowerCase().includes('eighth')) {
      newName=name.toLowerCase().replace('eighth', '8');
    }
    else if (name.toLowerCase().includes('ninth')) {
      newName=name.toLowerCase().replace('ninth', '9');
    }
    else if (name.toLowerCase().includes('tenth')) {
      newName=name.toLowerCase().replace('tenth', '10');
    }
    else{
      newName=name;
    }
    return newName;
  }
}