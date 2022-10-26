import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Options } from '@angular-slider/ngx-slider';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from 'src/app/service/app.service';
interface ItemsPerPage {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-rent-data-residential',
  templateUrl: './rent-data-residential.component.html',
  styleUrls: ['./rent-data-residential.component.scss']
})
export class RentDataResidentialComponent implements OnInit {

  showLoader: boolean = false;
  page:any = 1;
  itemsPerPage:any = 10;
  totalLength:any = 0;
  pageitems: ItemsPerPage[] = [
    {value: '10', viewValue: '10'},
    {value: '20', viewValue: '20'},
    {value: '50', viewValue: '50'},
    {value: '100', viewValue: '100'}
  ];
  PageNumbers = this.pageitems[0].value;

  displayedColumns: any = ['Type', 'Sub Type', 'Sequence', 'Date', 'Location', 'Property Type', 'Project Name', 'Unit', 'Bedrooms', 'Floor', 'Parking', 'Balcony Area', 'Size', 'Land Size', 'Amount', 'AED', 'Developer'];
  dataSource: any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  //Size RangeSlider
  SizeminValue: number = 10;
  SizemaxValue: number = 10000000;
  Sizeoptions: Options = {
    floor: 10,
    ceil: 10000000,
    translate: (value: number): string => {
      return value + this.countryData.unitType;
    }
  };

  //Price RangeSlider
  PriceminValue: number = 10;
  PricemaxValue: number = 10000000;
  Priceoptions: Options = {
    floor: 10,
    ceil: 10000000,
    translate: (value: number): string => {
      return value + this.countryData.currency;
    }
  };

  separatorKeysCodes: number[] = [ENTER, COMMA];
  CommunityCtrl = new FormControl('');
  filteredcommunity: any = [];
  communityfield: any = [];
  allcommunityfield: string[] = ['Dubai Community', 'Dubai Community', 'Dubai Community'];

  // Property Type Filter
  PropertyTypCtrl = new FormControl('');
  filteredProperty: any = [];
  ProTypefield: any = [];
  allProTypefield: string[] = ['Property Type', 'Dubai', 'Dubai'];

  // Property Filter
  PropertyCtrl = new FormControl('');
  filteredPropertyOnly: any = [];
  Profield: any = [];
  allProfield: string[] = ['Property', 'Dubai', 'Dubai'];

  // Transaction Type Filter
  TransactionCtrl = new FormControl('');
  filteredTransaction: any;
  Transactionfield: any = [];
  allTransactionfield: string[] = ['Transaction', 'Dubai', 'Dubai'];


  // Sales Sequences Filter
  salesCtrl = new FormControl('');
  filteredsales: any = [];
  salesfield: any = [];
  allsalesfield: string[] = ['Sale', 'Dubai', 'Dubai'];

  // Developers Filter
  DevelopersCtrl = new FormControl('');
  filteredDevelopers: any;
  Developersfield: any = [];
  allDevelopersfield: string[] = ['All Developers', 'Developers', 'Developers'];

  // Bedrooms Filter
  bedsCtrl = new FormControl('');
  filteredbeds: any;
  bedsfield: any = [];
  allbedsfield: any = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // City Filter
  CityCtrl = new FormControl('');
  filteredCity: any;
  Cityfield: any = [];
  allCityfield: string[] = ['All City', 'City', 'City'];

