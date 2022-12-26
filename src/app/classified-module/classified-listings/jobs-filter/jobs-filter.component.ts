import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-jobs-filter',
  templateUrl: './jobs-filter.component.html',
  styleUrls: ['./jobs-filter.component.scss']
})
export class JobsFilterComponent implements OnInit {
  minValue: number;
  maxValue: number;
  options: any = {};
  constructor(private modalService: NgbModal) { 
    this.minValue = 1000;
    this.maxValue = 50000000;
  }

  ngOnInit(): void {
    this.AgentfilteredOptions = this.AgentSearchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  status: boolean = false;
  status1: boolean = false;
  clickEvent1(){
    this.status1 = !this.status1;
    this.status = false;
  }
  clickEvent(){
    this.status = !this.status;
  }
  ngAfterViewInit() {
    $(".select2").select2({ placeholder: "Search..." });
  }
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }
    // Agent Search
    AgentSearchControl = new FormControl('');
    AgentSearchOptions: string[] = ['One', 'Two', 'Three'];
    AgentfilteredOptions!: Observable<string[]>;
    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
  
      return this.AgentSearchOptions.filter(option => option.toLowerCase().includes(filterValue));
    }
      // End Agent Search
}