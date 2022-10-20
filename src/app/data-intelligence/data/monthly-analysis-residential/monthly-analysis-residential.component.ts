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
  selector: 'app-monthly-analysis-residential',
  templateUrl: './monthly-analysis-residential.component.html',
  styleUrls: ['./monthly-analysis-residential.component.scss']
})
export class MonthlyAnalysisResidentialComponent implements OnInit {
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
  allbedsfield: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  currentDate: any = new Date();
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  })
  CityCtrl = new FormControl('');
  filteredCity: any = "";
  Cityfield: any = [];
  allCityfield: any = [];

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
  transactionData:any = "";
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
  public tbtData: ChartData<'bar'> = {
    labels: ["01-2016", "03-2017", "03-2018", "03-2019", "03-2020", "03-2021"],
    datasets: [{
      label: 'Primary',
      data: [3.58, 3.59, 3.74, 3.55, 2.85, 2.94],
      borderRadius: 50,
      barPercentage: 0.9,
      minBarLength: 10,
      backgroundColor: "rgb(211, 219, 255)",
      hoverBackgroundColor: [
        "rgb(211, 219, 255)"
      ]
    }, {
      label: 'Secondary',
      data: [12.39, 12.61, 12.89, 13.00, 12.81, 13.39, 7],
      borderRadius: 50,
      barPercentage: 0.9,
      minBarLength: 10,
      backgroundColor: "rgb(89, 90, 212)",
      hoverBackgroundColor: [
        "rgb(89, 90, 212)"
      ]
    }]
  };
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
  public tbsData: ChartData<'bar'> = {
    labels: ["01-2016", "03-2017", "03-2018", "03-2019", "03-2020", "03-2021"],
    datasets: [{
      label: 'Primary',
      data: [3.58, 3.59, 3.74, 3.55, 2.85, 2.94],
      borderRadius: 50,
      barPercentage: 0.9,
      minBarLength: 10,
      backgroundColor: "rgb(211, 219, 255)",
      hoverBackgroundColor: [
        "rgb(211, 219, 255)"
      ]
    }, {
      label: 'Secondary',
      data: [12.39, 12.61, 12.89, 13.00, 12.81, 13.39, 7],
      borderRadius: 50,
      barPercentage: 0.9,
      minBarLength: 10,
      backgroundColor: "rgb(89, 90, 212)",
      hoverBackgroundColor: [
        "rgb(89, 90, 212)"
      ]
    }]
  };
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
  public tvbtData: ChartData<'bar'> = {
    labels: ["01-2016", "03-2017", "03-2018", "03-2019", "03-2020", "03-2021"],
    datasets: [{
      label: 'Sales - Off-Plan',
      data: [3.58, 3.59, 3.74, 3.55, 2.85, 2.94],
      borderRadius: 50,
      barPercentage: 0.9,
      minBarLength: 10,
      backgroundColor: "rgb(211, 219, 255)",
      hoverBackgroundColor: [
        "rgb(211, 219, 255)"
      ]
    }, {
      label: 'Sales-Ready',
      data: [12.39, 12.61, 12.89, 13.00, 12.81, 13.39, 7],
      borderRadius: 50,
      barPercentage: 0.9,
      minBarLength: 10,
      backgroundColor: "rgb(89, 90, 212)",
      hoverBackgroundColor: [
        "rgb(89, 90, 212)"
      ]
    }]
  };
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
  public tvbsData: ChartData<'bar'> = {
    labels: ["01-2016", "03-2017", "03-2018", "03-2019", "03-2020", "03-2021"],
    datasets: [{
      label: 'Primary',
      data: [3.58, 3.59, 3.74, 3.55, 2.85, 2.94],
      borderRadius: 50,
      barPercentage: 0.9,
      minBarLength: 10,
      backgroundColor: "rgb(211, 219, 255)",
      hoverBackgroundColor: [
        "rgb(211, 219, 255)"
      ]
    }, {
      label: 'Secondary',
      data: [12.39, 12.61, 12.89, 13.00, 12.81, 13.39, 7],
      borderRadius: 50,
      barPercentage: 0.9,
      minBarLength: 10,
      backgroundColor: "rgb(89, 90, 212)",
      hoverBackgroundColor: [
        "rgb(89, 90, 212)"
      ]
    }]
  };
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
  public mpotData: ChartData<'bar'> = {
    labels: ["01-2016", "03-2017", "03-2018", "03-2019", "03-2020", "03-2021"],
    datasets: [{
      label: 'Sales - Off-Plan',
      data: [3.58, 3.59, 3.74, 3.55, 2.85, 2.94],
      borderRadius: 50,
      barPercentage: 0.9,
      minBarLength: 10,
      backgroundColor: "rgb(211, 219, 255)",
      hoverBackgroundColor: [
        "rgb(211, 219, 255)"
      ]
    }, {
      label: 'Sales-Ready',
      data: [12.39, 12.61, 12.89, 13.00, 12.81, 13.39, 7],
      borderRadius: 50,
      barPercentage: 0.9,
      minBarLength: 10,
      backgroundColor: "rgb(89, 90, 212)",
      hoverBackgroundColor: [
        "rgb(89, 90, 212)"
      ]
    }]
  };
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
  public maptData: ChartData<'bar'> = {
    labels: ["01-2016", "03-2017", "03-2018", "03-2019", "03-2020", "03-2021"],
    datasets: [{
      label: 'Sales - Off-Plan',
      data: [3.58, 3.59, 3.74, 3.55, 2.85, 2.94],
      borderRadius: 50,
      barPercentage: 0.9,
      minBarLength: 10,
      backgroundColor: "rgb(211, 219, 255)",
      hoverBackgroundColor: [
        "rgb(211, 219, 255)"
      ]
    }, {
      label: 'Sales-Ready',
      data: [12.39, 12.61, 12.89, 13.00, 12.81, 13.39, 7],
      borderRadius: 50,
      barPercentage: 0.9,
      minBarLength: 10,
      backgroundColor: "rgb(89, 90, 212)",
      hoverBackgroundColor: [
        "rgb(89, 90, 212)"
      ]
    }]
  };

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
          this.loadData();
          this.service.TransactionSequence({ "DistrictIds": [this.filteredcommunity[0].id] }).subscribe((result: any) => {
            this.filteredsales = result.data;
          })
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
    this.service.LoadTransactionTypes().subscribe((result: any) => {
      this.filteredTransaction = result.data;
    })
  }
  getStartDate(e: any) {
    this.startDate = this.getDate(e);
  }
  getEndDate(e: any) {
    this.endDate = this.getDate(e);
    this.loadData();
  }
  getDate(e: any) {
    let temp: any = new Date(e.value)
    return temp.getMonth() + "-" + temp.getDate() + "-" + temp.getFullYear();
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
    if (this.Transactionfield.length != 0) {
      temp.TransactionTypeIds = [];
      for (let item of this.Transactionfield) {
        temp.TransactionTypeIds.push(item.id)
      }
    }
    if (this.salesfield.length != 0) {
      temp.TransactionSequenceIds = [];
      for (let item of this.salesfield) {
        temp.TransactionSequenceIds.push(item.id)
      }
    }
    if (this.Developersfield.length != 0) {
      temp.PropertyDeveloperIds = [];
      for (let item of this.Developersfield) {
        temp.PropertyDeveloperIds.push(item.id)
      }
    }
    if (this.bedsfield.length != 0) {
      temp.BedroomList = [];
      for (let item of this.bedsfield) {
        temp.BedroomList.push(item)
      }
    }
    this.service.GetResidentialMonthlyTransactionAnalysis(temp).subscribe((result: any) => {
      if (result.message == "Residential Monthly Transaction Analysis fetched successfully") {
        this.transactionData = result.data;
        console.log(this.transactionData);
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
    this.service.TransactionSequence({ "DistrictIds": temp }).subscribe((result: any) => {
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
  loadDistrict() {
    this.filteredcommunity = [];
    for (let i = 0; i < this.Cityfield.length; i++) {
      this.service.FindDistricts({ "CityId": this.Cityfield[i].id, "Locations": [] }).subscribe((result: any) => {
        for (let item of result.data) {
          this.filteredcommunity.push(item);
        }
      })
    }
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
}

