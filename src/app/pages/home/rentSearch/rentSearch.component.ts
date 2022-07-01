import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'rent-search',
  templateUrl: './rentSearch.component.html',
  styleUrls: ['./rentSearch.component.scss']
})
export class RentSearchComponent implements OnInit {

  constructor(private service:AppService) {
  }

  ngOnInit(): void {
  }

}
