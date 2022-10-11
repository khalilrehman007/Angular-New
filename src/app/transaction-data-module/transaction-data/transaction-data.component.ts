import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-transaction-data',
  templateUrl: './transaction-data.component.html',
  styleUrls: ['./transaction-data.component.scss']
})
export class TransactionDataComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  CommunityCtrl = new FormControl('');
  filteredcommunity: Observable<string[]>;
  communityfield: string[] = ['Dubai Community'];
  allcommunityfield: string[] = ['Dubai Community', 'Dubai Community', 'Dubai Community'];

  @ViewChild('fruitInput') fruitInput:any;

  constructor() {
    this.filteredcommunity = this.CommunityCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allcommunityfield.slice())),
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.communityfield.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.CommunityCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.communityfield.indexOf(fruit);

    if (index >= 0) {
      this.communityfield.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.communityfield.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.CommunityCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allcommunityfield.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {
  }

}
