import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-investors',
  templateUrl: './investors.component.html',
  styleUrls: ['./investors.component.scss']
})
export class InvestorsComponent implements OnInit {
  team: any=[];

  constructor(private api: AppService) {
    this.api.TeamMembers().subscribe((result: any) => {
      this.team = result.data;
      console.log(this.team);
    })
   }

  ngOnInit(): void {
  }

}
