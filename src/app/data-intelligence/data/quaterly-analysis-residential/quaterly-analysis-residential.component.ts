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
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType, Chart } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { default as Annotation } from 'chartjs-plugin-annotation';
@Component({
  selector: 'app-quaterly-analysis-residential',
  templateUrl: './quaterly-analysis-residential.component.html',
  styleUrls: ['./quaterly-analysis-residential.component.scss']
})
export class QuaterlyAnalysisResidentialComponent implements OnInit {
  downloadreport = 'assets/images/icons/download-svg.svg'
  SizeminValue: number = 10;
  SizemaxValue: number = 1000000;
  Sizeoptions: Options = {
    floor: 10,
    ceil: 1000000,
    translate: (value: number): string => {
      return value + 'K';
    }
  };
  PriceminValue: number = 10;
  PricemaxValue: number = 1000000;
  Priceoptions: Options = {
    floor: 10,
    ceil: 1000000,
    translate: (value: number): string => {
      return value + 'AED';
    }
  };
  showLoader: boolean = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  CommunityCtrl = new FormControl('');
  filteredcommunity: any = [];
  communityfield: any = [];
  allcommunityfield: any = [];
  PropertyTypCtrl = new FormControl('');
  filteredProperty: any = [];
  ProTypefield: any = [];
  allProTypefield: any = [];
  PropertyCtrl = new FormControl('');
  filteredPropertyOnly: any = [];
  TransactionCtrl = new FormControl('');
  filteredTransaction: any = "";
  Transactionfield: any = [];
  allTransactionfield: any = [];
  salesCtrl = new FormControl('');
  filteredsales: any = "";
  salesfield: any = [];
  allsalesfield: any = [];
  DevelopersCtrl = new FormControl('');
  filteredDevelopers: any = "";
  Developersfield: any = [];
  allDevelopersfield: any = [];
  bedsCtrl = new FormControl('');
  filteredbeds: any = "";
  bedsfield: any = [];
  allbedsfield: any = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  currentDate: any = new Date();
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  })
  CityCtrl = new FormControl('');
  filteredCity: any = "";
  Cityfield: any = [];
  allCityfield: any = [];
  transactionTypeChartData: any = "";
  transactionSequenceChartData: any = "";
  transactionSequencevalueChartData: any = "";
  transactionTypeValueChartData: any = "";
  transactionMedianTypeChartData: any = "";
  transactionMedianAreaChartData: any = "";

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
  endDate: any = "";
  minSize: any = "";
  maxSize: any = "";
  minPrice: any = "";
  maxPrice: any = "";
  transactionData: any = "";
  public tbtOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          font: {
            size: 10,
          }
        }
      },
      y: {
        ticks: {
          font: {
            size: 10,
          }
        }
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        display: true,
      },
      title: {
        display: true,
        text: 'Transactions',
        position: 'left',
        font: {
          size: 10
        }
      },
      datalabels: {
        display: false,
      },
    }
  };
  public tbtType: ChartType = 'bar';
  public tbtPlugins = [
    DatalabelsPlugin
  ];
  public tbtData: any = {};
  public tbsOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          font: {
            size: 10,
          }
        }
      },
      y: {
        ticks: {
          font: {
            size: 10,
          }
        }
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        display: true,
      },
      title: {
        display: true,
        text: 'Transactions',
        position: 'left',
        font: {
          size: 10
        }
      },
      datalabels: {
        display: false,
      },
    }
  };
  public tbsType: ChartType = 'bar';
  public tbsPlugins = [
    DatalabelsPlugin
  ];
  public tbsData: any = {};
  public tvbtOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          font: {
            size: 10,
          }
        }
      },
      y: {
        ticks: {
          font: {
            size: 10,
          }
        }
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        display: true,
      },
      title: {
        display: true,
        text: 'Totel Value (AED)',
        position: 'left',
        font: {
          size: 10
        }
      },
      datalabels: {
        display: false,
      },
    }
  };
  public tvbtType: ChartType = 'bar';
  public tvbtPlugins = [
    DatalabelsPlugin
  ];
  public tvbtData: any = {};
  public tvbsOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          font: {
            size: 10,
          }
        }
      },
      y: {
        ticks: {
          font: {
            size: 10,
          }
        }
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        display: true,
      },
      title: {
        display: true,
        text: 'Totel Value (AED)',
        position: 'left',
        font: {
          size: 10
        }
      },
      datalabels: {
        display: false,
      },
    }
  };
  public tvbsType: ChartType = 'bar';
  public tvbsPlugins = [
    DatalabelsPlugin
  ];
  public tvbsData: any = {};
  public mpotOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        display: false
      },
      y: {
        ticks: {
          font: {
            size: 10,
          }
        }
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        display: true,
      },
      title: {
        display: true,
        text: 'Average Value (AED)',
        position: 'left',
        font: {
          size: 10
        }
      },
      datalabels: {
        display: false,
      },
    }
  };
  public mpotType: ChartType = 'bar';
  public mpotPlugins = [
    DatalabelsPlugin
  ];
  public mpotData: any = {};
  public maptOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        display: false
      },
      y: {
        ticks: {
          font: {
            size: 10,
          }
        }
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        display: true,
      },
      title: {
        display: true,
        text: 'AED/Sqft',
        position: 'left',
        font: {
          size: 10
        }
      },
      datalabels: {
        display: false,
      },
    }
  };
  public maptType: ChartType = 'bar';
  public maptPlugins = [
    DatalabelsPlugin
  ];
  public maptData: any = {};
  showTBT: boolean = false;
  showTBS: boolean = false;
  showTVB: boolean = false;
  showTVBS: boolean = false;
  showMPOT: boolean = false;
  showMAPT: boolean = false;
  allCitiesSelected: boolean = false;
  selectedCity: any = [];
  allDistrictSelected: boolean = false;
  selectedDistrict: any = [];
  allPropertyTypeSelected: boolean = false;
  selectedPropertyType: any = [];
  allTransactionTypeSelected: boolean = false;
  selectedTransactionType: any = [];
  allSalesSequenceSelected: boolean = false;
  selectedSalesSequence: any = [];
  allDevelopersSelected: boolean = false;
  selectedDevelopers: any = [];
  allBedsSelected: boolean = false;
  selectedBeds: any = [];
  constructor(private cookie: CookieService, private service: AppService) {
    this.minSize = this.SizeminValue;
    this.maxSize = this.SizemaxValue;
    this.minPrice = this.PriceminValue;
    this.maxPrice = this.PricemaxValue;
    let temp: any = new Date();
    temp.setFullYear(temp.getFullYear() - 4);
    this.range.patchValue({
      start: temp,
      end: this.currentDate
    })
    this.startDate = temp.getMonth() + 1 + "-" + temp.getDate() + "-" + temp.getFullYear();
    this.endDate = this.currentDate.getMonth() + 1 + "-" + this.currentDate.getDate() + "-" + this.currentDate.getFullYear();
    this.countryData = JSON.parse(this.cookie.get("countryData"));
    this.service.TransactionSequence().subscribe((result: any) => {
      this.filteredsales = result.data;
      this.allSalesSequenceSelected = true;
      this.selectedSalesSequence.push("All");
      for (let item of this.filteredsales) {
        this.selectedSalesSequence.push(item.id);
      }
    })
    this.service.FindCities({ "CountryId": this.countryData.id, "Locations": [] }).subscribe((result: any) => {
      this.citiesData = result.data;
      let a = setInterval(() => {
        if (this.filteredcommunity.length > 0) {
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
      this.allTransactionTypeSelected = true;
      this.selectedTransactionType.push("All");
      for (let item of this.filteredTransaction) {
        this.selectedTransactionType.push(item.id);
      }
      this.loadData();
    })
  }
  getStartDate(e: any) {
    this.startDate = this.getDate(e);
  }
  getEndDate(e: any) {
    this.endDate = this.getDate(e);
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
    if (!this.allCitiesSelected) {
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
    this.loadData();
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
    if (!this.allDistrictSelected) {
      this.loadData();
    }
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
    this.loadData();
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
    this.loadData();
  }
  selectAllTransactionType() {
    if (!this.allTransactionTypeSelected) {
      this.selectedTransactionType = [];
      this.selectedTransactionType.push("All");
      for (let item of this.filteredTransaction) {
        this.selectedTransactionType.push(item.id);
      }
      this.allTransactionTypeSelected = true;
      this.loadData();
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
    if (!this.allTransactionTypeSelected && e.value.length > 0) {
      this.loadData();
    }
  }
  selectAllSalesSequence() {
    if (!this.allSalesSequenceSelected) {
      this.selectedSalesSequence = [];
      this.selectedSalesSequence.push("All");
      for (let item of this.filteredsales) {
        this.selectedSalesSequence.push(item.id);
      }
      this.allSalesSequenceSelected = true;
      this.loadData();
    } else {
      this.selectedSalesSequence = [];
      this.allSalesSequenceSelected = false;
    }
  }
  getSalesSequence(e: any) {
    this.selectedSalesSequence = [];
    for (let item of e.value) {
      this.selectedSalesSequence.push(item);
    }
    if (e.value.indexOf("All") != -1) {
      this.allSalesSequenceSelected = false;
      let temp: any = [];
      for (let item of this.selectedSalesSequence) {
        if (item != "All") {
          temp.push(item);
        }
      }
      this.selectedSalesSequence = temp;
    }
    if (!this.allSalesSequenceSelected && e.value.length > 0) {
      this.loadData();
    }
  }
  selectAllDevelopers() {
    if (!this.allDevelopersSelected) {
      this.selectedDevelopers = [];
      this.selectedDevelopers.push("All");
      for (let item of this.filteredDevelopers) {
        this.selectedDevelopers.push(item.id);
      }
      this.allDevelopersSelected = true;
    } else {
      this.selectedDevelopers = [];
      this.allDevelopersSelected = false;
    }
    this.loadData();
  }
  getDevelopers(e: any) {
    this.selectedDevelopers = [];
    for (let item of e.value) {
      this.selectedDevelopers.push(item);
    }
    if (e.value.indexOf("All") != -1) {
      this.allDevelopersSelected = false;
      let temp: any = [];
      for (let item of this.selectedDevelopers) {
        if (item != "All") {
          temp.push(item);
        }
      }
      this.selectedDevelopers = temp;
    }
    this.loadData();
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
    this.loadData();
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
    this.loadData();
  }
  getDate(e: any) {
    let temp: any = new Date(e.value)
    return temp.getMonth() + 1 + "-" + temp.getDate() + "-" + temp.getFullYear();
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
    if (this.startDate == "" || this.endDate == "") {
      return;
    }
    let temp: any = {};
    temp.StartDate = this.startDate;
    temp.EndDate = this.endDate;
    temp.StartSize = this.minSize;
    temp.EndSize = this.maxSize;
    temp.StartPrice = this.minPrice;
    temp.EndPrice = this.maxPrice;
    if (this.selectedDistrict.length != 0) {
      temp.DistrictIds = [];
      for (let item of this.selectedDistrict) {
        if (item != "All") {
          temp.DistrictIds.push(item)
        }
      }
    }
    if (this.selectedPropertyType.length != 0) {
      temp.PropertyTypeIds = [];
      for (let item of this.selectedPropertyType) {
        if (item != "All") {
          temp.PropertyTypeIds.push(item)
        }
      }
    }
    if (this.selectedTransactionType.length != 0) {
      temp.TransactionTypeIds = [];
      for (let item of this.selectedTransactionType) {
        if (item != "All") {
          temp.TransactionTypeIds.push(item)
        }
      }
    }
    if (this.selectedSalesSequence.length != 0) {
      temp.TransactionSequenceIds = [];
      for (let item of this.selectedSalesSequence) {
        if (item != "All") {
          temp.TransactionSequenceIds.push(item)
        }
      }
    }
    if (this.selectedDevelopers.length != 0) {
      temp.PropertyDeveloperIds = [];
      for (let item of this.selectedDevelopers) {
        if (item != "All") {
          temp.PropertyDeveloperIds.push(item)
        }
      }
    }
    if (this.selectedBeds.length != 0) {
      temp.BedroomList = [];
      for (let item of this.selectedBeds) {
        if (item != "All") {
          temp.BedroomList.push(item)
        }
      }
    }
    this.showLoader = true;
    this.service.GetResidentialQuarterlyTransactionAnalysis(temp).subscribe((result: any) => {
      if (result.message == "Residential Quarterly Transaction Analysis fetched successfully") {
        this.transactionData = result.data;
        this.filterTypeData();
        this.filterSequenceData();
        this.filterTypeValueData();
        this.filterSequencevalueData();
        this.filterMedianTypeData();
        this.filterMedianAreaData();
        this.showLoader = false;
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
    this.salesfield = [];
    const index = this.communityfield.indexOf(community);
    if (index >= 0) {
      this.communityfield.splice(index, 1);
    }
    this.loadData();
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.communityfield.push({ "id": event.option.value, "name": event.option.viewValue });
    this.ComunityInput.nativeElement.value = '';
    this.CommunityCtrl.setValue(null);
    let temp: any = [];
    for (let item of this.communityfield) {
      temp.push(item.id)
    }
    this.service.TransactionSequence().subscribe((result: any) => {
      this.filteredsales = result.data;
    })
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
  add4(event: MatChipInputEvent): void {
    const value4 = (event.value || '').trim();
    if (value4) {
      this.salesfield.push(value4);
    }
    event.chipInput!.clear();
    this.salesCtrl.setValue(null);
  }
  remove4(sale: string): void {
    const index4 = this.salesfield.indexOf(sale);
    if (index4 >= 0) {
      this.salesfield.splice(index4, 1);
    }
    this.loadData();
  }
  selected4(event: MatAutocompleteSelectedEvent): void {
    this.salesfield.push({ "id": event.option.value, "name": event.option.viewValue });
    this.SalesInput.nativeElement.value = '';
    this.salesCtrl.setValue(null);
    this.loadData();
  }
  add5(event: MatChipInputEvent): void {
    const value5 = (event.value || '').trim();
    if (value5) {
      this.Developersfield.push(value5);
    }
    event.chipInput!.clear();
    this.DevelopersCtrl.setValue(null);
  }
  remove5(developer: string): void {
    const index5 = this.Developersfield.indexOf(developer);
    if (index5 >= 0) {
      this.Developersfield.splice(index5, 1);
    }
    this.loadData();
  }
  selected5(event: MatAutocompleteSelectedEvent): void {
    this.Developersfield.push({ "id": event.option.value, "name": event.option.viewValue });
    this.developersInput.nativeElement.value = '';
    this.DevelopersCtrl.setValue(null);
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
  filterTypeData() {
    let tempData: any = [];
    let found: boolean = false;
    for (let item of this.transactionData.transactionByType) {
      found = false;
      for (let item2 of tempData) {
        if (item2.date == item.transactionDate) {
          found = true;
          break;
        }
      }
      if (!found) {
        tempData.push({ date: item.transactionDate, salesReady: "", mortageReady: "", salesOffPlan: "", mortageOffPlan: "", giftsReady: "", renewed: "", new: "", giftsOffPlan: "" })
      }
    }
    for (let item of this.transactionData.transactionByType) {
      for (let item2 of tempData) {
        if (item2.date == item.transactionDate) {
          if (item.transactionType == "Sales - Ready") {
            item2.salesReady = item.transactionCount;
          } else if (item.transactionType == "Mortgage - Ready") {
            item2.mortageReady = item.transactionCount;
          } else if (item.transactionType == "Sales - Off-Plan") {
            item2.salesOffPlan = item.transactionCount;
          } else if (item.transactionType == "Mortgage - Off-Plan") {
            item2.mortageOffPlan = item.transactionCount;
          } else if (item.transactionType == "Gifts - Ready") {
            item2.giftsReady = item.transactionCount;
          } else if (item.transactionType == "Renewed") {
            item2.renewed = item.transactionCount;
          } else if (item.transactionType == "New") {
            item2.new = item.transactionCount;
          } else if (item.transactionType == "Gifts - Off-Plan") {
            item2.giftsOffPlan = item.transactionCount;
          }
        }
      }
    }
    this.transactionTypeChartData = tempData;
    this.createTypeChartData();
  }
  createTypeChartData() {
    let opacityData = ['#ebb342', '#1e2f4c', '#7eafa8', '#d1475b', '#e48a74', '#497893', '#7cbad1', '#f7c576'];
    let tempChartData: ChartData<'bar'> = {
      labels: [],
      datasets: []
    };
    let tempLabel: any = [];
    for (let item of this.transactionTypeChartData) {
      tempLabel.push(item.date);
    }
    tempChartData.labels = tempLabel;
    let tempDataset: any = [];
    for (let item of this.selectedTransactionType) {
      let opacity = opacityData.pop()
      let tempData: any = {
        label: '',
        data: [],
        borderRadius: 50,
        barPercentage: 0.9,
        minBarLength: 10,
        backgroundColor: opacity,
        hoverBackgroundColor: [
          "#0f2ead"
        ]
      };
      if (item == 2) {
        for (let item2 of this.transactionTypeChartData) {
          tempData.data.push(item2.salesReady)
        }
        tempData.label = "Sales - Ready";
        tempDataset.push(tempData);
      } else if (item == 3) {
        for (let item2 of this.transactionTypeChartData) {
          tempData.data.push(item2.mortageReady)
        }
        tempData.label = "Mortgage - Ready";
        tempDataset.push(tempData);
      } else if (item == 4) {
        for (let item2 of this.transactionTypeChartData) {
          tempData.data.push(item2.salesOffPlan)
        }
        tempData.label = "Sales - Off-Plan";
        tempDataset.push(tempData);
      } else if (item == 5) {
        for (let item2 of this.transactionTypeChartData) {
          tempData.data.push(item2.mortageOffPlan)
        }
        tempData.label = "Mortgage - Off-Plan";
        tempDataset.push(tempData);
      } else if (item == 6) {
        for (let item2 of this.transactionTypeChartData) {
          tempData.data.push(item2.giftsReady)
        }
        tempData.label = "Gifts - Ready";
        tempDataset.push(tempData);
      } else if (item == 7) {
        for (let item2 of this.transactionTypeChartData) {
          tempData.data.push(item2.renewed)
        }
        tempData.label = "Renewed";
        tempDataset.push(tempData);
      } else if (item == 8) {
        for (let item2 of this.transactionTypeChartData) {
          tempData.data.push(item2.new)
        }
        tempData.label = "New";
        tempDataset.push(tempData);
      } else if (item == 9) {
        for (let item2 of this.transactionTypeChartData) {
          tempData.data.push(item2.giftsOffPlan)
        }
        tempData.label = "Gifts - Off-Plan";
        tempDataset.push(tempData);
      }
    }
    tempChartData.datasets = tempDataset;
    this.tbtData = tempChartData;
    this.showTBT = true;
  }
  filterSequenceData() {
    let tempData: any = [];
    let found: boolean = false;
    for (let item of this.transactionData.transactionBySaleSequence) {
      found = false;
      for (let item2 of tempData) {
        if (item2.date == item.transactionDate) {
          found = true;
          break;
        }
      }
      if (!found) {
        tempData.push({ date: item.transactionDate, primary: "", secondary: "" })
      }
    }
    for (let item of this.transactionData.transactionBySaleSequence) {
      for (let i = 0; i < tempData.length; i++) {
        if (tempData[i].date == item.transactionDate) {
          if (item.transactionSequence == "Primary") {
            tempData[i].primary = item.transactionCount;
          } else if (item.transactionSequence == "Secondary") {
            tempData[i].secondary = item.transactionCount;
          }
        }
      }
    }
    this.transactionSequenceChartData = tempData;
    this.createSequenceChartData();
  }
  createSequenceChartData() {
    let opacityData = ['#ebb342', '#1e2f4c', '#7eafa8', '#d1475b', '#e48a74', '#497893', '#7cbad1', '#f7c576'];
    let tempChartData: ChartData<'bar'> = {
      labels: [],
      datasets: []
    };
    let tempLabel: any = []
    for (let item of this.transactionTypeChartData) {
      tempLabel.push(item.date);
    }
    tempChartData.labels = tempLabel;
    let tempDataset: any = [];
    for (let item of this.selectedSalesSequence) {
      let opacity = opacityData.pop()
      let tempData: any = {
        label: '',
        data: [],
        borderRadius: 50,
        barPercentage: 0.9,
        minBarLength: 10,
        backgroundColor: opacity,
        hoverBackgroundColor: [
          '#0f2ead'
        ]
      };
      if (item == 1) {
        for (let item2 of this.transactionSequenceChartData) {
          tempData.data.push(item2.primary)
        }
        tempData.label = "Primary";
        tempDataset.push(tempData);
      } else if (item == 2) {
        for (let item2 of this.transactionSequenceChartData) {
          tempData.data.push(item2.secondary)
        }
        tempData.label = "Secondary";
        tempDataset.push(tempData);
      }
    }
    tempChartData.datasets = tempDataset;
    this.tbsData = tempChartData;
    this.showTBS = true;
  }
  filterTypeValueData() {
    let tempData: any = [];
    let found: boolean = false;
    for (let item of this.transactionData.transactionValueByType) {
      found = false;
      for (let item2 of tempData) {
        if (item2.date == item.transactionDate) {
          found = true;
          break;
        }
      }
      if (!found) {
        tempData.push({ date: item.transactionDate, salesReady: "", mortageReady: "", salesOffPlan: "", mortageOffPlan: "", giftsReady: "", renewed: "", new: "", giftsOffPlan: "" })
      }
    }
    for (let item of this.transactionData.transactionValueByType) {
      for (let item2 of tempData) {
        if (item2.date == item.transactionDate) {
          if (item.transactionType == "Sales - Ready") {
            item2.salesReady = item.transactionValue;
          } else if (item.transactionType == "Mortgage - Ready") {
            item2.mortageReady = item.transactionValue;
          } else if (item.transactionType == "Sales - Off-Plan") {
            item2.salesOffPlan = item.transactionValue;
          } else if (item.transactionType == "Mortgage - Off-Plan") {
            item2.mortageOffPlan = item.transactionValue;
          } else if (item.transactionType == "Gifts - Ready") {
            item2.giftsReady = item.transactionValue;
          } else if (item.transactionType == "Renewed") {
            item2.renewed = item.transactionValue;
          } else if (item.transactionType == "New") {
            item2.new = item.transactionValue;
          } else if (item.transactionType == "Gifts - Off-Plan") {
            item2.giftsOffPlan = item.transactionValue;
          }
        }
      }
    }
    this.transactionTypeValueChartData = tempData;
    this.createTypeValueChartData();
  }
  createTypeValueChartData() {
    let opacityData = ['#ebb342', '#1e2f4c', '#7eafa8', '#d1475b', '#e48a74', '#497893', '#7cbad1', '#f7c576'];
    let tempChartData: ChartData<'bar'> = {
      labels: [],
      datasets: []
    };
    let tempLabel: any = []
    for (let item of this.transactionTypeValueChartData) {
      tempLabel.push(item.date);
    }
    tempChartData.labels = tempLabel;
    let tempDataset: any = [];
    for (let item of this.selectedTransactionType) {
      let opacity = opacityData.pop()
      let tempData: any = {
        label: '',
        data: [],
        borderRadius: 50,
        barPercentage: 0.9,
        minBarLength: 10,
        backgroundColor: opacity,
        hoverBackgroundColor: [
          "#0f2ead"
        ]
      };
      if (item == 2) {
        for (let item2 of this.transactionTypeValueChartData) {
          tempData.data.push(item2.salesReady)
        }
        tempData.label = "Sales - Ready";
        tempDataset.push(tempData);
      } else if (item == 3) {
        for (let item2 of this.transactionTypeValueChartData) {
          tempData.data.push(item2.mortageReady)
        }
        tempData.label = "Mortgage - Ready";
        tempDataset.push(tempData);
      } else if (item == 4) {
        for (let item2 of this.transactionTypeValueChartData) {
          tempData.data.push(item2.salesOffPlan)
        }
        tempData.label = "Sales - Off-Plan";
        tempDataset.push(tempData);
      } else if (item == 5) {
        for (let item2 of this.transactionTypeValueChartData) {
          tempData.data.push(item2.mortageOffPlan)
        }
        tempData.label = "Mortgage - Off-Plan";
        tempDataset.push(tempData);
      } else if (item == 6) {
        for (let item2 of this.transactionTypeValueChartData) {
          tempData.data.push(item2.giftsReady)
        }
        tempData.label = "Gifts - Ready";
        tempDataset.push(tempData);
      } else if (item == 7) {
        for (let item2 of this.transactionTypeValueChartData) {
          tempData.data.push(item2.renewed)
        }
        tempData.label = "Renewed";
        tempDataset.push(tempData);
      } else if (item == 8) {
        for (let item2 of this.transactionTypeValueChartData) {
          tempData.data.push(item2.new)
        }
        tempData.label = "New";
        tempDataset.push(tempData);
      } else if (item == 9) {
        for (let item2 of this.transactionTypeValueChartData) {
          tempData.data.push(item2.giftsOffPlan)
        }
        tempData.label = "Gifts - Off-Plan";
        tempDataset.push(tempData);
      }
    }
    tempChartData.datasets = tempDataset;
    this.tvbtData = tempChartData;
    this.showTVB = true;
  }
  filterSequencevalueData() {
    let tempData: any = [];
    let found: boolean = false;
    for (let item of this.transactionData.transactionValueBySaleSequence) {
      found = false;
      for (let item2 of tempData) {
        if (item2.date == item.transactionDate) {
          found = true;
          break;
        }
      }
      if (!found) {
        tempData.push({ date: item.transactionDate, primary: "", secondary: "" })
      }
    }
    for (let item of this.transactionData.transactionValueBySaleSequence) {
      for (let i = 0; i < tempData.length; i++) {
        if (tempData[i].date == item.transactionDate) {
          if (item.transactionSequence == "Primary") {
            tempData[i].primary = item.transactionValue;
          } else if (item.transactionSequence == "Secondary") {
            tempData[i].secondary = item.transactionValue;
          }
        }
      }
    }
    this.transactionSequencevalueChartData = tempData;
    this.createSequenceValueChartData();
  }
  createSequenceValueChartData() {
    let opacityData = ['#ebb342', '#1e2f4c', '#7eafa8', '#d1475b', '#e48a74', '#497893', '#7cbad1', '#f7c576'];
    let tempChartData: ChartData<'bar'> = {
      labels: [],
      datasets: []
    };
    let tempLabel: any = []
    for (let item of this.transactionSequencevalueChartData) {
      tempLabel.push(item.date);
    }
    tempChartData.labels = tempLabel;
    let tempDataset: any = [];
    for (let item of this.selectedSalesSequence) {
      let opacity = opacityData.pop()
      let tempData: any = {
        label: '',
        data: [],
        borderRadius: 50,
        barPercentage: 0.9,
        minBarLength: 10,
        backgroundColor: opacity,
        hoverBackgroundColor: [
          '#0f2ead'
        ]
      };
      if (item == 1) {
        for (let item2 of this.transactionSequencevalueChartData) {
          tempData.data.push(item2.primary)
        }
        tempData.label = "Primary";
        tempDataset.push(tempData);
      } else if (item == 2) {
        for (let item2 of this.transactionSequencevalueChartData) {
          tempData.data.push(item2.secondary)
        }
        tempData.label = "Secondary";
        tempDataset.push(tempData);
      }
    }
    tempChartData.datasets = tempDataset;
    this.tvbsData = tempChartData;
    this.showTVBS = true;
  }
  filterMedianTypeData() {
    let tempData: any = [];
    let found: boolean = false;
    for (let item of this.transactionData.transactionAvgValueByType) {
      found = false;
      for (let item2 of tempData) {
        if (item2.date == item.transactionDate) {
          found = true;
          break;
        }
      }
      if (!found) {
        tempData.push({ date: item.transactionDate, salesReady: "", mortageReady: "", salesOffPlan: "", mortageOffPlan: "", giftsReady: "", renewed: "", new: "", giftsOffPlan: "" })
      }
    }
    for (let item of this.transactionData.transactionAvgValueByType) {
      for (let item2 of tempData) {
        if (item2.date == item.transactionDate) {
          if (item.transactionType == "Sales - Ready") {
            item2.salesReady = item.transactionAvgValue;
          } else if (item.transactionType == "Mortgage - Ready") {
            item2.mortageReady = item.transactionAvgValue;
          } else if (item.transactionType == "Sales - Off-Plan") {
            item2.salesOffPlan = item.transactionAvgValue;
          } else if (item.transactionType == "Mortgage - Off-Plan") {
            item2.mortageOffPlan = item.transactionAvgValue;
          } else if (item.transactionType == "Gifts - Ready") {
            item2.giftsReady = item.transactionAvgValue;
          } else if (item.transactionType == "Renewed") {
            item2.renewed = item.transactionAvgValue;
          } else if (item.transactionType == "New") {
            item2.new = item.transactionAvgValue;
          } else if (item.transactionType == "Gifts - Off-Plan") {
            item2.giftsOffPlan = item.transactionAvgValue;
          }
        }
      }
    }
    this.transactionMedianTypeChartData = tempData;
    this.createMedianTypeChartData();
  }
  createMedianTypeChartData() {
    let opacityData = ['#ebb342', '#1e2f4c', '#7eafa8', '#d1475b', '#e48a74', '#497893', '#7cbad1', '#f7c576'];
    let tempChartData: ChartData<'bar'> = {
      labels: [],
      datasets: []
    };
    let tempLabel: any = [];
    for (let item of this.transactionMedianTypeChartData) {
      tempLabel.push(item.date);
    }
    tempChartData.labels = tempLabel;
    let tempDataset: any = [];
    for (let item of this.selectedTransactionType) {
      let opacity = opacityData.pop()
      let tempData: any = {
        label: '',
        data: [],
        borderRadius: 50,
        barPercentage: 0.9,
        minBarLength: 10,
        backgroundColor: opacity,
        hoverBackgroundColor: [
          "#0f2ead"
        ]
      };
      if (item == 2) {
        for (let item2 of this.transactionMedianTypeChartData) {
          tempData.data.push(item2.salesReady)
        }
        tempData.label = "Sales - Ready";
        tempDataset.push(tempData);
      } else if (item == 3) {
        for (let item2 of this.transactionMedianTypeChartData) {
          tempData.data.push(item2.mortageReady)
        }
        tempData.label = "Mortgage - Ready";
        tempDataset.push(tempData);
      } else if (item == 4) {
        for (let item2 of this.transactionMedianTypeChartData) {
          tempData.data.push(item2.salesOffPlan)
        }
        tempData.label = "Sales - Off-Plan";
        tempDataset.push(tempData);
      } else if (item == 5) {
        for (let item2 of this.transactionMedianTypeChartData) {
          tempData.data.push(item2.mortageOffPlan)
        }
        tempData.label = "Mortgage - Off-Plan";
        tempDataset.push(tempData);
      } else if (item == 6) {
        for (let item2 of this.transactionMedianTypeChartData) {
          tempData.data.push(item2.giftsReady)
        }
        tempData.label = "Gifts - Ready";
        tempDataset.push(tempData);
      } else if (item == 7) {
        for (let item2 of this.transactionMedianTypeChartData) {
          tempData.data.push(item2.renewed)
        }
        tempData.label = "Renewed";
        tempDataset.push(tempData);
      } else if (item == 8) {
        for (let item2 of this.transactionMedianTypeChartData) {
          tempData.data.push(item2.new)
        }
        tempData.label = "New";
        tempDataset.push(tempData);
      } else if (item == 9) {
        for (let item2 of this.transactionMedianTypeChartData) {
          tempData.data.push(item2.giftsOffPlan)
        }
        tempData.label = "Gifts - Off-Plan";
        tempDataset.push(tempData);
      }
    }
    tempChartData.datasets = tempDataset;
    this.mpotData = tempChartData;
    this.showMPOT = true;
  }
  filterMedianAreaData() {
    let tempData: any = [];
    let found: boolean = false;
    for (let item of this.transactionData.transactionSqftAvgValueByType) {
      found = false;
      for (let item2 of tempData) {
        if (item2.date == item.transactionDate) {
          found = true;
          break;
        }
      }
      if (!found) {
        tempData.push({ date: item.transactionDate, salesReady: "", mortageReady: "", salesOffPlan: "", mortageOffPlan: "", giftsReady: "", renewed: "", new: "", giftsOffPlan: "" })
      }
    }
    for (let item of this.transactionData.transactionSqftAvgValueByType) {
      for (let item2 of tempData) {
        if (item2.date == item.transactionDate) {
          if (item.transactionType == "Sales - Ready") {
            item2.salesReady = item.transactionSqftAvgValue;
          } else if (item.transactionType == "Mortgage - Ready") {
            item2.mortageReady = item.transactionSqftAvgValue;
          } else if (item.transactionType == "Sales - Off-Plan") {
            item2.salesOffPlan = item.transactionSqftAvgValue;
          } else if (item.transactionType == "Mortgage - Off-Plan") {
            item2.mortageOffPlan = item.transactionSqftAvgValue;
          } else if (item.transactionType == "Gifts - Ready") {
            item2.giftsReady = item.transactionSqftAvgValue;
          } else if (item.transactionType == "Renewed") {
            item2.renewed = item.transactionSqftAvgValue;
          } else if (item.transactionType == "New") {
            item2.new = item.transactionSqftAvgValue;
          } else if (item.transactionType == "Gifts - Off-Plan") {
            item2.giftsOffPlan = item.transactionSqftAvgValue;
          }
        }
      }
    }
    this.transactionMedianAreaChartData = tempData;
    this.createMedianAreaChartData();
  }
  createMedianAreaChartData() {
    let opacityData = ['#ebb342', '#1e2f4c', '#7eafa8', '#d1475b', '#e48a74', '#497893', '#7cbad1', '#f7c576'];
    let tempChartData: ChartData<'bar'> = {
      labels: [],
      datasets: []
    };
    let tempLabel: any = []
    for (let item of this.transactionMedianAreaChartData) {
      tempLabel.push(item.date);
    }
    tempChartData.labels = tempLabel;
    let tempDataset: any = [];
    for (let item of this.selectedTransactionType) {
      let opacity = opacityData.pop()
      let tempData: any = {
        label: '',
        data: [],
        borderRadius: 50,
        barPercentage: 0.9,
        minBarLength: 10,
        backgroundColor: opacity,
        hoverBackgroundColor: [
          "#0f2ead"
        ]
      };
      if (item == 2) {
        for (let item2 of this.transactionMedianAreaChartData) {
          tempData.data.push(item2.salesReady)
        }
        tempData.label = "Sales - Ready";
        tempDataset.push(tempData);
      } else if (item == 3) {
        for (let item2 of this.transactionMedianAreaChartData) {
          tempData.data.push(item2.mortageReady)
        }
        tempData.label = "Mortgage - Ready";
        tempDataset.push(tempData);
      } else if (item == 4) {
        for (let item2 of this.transactionMedianAreaChartData) {
          tempData.data.push(item2.salesOffPlan)
        }
        tempData.label = "Sales - Off-Plan";
        tempDataset.push(tempData);
      } else if (item == 5) {
        for (let item2 of this.transactionMedianAreaChartData) {
          tempData.data.push(item2.mortageOffPlan)
        }
        tempData.label = "Mortgage - Off-Plan";
        tempDataset.push(tempData);
      } else if (item == 6) {
        for (let item2 of this.transactionMedianAreaChartData) {
          tempData.data.push(item2.giftsReady)
        }
        tempData.label = "Gifts - Ready";
        tempDataset.push(tempData);
      } else if (item == 7) {
        for (let item2 of this.transactionMedianAreaChartData) {
          tempData.data.push(item2.renewed)
        }
        tempData.label = "Renewed";
        tempDataset.push(tempData);
      } else if (item == 8) {
        for (let item2 of this.transactionMedianAreaChartData) {
          tempData.data.push(item2.new)
        }
        tempData.label = "New";
        tempDataset.push(tempData);
      } else if (item == 9) {
        for (let item2 of this.transactionMedianAreaChartData) {
          tempData.data.push(item2.giftsOffPlan)
        }
        tempData.label = "Gifts - Off-Plan";
        tempDataset.push(tempData);
      }
    }
    tempChartData.datasets = tempDataset;
    this.maptData = tempChartData;
    this.showMAPT = true;
  }
}