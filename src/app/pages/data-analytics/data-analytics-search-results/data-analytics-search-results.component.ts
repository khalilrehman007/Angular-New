import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-analytics-search-results',
  templateUrl: './data-analytics-search-results.component.html',
  styleUrls: ['./data-analytics-search-results.component.scss']
})
export class DataAnalyticsSearchResultsComponent implements OnInit {
  search='../../../../assets/images/search.svg'
  chartsvg = '../../../assets/images/Charts-nav.svg'
  info = '../../../assets/images/icons/Info.svg'
  country = [
    {viewValue: 'UAE',value: 'UAE'},
    {viewValue: 'UAE',value: 'UAE'},
  ];
  locations = [
    {value: 'Al Khabisi'},
    {value: 'Al Khawaneej First'},
    {value: 'Al Khawaneej Second'},
    {value: 'Al Kifaf'},
    {value: 'Al Mamzar'},
    {value: 'Al Manara'},
    {value: 'Al Mankhool'},
    {value: 'Al Merkad'},
    {value: 'Al Mina'},
    {value: 'Al Mizhar First'},
    {value: 'Al Mizhar Second'},
    {value: 'Al Muraqqabat'},
    {value: 'Al Murar'},
    {value: 'Al Mushrif'},
    {value: 'Al Muteena'},
    {value: 'Al Nahda First'},
    {value: 'Al Nahda Second'},
    {value: 'Al Nasr, Dubai'},
    {value: 'Al Quoz First'},
  ];
  prices = [
    {value: '1,379 AED / Sq. Ft.'},
    {value: '1,379 AED / Sq. Ft.'},
    {value: '1,379 AED / Sq. Ft.'},
    {value: '1,379 AED / Sq. Ft.'},
    {value: '1,379 AED / Sq. Ft.'},
    {value: '1,379 AED / Sq. Ft.'},
    {value: '1,379 AED / Sq. Ft.'},
    {value: '1,379 AED / Sq. Ft.'},
    {value: '1,379 AED / Sq. Ft.'},
    {value: '1,379 AED / Sq. Ft.'},
    {value: '1,379 AED / Sq. Ft.'},
    {value: '1,379 AED / Sq. Ft.'},
    {value: '1,379 AED / Sq. Ft.'},
    {value: '1,379 AED / Sq. Ft.'},
    {value: '1,379 AED / Sq. Ft.'},
    {value: '1,379 AED / Sq. Ft.'},
    {value: '1,379 AED / Sq. Ft.'},
    {value: '1,379 AED / Sq. Ft.'},
    {value: '1,379 AED / Sq. Ft.'},
  ];
  trends = [
    {value: '1,379 AED / Sq. Ft.', trendstatus: 'Increasing'},
    {value: '1,379 AED / Sq. Ft.', trendstatus: 'Increasing'},
    {value: '1,379 AED / Sq. Ft.', trendstatus: 'Increasing'},
    {value: '1,379 AED / Sq. Ft.', trendstatus: 'Increasing'},
    {value: '1,379 AED / Sq. Ft.', trendstatus: 'Increasing'},
    {value: '1,379 AED / Sq. Ft.', trendstatus: 'Increasing'},
    {value: '1,379 AED / Sq. Ft.', trendstatus: 'Descreasing'},
    {value: '1,379 AED / Sq. Ft.', trendstatus: 'Increasing'},
    {value: '1,379 AED / Sq. Ft.', trendstatus: 'Increasing'},
    {value: '1,379 AED / Sq. Ft.', trendstatus: 'Descreasing'},
    {value: '1,379 AED / Sq. Ft.', trendstatus: 'Increasing'},
    {value: '1,379 AED / Sq. Ft.', trendstatus: 'Increasing'},
    {value: '1,379 AED / Sq. Ft.', trendstatus: 'Descreasing'},
    {value: '1,379 AED / Sq. Ft.', trendstatus: 'Increasing'},
    {value: '1,379 AED / Sq. Ft.', trendstatus: 'Descreasing'},
    {value: '1,379 AED / Sq. Ft.', trendstatus: 'Increasing'},
    {value: '1,379 AED / Sq. Ft.', trendstatus: 'Increasing'},
    {value: '1,379 AED / Sq. Ft.', trendstatus: 'Increasing'},
    {value: '1,379 AED / Sq. Ft.', trendstatus: 'Increasing'},
  ];
  popularSearches = [
    {value: 'Arabian Ranches Property Price Trends', link: ''},
    {value: 'Business Bay Property Price Trends', link: ''},
    {value: 'DIFC Property Price Trends', link: ''},
    {value: 'Downtown Dubai Property Price Trends', link: ''},
    {value: 'Dubai Hills Estate Property Price Trends', link: ''},
    {value: 'Dubai Land Property Price Trends', link: ''},
    {value: 'Arabian Ranches Property Price Trends', link: ''},
    {value: 'Business Bay Property Price Trends', link: ''},
    {value: 'DIFC Property Price Trends', link: ''},
    {value: 'Downtown Dubai Property Price Trends', link: ''},
    {value: 'Dubai Hills Estate Property Price Trends', link: ''},
    {value: 'Dubai Land Property Price Trends', link: ''},
    {value: 'Arabian Ranches Property Price Trends', link: ''},
    {value: 'Business Bay Property Price Trends', link: ''},
    {value: 'DIFC Property Price Trends', link: ''},
    {value: 'Downtown Dubai Property Price Trends', link: ''},
    {value: 'Dubai Hills Estate Property Price Trends', link: ''},
    {value: 'Dubai Land Property Price Trends', link: ''},
    {value: 'Arabian Ranches Property Price Trends', link: ''},
    {value: 'Business Bay Property Price Trends', link: ''},
    {value: 'DIFC Property Price Trends', link: ''},
    {value: 'Downtown Dubai Property Price Trends', link: ''},
    {value: 'Dubai Hills Estate Property Price Trends', link: ''},
    {value: 'Dubai Land Property Price Trends', link: ''},
  ];
  constructor() { }

  ngOnInit(): void {
  }
  status: boolean = false;
  clickEvent(){
      this.status = !this.status;       
  }
}
