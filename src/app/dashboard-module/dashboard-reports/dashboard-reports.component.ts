import { Component, ViewChild, OnInit,HostListener } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType,Chart } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {default as Annotation} from 'chartjs-plugin-annotation';
import { Options } from '@angular-slider/ngx-slider';
@Component({
  selector: 'app-dashboard-reports',
  templateUrl: './dashboard-reports.component.html',
  styleUrls: ['./dashboard-reports.component.scss']
})
export class DashboardReportsComponent implements OnInit {

  // Range Slider

   minValue: number = 1993;
  maxValue: number = 2007;
  optionsRange: Options = {
    floor: 1973,
    ceil: 2025,
    step: 1
  };
    
  downloadreport = '../../../assets/images/icons/download-svg.svg'
  togglesvg = '../../../assets/images/icons/toggle.svg'
  logo = '../../../assets/images/logo.svg'
  chartsvg = '../../../assets/images/Charts-nav.svg'
  signinsvg = '../../../assets/images/user.svg'
  flagsvg = '../../../assets/images/aed-fg.svg'
  close = '../../../assets/images/icons/close.svg'
  property = '../../../assets/images/shortlisted-img.png'
  trash = '../../../assets/images/icons/Trash-dotted.svg'
  logoutimg = '../../../assets/images/logout-popup-banner.png'
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  constructor() {
    Chart.register(Annotation)
   }



  // Scroll To Top