  currentDate: any = new Date()
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
    minStart: new FormControl(),
    maxStart: new FormControl(),
    minEnd: new FormControl(),
    maxEnd: new FormControl(),
  })

  @ViewChild('ComunityInput') ComunityInput: any;
  @ViewChild('PropertyTypeInput') PropertyTypeInput: any;
  @ViewChild('PropertyInput') PropertyInput: any;
  @ViewChild('TransactionInput') TransactionInput: any;
  @ViewChild('SalesInput') SalesInput: any;
  @ViewChild('developersInput') developersInput: any;
  @ViewChild('bedInput') bedInput: any;
  @ViewChild('CityInput') CityInput: any;

  countryData: any = "";
  citiesData: any = "";
  startDate: any = "";
  minStartDate: any = "";
  maxStartDate: any = "";
  endDate: any = "";
  minEndDate: any = "";
  maxEndDate: any = "";
  minSize: any = "";
  maxSize: any = "";
  minPrice: any = "";
  maxPrice: any = "";
  transactionData: any = "";
  allCitiesSelected: boolean = false;
  selectedCity: any = [];
  allDistrictSelected: boolean = false;
  selectedDistrict: any = [];
  allPropertyTypeSelected: boolean = false;
  selectedPropertyType: any = [];
  allProjectSelected: boolean = false;
  selectedProject: any = [];
  allTransactionTypeSelected: boolean = false;
  selectedTransactionType: any = [];
  allBedsSelected: boolean = false;
  selectedBeds: any = [];

  constructor(private cookie: CookieService, private service: AppService) {
    this.minSize = this.SizeminValue;
    this.maxSize = this.SizemaxValue;
    this.minPrice = this.PriceminValue;
    this.maxPrice = this.PricemaxValue;
    let temp: any = new Date();
    temp.setFullYear(temp.getFullYear() - 2);
    this.range.patchValue({
      start: temp,
      end: this.currentDate
    })
    this.startDate = temp.getMonth() + "-" + temp.getDate() + "-" + temp.getFullYear();
    this.endDate = this.currentDate.getMonth() + "-" + this.currentDate.getDate() + "-" + this.currentDate.getFullYear();
    this.countryData = JSON.parse(this.cookie.get("countryData"));
    this.service.FindCities({ "CountryId": this.countryData.id, "Locations": [] }).subscribe((result: any) => {
      this.citiesData = result.data;
      this.Cityfield.push({ "id": this.citiesData[0].id, "name": this.citiesData[0].name });
      this.loadDistrict();
      let a = setInterval(() => {
        if (this.filteredcommunity.length > 0) {
          this.communityfield.push({ "id": this.filteredcommunity[0].id, "name": this.filteredcommunity[0].name });
          this.loadProjects();
          this.loadData();
          clearInterval(a);
        }
      })
    })
    this.service.GetDevelopers(this.countryData.id).subscribe((result: any) => {
      this.filteredDevelopers = result.data;
    })
    this.service.LoadType(1).subscribe((result: any) => {
      for (let item of result.data) {
        this.filteredProperty.push(item)
      }
      this.service.LoadType(2).subscribe((result: any) => {
        for (let item of result.data) {
          this.filteredProperty.push(item)
        }
      })
    })
    this.service.GetTransactionType().subscribe((result: any) => {
      this.filteredTransaction = result.data;
    })
  }
  pageChanged(e:any) {
    this.page = e;
  }
  getItems(e:any) {
    this.itemsPerPage = e.value;
  }
  formatNumber(e:any) {
    if(e >= 1000000000000) {
      return (Math.round(e/10000000000) / 100) + "T";
    } else if(e >= 1000000000) {
      return (Math.round(e/10000000) / 100) + "B";
    } else if(e >= 1000000) {
      return (Math.round(e/10000) / 100) + "M";
    } else if(e >= 1000) {
      return (Math.round(e/10) / 100) + "k";
    } else {
      return (Math.round(e*100) / 100);
    }
  }
  getDate(e: any) {
    let temp: any = new Date(e.value)
    return temp.getMonth() + "-" + temp.getDate() + "-" + temp.getFullYear();
  }
  getStartDate(e: any) {
    this.startDate = this.getDate(e);
  }
  getMinStartDate(e: any) {
    this.minStartDate = this.getDate(e);
    this.loadData();
  }
  getMaxStartDate(e: any) {
    this.maxStartDate = this.getDate(e);
    this.loadData();
  }
  getEndDate(e: any) {
    this.endDate = this.getDate(e);
    this.loadData();
  }
  getMinEndDate(e: any) {
    this.minEndDate = this.getDate(e);
    this.loadData();
  }
  getMaxEndDate(e: any) {
    this.maxEndDate = this.getDate(e);
    this.loadData();
  }
  selectAllCity() {
    if (!this.allCitiesSelected) {
      this.selectedCity = [];
      this.selectedCity.push("All");
      for (let item of this.citiesData) {
        this.selectedCity.push(item.id);
      }
      this.allCitiesSelected = true;
    } else {
      this.selectedCity = [];
      this.allCitiesSelected = false;
      this.communityfield = [];
    }
    this.loadDistrict();
  }
  getCity(e: any) {
    this.selectedCity = [];
    for (let item of e.value) {
      this.selectedCity.push(item);
    }
    if (e.value.indexOf("All") != -1) {
      this.allCitiesSelected = false;
      let temp: any = [];
      for (let item of this.selectedCity) {
        if (item != "All") {
          temp.push(item);
        }
      }
      this.selectedCity = temp;
    }
    if(!this.allCitiesSelected) {
      this.loadDistrict();
    }
  }
  loadDistrict() {
    let temp: any = [];
    for (let item of this.selectedCity) {
      if (item != "All") {
        temp.push(item);
      }
    }
    this.communityfield = [];
    for (let i = 0; i < temp.length; i++) {
      this.service.FindDistricts({ "CityId": temp[i], "Locations": [] }).subscribe((result: any) => {
        for (let item of result.data) {
          this.communityfield.push(item);
        }
      })
    }
  }
  selectAllDistrict() {
    if (!this.allDistrictSelected) {
      this.selectedDistrict = [];
      this.selectedDistrict.push("All");
      for (let item of this.communityfield) {
        this.selectedDistrict.push(item.id);
      }
      this.allDistrictSelected = true;
    } else {
      this.selectedDistrict = [];
      this.allDistrictSelected = false;
    }
    this.loadProjects();
  }
  getDistrict(e: any) {
    this.selectedDistrict = [];
    for (let item of e.value) {
      this.selectedDistrict.push(item);
    }
    if (e.value.indexOf("All") != -1) {
      this.allDistrictSelected = false;
      let temp: any = [];
      for (let item of this.selectedDistrict) {
        if (item != "All") {
          temp.push(item);
        }
      }
      this.selectedDistrict = temp;
    }
    if(!this.allDistrictSelected) {
      this.loadProjects();
    }
  }
  loadProjects() {
    let temp: any = [];
    for (let item of this.selectedDistrict) {
      if (item != "All") {
        temp.push(item);
      }
    }
    this.service.GetProjects({ "DistrictIds": temp }).subscribe((result: any) => {
      this.filteredPropertyOnly = result.data;
    })
    this.service.TransactionSequence().subscribe((result: any) => {
      this.filteredsales = result.data;
    })
  }
  selectAllPropertyType() {
    if (!this.allPropertyTypeSelected) {
      this.selectedPropertyType = [];
      this.selectedPropertyType.push("All");
      for (let item of this.filteredProperty) {
        this.selectedPropertyType.push(item.id);
      }
      this.allPropertyTypeSelected = true;
    } else {
      this.selectedPropertyType = [];
      this.allPropertyTypeSelected = false;
    }
  }
  getPropertyType(e: any) {
    this.selectedPropertyType = [];
    for (let item of e.value) {
      this.selectedPropertyType.push(item);
    }
    if (e.value.indexOf("All") != -1) {
      this.allPropertyTypeSelected = false;
      let temp: any = [];
      for (let item of this.selectedPropertyType) {
        if (item != "All") {
          temp.push(item);
        }
      }
      this.selectedPropertyType = temp;
    }
  }
  selectAllProject() {
    if (!this.allProjectSelected) {
      this.selectedProject = [];
      this.selectedProject.push("All");
      for (let item of this.filteredPropertyOnly) {
        this.selectedProject.push(item.id);
      }
      this.allProjectSelected = true;
    } else {
      this.selectedProject = [];
      this.allProjectSelected = false;
    }
  }
  getProject(e: any) {
    this.selectedProject = [];
    for (let item of e.value) {
      this.selectedProject.push(item);
    }
    if (e.value.indexOf("All") != -1) {
      this.allProjectSelected = false;
      let temp: any = [];
      for (let item of this.selectedProject) {
        if (item != "All") {
          temp.push(item);
        }
      }
      this.selectedProject = temp;
    }
  }
  selectAllTransactionType() {
    if (!this.allTransactionTypeSelected) {
      this.selectedTransactionType = [];
      this.selectedTransactionType.push("All");
      for (let item of this.filteredTransaction) {
        this.selectedTransactionType.push(item.id);
      }
      this.allTransactionTypeSelected = true;
    } else {
      this.selectedTransactionType = [];
      this.allTransactionTypeSelected = false;
    }
  }
  getTransactionType(e: any) {
    this.selectedTransactionType = [];
    for (let item of e.value) {
      this.selectedTransactionType.push(item);
    }
    if (e.value.indexOf("All") != -1) {
      this.allTransactionTypeSelected = false;
      let temp: any = [];
      for (let item of this.selectedTransactionType) {
        if (item != "All") {
          temp.push(item);
        }
      }
      this.selectedTransactionType = temp;
    }
  }
  selectAllBeds() {
    if (!this.allBedsSelected) {
      this.selectedBeds = [];
      this.selectedBeds.push("All");
      for (let item of this.allbedsfield) {
        this.selectedBeds.push(item);
      }
      this.allBedsSelected = true;
    } else {
      this.selectedBeds = [];
      this.allBedsSelected = false;
    }
  }
  getBeds(e: any) {
    this.selectedBeds = [];
    for (let item of e.value) {
      this.selectedBeds.push(item);
    }
    if (e.value.indexOf("All") != -1) {
      this.allBedsSelected = false;
      let temp: any = [];
      for (let item of this.selectedBeds) {
        if (item != "All") {
          temp.push(item);
        }
      }
      this.selectedBeds = temp;
    }
  }
  getMinSize(e: any) {
    this.minSize = e;
    this.loadData();
  }
  getMaxSize(e: any) {
    this.maxSize = e;
    this.loadData();
  }
  getMinPrice(e: any) {
    this.minSize = e;
    this.loadData();
  }
  getMaxPrice(e: any) {
    this.maxSize = e;
    this.loadData();
  }
  loadData() {
    if (this.startDate == "" || this.endDate == "" || this.communityfield.length == 0) {
      return;
    }
    this.showLoader = true;
    let temp: any = {};
    temp.StartDate = this.startDate;
    temp.EndDate = this.endDate;
    temp.StartSize = this.minSize;
    temp.EndSize = this.maxSize;
    temp.StartPrice = this.minPrice;
    temp.EndPrice = this.maxPrice;
    temp.DistrictIds = [];
    for (let item of this.communityfield) {
      temp.DistrictIds.push(item.id)
    }
    if (this.ProTypefield.length != 0) {
      temp.PropertyTypeIds = [];
      for (let item of this.ProTypefield) {
        temp.PropertyTypeIds.push(item.id)
      }
    }
    if (this.Profield.length != 0) {
      temp.ProjectIds = [];
      for (let item of this.Profield) {
        temp.ProjectIds.push(item.id)
      }
    }
    if (this.Transactionfield.length != 0) {
      temp.TransactionTypeIds = [];
      for (let item of this.Transactionfield) {
        temp.TransactionTypeIds.push(item.id)
      }
    }
    if (this.minStartDate != "") {
      temp.MinStartDate = this.minStartDate;
    }
    if (this.maxStartDate != "") {
      temp.MaxStartDate = this.maxStartDate;
    }
    if (this.minEndDate != "") {
      temp.MinEndDate = this.minEndDate;
    }
    if (this.maxEndDate != "") {
      temp.MaxEndDate = this.maxEndDate;
    }
    if (this.bedsfield.length != 0) {
      temp.BedroomList = [];
      for (let item of this.bedsfield) {
        temp.BedroomList.push(item.id)
      }
    }
    this.service.GetResidentialRentData(temp).subscribe((result: any) => {
      if (result.message == "Residential Rent Data fetched successfully") {
        this.showLoader = false;
        this.transactionData = result.data;
        this.totalLength = this.transactionData.transactions.length
      }
    });
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.communityfield.push(value);
    }
    event.chipInput!.clear();
    this.CommunityCtrl.setValue(null);
  }
  remove(community: string): void {
    this.Profield = [];
    this.salesfield = [];
    const index = this.communityfield.indexOf(community);
    if (index >= 0) {
      this.communityfield.splice(index, 1);
    }
    this.loadProjects();
    this.loadData();
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.communityfield.push({ "id": event.option.value, "name": event.option.viewValue });
    this.ComunityInput.nativeElement.value = '';
    this.CommunityCtrl.setValue(null);
    this.loadData();
  }
  add1(event: MatChipInputEvent): void {
    const value1 = (event.value || '').trim();
    if (value1) {
      this.ProTypefield.push(value1);
    }
    event.chipInput!.clear();
    this.PropertyTypCtrl.setValue(null);
  }
  remove1(protype: string): void {
    const index1 = this.ProTypefield.indexOf(protype);
    if (index1 >= 0) {
      this.ProTypefield.splice(index1, 1);
    }
    this.loadData();
  }
  selected1(event: MatAutocompleteSelectedEvent): void {
    this.ProTypefield.push({ "id": event.option.value, "name": event.option.viewValue });
    this.PropertyTypeInput.nativeElement.value = '';
    this.PropertyTypCtrl.setValue(null);
    this.loadData();
  }
  add2(event: MatChipInputEvent): void {
    const value2 = (event.value || '').trim();
    if (value2) {
      this.Profield.push(value2);
    }
    event.chipInput!.clear();
    this.PropertyCtrl.setValue(null);
  }
  remove2(property: string): void {
    const index2 = this.Profield.indexOf(property);
    if (index2 >= 0) {
      this.Profield.splice(index2, 1);
    }
    this.loadData();
  }
  selected2(event: MatAutocompleteSelectedEvent): void {
    this.Profield.push({ "id": event.option.value, "name": event.option.viewValue });
    this.PropertyInput.nativeElement.value = '';
    this.PropertyCtrl.setValue(null);
    this.loadData();
  }
  add3(event: MatChipInputEvent): void {
    const value3 = (event.value || '').trim();
    if (value3) {
      this.Transactionfield.push(value3);
    }
    event.chipInput!.clear();
    this.TransactionCtrl.setValue(null);
  }
  remove3(transaction: string): void {
    const index3 = this.Transactionfield.indexOf(transaction);
    if (index3 >= 0) {
      this.Transactionfield.splice(index3, 1);
    }
    this.loadData();
  }
  selected3(event: MatAutocompleteSelectedEvent): void {
    this.Transactionfield.push({ "id": event.option.value, "name": event.option.viewValue });
    this.TransactionInput.nativeElement.value = '';
    this.TransactionCtrl.setValue(null);
    this.loadData();
  }
  add6(event: MatChipInputEvent): void {
    const value6 = (event.value || '').trim();
    if (value6) {
      this.bedsfield.push(value6);
    }
    event.chipInput!.clear();
    this.bedsCtrl.setValue(null);
  }
  remove6(beds: string): void {
    const index6 = this.bedsfield.indexOf(beds);
    if (index6 >= 0) {
      this.bedsfield.splice(index6, 1);
    }
    this.loadData();
  }
  selected6(event: MatAutocompleteSelectedEvent): void {
    this.bedsfield.push(event.option.viewValue);
    this.bedInput.nativeElement.value = '';
    this.bedsCtrl.setValue(null);
    this.loadData();
  }
  add7(event: MatChipInputEvent): void {
    const value7 = (event.value || '').trim();
    if (value7) {
      this.Cityfield.push(value7);
    }
    event.chipInput!.clear();
    this.CityCtrl.setValue(null);
  }
  remove7(city: any): void {
    this.communityfield = [];
    this.Profield = [];
    const index7 = this.Cityfield.indexOf(city);
    if (index7 >= 0) {
      this.Cityfield.splice(index7, 1);
    }
    this.loadDistrict();
    this.loadData();
  }
  selected7(event: any): void {
    this.Cityfield.push({ "id": event.option.value, "name": event.option.viewValue });
    this.CityInput.nativeElement.value = '';
    this.CityCtrl.setValue(null);
    this.loadDistrict();
    this.loadData();
  }
  ngOnInit(): void {
  }
  ngAfterViewInit() {
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}