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
  searchByLocation: number[] = [ENTER, COMMA];
  SearchByLocationctrl = new FormControl('');
  SearchByObserve: Observable<string[]>;
  SearchByLocString: string[] = [];
  allSearchByLocString: string[] = ['Dubai', 'UAE', 'Dubai', 'UAE', 'Dubai'];

  @ViewChild('LetSearchByLocationInput') LetSearchByLocationInput: ElementRef<HTMLInputElement>;
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.SearchByLocString.push(value);
  }

    // Clear the input value
    event.chipInput!.clear();

    this.SearchByLocationctrl.setValue(null);
  }

  remove(LetSearchByLocation: string): void {
    const index = this.SearchByLocString.indexOf(LetSearchByLocation);

    if (index >= 0) {
      this.SearchByLocString.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.SearchByLocString.push(event.option.viewValue);
    this.LetSearchByLocationInput.nativeElement.value = '';
    this.SearchByLocationctrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSearchByLocString.filter(LetSearchByLocation => LetSearchByLocation.toLowerCase().includes(filterValue));
  }

  // Find Agent

  searchByAgent: number[] = [ENTER, COMMA];
  SearchByAgentctrl = new FormControl('');
  SearchByAgentObserve: Observable<string[]>;
  SearchByAgentString: string[] = [];
  allSearchByAgentString: string[] = ['Dubai', 'UAE', 'Dubai', 'UAE', 'Dubai'];

  @ViewChild('LetSearchByAgentInput') LetSearchByAgentInput: ElementRef<HTMLInputElement>;


  add1(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.SearchByAgentString.push(value);
  }

    // Clear the input value
    event.chipInput!.clear();

    this.SearchByAgentctrl.setValue(null);
  }

  remove1(LetSearchByAgentInput: string): void {
    const index = this.SearchByLocString.indexOf(LetSearchByAgentInput);

    if (index >= 0) {
      this.SearchByAgentString.splice(index, 1);
    }
  }

  selected1(event: MatAutocompleteSelectedEvent): void {
    this.SearchByAgentString.push(event.option.viewValue);
    this.LetSearchByAgentInput.nativeElement.value = '';
    this.SearchByAgentctrl.setValue(null);
  }

  constructor(private service:AppService) {
    this.getExpertIn();
    this.getSpokenLanguages();
    this.service.AgentAutoCompleteSearch({"Searching":"mr","CountryId":"1"}).subscribe((result:any)=>{
    })
    this.SearchByObserve = this.SearchByLocationctrl.valueChanges.pipe(
      startWith(null),
      map((LetSearchByLocation: string | null) => (LetSearchByLocation ? this._filter(LetSearchByLocation) : this.allSearchByLocString.slice())),
    );
    this.SearchByAgentObserve = this.SearchByAgentctrl.valueChanges.pipe(
      startWith(null),
      map((LetSearchByAgent: string | null) => (LetSearchByAgent ? this._filter(LetSearchByAgent) : this.allSearchByLocString.slice())),
    );
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
}
