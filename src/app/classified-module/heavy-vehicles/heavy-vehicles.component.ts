import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';

@Component({
  selector: 'app-heavy-vehicles',
  templateUrl: './heavy-vehicles.component.html',
  styleUrls: ['./heavy-vehicles.component.scss']
})
export class HeavyVehiclesComponent implements OnInit {
  ads= 'assets/images/post-add.jpg'
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    $('.select2').select2({ placeholder: "Search..." });
    }
}

