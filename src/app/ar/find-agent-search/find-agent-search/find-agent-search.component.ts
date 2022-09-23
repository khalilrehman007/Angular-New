import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AppService } from 'src/app/service/app.service';
import { Options } from '@angular-slider/ngx-slider';
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { data } from 'jquery';

@Component({
  selector: 'app-find-agent-search',
  templateUrl: './find-agent-search.component.html',
  styleUrls: ['./find-agent-search.component.scss']
})
export class FindAgentSearchComponent implements OnInit {
  @Output() childParentDataLoad: EventEmitter<any> = new EventEmitter<any>()

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: any;


  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  allFruits: string[] = [];

  @ViewChild('fruitInput') fruitInput: any;

  myControl1 = new FormControl('');
  options1: string[] = [];
  filteredOptions1: any;


  agentOnSearchData: any = []
  getAgent(data: any) {
    let tempData: any = []
    let tempCompleteData: any = []
    this.service.AgentAutoCompleteSearch(data).subscribe(data => {
      let response: any = data;
      response.data.agentAutoComplete.forEach((element: any, i: any) => {
        tempData.push(element.value);
        tempCompleteData.push({ 'id': element.key, 'value': element.value })
      })
    });
    this.options1 = tempData
    this.agentOnSearchData = tempCompleteData
  }

  getUrllanguageIds: any = []
  getUrlExpertInId: any;
  districtValue: any = [];

