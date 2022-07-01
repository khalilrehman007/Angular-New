import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'buy-search',
  templateUrl: './buySearch.component.html',
  styleUrls: ['./buySearch.component.scss']
})
export class BuySearchComponent implements OnInit {

  constructor(private service:AppService) {
  }

  ngOnInit(): void {
  }

}
