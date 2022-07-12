import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-analytics',
  templateUrl: './data-analytics.component.html',
  styleUrls: ['./data-analytics.component.scss']
})
export class DataAnalyticsComponent implements OnInit {
  uaeflag='../../../../assets/images/flags/uae.svg'
  search='../../../../assets/images/search.svg'
  chartsvg = '../../../assets/images/Charts-nav.svg'
  resident = '../../../assets/images/residentials-icon.svg'
  equity = '../../../assets/images/commertials.svg'
  Ancillaries = '../../../assets/images/agriculture-icon.svg'
  country = [
    {viewValue: 'UAE',value: 'UAE'},
    {viewValue: 'UAE',value: 'UAE'},
  ];
  insighttext = [
    {heading: 'City Wise Dashboard',desc: 'Scan key metrics and price trends for quick reference to city performance'},
    {heading: 'Customised Catchment Analysis',desc: 'Analyze city masterplan, social infrastructure, supply and demand trends around selected catchment area.'},
    {heading: 'Targeted Builder Analysis',desc: 'Keep track of competition with up to date information.'},
    {heading: 'In-depth Project Analysis',desc: 'Search projects by region along with detailed project specification and amenities.'},
  ];
  faqsec = [
    {heading: 'What is the source of this transaction data?',desc: 'Scan key metrics and price trends for quick reference to city performance'},
    {heading: 'Is transaction data public?',desc: 'Analyze city masterplan, social infrastructure, supply and demand trends around selected catchment area.'},
    {heading: 'Is the area mentioned carpet, builtup or super-built up area?',desc: 'Keep track of competition with up to date information.'},
    {heading: 'I am not getting any search results? What should I do?',desc: 'Search projects by region along with detailed project specification and amenities.'},
    {heading: 'Is this data correct and authentic?',desc: 'Keep track of competition with up to date information.'},
    {heading: 'How frequently this data is updated?',desc: 'Search projects by region along with detailed project specification and amenities.'},
  ];
  nextcntnt = [
    {heading: 'Validated',desc: 'Multiple checkpoints to ensure data authenticity with real time update.'},
    {heading: 'Extensive',desc: '50+ parameters analysed for residential sector with macro and micro detailing.'},
    {heading: 'Cloud Based Solution',desc: '24/7 access to critical information on real estate trends anywhere, anytime.'},
    {heading: 'Master Plan Integration',desc: 'Ease of understanding the land usage of the area one is looking for evaluating from zoning as well as planned Infrastructure initiatives.'},
    {heading: 'Convenient',desc: 'Ease of use with downloadable content and dedicated customer support.'},
    {heading: 'Interactive',desc: 'Dynamic graphs, area delineation, customised dashboards and filter options for hassle free experience.'},
    {heading: 'Social Infra Mapping',desc: 'To understand livability health by getting information on nearby hospitals, malls, schools, universities, bus stops, train stations, airport, restaurants, ATMs etc.'},
    {heading: 'Demand Analytics',desc: 'A unique feature that is captured by only Data Labs; analyzing customer demand for property type, budget, BHKs etc. '},
    {heading: 'Time Sense',desc: 'With Time Sense one can get an overview of how much time it will take to get to any point around a project.'},
    {heading: 'Realty Pulse',desc: 'In-depth demand & supply analysis, inventory movement, historical trends, project profiling etc.'},

  ];
  constructor() { }

  ngOnInit(): void {
  }

}
