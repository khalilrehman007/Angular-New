import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(private api: AppService) {
    this.api.PrivacyPolicy().subscribe((result:any)=> {
      $(".cms_content-paragraph").append(result.data.pageContent);
    })
  }

  ngOnInit(): void {
  }

}
