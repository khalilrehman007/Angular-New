import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';

@Component({
  selector: 'app-number-plates',
  templateUrl: './number-plates.component.html',
  styleUrls: ['./number-plates.component.scss']
})
export class NumberPlatesComponent implements OnInit {
  ads= 'assets/images/post-add.jpg'
  plateclassic= 'assets/images/plates/dubai-classic-plate.png'
  platenew= 'assets/images/plates/dubai-new-plate.png'
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    $('.select2').select2({ placeholder: "Search..." });
    }

    status: boolean = true;
    clickEvent() {
      this.status = true;
      this.status1 = false;
    }
    status1: boolean = false;
    clickEvent1() {
      this.status1 = true;
      this.status = false;
    }
}