  constructor(private activeRoute: ActivatedRoute, private service: AppService, public route: Router) {

    this.getUrllanguageIds = this.activeRoute.snapshot.queryParamMap.get('LanguageId');
    this.getUrlExpertInId = this.activeRoute.snapshot.queryParamMap.get('ExpertInId');
    this.districtValue = this.activeRoute.snapshot.queryParamMap.get('districtValue');

    if (this.districtValue !== null) {
      this.fruits = JSON.parse(this.districtValue)
    }

    this.getExpertIn();
    this.getSpokenLanguages();
    this.getAgent({ "Searching": '', "CountryId": "1" });
    this.getLoaction({ "Searching": '', "CountryId": "1" });
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );
  }


  locationOnSearchData: any = []
  getLoaction(data: any) {
    let tempData: any = []
    let tempCompleteData: any = []
    this.service.CompanyLocationAutoCompleteSearch(data).subscribe(data => {
      let response: any = data;
      response.data.locationAutoComplete.forEach((element: any, i: any) => {
        tempData.push(element.item2);
        tempCompleteData.push({ 'id': element.item1, 'value': element.item2 })
      })
    });
    this.allFruits = tempData
    this.locationOnSearchData = tempCompleteData
  }


  // onLocationSearchChange(searchValue: string): void {
  //   this.getLoaction({"Searching":searchValue,"CountryId":"1"});
  //   setTimeout(() => {
  //     this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
  //       startWith(null),
  //       map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
  //     );
  //   }, 1000);
  //
  // }
  // onAgentSearchChange(searchValue: string): void {
  //   this.getAgent({"Searching":searchValue,"CountryId":"1"});
  //   setTimeout(() => {
  //     this.filteredFruits1 = this.fruitCtrl1.valueChanges.pipe(
  //       startWith(null),
  //       map((fruit: string | null) => (fruit ? this._filter1(fruit) : this.allFruits1.slice())),
  //     );
  //   }, 1000);
  //
  // }



  add(event: MatChipInputEvent): void {

    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {

    let removeId: any;
    this.locationOnSearchData.forEach((element: any, i: any) => {
      if (element.value == fruit) {
        removeId = element.id
      }
    })

    let companyIndex: number = this.DistrictsId.indexOf(removeId);
    if (companyIndex !== -1) {
      this.DistrictsId.splice(companyIndex, 1);
    }

    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  DistrictsId: any = []
  selected(event: MatAutocompleteSelectedEvent): void {
    this.locationOnSearchData.forEach((element: any, i: any) => {
      if (element.value == event.option.viewValue) {
        this.DistrictsId.push(element.id)
      }
    })
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }



  agentName: any = '';
  private _filter1(value: string): string[] {
    this.agentName = value;
    const filterValue = value.toLowerCase();
    return this.options1.filter(option => option.toLowerCase().includes(filterValue));
  }


  // languageCheck(id:number){
  //   let exists = false;
  //   this.LanguageId.forEach((element, i) => {
  //     if(element == id){
  //       exists = true;
  //     }
  //   })
  //   return exists;
  // }

  ngOnInit(): void {
    this.filteredOptions1 = this.myControl1.valueChanges.pipe(
      startWith(''),
      map(value => this._filter1(value || '')),
    );
  }
  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
    this.status1 = false;
  }
  status1: boolean = false;
  clickEvent1() {
    this.status1 = !this.status1;
    this.status = false;
  }

  ExpertIn: any = [];
  getExpertIn() {
    let tempData: Array<Object> = []
    this.service.LoadExpertIn().subscribe(data => {
      let response: any = data;
      response.data.forEach((element: any, i: any) => {
        tempData.push(
          { id: element.id, name: element.name });
      })
    });
    this.ExpertIn = tempData
  }
  SpokenLanguages: any = [];
  getSpokenLanguages() {
    let tempData: Array<Object> = []
    this.service.LoadSpokenLanguages().subscribe(data => {
      let response: any = data;
      response.data.forEach((element: any, i: any) => {
        tempData.push(
          { id: element.id, name: element.name });
      })
    });
    this.SpokenLanguages = tempData
  }

  ExpertInId: any = 0;
  getExpertInId(id: number) {
    this.ExpertInId = id
  }
  LanguageId: any = 0;
  getLanguageId(id: number) {

    this.LanguageId = id
    ///multiple code

    // let exists :any = true;
    // this.LanguageId.forEach((element, i) => {
    //      if(id == element){
    //       exists = false;
    //     }
    // })
    // if(exists){
    //   this.LanguageId.push(id);
    // }else{
    //   const index = this.LanguageId.indexOf(id);
    //   if (index >= 0) {
    //     this.LanguageId.splice(index, 1);
    //   }
    // }
  }

  proceedSearch() {
    // console.log('dededed')
    // if(this.LanguageId.length < 1){
    //   this.LanguageId = this.getUrllanguageIds;
    // }
    //
    // let languages :any = []
    // this.LanguageId.forEach((element, i) => {
    //   languages.push(element);
    // })

    // if(this.LanguageId.length < 1){
    //   this.LanguageId = this.getUrllanguageIds;
    // }


    // let params :any = {queryParams:{LanguageId:JSON.stringify(this.LanguageId),ExpertInId:this.ExpertInId}};

    // console.log(this.fruits)
    // console.log(this.locationOnSearchData)

    // let getLocationId :any = []
    // this.DistrictsId.forEach((element, i) => {
    //   this.locationOnSearchData.forEach((data, i) => {
    //       if(data.value == element){
    //         getLocationId.push(data.id)
    //       }
    //   })
    // })
    //

    let getAgentId: any = 0;
    this.agentOnSearchData.forEach((element: any, i: any) => {
      if (element.value == this.agentName) {
        getAgentId = element.id
      }
    })


    let agentObject: any = {
      "CountryId": "1",
      "DistrictsId": this.DistrictsId,
      "CompaniesId": [],
      "UserId": getAgentId,
      "EpertInId": this.ExpertInId,
      "LanguageId": this.LanguageId,
      "CurrentPage": "1"
    };

    console.log(agentObject)

    let params: any = {
      queryParams:
      {
        districtValue: JSON.stringify(this.fruits),
        getAgentId: getAgentId,
        LanguageId: this.LanguageId,
        ExpertInId: this.ExpertInId,
        locationId: JSON.stringify(this.DistrictsId
        )
      }
    };

    this.childParentDataLoad.emit(agentObject)

    this.route.navigate(['/ar/find-agent'], params)

  }
}