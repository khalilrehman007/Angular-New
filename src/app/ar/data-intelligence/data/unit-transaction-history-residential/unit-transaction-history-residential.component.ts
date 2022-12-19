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

  showLoader: boolean = false;
  salesPage: any = 1;
  salesItemsPerPage: any = 10;
  salestotalLength: any = 0;
  rentPage: any = 1;
  rentItemsPerPage: any = 10;
  renttotalLength: any = 0;
  mortagePage: any = 1;
  mortageItemsPerPage: any = 10;
  mortagetotalLength: any = 0;
  pageitems: ItemsPerPage[] = [
    { value: '10', viewValue: '10' },
    { value: '20', viewValue: '20' },
    { value: '20', viewValue: '30' },
    { value: '20', viewValue: '40' }
  ];
  salesPageNumbers = this.pageitems[0].value;
  rentPageNumbers = this.pageitems[0].value;
  mortagePageNumbers = this.pageitems[0].value;

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
  projectsData: any = [];
  unitsData: any = [];
  transactionData: any = "";

  constructor(private cookie: CookieService, private service: AppService) {
    this.countryData = JSON.parse(this.cookie.get("countryData"));
    console.log(this.countryData);
    this.service.LoadCities(this.countryData.id).subscribe((result: any) => {
      this.citiesData = result.data;
      this.selectedCity = this.citiesData[0].id;
      this.loadDistrict(this.citiesData[0].id);
      let interval = setInterval(() => {
        if (this.districtData.length > 0) {
          this.selectedDistrict = this.districtData[0].id;
          this.loadProject(this.districtData[0].id);
          clearInterval(interval);
        }
      }, 100)
      let interval2 = setInterval(() => {
        if (this.projectsData.length > 0) {
          this.selectedProject = this.projectsData[0].id;
          this.loadUnits(this.projectsData[0].id)
          clearInterval(interval2);
        }
      }, 100)
      let interval3 = setInterval(() => {
        if (this.unitsData.length > 0) {
          this.unitNumber = this.unitsData[0];
          this.loadData();
          clearInterval(interval3);
        }
      }, 100)
      this.loadType();
    })
  }
  salesPageChanged(e: any) {
    this.salesPage = e;
  }
  rentPageChanged(e: any) {
    this.rentPage = e;
  }
  mortagePageChanged(e: any) {
    this.mortagePage = e;
  }
  getSalesItems(e: any) {
    this.salesItemsPerPage = e.value;
  }
  getRentItems(e: any) {
    this.rentItemsPerPage = e.value;
  }
  getMortageItems(e: any) {
    this.mortageItemsPerPage = e.value;
  }
  loadUnits(e: any) {
    this.service.GetUnitsByProjectId(e).subscribe((result: any) => {
      this.unitsData = result.data;
      if (this.unitsData.length == 0) {
        this.unitNumber = "";
      }
    })
  }
  loadProject(e: any) {
    this.service.GetProjects({ "DistrictIds": [e] }).subscribe((result: any) => {
      this.projectsData = result.data;
      if (this.projectsData.length == 0) {
        this.selectedProject = "";
      }
    })
  }
  loadType() {
    this.service.LoadType(1).subscribe((result: any) => {
      for (let item of result.data) {
        this.propertyType.push(item)
      }
      this.selectedType = this.propertyType[0].id
      this.service.LoadType(2).subscribe((result: any) => {
        for (let item of result.data) {
          this.propertyType.push(item)
        }
        this.selectedType = this.propertyType[0].id;
      })
    })
  }
  loadDistrict(e: any) {
    this.service.LoadDistrict(e).subscribe((result: any) => {
      this.districtData = result.data;
      if (this.districtData.length == 0) {
        this.selectedDistrict = "";
      }
    })
  }
  loadData() {
    if (this.selectedCity == "" || this.selectedDistrict == "" || this.selectedProject == "" || this.unitNumber == "") {
      return;
    }
    let temp: any = {};
    temp.CountryId = this.countryData.id;
    temp.CityId = this.selectedCity;
    temp.DistrictId = this.selectedDistrict;
    temp.ProjectId = this.selectedProject;
    temp.PropertyTypeId = this.selectedType;
    temp.UnitNo = this.unitNumber;
    this.service.GetResidentialUnitTransactionHistory(temp).subscribe((result: any) => {
      this.transactionData = result.data;
      this.salestotalLength = this.transactionData.saleTransactions;
      this.renttotalLength = this.transactionData.rentTransactions;
      console.log(this.transactionData);
    })
  }
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    $(".unit-number-select").select2({ placeholder: "رقم الوحدة" });
    $(".city-select").on("change", () => {
      this.loadDistrict($(".city-select").val());
    })
    $(".district-select").on("change", () => {
      this.selectedDistrict = $(".district-select").val();
      this.loadProject(this.selectedDistrict);
      this.loadData();
    });
    $(".property-type-select").on("change", () => {
      this.selectedType = $(".property-type-select").val();
      this.loadProject(this.selectedType);
      this.loadData();
    });
    $(".project-select").on("change", () => {
      this.selectedProject = $(".project-select").val();
      this.loadUnits(this.selectedProject);
      this.loadData();
    });
    $(".unit-select").on("change", () => {
      this.unitNumber = $(".unit-select").val();
      this.loadData();
    });
  }
}