import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {

  constructor(private api: AppService) {
    this.api.AboutUs().subscribe((result:any)=> {
      // $(".cms_content-paragraph").append(result.data.pageContent);
    })
  }

  ngOnInit(): void {
  }

}