  isShow: any;
  topPosToStartShowing = 100;

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }
  // TODO: Cross browsing
  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  ngOnInit(): void {
  }

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          font: {
            size: 10,
          }
        }
      },
      datalabels: {
        display: false,
      },

    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [
      "Under Construction",
      "Completed"
    ],
    datasets: [
      {
        data: [75, 25],
        backgroundColor: [
          "rgb(89, 90, 212)",
          "rgb(211, 219, 255)"
        ],
        borderRadius: 10,
        borderWidth: 0,
        offset: 20,
        hoverBackgroundColor: [
          "rgb(89, 90, 212)",
          "rgb(211, 219, 255)"
        ]
      }]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];



  // Population Chart
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
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
        display: false,
      },
      title: {
        display: true,
        text: 'No of units',
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
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DatalabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: ["2017", "2018", "2017", "2018", "2018"],
    datasets: [{
      data: [500000, 3500600, 100000, 3503500, 3500000],
      borderRadius: 5,
      backgroundColor: "rgb(211, 219, 255)",
      barPercentage: 0.9,
      minBarLength: 10,
      hoverBackgroundColor: [
        "rgb(211, 219, 255)"
      ]
    }]
  };




  // Supply Chart
  public SupplybarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
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
        display: false,
      },
      title: {
        display: true,
        text: 'No of units',
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
  public SupplybarChartType: ChartType = 'bar';
  public SupplybarChartPlugins = [
    DatalabelsPlugin
  ];

  public SupplybarChartData: ChartData<'bar'> = {
    labels: ["0 (Studio)", "1 Bedroom", "2 Bedrooms", "3 Bedrooms", "4 Bedrooms", "5 Bedrooms", "5+ Bedrooms", "Unknown"],
    datasets: [{
      data: [20637, 28421, 18598, 12733, 5764, 1528, 667, 26054],
      borderRadius: 5,
      backgroundColor: "rgb(89, 90, 212)",
      barPercentage: 0.9,
      minBarLength: 10,
      hoverBackgroundColor: [
        "rgb(89, 90, 212)"
      ]
    }]
  };

  // Gender Pie
  public options:any= {
    maintainAspectRatio: false,
    interaction: {
      intersect: false
    },
    circumference: 180,
    rotation: -90,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          font: {
            size: 10,
          }
        }
      },
      datalabels: {
        display: false,
      },

    }
  };

  public GenderpieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [
      "Male",
      "Female"
    ],
    datasets: [
      {
        data: [472044, 114402],
        backgroundColor: [
          "rgb(89, 90, 212)",
          "rgb(211, 219, 255)"
        ],
        borderColor: "#ffffff00",
        borderRadius: 5,
        offset: 20,
        hoverBackgroundColor: [
          "rgb(89, 90, 212)",
          "rgb(211, 219, 255)"
        ]
      }]
  };
  public GenderpieChartType: ChartType = 'pie';
  public GenderpieChartPlugins = [DatalabelsPlugin];


  // Residential Supply Trend of the City by Year chart

  public RstyChartOptions: ChartConfiguration['options'] = {
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
    indexAxis: 'y',
    interaction: {
      intersect: false
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'No of Units',
        position: 'left',
        font: {
          size: 10,
        }
      },
      legend: {
        position: 'right',
      },
      datalabels: {
        display: false,
      },
    }
  };
  public RstyChartType: ChartType = 'bar';
  public RstyChartPlugins = [
    DatalabelsPlugin
  ];

  public RstyChartData: ChartData<'bar'> = {
    labels: ["2000", "2003", "2006", "2009", "2012", "2015", "2018", "2021", "2024"],
    datasets: [
      {
        label: 'Completed',
        data: [0, 0, 0, 0, 65687, 65478, 55479, 65874, 45896],
        backgroundColor: "rgb(89, 90, 212)",
        borderRadius: 5,
        barPercentage: 0.9,
        minBarLength: 10,
        hoverBackgroundColor: [
          "rgb(89, 90, 212)"
        ],
      },
      {
        label: 'Under Construction',
        data: [65874, 30000, 70000, 45900, 0, 0, 0, 0, 0],
        backgroundColor: "rgb(211, 219, 255)",
        borderRadius: 5,
        barPercentage: 0.9,
        minBarLength: 10,
        hoverBackgroundColor: [
          "rgb(211, 219, 255)"
        ]
      },
    ]
  };
    // Average Service Charges of the City
    public AservicebarChartOptions: ChartConfiguration['options'] = {
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
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false
      },
      plugins: {
        legend: {
          position: 'bottom',
        },
        datalabels: {
          display: false,
        },
      },
    };
    public AservicebarChartType: ChartType = 'bar';
    public AservicebarChartPlugins = [
      DatalabelsPlugin
    ];
  
    public AservicebarChartData: ChartData<'bar'> = {
      labels: ["2016", "2017", "2018", "2019", "2020", "2021"],
      datasets: [{
        label: 'Villa',
        data: [3.58, 3.59, 3.74, 3.55, 2.85, 2.94],
        borderRadius: 5,
        barPercentage: 0.9,
        minBarLength: 10,
        backgroundColor: "rgb(211, 219, 255)",
        hoverBackgroundColor: [
          "rgb(211, 219, 255)"
        ]
      }, {
        label: 'Apartment',
        data: [12.39, 12.61, 12.89, 13.00, 12.81, 13.39, 7],
        borderRadius: 5,
        barPercentage: 0.9,
        minBarLength: 10,
        backgroundColor: "rgb(89, 90, 212)",
        hoverBackgroundColor: [
          "rgb(89, 90, 212)"
        ]
      }]
    };


        // Average Occupancy Rate of the City
        public AoccupacybarChartOptions: ChartConfiguration['options'] = {
          scales: {
            x: {
              type: 'linear',
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
          interaction: {
            intersect: false
          },
          
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
            },
            datalabels: {
              display: false,
            },
          },
        };
        public AoccupacybarChartType: ChartType = 'bar';
        public AoccupacybarChartPlugins = [
          DatalabelsPlugin
        ];
      
        public AoccupacybarChartData: ChartData<'bar'> = {
          labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
          datasets: [{
            label: 'Apartment',
            data: [91.1, 90.1, 88.7, 85.5, 83.0, 84.6, 86.8],
            borderRadius: 20,
            barPercentage: 0.9,
            minBarLength: 10,
            backgroundColor: "rgb(89, 90, 212)",
            hoverBackgroundColor: [
              "rgb(89, 90, 212)"
            ]
          }]
        };


        // Average Occupancy Rate of the City
        
        public priceRadiolineChartData: ChartConfiguration['data'] = {
          labels: ["0", "500", "1000", "1500", "2000", "2500",],
          datasets: [{
                  label: 'Apartment',
                  backgroundColor: "rgb(89, 90, 212)",
                  borderColor: '#595ad4',
                  pointBorderColor: '#595ad4',
                  pointBackgroundColor: '#595ad4',
                  pointHoverBackgroundColor: '#595ad4',
                  pointHoverBorderColor: '#595ad4',
                  pointBorderWidth: 3,
                  pointHoverRadius: 3,
                  pointHoverBorderWidth: 1,
                  pointRadius: 3,
                  fill: false,
                  borderWidth: 4,
                  data: [4, 8, 6, 10, 8, 10],
          }, {
                  label: 'Villa',
                  backgroundColor: "rgb(211, 219, 255)",
                  pointBorderColor: "rgb(211, 219, 255)",
                  pointBackgroundColor: "rgb(211, 219, 255)",
                  pointHoverBackgroundColor: '#595ad4',
                  pointHoverBorderColor: '#595ad4',
                  pointBorderWidth: 3,
                  pointHoverRadius: 3,
                  pointHoverBorderWidth: 1,
                  pointRadius: 3,
                  fill: false,
                  borderWidth: 4,
                  data: [4, 8, 6, 10, 8, 10],
          }, {
                  label: 'Residential - General',
                  backgroundColor: "rgb(140, 144, 221)",
                  pointBorderColor: "rgb(140, 144, 221)",
                  pointBackgroundColor: "rgb(140, 144, 221)",
                  pointHoverBackgroundColor: '#595ad4',
                  pointHoverBorderColor: '#595ad4',
                  pointBorderWidth: 3,
                  pointHoverRadius: 3,
                  pointHoverBorderWidth: 1,
                  pointRadius: 3,
                  fill: false,
                  borderWidth: 4,
                  data: [4, 8, 6, 10, 8, 10],
          }]
        };
        public priceRadiolineChartOptions: ChartConfiguration['options'] = {
          scales: {
            x: {
              type: 'linear',
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
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
            },
            datalabels: {
              display: false,
            },
          }
}
public priceRadiolineChartType: ChartType = 'line';
status: boolean = false;
clickEvent() {
    this.status = !this.status;
  }
  status2: boolean = false;
clickEvent2() {
    this.status2 = !this.status2;
  }
}