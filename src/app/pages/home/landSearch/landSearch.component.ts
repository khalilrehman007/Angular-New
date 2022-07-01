import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'land-search',
  templateUrl: './landSearch.component.html',
  styleUrls: ['./landSearch.component.scss']
})
export class LandSearchComponent implements OnInit {

  constructor(private service:AppService) {
  }

  ngOnInit(): void {
  }

}
