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
//  Data Table
export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Component({
  selector: 'app-transaction-data',
  templateUrl: './transaction-data.component.html',
  styleUrls: ['./transaction-data.component.scss']
})
export class TransactionDataComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  //Size RangeSlider
  SizeminValue: number = 10;
  SizemaxValue: number = 1000000;
  Sizeoptions: Options = {
    floor: 10,
    ceil: 1000000,
    translate: (value: number): string => {
      return value + this.countryData.unitType;
    }
  };

  //Price RangeSlider
  PriceminValue: number = 10;
  PricemaxValue: number = 1000000;
  Priceoptions: Options = {
    floor: 10,
    ceil: 1000000,
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
  allbedsfield: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // City Filter
  CityCtrl = new FormControl('');
  filteredCity: any;
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
  citiesData: any = "";
  startDate:any = "";
  endDate:any = "";

  constructor(private cookie: CookieService, private service: AppService) {
    this.countryData = JSON.parse(this.cookie.get("countryData"));
    this.service.FindCities({ "CountryId": this.countryData.id, "Locations": [] }).subscribe((result: any) => {
      this.citiesData = result.data;
      this.Cityfield.push({ "id": this.citiesData[0].id, "name": this.citiesData[0].name });
      this.loadDistrict();
      let a = setInterval(() => {
        if(this.filteredcommunity.length > 0) {
          this.communityfield.push({ "id": this.filteredcommunity[0].id, "name": this.filteredcommunity[0].name });
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
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    this.dataSource = new MatTableDataSource(users);
  }
  getDate(e:any) {
    let temp:any = new Date(e.value)
    return temp.getMonth() + "-" + temp.getDate() + "-" + temp.getFullYear();
  }
  getStartDate(e:any) {
    this.startDate = this.getDate(e);
  }
  getEndDate(e:any) {
    this.endDate = this.getDate(e);
    console.log(this.startDate, this.endDate);
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
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.communityfield.push({ "id": event.option.value, "name": event.option.viewValue });
    this.ComunityInput.nativeElement.value = '';
    this.CommunityCtrl.setValue(null);
    this.loadProjects();
  }
  loadProjects() {
    let temp: any = [];
    for (let item of this.communityfield) {
      temp.push(item.id)
    }
    this.service.GetProjects({ "DistrictIds": temp }).subscribe((result: any) => {
      this.filteredPropertyOnly = result.data;
    })
    this.service.TransactionSequence({ "DistrictIds": temp }).subscribe((result: any) => {
      this.filteredsales = result.data;
    })
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
  }
  selected1(event: MatAutocompleteSelectedEvent): void {
    this.ProTypefield.push({ "id": event.option.value, "name": event.option.viewValue });
    this.PropertyTypeInput.nativeElement.value = '';
    this.PropertyTypCtrl.setValue(null);
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
  }
  selected2(event: MatAutocompleteSelectedEvent): void {
    this.Profield.push({ "id": event.option.value, "name": event.option.viewValue });
    this.PropertyInput.nativeElement.value = '';
    this.PropertyCtrl.setValue(null);
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
  }
  selected3(event: MatAutocompleteSelectedEvent): void {
    this.Transactionfield.push(event.option.viewValue);
    this.TransactionInput.nativeElement.value = '';
    this.TransactionCtrl.setValue(null);
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
  }
  selected4(event: MatAutocompleteSelectedEvent): void {
    this.salesfield.push({ "id": event.option.value, "name": event.option.viewValue });
    this.SalesInput.nativeElement.value = '';
    this.salesCtrl.setValue(null);
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
  }
  selected5(event: MatAutocompleteSelectedEvent): void {
    this.Developersfield.push({ "id": event.option.value, "name": event.option.viewValue });
    this.developersInput.nativeElement.value = '';
    this.DevelopersCtrl.setValue(null);
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
  }
  selected6(event: MatAutocompleteSelectedEvent): void {
    this.bedsfield.push(event.option.viewValue);
    this.bedInput.nativeElement.value = '';
    this.bedsCtrl.setValue(null);
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
    this.Profield = [];
    const index7 = this.Cityfield.indexOf(city);
    if (index7 >= 0) {
      this.Cityfield.splice(index7, 1);
    }
    this.loadDistrict();
  }
  selected7(event: any): void {
    this.Cityfield.push({ "id": event.option.value, "name": event.option.viewValue });
    this.CityInput.nativeElement.value = '';
    this.CityCtrl.setValue(null);
    this.loadDistrict();
  }
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };
}