import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
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
import { ChartConfiguration, ChartData, ChartEvent, ChartType,Chart } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {default as Annotation} from 'chartjs-plugin-annotation';


@Component({
  selector: 'app-yearly-analysis-residential',
  templateUrl: './yearly-analysis-residential.component.html',
  styleUrls: ['./yearly-analysis-residential.component.scss']
})
export class YearlyAnalysisResidentialComponent implements OnInit {
  downloadreport = 'assets/images/icons/download-svg.svg'
  //Size RangeSlider

  SizeminValue: number = 10;
  SizemaxValue: number = 1000000;
  Sizeoptions: Options = {
    floor: 10,
    ceil: 1000000,
    translate: (value: number): string => {
      return value + 'K';
    }
  };

  //Price RangeSlider

  PriceminValue: number = 10;
  PricemaxValue: number = 1000000;
  Priceoptions: Options = {
    floor: 10,
    ceil: 1000000,
    translate: (value: number): string => {
      return value + 'AED';
    }
  };


  separatorKeysCodes: number[] = [ENTER, COMMA];
  CommunityCtrl = new FormControl('');
  filteredcommunity: any = [];
  communityfield: any= [];
  allcommunityfield: string[] = ['Dubai Community', 'Dubai Community', 'Dubai Community'];

  // Property Type Filter

  PropertyTypCtrl = new FormControl('');
  filteredProperty: any = [];
  ProTypefield: string[] = ['Dubai'];
  allProTypefield: string[] = ['Property Type', 'Dubai', 'Dubai'];

  // Property Filter

  PropertyCtrl = new FormControl('');
  filteredPropertyOnly: any = [];
  Profield: string[] = ['Dubai'];
  allProfield: string[] = ['Property', 'Dubai', 'Dubai'];

  // Transaction Type Filter

  TransactionCtrl = new FormControl('');
  filteredTransaction: Observable<string[]>;
  Transactionfield: string[] = ['Dubai'];
  allTransactionfield: string[] = ['Transaction', 'Dubai', 'Dubai'];


  // Sales Sequences Filter

  salesCtrl = new FormControl('');
  filteredsales: Observable<string[]>;
  salesfield: string[] = ['Dubai'];
  allsalesfield: string[] = ['Sale', 'Dubai', 'Dubai'];

  // Developers Filter

  DevelopersCtrl = new FormControl('');
  filteredDevelopers: Observable<string[]>;
  Developersfield: string[] = ['All'];
  allDevelopersfield: string[] = ['All Developers', 'Developers', 'Developers'];

  // Bedrooms Filter

  bedsCtrl = new FormControl('');
  filteredbeds: Observable<string[]>;
  bedsfield: string[] = ['All'];
  allbedsfield: string[] = ['All Developers', 'Developers', 'Developers'];

  // City Filter

  CityCtrl = new FormControl('');
  filteredCity: Observable<string[]>;
  Cityfield: any = [];
  allCityfield: string[] = ['All City', 'City', 'City'];

  @ViewChild('ComunityInput') ComunityInput: any;
  @ViewChild('PropertyTypeInput') PropertyTypeInput: any;
  @ViewChild('PropertyInput') PropertyInput: any;
  @ViewChild('TransactionInput') TransactionInput: any;
  @ViewChild('SalesInput') SalesInput: any;
  @ViewChild('developersInput') developersInput: any;
  @ViewChild('bedInput') bedInput: any;
  @ViewChild('CityInput') CityInput: any;

  countryData: any = "";
  citiesData:any = "";

