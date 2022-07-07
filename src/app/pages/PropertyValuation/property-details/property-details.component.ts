import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AppService } from 'src/app/service/app.service';

declare const google: any;
@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit, AfterViewInit {

  map: any;
  @ViewChild('propertyDetails__map') mapElement: any;
  
  searchLocaation:any;
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

  location = { lat: 31.5204, lng: 74.3587 };

  propertyDetails = new FormGroup({
    titleDeed: new FormControl("", Validators.required),
    muncipality: new FormControl("", Validators.required),
    propertyOwner: new FormControl(""),
    ownerPhone: new FormControl(""),
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

  constructor(private service: AppService) {
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
  toggleType(e: number) {
    this.titleDeedType = e;
  }
  toggleInsured(e: number) {
    this.propertyInsured = e;
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
    } else {
      this.data.TitleDeedNo = this.propertyDetails.value.titleDeed;
      this.data.TitleDeedType = this.titleDeedType;
      this.data.MunicipalityNo = this.propertyDetails.value.muncipality;
      this.data.CountryId = this.countryId;
      this.data.CityId = this.cityId;
      this.data.DistrictId = this.districtId;
      this.data.PropertyInsured = this.propertyInsured;
      this.data.CustomerName = this.propertyDetails.value.propertyOwner;
      this.data.PhoneNumber = this.propertyDetails.value.ownerPhone;
      console.log(this.data);
    }
  }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: this.location,
      zoom: 8,
      disableDefaultUI: true,
    })
    let marker = new google.maps.Marker({
      position: this.location,
      map: this.map
    })
    let searchBox:any = new google.maps.places.SearchBox(this.searchElement.nativeElement);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(this.searchElement.nativeElement);
    // this.map.addListener("bounds_changed", () => {
    //   searchBox.setBounds(this.map.getBounds());
    // });
  }
}
