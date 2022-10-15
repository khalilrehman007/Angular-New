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
import { Select2 } from 'select2';
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
  selector: 'app-unit-transaction-history-residential',
  templateUrl: './unit-transaction-history-residential.component.html',
  styleUrls: ['./unit-transaction-history-residential.component.scss']
})
export class UnitTransactionHistoryResidentialComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource: MatTableDataSource<UserData>;

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


  currentDate: any = new Date()
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  })

  @ViewChild('ComunityInput') ComunityInput: any;
  @ViewChild('PropertyTypeInput') PropertyTypeInput: any;
  @ViewChild('PropertyInput') PropertyInput: any;

  countryData: any = "";
  citiesData: any = "";
  startDate: any = "";
  endDate: any = "";
  minSize: any = "";
  maxSize: any = "";
  minPrice: any = "";
  maxPrice: any = "";
  transactionData: any = "";

  constructor(private cookie: CookieService, private service: AppService) {
    this.minSize = this.SizeminValue;
    this.maxSize = this.SizemaxValue;
    this.minPrice = this.PriceminValue;
    this.maxPrice = this.PricemaxValue;
    let temp: any = new Date();
    temp.setFullYear(temp.getFullYear() - 11);
    this.range.patchValue({
      start: temp,
      end: this.currentDate
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
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    this.dataSource = new MatTableDataSource(users);
  }
  getDate(e: any) {
    let temp: any = new Date(e.value)
    return temp.getMonth() + "-" + temp.getDate() + "-" + temp.getFullYear();
  }
  getStartDate(e: any) {
    this.startDate = this.getDate(e);
  }
  getEndDate(e: any) {
    this.endDate = this.getDate(e);
    console.log(this.startDate, this.endDate);
  }
  getMinSize(e: any) {
    this.minSize = e;
  }
  getMaxSize(e: any) {
    this.maxSize = e;
  }
  getMinPrice(e: any) {
    this.minSize = e;
  }
  getMaxPrice(e: any) {
    this.maxSize = e;
  }
  loadData() {
    if (this.startDate == "" || this.endDate == "" || this.communityfield.length == 0) {
      return;
    }
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
    console.log(temp)
    this.service.GetResidentialTransactionData(temp).subscribe((result: any) => {
      if (result.message == "Residential Transaction Data fetched successfully") {
        this.transactionData = result.data;
        console.log(this.transactionData);
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
    this.loadProjects();
    this.loadData();
  }
  loadProjects() {
    let temp: any = [];
    for (let item of this.communityfield) {
      temp.push(item.id)
    }
    this.service.GetProjects({ "DistrictIds": temp }).subscribe((result: any) => {
      this.filteredPropertyOnly = result.data;
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
 
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    $(".unit-number-select").select2({ placeholder: "Unit Numbers" });
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