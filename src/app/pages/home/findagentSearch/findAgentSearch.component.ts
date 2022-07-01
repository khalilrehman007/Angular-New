import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'find-agent-search',
  templateUrl: './findAgentSearch.component.html',
  styleUrls: ['./findAgentSearch.component.scss']
})
export class FindAgentSearchComponent implements OnInit {

  constructor(private service:AppService) {
  }

  ngOnInit(): void {
  }

}
