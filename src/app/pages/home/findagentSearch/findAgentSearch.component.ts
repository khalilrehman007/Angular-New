import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { AppService } from 'src/app/service/app.service';
import { Options } from '@angular-slider/ngx-slider';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { data } from 'jquery';

@Component({
  selector: 'find-agent-search',
  templateUrl: './findAgentSearch.component.html',
  styleUrls: ['./findAgentSearch.component.scss']
})
export class FindAgentSearchComponent implements OnInit {

  // Find agentLocation property
  // searchByLocation: number[] = [ENTER, COMMA];
  // SearchByLocationctrl = new FormControl('');
  // SearchByObserve: Observable<string[]>;
  // SearchByLocString: string[] = [];
  // allSearchByLocString: string[] = ['hikmat', 'waris', 'Dubai', 'UAE', 'Dubai'];
  //
  // @ViewChild('LetSearchByLocationInput') LetSearchByLocationInput: ElementRef<HTMLInputElement>;
  // add(event: MatChipInputEvent): void {
  //   const value = (event.value || '').trim();
  //   if (value) {
  //     this.SearchByLocString.push(value);
  // }
  //
  //   // Clear the input value
  //   event.chipInput!.clear();
  //
  //   this.SearchByLocationctrl.setValue(null);
  // }

  // remove(LetSearchByLocation: string): void {
  //   const index = this.SearchByLocString.indexOf(LetSearchByLocation);
  //
  //   if (index >= 0) {
  //     this.SearchByLocString.splice(index, 1);
  //   }
  // }

  // selected(event: MatAutocompleteSelectedEvent): void {
  //   this.SearchByLocString.push(event.option.viewValue);
  //   this.LetSearchByLocationInput.nativeElement.value = '';
  //   this.SearchByLocationctrl.setValue(null);
  // }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //
  //   return this.allSearchByLocString.filter(LetSearchByLocation => LetSearchByLocation.toLowerCase().includes(filterValue));
  // }

  // Find Agent

  // searchByAgent: number[] = [ENTER, COMMA];
  // SearchByAgentctrl = new FormControl('');
  // SearchByAgentObserve: Observable<string[]>;
  // SearchByAgentString: string[] = [];
  // allSearchByAgentString: string[] = ['Dubai', 'UAE', 'Dubai', 'UAE', 'Dubai'];
  //
  // @ViewChild('LetSearchByAgentInput') LetSearchByAgentInput: ElementRef<HTMLInputElement>;


  // add1(event: MatChipInputEvent): void {
  //   const value = (event.value || '').trim();
  //   if (value) {
  //     this.SearchByAgentString.push(value);
  // }
  //
  //   // Clear the input value
  //   event.chipInput!.clear();
  //
  //   this.SearchByAgentctrl.setValue(null);
  // }
  //
  // remove1(LetSearchByAgentInput: string): void {
  //   const index = this.SearchByLocString.indexOf(LetSearchByAgentInput);
  //
  //   if (index >= 0) {
  //     this.SearchByAgentString.splice(index, 1);
  //   }
  // }
  //
  // selected1(event: MatAutocompleteSelectedEvent): void {
  //   this.SearchByAgentString.push(event.option.viewValue);
  //   this.LetSearchByAgentInput.nativeElement.value = '';
  //   this.SearchByAgentctrl.setValue(null);
  // }





  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  allFruits: string[];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  locationOnSearchData :any = []
  getLoaction(data:any){
    let tempData :any = []
    let tempCompleteData :any = []
    this.service.CompanyLocationAutoCompleteSearch(data).subscribe(data=>{
      let response: any = data;
      response.data.locationAutoComplete.forEach((element, i) => {
        tempData.push(element.item2);
        // tempCompleteData.push({'id':element.item1,'value':element.item2})
        tempCompleteData.push(element.item1)
      })
    });
    this.allFruits = tempData
    this.locationOnSearchData = tempCompleteData
  }

