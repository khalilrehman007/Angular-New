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

  constructor(private service:AppService) {
    this.searchfilter = this.searchctrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.searchList.slice())),
    );

    this.getExpertIn();
    this.getSpokenLanguages();
    this.service.AgentAutoCompleteSearch({"Searching":"mr","CountryId":"1"}).subscribe((result:any)=>{
      console.log(result);
    })
  }

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
  // Search Code
  separatorKeysCodes: number[] = [ENTER, COMMA];
  searchctrl = new FormControl('');
  searchfilter: Observable<string[]>;
  SearchKeyword: string[] = [];
  searchList: any = [];

  @ViewChild('SearchInput') SearchInput: ElementRef<HTMLInputElement>;
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.SearchKeyword.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.searchctrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.SearchKeyword.indexOf(fruit);

    if (index >= 0) {
      this.SearchKeyword.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.SearchKeyword.push(event.option.viewValue);
    this.SearchInput.nativeElement.value = '';
    this.searchctrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.searchList.filter(fruit => fruit.toLowerCase().includes(filterValue));
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
    console.log(this.ExpertIn)
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
}
