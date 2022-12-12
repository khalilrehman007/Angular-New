import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-furniture-filter',
  templateUrl: './furniture-filter.component.html',
  styleUrls: ['./furniture-filter.component.scss']
})
export class FurnitureFilterComponent implements OnInit {
  minValue: number;
  maxValue: number;
  options: any = {};
  constructor(private modalService: NgbModal) { 
    this.minValue = 1000;
    this.maxValue = 50000000;
  }

  ngOnInit(): void {
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
}