  separatorKeysCodes1: number[] = [ENTER, COMMA];
  fruitCtrl1 = new FormControl('');
  filteredFruits1: Observable<string[]>;
  fruits1: string[] = [];
  allFruits1: string[];

  @ViewChild('fruitInput1') fruitInput1: ElementRef<HTMLInputElement>;


  getAgent(data:any){
    let tempData :any = []
    this.service.AgentAutoCompleteSearch(data).subscribe(data=>{
      let response: any = data;
      response.data.agentAutoComplete.forEach((element, i) => {
        tempData.push(element.value);
      })
    });
    this.allFruits1 = tempData
  }

  getUrllanguageIds : any = []
  getUrlExpertInId : any ;

  constructor(private activeRoute: ActivatedRoute,private service:AppService,public route:Router) {

    // this.searchfilter = this.searchctrl.valueChanges.pipe(
    //   startWith(null),
    //   map((fruit: string | null) => (fruit ? this._filter(fruit) : this.searchList.slice())),
    // );

    this.getUrllanguageIds = this.activeRoute.snapshot.queryParamMap.get('LanguageId');
    this.getUrlExpertInId = this.activeRoute.snapshot.queryParamMap.get('ExpertInId');

    console.log(this.getUrllanguageIds)
    console.log(this.getUrlExpertInId)

    this.getExpertIn();
    this.getSpokenLanguages();
  }



  onLocationSearchChange(searchValue: string): void {
    this.getLoaction({"Searching":searchValue,"CountryId":"1"});
    setTimeout(() => {
      this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
      );
    }, 1000);

  }
  onAgentSearchChange(searchValue: string): void {
    this.getAgent({"Searching":searchValue,"CountryId":"1"});
    setTimeout(() => {
      this.filteredFruits1 = this.fruitCtrl1.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => (fruit ? this._filter1(fruit) : this.allFruits1.slice())),
      );
    }, 1000);

  }



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
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  DistrictsId :any = []
  selected(event: MatAutocompleteSelectedEvent): void {

    console.log(this.locationOnSearchData)

    // this.DistrictsId.push(this.locationOnSearchData);

    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }



  add1(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits1.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl1.setValue(null);
  }

  remove1(fruit: string): void {
    const index = this.fruits1.indexOf(fruit);

    if (index >= 0) {
      this.fruits1.splice(index, 1);
    }
  }

  selected1(event: MatAutocompleteSelectedEvent): void {
    this.fruits1.push(event.option.viewValue);
    this.fruitInput1.nativeElement.value = '';
    this.fruitCtrl1.setValue(null);
  }

  private _filter1(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allFruits1.filter(fruit => fruit.toLowerCase().includes(filterValue));
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
  }
  status: boolean = false;
  clickEvent(){
      this.status = !this.status;
      this.status1 = false;
  }
  status1: boolean = false;
  clickEvent1(){
      this.status1 = !this.status1;
      this.status = false;
  }

  ExpertIn :any = [];
  getExpertIn(){
    let tempData :Array<Object> = []
    this.service.LoadExpertIn().subscribe(data=>{
      let response: any = data;
      response.data.forEach((element, i) => {
        tempData.push(
          {id: element.id, name: element.name});
      })
    });
    this.ExpertIn = tempData
  }
  SpokenLanguages :any = [];
  getSpokenLanguages(){
    let tempData :Array<Object> = []
    this.service.LoadSpokenLanguages().subscribe(data=>{
      let response: any = data;
      response.data.forEach((element, i) => {
        tempData.push(
          {id: element.id, name: element.name});
      })
    });
    this.SpokenLanguages = tempData
  }

  ExpertInId :number ;
  getExpertInId(id:number){
    this.ExpertInId = id
  }
  LanguageId :number ;
  getLanguageId(id:number){

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

  proceedSearch(){
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
    console.log(this.DistrictsId)



    // let params :any = {queryParams:{LanguageId:this.LanguageId,ExpertInId:this.ExpertInId}};
    // this.route.navigate(['/find-agent'],params)

  }
}
