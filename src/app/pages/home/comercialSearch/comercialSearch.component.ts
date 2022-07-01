import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'comercial-search',
  templateUrl: './comercialSearch.component.html',
  styleUrls: ['./comercialSearch.component.scss']
})
export class ComercialSearchComponent implements OnInit {

  constructor(private service:AppService) {
  }

  ngOnInit(): void {
  }

}
