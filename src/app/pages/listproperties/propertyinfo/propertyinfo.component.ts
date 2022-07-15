import {AfterViewInit,Component, OnInit, ViewChild} from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../../service/notification.service";
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
  oldData :any;
  countryId: number = -1;
  cityId: number = -1;
  districtId: number = -1;
  district: any = [];
  location = { lat: 31.5204, lng: 74.3587 };
  autocomplete: any;
  seachAddress :any
  data: any = {};





  constructor(private route:Router,private notifyService : NotificationService,private service: AppService) {
    this.getOldFormData();
    this.loadCountriesData();
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
  onCountrySelect(e: any) {
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
    this.districtId = e.value;
  }

  getOldFormData(){
    this.oldData = localStorage.getItem('property_info');
    if(this.oldData != '' && this.oldData != null){
      this.oldData = JSON.parse(this.oldData);
      this.SubmitForm.controls.CountryId.setValue(this.oldData.CountryId);
      this.SubmitForm.controls.CityId.setValue(this.oldData.CityId);
      this.SubmitForm.controls.PropertyAge.setValue(this.oldData.PropertyAge);
      this.SubmitForm.controls.BuildingName.setValue(this.oldData.BuildingName);
      this.SubmitForm.controls.UnitNo.setValue(this.oldData.UnitNo);
      this.SubmitForm.controls.TotalFloor.setValue(this.oldData.TotalFloor);
      this.SubmitForm.controls.FloorNo.setValue(this.oldData.FloorNo);
      this.SubmitForm.controls.address.setValue(this.oldData.address);
    }
    return this.oldData;
  }
  SubmitForm = new FormGroup({
    CountryId   : new FormControl("", Validators.required),
    CityId      : new FormControl("", Validators.required),
    PropertyAge : new FormControl("", Validators.required),
    BuildingName: new FormControl("", Validators.required),
    UnitNo      : new FormControl("", Validators.required),
    TotalFloor  : new FormControl("", Validators.required),
    FloorNo     : new FormControl("", Validators.required),
    address     : new FormControl("", Validators.required),
  });


  get validate(){
    return this.SubmitForm.controls;
  }
  onSubmit() {
    // localStorage.removeItem("listpropertyinfo");

    this.submitted = true;
    if (this.SubmitForm.invalid) {
      return;
    }
    console.log('dedede')
    let temp:any = document.getElementById("searchLocation");

    this.data.address = temp.value;

    this.data.BuildingName = this.SubmitForm.value.BuildingName;
    this.data.CityId = this.SubmitForm.value.CityId;
    this.data.CountryId = this.SubmitForm.value.CountryId;
    this.data.FloorNo = this.SubmitForm.value.FloorNo;
    this.data.PropertyAge = this.SubmitForm.value.PropertyAge;
    this.data.TotalFloor = this.SubmitForm.value.TotalFloor;
    this.data.UnitNo = this.SubmitForm.value.UnitNo;

    localStorage.setItem('property_info',JSON.stringify(this.data))
    this.route.navigate(['listpropertyinfo'])
    // console.log(this.SubmitForm.value)
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.initMap();
  }
  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: this.location,
      zoom: 8,
      disableDefaultUI: true,
    })
    let marker = new google.maps.Marker({
      position: this.location,
      map: this.map
    })
    this.autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement);
    this.autocomplete.addListener('place_changed', this.onPlaceChanged)
  }
  onPlaceChanged() {
    let temp:any = document.getElementById("searchLocation");
    let address:any = temp.value;

  }

}
