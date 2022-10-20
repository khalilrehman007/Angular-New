import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from 'src/app/service/app.service';
import { Select2 } from 'select2';
interface ItemsPerPage {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-unit-transaction-history-residential',
  templateUrl: './unit-transaction-history-residential.component.html',
  styleUrls: ['./unit-transaction-history-residential.component.scss']
})
export class UnitTransactionHistoryResidentialComponent implements OnInit {
  pageitems: ItemsPerPage[] = [
    { value: '10', viewValue: '10' },
    { value: '20', viewValue: '20' },
    { value: '20', viewValue: '30' },
    { value: '20', viewValue: '40' }
  ];
  PageNumbers = this.pageitems[0].value;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  CommunityCtrl = new FormControl('');
  filteredcommunity: any = [];
  communityfield: any = [];
  allcommunityfield: string[] = ['Dubai Community', 'Dubai Community', 'Dubai Community'];

  @ViewChild('ComunityInput') ComunityInput: any;
  @ViewChild('PropertyTypeInput') PropertyTypeInput: any;
  @ViewChild('PropertyInput') PropertyInput: any;

  countryData: any = "";
  citiesData: any = "";
  districtData: any = "";
  selectedCity: any = "";
  selectedDistrict: any = "";
  selectedType: any = "";
  selectedProject: any = "";
  unitNumber: any = "";
  propertyType: any = [];
  projectsData:any = [];
  unitsData:any = [];

  constructor(private cookie: CookieService, private service: AppService) {
    this.countryData = JSON.parse(this.cookie.get("countryData"));
    this.service.FindCities({ "CountryId": this.countryData.id, "Locations": [] }).subscribe((result: any) => {
      this.citiesData = result.data;
      this.loadDistrict(this.citiesData[0].id)
      let interval = setInterval(() => {
        if(this.districtData.length > 0) {
          this.loadProject(this.districtData[0].id);
          clearInterval(interval);
        }
      },100)
      let interval2 = setInterval(() => {
        if(this.projectsData.length > 0) {
          this.loadUnits(this.projectsData[0].id)
          clearInterval(interval2);
        }
      },100)
      this.loadType();
    })
  }
  loadUnits(e:any) {
    this.service.GetUnitsByProjectId(e).subscribe((result: any) => {
      this.unitsData = result.data;
    })
  }
  loadProject(e: any) {
    this.service.GetProjects({ "DistrictIds": [e] }).subscribe((result: any) => {
      this.projectsData = result.data;
    })
  }
  loadType() {
    this.service.LoadType(1).subscribe((result: any) => {
      for (let item of result.data) {
        this.propertyType.push(item)
      }
      this.service.LoadType(2).subscribe((result: any) => {
        for (let item of result.data) {
          this.propertyType.push(item)
        }
      })
    })
  }
  loadDistrict(e: any) {
    this.service.FindDistricts({ "CityId": e, "Locations": [] }).subscribe((result: any) => {
      this.districtData = result.data;
    })
  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    $(".unit-number-select").select2({ placeholder: "Unit Numbers" });
    $(".city-select").on("change", () => {
      this.loadDistrict($(".city-select").val());
    })
    $(".district-select").on("change", () => {
      this.selectedDistrict = $(".district-select").val();
      this.loadProject(this.selectedDistrict);
    });
    $(".property-type-select").on("change", () => {
      this.selectedType = $(".property-type-select").val();
      this.loadProject(this.selectedType);
    });
    $(".project-select").on("change", () => {
      this.selectedProject = $(".project-select").val();
      this.loadUnits(this.selectedProject);
    });
    $(".unit-select").on("change", () => {
      this.unitNumber = $(".unit-select").val();
    });
  }
}