  constructor(private cookie: CookieService, private service: AppService) {
    this.countryData = JSON.parse(this.cookie.get("countryData"));
    this.service.FindCities({ "CountryId": this.countryData.id, "Locations": [] }).subscribe((result:any) => {
      this.citiesData = result.data;
    })
    this.service.LoadType(1).subscribe((result:any) => {
      console.log(result.data);
    })
    // Transaction Type filter
    this.filteredTransaction = this.TransactionCtrl.valueChanges.pipe(
      startWith(null),
      map((transaction: string | null) => (transaction ? this._filter(transaction) : this.allTransactionfield.slice())),
    );
    // Sales Sequences filter
    this.filteredsales = this.salesCtrl.valueChanges.pipe(
      startWith(null),
      map((sale: string | null) => (sale ? this._filter(sale) : this.allsalesfield.slice())),
    );
    // Developers filter
    this.filteredDevelopers = this.DevelopersCtrl.valueChanges.pipe(
      startWith(null),
      map((developer: string | null) => (developer ? this._filter(developer) : this.allDevelopersfield.slice())),
    );
    // Bed Rooms filter
    this.filteredbeds = this.bedsCtrl.valueChanges.pipe(
      startWith(null),
      map((beds: string | null) => (beds ? this._filter(beds) : this.allbedsfield.slice())),
    );
    // City filter
    this.filteredCity = this.CityCtrl.valueChanges.pipe(
      startWith(null),
      map((city: string | null) => (city ? this._filter(city) : this.allCityfield.slice())),
    );
  }
  // Community Type Filter
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.communityfield.push(value);
    }
    event.chipInput!.clear();
    this.CommunityCtrl.setValue(null);
  }
  remove(community: string): void {
    const index = this.communityfield.indexOf(community);
    if (index >= 0) {
      this.communityfield.splice(index, 1);
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.communityfield.push(event.option.viewValue);
    this.ComunityInput.nativeElement.value = '';
    this.CommunityCtrl.setValue(null);
  }

  // Property Type Filter
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
  }
  selected1(event: MatAutocompleteSelectedEvent): void {
    this.ProTypefield.push(event.option.viewValue);
    this.PropertyTypeInput.nativeElement.value = '';
    this.PropertyTypCtrl.setValue(null);
  }

  // Property Filter
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
  }
  selected2(event: MatAutocompleteSelectedEvent): void {
    this.Profield.push(event.option.viewValue);
    this.PropertyInput.nativeElement.value = '';
    this.PropertyCtrl.setValue(null);
  }

  // Transaction Type Filter
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
  }
  selected3(event: MatAutocompleteSelectedEvent): void {
    this.Transactionfield.push(event.option.viewValue);
    this.TransactionInput.nativeElement.value = '';
    this.TransactionCtrl.setValue(null);
  }

  // Sales Sequences Filter
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
  }
  selected4(event: MatAutocompleteSelectedEvent): void {
    this.salesfield.push(event.option.viewValue);
    this.SalesInput.nativeElement.value = '';
    this.salesCtrl.setValue(null);
  }

  // Sales Sequences Filter
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
  }
  selected5(event: MatAutocompleteSelectedEvent): void {
    this.Developersfield.push(event.option.viewValue);
    this.developersInput.nativeElement.value = '';
    this.DevelopersCtrl.setValue(null);
  }

  // Bed Rooms Filter
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
  }
  selected6(event: MatAutocompleteSelectedEvent): void {
    this.bedsfield.push(event.option.viewValue);
    this.bedInput.nativeElement.value = '';
    this.bedsCtrl.setValue(null);
  }

  // City Filter
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
    for(let i = 0; i < this.Cityfield.length; i++) {
      this.service.FindDistricts({ "CityId":this.Cityfield[i].id, "Locations" : [] }).subscribe((result:any) => {
        for(let item of result.data) {
          this.filteredcommunity.push(item);
        }
      })
    }
  }
  remove7(city: any): void {
    const index7 = this.Cityfield.indexOf(city);
    if (index7 >= 0) {
      this.Cityfield.splice(index7, 1);
    }
  }
  selected7(event: any): void {
    this.Cityfield.push({"id":event.option.value, "name":event.option.viewValue});
    this.CityInput.nativeElement.value = '';
    this.CityCtrl.setValue(null);
    this.loadDistrict();
  }

  private _filter(value: string): string[] {
    const filtercomunity = value.toLowerCase();
    return this.allcommunityfield.filter(community => community.toLowerCase().includes(filtercomunity));
    const filterprotype = value.toLowerCase();
    return this.allProTypefield.filter(protype => protype.toLowerCase().includes(filterprotype));
    const filterpro = value.toLowerCase();
    return this.allProfield.filter(property => property.toLowerCase().includes(filterpro));
    const filtertransaction = value.toLowerCase();
    return this.allTransactionfield.filter(transaction => transaction.toLowerCase().includes(filtertransaction));
    const filtersales = value.toLowerCase();
    return this.allsalesfield.filter(sale => sale.toLowerCase().includes(filtersales));
    const filterdevelopers = value.toLowerCase();
    return this.allDevelopersfield.filter(developer => developer.toLowerCase().includes(filterdevelopers));
    const filterbeds = value.toLowerCase();
    return this.allbedsfield.filter(beds => beds.toLowerCase().includes(filterbeds));
  }


  ngOnInit(): void {
  }

  // Data Table
  ngAfterViewInit() {
    
  }



  // Charts Js



  // Transaction By Transaction Type Chart
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
    labels: ["2016", "2017", "2018", "2019", "2020", "2021","2022"],
    datasets: [{
      label: 'Sales - Off-Plan',
      data: [3.58, 3.59, 3.74, 3.55, 2.85, 2.94,3],
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


  // Transaction By Sales Sequences Chart
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
    labels: ["2016", "2017", "2018", "2019", "2020", "2021","2022"],
    datasets: [{
      label: 'Primary',
      data: [3.58, 3.59, 3.74, 3.55, 2.85, 2.94,3.94],
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

  // Transaction Value By Transaction Type Chart
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
    labels: ["2016", "2017", "2018", "2019", "2020", "2021","2022"],
    datasets: [{
      label: 'Sales - Off-Plan',
      data: [3.58, 3.59, 3.74, 3.55, 2.85, 2.94,3],
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

    // Transaction Value By Sales Sequences Chart
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
      labels: ["2016", "2017", "2018", "2019", "2020", "2021","2022"],
      datasets: [{
        label: 'Primary',
        data: [3.58, 3.59, 3.74, 3.55, 2.85, 2.94,3],
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

        // Median Price of Transactions Chart
        public mpotOptions: ChartConfiguration['options'] = {
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
          labels: ["2016", "2017", "2018", "2019", "2020", "2021","2022"],
          datasets: [{
            label: 'Sales - Off-Plan',
            data: [3.58, 3.59, 3.74, 3.55, 2.85, 2.94,3],
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
         // Median AED/Sqf Price of Transactions Chart
        public maptOptions: ChartConfiguration['options'] = {
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
          labels: ["2016", "2017", "2018", "2019", "2020", "2021","2022"],
          datasets: [{
            label: 'Sales - Off-Plan',
            data: [3.58, 3.59, 3.74, 3.55, 2.85, 2.94,3],
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
}

