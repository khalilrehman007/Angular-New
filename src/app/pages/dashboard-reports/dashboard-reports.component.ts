import { Component, ViewChild,OnInit } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard-reports',
  templateUrl: './dashboard-reports.component.html',
  styleUrls: ['./dashboard-reports.component.scss']
})
export class DashboardReportsComponent implements OnInit {
  downloadreport= '../../../assets/images/icons/download-svg.svg'
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  constructor() { }

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
public pieChartPlugins = [ DatalabelsPlugin ];



// Population Chart
public barChartOptions: ChartConfiguration['options'] = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {  ticks: {
      font: {
        size: 10,
    }
      }},
      y: {  ticks: {
        font: {
          size: 10,
      }
        }},
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
      data: [ 500000, 3500600, 100000, 3503500, 3500000],
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
    x: {  ticks: {
      font: {
        size: 10,
    }
      }},
      y: {  ticks: {
        font: {
          size: 10,
      }
        }},
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
 public GenderpieChartOptions: ChartConfiguration['options'] = {
  maintainAspectRatio: false,
  interaction: {
    intersect: false
  },
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
          borderColor:"#ffffff00",
          borderRadius: 5,
          offset: 20,
          hoverBackgroundColor: [
            "rgb(89, 90, 212)",
              "rgb(211, 219, 255)"
          ]
      }]
};
public GenderpieChartType: ChartType = 'pie';
public GenderpieChartPlugins = [ DatalabelsPlugin ];
public options:any={
  'rotation': -Math.PI,
  'circumference': Math.PI
}


}
